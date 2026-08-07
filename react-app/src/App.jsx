import { useEffect, useRef, useState } from 'react'
import './App.css'
import Search from './components/Search/Search'
import Card from './components/Card/Card'
import { getCityCoordinates, getWeather } from './api/weatherApi'
import Clock from './components/Clock'
import { useCities } from './hooks/useCities'

export default function App() {
    const [notification, setNotification] = useState('')
    const [error, setError] = useState('')
    const [city, setCity] = useState('')

    const {cities, setCities, citiesRef} = useCities()

    // добавить город
    async function addCity(){
      // сразу инициализируем город для отображения карточки с загрузкой
      const id = Date.now()
      setCities(prev => [
        ...prev,
        {
          id,
          name: null,
          temperature: null,
          weatherCode: null,
          latitude: null,
          longitude: null,
          loading: true,
          sunrise: null,
          sunset: null
        }
      ])
 
      // запрос на сервер
      const place = await getCityCoordinates(city)
      const weatherData = await  getWeather(place.latitude, place.longitude)

      console.log(weatherData)
      // записываем данные в массив
      setCities(prev=> {
        return prev.map(city => {
          return city.id === id
            ? {
              ...city,
              name: place.name,
              temperature: weatherData.current.temperature_2m,
              weatherCode: weatherData.current.weather_code,
              latitude: place.latitude,
              longitude: place.longitude,
              loading: false,
              sunrise: weatherData.daily.sunrise[0],
              sunset: weatherData.daily.sunset[0]
            }
            : city
        })
      })
      // очищаем поле ввода
      setCity('')
      // уведомление о добавлении города
      setNotification(`Город ${place.name} добавлен`)
      setTimeout(() => {
        setNotification('')
      }, 3000);
      
      
  }

  // удалить город
  function deleteCity(city){
    setNotification(`Город ${city.name} удален`)
    setCities(prev => prev.filter(item => item.id !== city.id))
    
      setTimeout(() => {
        setNotification('')
      }, 3000);
  }

  // обновление всех городов
  async function refreshAll(){
    setCities(prev => 
      prev.map(city => (
        {
          ...city,
          loading: true
        }
      )
        
      )
    )

    const updatedCities = await Promise.all(
      citiesRef.current.map(async city => {
        const weatherUrl = `https://api.open-meteo.com/v1/forecast?latitude=${city.latitude}&longitude=${city.longitude}&current=temperature_2m,weather_code`

        const response = await fetch(weatherUrl)
        if(!response.ok) {
          console.log('ошибка')
          return {
            ...city,
            loading: false
          }
        }

        const data = await response.json()

        return {
          ...city,
          temperature: data.current.temperature_2m,
          weatherCode: data.current.weather_code,
          loading: false
        }
      })
    )

    setCities(updatedCities)
    console.log(`Обновлено в ${new Date().toLocaleTimeString('ru-Ru')}`)
  }

  // автоматическое обновление городов через 5 минут
  useEffect(()=>{
    if(cities.length === 0) return

    refreshAll()

    const interval = setInterval(() => {
      refreshAll()
      
    }, 1000 * 60 * 5);

    return ()=>clearInterval(interval)
  },[])


  return (
    <div className='weather'>
      <Clock/>
      <div>Прогноз погоды</div>
      <div>Добавляйте города и отслеживайте текущую погоду</div>
      <Search
        city={city}
        setCity={setCity}
        addCity={addCity}
        refreshAll={refreshAll}
        setError={setError}
      />

      {error && <div>{error}</div>}
      <div>Отслеживается городов {cities.length}</div>

      {cities.length === 0 
        ? <div>
            Добавьте первый город, чтобы начать отслеживание погоды
          </div>
        : <div className='cards__wrapper'>
            <div className='cards'>
              {cities.map(city => (
                  <Card 
                            key={city.id}
                            temp={city.temperature}
                            city={city.name}    
                            weatherCode={city.weatherCode}
                            onDelete={()=>deleteCity(city)}
                            loading={city.loading}
                            sunrise={city.sunrise}
                            sunset={city.sunset}
                        />
              ))}
            </div>
            <div>Автоматическое обновление каждые 5 минут</div>
        </div>
        
      }

      {notification && <div>{notification}</div>}
      
    </div>
  )
}
