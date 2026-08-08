import './Sidebar.css'
import Search from '../Search/Search'

import { useState,useEffect } from 'react'
import Card from '../Card/Card'
import { getCityCoordinates, getWeather } from '../../api/weatherApi'

export default function Sidebar({
        cities,
        setCities,
        citiesRef,
        selectedCity,
        setSelectedCity
}){
    const [notification, setNotification] = useState('')
    const [error, setError] = useState('')
    const [city, setCity] = useState('')
    
    

    // добавить город
        async function addCity(){
            let  weatherData,place
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
          try{
             place = await getCityCoordinates(city)
             weatherData = await getWeather(place.latitude, place.longitude)

            console.log(place)
            // console.log(weatherData)
          }catch(err){
            setError(err.message);
            setCities(prev => prev.filter(city => city.id !== id));  
            setCity('')
            return
          }
          
    
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

  // удалить город
  function deleteCity(city){
    setNotification(`Город ${city.name} удален`)
    setCities(prev => prev.filter(item => item.id !== city.id))
    
      setTimeout(() => {
        setNotification('')
      }, 3000);
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
        <aside className="sidebar">
            <h2>Погода</h2>
             <Search
                    city={city}
                    setCity={setCity}
                    addCity={addCity}
                    refreshAll={refreshAll}
                    setError={setError}
                  />
            
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
                                        onClick={()=>setSelectedCity(city)}
                                    />
                          ))}
                        </div>
                        <div className='sidebar__text'>Обновление каждые 5 минут</div>
                    </div>
                    
                  }
        </aside>
    )
}