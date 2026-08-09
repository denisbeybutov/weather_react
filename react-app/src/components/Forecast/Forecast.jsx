import './Forecast.css'

export default function Forecast({city}){
    if(!city) {
        return null
    }

    return (
        <section className="forecast">
            Почасовой прогноз
            <div className="forecast_items">
                <div>время 
                    {city.hourlyTime.slice(0,24).map((time,index )=> 
                        <div>
                            <div>{time}</div>
                            <div>{city.hourlyTemperature[index]}</div>
                        </div>
                       
                    )}
                </div>
                
            </div>
        </section>
    )
}