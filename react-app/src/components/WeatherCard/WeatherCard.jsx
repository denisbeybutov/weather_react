import { weather } from "../Card/Card"
import { getWeatherIcon } from "../Icons/Icons"
import './WeatherCard.css'
import { formatTime } from "../Card/Card"

export function formatDuration(seconds) {
    const hours = Math.floor(seconds / 3600)
    const minutes = Math.floor((seconds % 3600) / 60)

    return `${hours} ч ${minutes} мин`
}

export function getWindDirection(degrees) {
    const directions = [
        'С',
        'С/В',
        'В',
        'Ю/В',
        'Ю',
        'Ю/З',
        'З',
        'С/З'
    ]

    return directions[
        Math.round(degrees / 45) % 8
    ]
}

export default function WeatherCard({city}){
    if(!city) {
        return (
            <section className="weather-card">
                <h2>Выберите город</h2>
            </section>
        )
    }


    return (
        <section className="weather-card">
            <h1>{city.name}</h1>
            <h2>{Math.floor(city.temperature)} °C</h2>
            <p>Ощущается как {Math.floor(city.apparentTemperature)} °C</p>
            <div className="weather-card__description">
                <img src={getWeatherIcon(city.weatherCode)} alt="" className='card__icon'/>
                <div>{weather(city.weatherCode)}</div>
            </div>            
            <div>Восход {formatTime(city.sunrise)}</div>
            <div>Заход {formatTime(city.sunset)}</div>
            <div>Продолжительность дня {formatDuration(city.daylightDuration)}</div>
            <div>Влажность {city.humidity}%</div>
            <div>Ветер {city.windSpeed} км/ч, {getWindDirection(city.windDirection)}</div>
            <div>Облачность {city.cloudCover}%</div>
            <div>Видимость {(city.visibility / 1000).toFixed(0)} км</div>
            <div>Вероятность осадков {city.precipitationProbability}%</div>
            <div>УФ {Math.round(city.uvIndex)}</div>
        </section>
    )
}