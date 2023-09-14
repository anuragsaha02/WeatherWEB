const apiKey = '4a7171d19db208d356276ae7ceeb4c1b';
const apiUrl = 'https://api.openweathermap.org/data/2.5/weather?units=metric&q=';
const cityInput = document.getElementById('cityInput');
const searchBtn = document.getElementById('searchBtn');
const weatherIcon = document.getElementById('weatherIcon');
const cityName = document.getElementById('cityName');
const temperature = document.getElementById('temperature');
const description = document.getElementById('description');
const modeToggle = document.getElementById('modeToggle');
const modeLabel = document.getElementById('modeLabel');

// Function to set the theme mode (light or dark)
function setThemeMode(mode) {
    if (mode === 'dark') {
        document.body.classList.add('dark-mode');
        localStorage.setItem('mode', 'dark');
        modeLabel.textContent = 'Dark Mode';
    } else {
        document.body.classList.remove('dark-mode');
        localStorage.setItem('mode', 'light');
        modeLabel.textContent = 'Light Mode';
    }
}

// Event listener for dark mode toggle
modeToggle.addEventListener('change', () => {
    if (modeToggle.checked) {
        setThemeMode('dark');
    } else {
        setThemeMode('light');
    }
});

// Check the initial mode preference and set it accordingly
if (localStorage.getItem('mode') === 'dark') {
    modeToggle.checked = true;
    setThemeMode('dark');
} else {
    setThemeMode('light');
}

searchBtn.addEventListener('click', () => {
    const city = cityInput.value.trim();
    if (city !== '') {
        fetchWeather(city);
    }
});

async function fetchWeather(city) {
    try {
        const response = await fetch(`${apiUrl}${city}&appid=${apiKey}`);
        if (!response.ok) {
            throw new Error('City not found');
        }
        const data = await response.json();

        cityName.textContent = data.name;
        temperature.textContent = `${Math.round(data.main.temp)}°C`;
        description.textContent = data.weather[0].description;
        const iconCode = data.weather[0].icon;
        const iconUrl = `http://openweathermap.org/img/wn/${iconCode}.png`;
        weatherIcon.src = iconUrl;
    } catch (error) {
        console.error('An error occurred:', error);
        cityName.textContent = 'City not found';
        temperature.textContent = '';
        description.textContent = '';
        weatherIcon.src = '';
    }
}
