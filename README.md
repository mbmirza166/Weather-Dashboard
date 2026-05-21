# 🌦️ Weather Dashboard

A modern, responsive weather dashboard built with HTML, CSS, JavaScript, jQuery, and AJAX. Features beautiful glassmorphism design, smooth animations, and real-time weather data.

## ✨ Features

- **🔍 City Search**: Search weather for any city worldwide
- **🌡️ Current Weather**: Real-time temperature, humidity, wind speed, and pressure
- **🎨 Glassmorphism Design**: Modern frosted glass UI with smooth gradients
- **📱 Fully Responsive**: Works perfectly on desktop, tablet, and mobile devices
- **📊 5-Day Forecast**: Visual forecast cards with temperatures and weather icons
- **⚡ Loading Animation**: Smooth spinner during data fetching
- **🎯 Error Handling**: User-friendly error messages
- **✅ Accessibility**: Keyboard support (Enter to search) and reduced motion support
- **🚀 Fast & Smooth**: AJAX requests with no page refresh
- **🌙 Dark/Light Mode**: Adaptive to system preferences

## 🛠️ Technologies Used

- **HTML5**: Semantic markup
- **CSS3**: Glassmorphism, gradients, animations, flexbox, CSS Grid
- **JavaScript (ES6)**: Modern JavaScript functionality
- **jQuery**: DOM manipulation and AJAX
- **OpenWeatherMap API**: Real-time weather data
- **Responsive Design**: Mobile-first approach with media queries

## 📋 Getting Started

### Prerequisites

- A modern web browser (Chrome, Firefox, Safari, Edge)
- Internet connection for API calls
- Free OpenWeatherMap API key (optional - included demo key has limitations)

### Installation

1. **Clone or download the project**
   ```bash
   git clone <repository-url>
   cd weather-dashboard
   ```

2. **Open in browser**
   - Simply double-click `index.html` in file explorer, or
   - Serve with a local server (recommended for best performance):
     ```bash
     # Python 3
     python -m http.server 8000
     
     # Python 2
     python -m SimpleHTTPServer 8000
     
     # Node.js (if installed)
     npx http-server
     ```

3. **Get your own API key (recommended)**
   - Visit [OpenWeatherMap API](https://openweathermap.org/api)
   - Sign up for a free account
   - Generate an API key
   - Replace the API key in `script.js`:
     ```javascript
     const API_KEY = 'YOUR_API_KEY_HERE';
     ```

## 🎮 How to Use

1. **Search for a city**:
   - Type a city name in the search box
   - Press Enter or click the search button
   - Wait for the weather data to load

2. **View current weather**:
   - Temperature with "feels like" information
   - Current weather condition description
   - Humidity percentage
   - Wind speed
   - Atmospheric pressure
   - Detailed weather icons

3. **Check 5-day forecast**:
   - Scroll down to see upcoming weather
   - Hover over forecast cards for smooth animations
   - Min/Max temperatures for each day

4. **Mobile experience**:
   - Responsive design automatically adjusts to screen size
   - Touch-friendly buttons and spacing
   - Optimized for all device sizes

## 📁 Project Structure

```
weather-dashboard/
├── index.html          # Main HTML structure
├── styles.css          # Styling and animations
├── script.js           # JavaScript logic and API calls
└── README.md          # This file
```

## 🎨 Design Features

### Glassmorphism
- Frosted glass effect with backdrop blur
- Semi-transparent backgrounds
- Gradient overlays
- Smooth border colors

### Animations
- **Fade In**: Page elements appear smoothly
- **Slide Up**: Content slides in from bottom
- **Hover Effects**: Smooth transforms on interactive elements
- **Loading Spinner**: Continuous rotation animation
- **Card Transitions**: Elevation and color changes

### Responsive Breakpoints
- **Desktop**: Full feature display (1024px+)
- **Tablet**: Optimized grid layout (768px - 1023px)
- **Mobile**: Single column layout (<768px)
- **Small Mobile**: Further optimizations (<480px)

## 🌐 API Information

### OpenWeatherMap API
- **Current Weather Endpoint**: `/weather`
- **Forecast Endpoint**: `/forecast`
- **Free Tier**: 60 calls/minute, 1,000,000 calls/month
- **Units**: Metric (Celsius, m/s, hPa)

### API Response Data Used
```javascript
// Current Weather
- Temperature (temp)
- Feels Like (feels_like)
- Humidity (humidity)
- Wind Speed (wind.speed)
- Atmospheric Pressure (pressure)
- Weather Icon (weather[0].icon)
- Weather Description (weather[0].description)
- Country Code (sys.country)
- Timestamp (dt)

// 5-Day Forecast
- List of 40 forecast entries (3-hour intervals)
- Temperature, weather conditions for each entry
```

## 🔧 Customization

### Change Colors
Edit the CSS variables in `styles.css`:
```css
:root {
    --primary-color: #0f172a;
    --accent-color: #0ea5e9;
    --text-primary: #f1f5f9;
    /* ... more variables ... */
}
```

### Adjust Animation Speed
Modify animation durations in CSS:
```css
transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
animation: fadeIn 0.5s ease-out;
```

### Change Temperature Units
Modify the units parameter in AJAX requests:
```javascript
// Change 'metric' to 'imperial' for Fahrenheit
data: {
    q: city,
    appid: API_KEY,
    units: 'imperial' // or 'metric'
}
```

## 🐛 Troubleshooting

### "City not found" error
- Check spelling of city name
- Try with country code (e.g., "London, UK")
- Ensure internet connection is active

### "Invalid API key" error
- Verify API key in `script.js`
- Check API key has not expired
- Regenerate API key from OpenWeatherMap account

### Weather data not loading
- Check browser console for errors (F12)
- Verify internet connection
- Try a different city
- Check if API rate limit exceeded

### Styling not applied
- Clear browser cache (Ctrl+Shift+Delete)
- Hard refresh page (Ctrl+Shift+R)
- Check CSS file path in HTML

## 📊 Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+
- Mobile browsers (iOS Safari, Chrome Mobile)

## 🚀 Performance Tips

- Uses AJAX for non-blocking requests
- Optimized images with OpenWeatherMap icons
- CSS animations use GPU acceleration
- Efficient DOM manipulation with jQuery
- Minimal external dependencies

## 📝 License

This project is open source and available for personal and educational use.

## 🙏 Credits

- **OpenWeatherMap**: Weather data API
- **jQuery**: JavaScript library
- **Icons**: Weather icons from OpenWeatherMap

## 📞 Support

For issues or questions:
1. Check the Troubleshooting section
2. Review browser console for errors
3. Verify API key configuration
4. Ensure internet connectivity

## 🎓 Learning Resources

- [OpenWeatherMap Documentation](https://openweathermap.org/api)
- [jQuery AJAX Documentation](https://api.jquery.com/jquery.ajax/)
- [CSS Glassmorphism Guide](https://css-tricks.com/glass-morphism/)
- [MDN Web Docs](https://developer.mozilla.org/)

---

**Enjoy your weather dashboard! 🌤️**
