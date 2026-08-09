import { weather } from "../Card/Card"
import { getWeatherIcon } from "../Icons/Icons"
import './WeatherCard.css'
import { formatTime } from "../Card/Card"
import Clock from "../Clock"

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

export default function WeatherCard({city, key}){
    if(!city) {
        return (
            <section className="weather-card">
                <h2>Выберите город</h2>
            </section>
        )
    }


    return (
        <section className="weather-card">
            <h1 className="weather-card__header">{city.name}</h1>
            <div className="weather-card__main-param">
                <div>
                    <div>{Math.floor(city.temperature)} °C</div>
                    <div>Ощущается как {Math.floor(city.apparentTemperature)} °C</div>
                </div>
                <div><Clock/></div>
            </div>
            <div className="weather-card__items">
                <div className="weather-card__description weather-card__item">
                    <img src={getWeatherIcon(city.weatherCode)} alt="" className='card__icon'/>
                    <div>{weather(city.weatherCode)}</div>
                </div>            
                
                <div className="weather-card__item">
                    <div>{formatTime(city.sunrise)}</div>
                    <div>Восход</div>
                </div>
                <div className="weather-card__item">
                    <div>{formatTime(city.sunset)}</div>
                    <div>Заход</div>
                </div>
                <div className="weather-card__item">
                    <div>День</div>
                    <div>{formatDuration(city.daylightDuration)}</div>
                    
                </div>
                <div className="weather-card__item">
                    <div>{city.humidity}%</div>
                    <div>Влажность</div>
                </div>
                <div className="weather-card__item">
                    <div>Ветер</div>
                    <div>{city.windSpeed} км/ч </div>
                    <div>{getWindDirection(city.windDirection)}</div>
                </div>
                <div className="weather-card__item">
                    <div> {city.cloudCover}%</div>
                    <div>Облачность</div>
                </div>
                <div className="weather-card__item">
                    <div> {(city.visibility / 1000).toFixed(0)} км</div>
                    <div>Видимость</div>
                </div>
                <div className="weather-card__item">
                    <div>{city.precipitationProbability}%</div>
                    <div>Вероятность осадков</div>
                </div>
                <div className="weather-card__item">УФ {Math.round(city.uvIndex)}</div>
            </div>
            
        </section>
    )
}