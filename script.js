// OpenWeatherMap API Configuration
// IMPORTANT: Get your FREE API key at: https://openweathermap.org/api
// 1. Visit https://openweathermap.org/api
// 2. Click "Sign Up" 
// 3. Create a free account
// 4. Generate an API key in the API keys section
// 5. Replace the API key below with your own key

// Using a demonstration approach - for production, use your own API key
const API_KEY = 'ce22bd2ffad059a683e5dfbebecd4250'; // Replace with your own free API key from OpenWeatherMap
const BASE_URL = 'https://api.openweathermap.org/data/2.5';

// DOM Elements
let searchInput;
let searchBtn;
let weatherSection;
let defaultMessage;
let loadingSpinner;
let errorMessage;

// Check Internet Connection
function checkInternetConnection() {
    return navigator.onLine;
}

// Event Listeners
$(document).ready(function() {
    // Initialize DOM elements
    searchInput = $('#searchInput');
    searchBtn = $('#searchBtn');
    weatherSection = $('#weatherSection');
    defaultMessage = $('#defaultMessage');
    loadingSpinner = $('#loadingSpinner');
    errorMessage = $('#errorMessage');
    
    // Setup listeners
    setupEventListeners();
    setupEnterKeyListener();
    
    // Check internet on page load
    checkConnection();
    
    // Listen for online/offline events
    window.addEventListener('online', function() {
        console.log('Internet connection restored');
        clearError();
    });
    
    window.addEventListener('offline', function() {
        console.log('Internet connection lost');
        showError('⚠️ No internet connection. Please check your connection and try again.');
    });
});

function setupEventListeners() {
    searchBtn.on('click', function() {
        handleSearch();
    });
}

function setupEnterKeyListener() {
    searchInput.on('keypress', function(e) {
        if (e.which === 13) { // Enter key
            e.preventDefault();
            handleSearch();
        }
    });
}

function checkConnection() {
    if (!checkInternetConnection()) {
        showError('⚠️ No internet connection. Please check your connection.');
        return false;
    }
    return true;
}

// Search Handler
function handleSearch() {
    if (!checkInternetConnection()) {
        showError('⚠️ No internet connection. Please check your connection and try again.');
        return;
    }
    
    const city = searchInput.val().trim();
    
    if (!city) {
        showError('Please enter a city name');
        return;
    }
    
    // Save to search history
    saveSearchHistory(city);
    
    clearError();
    fetchWeatherData(city);
}

// Fetch Weather Data using AJAX
function fetchWeatherData(city) {
    showLoading();
    
    $.ajax({
        url: `${BASE_URL}/weather`,
        type: 'GET',
        timeout: 10000, // 10 second timeout
        data: {
            q: city,
            appid: API_KEY,
            units: 'metric'
        },
        success: function(response) {
            console.log('Weather data received:', response);
            clearError();
            displayCurrentWeather(response);
            fetchForecastData(response.coord.lat, response.coord.lon);
        },
        error: function(xhr, status, error) {
            console.error('Error details:', {status, error, xhr});
            hideLoading();
            
            if (status === 'timeout') {
                showError('⏱️ Request timed out. Please check your internet connection and try again.');
            } else if (xhr.status === 404) {
                showError('❌ City not found. Please check the spelling and try another city.');
            } else if (xhr.status === 401) {
                showError('⚠️ API key error. Please contact support.');
            } else if (xhr.status === 0) {
                showError('⚠️ Network error. Please check your internet connection.');
            } else {
                showError(`❌ Error loading weather. (${xhr.status}) Please try again.`);
            }
        }
    });
}

// Fetch 5-Day Forecast
function fetchForecastData(lat, lon) {
    $.ajax({
        url: `${BASE_URL}/forecast`,
        type: 'GET',
        timeout: 10000,
        data: {
            lat: lat,
            lon: lon,
            appid: API_KEY,
            units: 'metric',
            cnt: 40
        },
        success: function(response) {
            console.log('Forecast data received:', response);
            hideLoading();
            displayForecast(response.list);
            showWeatherSection();
        },
        error: function(xhr, status, error) {
            console.error('Forecast Error:', {status, error, xhr});
            hideLoading();
            // Still show current weather even if forecast fails
            showWeatherSection();
        }
    });
}

// Display Current Weather
function displayCurrentWeather(data) {
    const { main, weather, wind, clouds, sys, name, dt } = data;
    const { temp, feels_like, humidity, pressure } = main;
    const { speed } = wind;
    const weatherMain = weather[0];
    
    // Update City Name and Date
    $('#cityName').text(`${name}, ${sys.country}`);
    $('#weatherDate').text(formatDate(new Date(dt * 1000)));
    
    // Update Temperature and Description
    $('#temperature').text(Math.round(temp));
    $('#weatherDescription').text(weatherMain.main + ' - ' + weatherMain.description);
    
    // Update Weather Icon
    const iconCode = weatherMain.icon;
    const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@4x.png`;
    $('#weatherIcon').attr('src', iconUrl);
    
    // Update Weather Details
    $('#humidity').text(Math.round(humidity) + '%');
    $('#windSpeed').text(speed.toFixed(1) + ' m/s');
    $('#pressure').text(pressure + ' hPa');
    $('#feelsLike').text(Math.round(feels_like) + '°C');
}

// Display 5-Day Forecast
function displayForecast(forecastData) {
    const forecastContainer = $('#forecastContainer');
    forecastContainer.empty();
    
    // Group forecast by day and get daily min/max
    const dailyForecasts = {};
    
    forecastData.forEach(forecast => {
        const date = new Date(forecast.dt * 1000);
        const day = date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
        
        if (!dailyForecasts[day]) {
            dailyForecasts[day] = {
                date: day,
                temps: [],
                weather: forecast.weather[0],
                icon: forecast.weather[0].icon,
                description: forecast.weather[0].description
            };
        }
        
        dailyForecasts[day].temps.push(forecast.main.temp);
    });
    
    // Get unique days (limit to 5)
    const uniqueDays = Object.values(dailyForecasts).slice(0, 5);
    
    uniqueDays.forEach((dayForecast, index) => {
        const minTemp = Math.round(Math.min(...dayForecast.temps));
        const maxTemp = Math.round(Math.max(...dayForecast.temps));
        const iconUrl = `https://openweathermap.org/img/wn/${dayForecast.icon}@2x.png`;
        
        const forecastCard = `
            <div class="forecast-card" data-index="${index}">
                <div class="forecast-date">${dayForecast.date}</div>
                <img src="${iconUrl}" alt="${dayForecast.description}" class="forecast-icon">
                <div class="forecast-temps">
                    <span class="temp-max">${maxTemp}°</span>
                    <span class="temp-min">${minTemp}°</span>
                </div>
                <div class="forecast-description">${dayForecast.description}</div>
            </div>
        `;
        
        forecastContainer.append(forecastCard);
        
        // Add animation delay
        $(`.forecast-card[data-index="${index}"]`).css({
            'animation-delay': `${index * 0.1}s`
        });
    });
    
    // Add click animation
    $('.forecast-card').on('mouseenter', function() {
        $(this).css('z-index', '10');
    });
}

// Utility Functions

function formatDate(date) {
    const options = {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    };
    return date.toLocaleDateString('en-US', options);
}

function showLoading() {
    loadingSpinner.removeClass('hidden');
    weatherSection.addClass('hidden');
    defaultMessage.addClass('hidden');
    errorMessage.addClass('hidden');
}

function hideLoading() {
    loadingSpinner.addClass('hidden');
}

function showWeatherSection() {
    weatherSection.removeClass('hidden');
    defaultMessage.addClass('hidden');
}

function hideWeatherSection() {
    weatherSection.addClass('hidden');
    defaultMessage.removeClass('hidden');
}

function showError(message) {
    errorMessage.text(message).removeClass('hidden');
    hideLoading();
    hideWeatherSection();
}

function clearError() {
    errorMessage.addClass('hidden');
}

// Add smooth scroll animation to forecast cards
$(document).ready(function() {
    // Add observability for entering viewport
    if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    $(entry.target).css('animation', 'slideUp 0.5s ease-out forwards');
                }
            });
        }, { threshold: 0.1 });
        
        // Observe weather section when it appears
        observer.observe(weatherSection[0]);
    }
});

// Add search history feature (localStorage)
function saveSearchHistory(city) {
    let history = JSON.parse(localStorage.getItem('weatherHistory') || '[]');
    if (!history.includes(city)) {
        history.unshift(city);
        history = history.slice(0, 10); // Keep last 10 searches
        localStorage.setItem('weatherHistory', JSON.stringify(history));
    }
}

// Add geolocation support (optional)
function getWeatherByGeolocation() {
    if (navigator.geolocation) {
        loadingSpinner.removeClass('hidden');
        navigator.geolocation.getCurrentPosition(
            function(position) {
                const { latitude, longitude } = position.coords;
                fetchWeatherByCoords(latitude, longitude);
            },
            function(error) {
                hideLoading();
                console.log('Geolocation error:', error);
            }
        );
    }
}

function fetchWeatherByCoords(lat, lon) {
    $.ajax({
        url: `${BASE_URL}/weather`,
        type: 'GET',
        data: {
            lat: lat,
            lon: lon,
            appid: API_KEY,
            units: 'metric'
        },
        success: function(response) {
            clearError();
            searchInput.val(response.name);
            displayCurrentWeather(response);
            fetchForecastData(response.coord.lat, response.coord.lon);
        },
        error: function(xhr, status, error) {
            hideLoading();
            console.error('Geolocation Weather Error:', error);
        }
    });
}
