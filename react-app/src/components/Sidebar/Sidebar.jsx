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
              sunset: null,
              humidity: null,
              apparentTemperature: null,
              windSpeed: null,
              windDirection: null,
              cloudCover: null,
              visibility: null,
              precipitationProbability: null,
              daylightDuration: null,
              uvIndex: null,
              hourlyTemperature: null,
              hourlyTime: null,
              hourlyWeatherCode: null,
              hourlyPrecipitationProbability: null
            }
          ])
     
          // запрос на сервер
          try{
             place = await getCityCoordinates(city)
             weatherData = await getWeather(place.latitude, place.longitude)

            console.log(weatherData)
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
                  sunset: weatherData.daily.sunset[0],
                  humidity: weatherData.current.relative_humidity_2m,
                  apparentTemperature: weatherData.current.apparent_temperature,
                  windSpeed: weatherData.current.wind_speed_10m,
                  windDirection: weatherData.current.wind_direction_10m,
                  cloudCover: weatherData.current.cloud_cover,
                  visibility: weatherData.current.visibility,
                  precipitationProbability: weatherData.daily.precipitation_probability_max[0],
                  daylightDuration: weatherData.daily.daylight_duration[0],
                  uvIndex: weatherData.daily.uv_index_max[0],    
                  hourlyTemperature: weatherData.hourly.temperature_2m,
                  hourlyTime: weatherData.hourly.time,
                  hourlyWeatherCode: weatherData.hourly.weather_code,
                  hourlyPrecipitationProbability: weatherData.hourly.precipitation_probability
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

        try {
            const data = await getWeather(city.latitude,city.longitude)
            console.log(data)

            return {
                ...city,
                    temperature: data.current.temperature_2m,
                    weatherCode: data.current.weather_code,
                    humidity: data.current.relative_humidity_2m,
                    sunrise: data.daily.sunrise[0],
                    sunset: data.daily.sunset[0],
                    apparentTemperature: data.current.apparent_temperature,
                    windSpeed: data.current.wind_speed_10m,
                    windDirection: data.current.wind_direction_10m,
                    cloudCover: data.current.cloud_cover,
                    visibility: data.current.visibility,
                    precipitationProbability: data.daily.precipitation_probability_max[0], 
                    daylightDuration: data.daily.daylight_duration[0],
                    uvIndex: data.daily.uv_index_max[0],
                    hourlyTemperature: data.hourly.temperature_2m,
                    hourlyTime: data.hourly.time,
                    hourlyWeatherCode: data.hourly.weather_code,
                    hourlyPrecipitationProbability: data.hourly.precipitation_probability,
                    loading: false
            }
        } catch (err) {
            console.error(error)

            return {
                ...city,
                loading: false
            }
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