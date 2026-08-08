import { weather } from "../Card/Card"
import { getWeatherIcon } from "../Icons/Icons"
import './WeatherCard.css'

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
            <div className="weather-card__description">
                <img src={getWeatherIcon(city.weatherCode)} alt="" className='card__icon'/>
                <div>{weather(city.weatherCode)}</div>
            </div>            
        </section>
    )
}