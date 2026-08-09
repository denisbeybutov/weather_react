
import { weather } from '../Card/Card'
import { getWeatherIcon } from '../Icons/Icons'
import './Forecast.css'

function formatHour(time){
    return new Date(time).toLocaleTimeString('ru-RU',{
        hour: '2-digit',
        minute: '2-digit'
    })
}

function getCurrentIndex(times) {
    const now = new Date()

    return times.findIndex(time => {
        const date = new Date(time)

        return (
            date.getFullYear() === now.getFullYear() &&
            date.getMonth() === now.getMonth() &&
            date.getDate() === now.getDate() &&
            date.getHours() === now.getHours()
        )
    })
}

export default function Forecast({city}){
    if(!city) {
        return null
    }

    const currentIndex = getCurrentIndex(city.hourlyTime)

    return (
        <section className="forecast">
            Почасовой прогноз
            <div className="forecast_items">
                
                    {city.hourlyTime.slice(currentIndex,currentIndex+12).map((time,index )=> 
                        <div>
                            <div>{formatHour(time)}</div>
                            <div>{Math.round(city.hourlyTemperature[index])}°C</div>
                            <img src={getWeatherIcon(city.hourlyWeatherCode[index])} alt="" style={{width:'30px'}} />
                        </div>
                       
                    )}
                
                
            </div>
        </section>
    )
}