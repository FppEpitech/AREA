import axios from 'axios';

/**
 * Interface representing the response from the weather API.
 */
interface WeatherResponse {
    coord: {
        lon: number; // Longitude of the location
        lat: number; // Latitude of the location
    };
    weather: Array<{
        id: number; // Weather condition id
        main: string; // Group of weather parameters (Rain, Snow, etc.)
        description: string; // Weather condition within the group
        icon: string; // Weather icon id
    }>;
    base: string; // Internal parameter
    main: {
        temp: number; // Temperature in Celsius
        feels_like: number; // Temperature considering human perception
        temp_min: number; // Minimum temperature at the moment
        temp_max: number; // Maximum temperature at the moment
        pressure: number; // Atmospheric pressure in hPa
        humidity: number; // Humidity percentage
        sea_level?: number; // Atmospheric pressure at sea level (optional)
        grnd_level?: number; // Atmospheric pressure at ground level (optional)
    };
    visibility: number; // Visibility in meters
    wind: {
        speed: number; // Wind speed in meter/sec
        deg: number; // Wind direction in degrees
    };
    clouds: {
        all: number; // Cloudiness percentage
    };
    dt: number; // Time of data calculation in Unix timestamp
    sys: {
        type?: number; // Internal parameter (optional)
        id?: number; // Internal parameter (optional)
        country: string; // Country code (e.g., FR for France)
        sunrise: number; // Sunrise time in Unix timestamp
        sunset: number; // Sunset time in Unix timestamp
    };
    timezone: number; // Shift in seconds from UTC
    id: number; // City ID
    name: string; // City name
    cod: number; // Internal parameter
}

/**
 * Check the current weather in Nantes and log the temperature.
 *
 * The API is provided by OpenWeatherMap.
 */

async function CheckWeather(): Promise<void> {
    const apiKey = process.env.WEATHER_API_KEY;
    const city = 'Nantes,FR';
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;

    try {
        const response = await axios.get<WeatherResponse>(apiUrl);
        const data = response.data;
        const temperature: number = data.main.temp;

        if (temperature <= 7)
            console.log(`Current temperature in Nantes: ${temperature}°C`);
    } catch (error) {
        console.error('Error while fetching weather data:', error);
    }
}

export { CheckWeather };