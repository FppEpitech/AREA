import axios from 'axios';

/**
 * Check the current weather in Nantes and log the temperature.
 *
 * The API is provided by OpenWeatherMap.
 */

async function CheckWeather(): Promise<void> {
    const apiKey = 'YOUR_API_KEY';
    const city = 'Nantes,FR';
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;

    try {
        const response: AxiosResponse = await axios.get(apiUrl);

        // Accessing the data field from Axios response
        const temperature: number = response.data.main.temp;

        console.log(`Current temperature in Nantes: ${temperature}°C`);
        if (temperature <= 7) {
            console.log('Temperature in Nantes is 7°C or below.');
        } else {
            console.log('Temperature in Nantes is above 7°C.');
        }
    } catch (error: unknown) {
        if (axios.isAxiosError(error)) {
            console.error('Error checking the weather (Axios):', error.message);
        } else {
            console.error('Unknown error:', error);
        }
    }
}

export { CheckWeather };

