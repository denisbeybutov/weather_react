import { useState } from 'react'

import Sidebar from './components/Sidebar/Sidebar'
import Forecast from './components/Forecast/Forecast'
import WeatherCard from './components/WeatherCard/WeatherCard'
import WeatherMap from './components/WeatherMap/WeatherMap'
import { useCities } from './hooks/useCities'

import './App2.css'

export default function App2(){
    const {cities, setCities, citiesRef} = useCities()
    const [selectedCity, setSelectedCity] = useState(null)

    const getWeatherTheme = (code) => {
        if (code === 0) {
            return {
                background: '/bg_clear.jpeg',
                cards: 'rgba(101, 101, 101, 0.8)',
            }
        }
        return {
            background: '/bg5.jpg',
            cards: 'rgba(255,255,255,.06)'
        }
    }

    const theme = getWeatherTheme(selectedCity?.weatherCode)
    return (
        <div className='app'
            style={{
                backgroundImage: `url(${theme.background})`,
                '--background-cards': theme.cards
            }}>
            <Sidebar 
                cities={cities}
                setCities={setCities}
                citiesRef={citiesRef}
                selectedCity={selectedCity}
                setSelectedCity={setSelectedCity}
            />
            <main className='content'>
                <WeatherCard city={selectedCity}/>
                {/* <Forecast/> */}
                {/* <WeatherMap/> */}
            </main>
        </div>
    )

}