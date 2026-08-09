import './Card.css'
import { getWeatherIcon } from '../Icons/Icons'


export function formatTime(date){

    return new Date(date)
      .toLocaleTimeString(
        "ru-RU",
        {
          hour:"2-digit",
          minute:"2-digit"
        }
      )
  
  }

 export function weather(code){
    if(code === 0 || code === 1) return 'Ясно'
    
    if(code === 2) return 'Перменная облачность'
    if(code === 3) return 'Пасмурно'
    if(code === 45 || code === 48) return 'Туман'
    if(code === 51 || code === 53 || code === 55) return 'Морось'
    if(code === 61 || code === 63 || code === 65) return 'Дождь'
    if(code === 71 || code === 73 || code === 75) return 'Снег'
    if(code === 80 || code === 81 || code === 82) return 'Ливень'
    if(code ===95) return 'Гроза'

}

export default function Card({id,temp, city, weatherCode,onDelete, loading, sunrise, sunset, onClick}){
    

    if(loading) {
        return (
            <div className='card'>
                Загрузка...
            </div>
        )
    }

    return (
        <div className="card" onClick={onClick}>
            <div className='card__first-row'>
                <div>{city}</div>
                <div>{Math.floor(temp)} °C</div>
            </div>
            <div className='card__second-row'>
                <div className='card__weather'>
                    <img src={getWeatherIcon(weatherCode)} alt="" className='card__icon'/>
                    <div>{weather(weatherCode)}</div>
                </div>
                <button className='card__delete' onClick={onDelete}>
                    <img className='card__icon-delete' src="/delete.svg" alt="" />
                </button>
            </div>
            {/* <div>Восход {formatTime(sunrise)}</div>
            <div>Заход {formatTime(sunset)}</div> */}
            
        </div>
    )
}