
import { formatTime, weather } from '../Card/Card'
import { getWeatherIcon } from '../Icons/Icons'
import './Forecast.css'

function formatHour(time){
    return new Date(time).toLocaleTimeString('ru-RU',{
        hour: '2-digit',
        minute: '2-digit'
    })
}

function formatDay(time){
    return new Date(time).toLocaleDateString('ru-RU', {
        day: '2-digit',
        month: '2-digit'
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
            Почасовой прогноз на 24 часа
            <div className="forecast_items">
                
                    {city.hourlyTime.slice(currentIndex,currentIndex+24).map((time,index )=> 
                        <div>
                            <div>{formatHour(time)}</div>
                            <div>{Math.round(city.hourlyTemperature[index])}°C</div>
                            <img src={getWeatherIcon(city.hourlyWeatherCode[index])} alt="" style={{width:'30px'}} />
                        </div>
                       
                    )}
                
                
            </div>
            <div className='forecast__text'>Прогноз на 10 дней</div>
            <div className='forecast__week'>
                {city.dailyTime?.map((t,index) =>
                    <div>
                        <div>{formatDay(t)}</div>
                        <img src={getWeatherIcon(city.dailyWeatherCode[index])} alt="" style={{width:'30px'}} />
                        <div>{Math.round(city.dailyTemperatureMin[index])}°C</div>
                        <div>{Math.round(city.dailyTemperatureMax[index])}°C</div>
                        
                    </div>
                )}
            </div>
        </section>
    )
}