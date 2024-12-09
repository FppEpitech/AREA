"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isEqual = exports.greaterThan = exports.lessThan = void 0;
const axios_1 = __importDefault(require("axios"));
/**
 * Check the current weather in Nantes and log the temperature.
 *
 * The API is provided by OpenWeatherMap.
 */
function lessThan(value_json) {
    return __awaiter(this, void 0, void 0, function* () {
        const { city, country, temperature } = JSON.parse(value_json);
        return yield checkWeather(`${city},${country}`, temp => temp < temperature);
    });
}
exports.lessThan = lessThan;
function greaterThan(value_json) {
    return __awaiter(this, void 0, void 0, function* () {
        const { city, country, temperature } = JSON.parse(value_json);
        return yield checkWeather(`${city},${country}`, temp => temp > temperature);
    });
}
exports.greaterThan = greaterThan;
function isEqual(value_json) {
    return __awaiter(this, void 0, void 0, function* () {
        const { city, country, temperature } = JSON.parse(value_json);
        return yield checkWeather(`${city},${country}`, temp => temp === temperature);
    });
}
exports.isEqual = isEqual;
function checkWeather(city, condition) {
    return __awaiter(this, void 0, void 0, function* () {
        const apiKey = process.env.WEATHER_API_KEY;
        const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
        try {
            const response = yield axios_1.default.get(apiUrl);
            const temperature = response.data.main.temp;
            return condition(temperature);
        }
        catch (error) {
            console.error('Error while fetching weather data:', error);
        }
        return false;
    });
}
//# sourceMappingURL=WeatherCron.js.map