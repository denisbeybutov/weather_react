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
        if (code === 0 || code === 1) {
            return {
                background: '/bg_clear.jpeg',
                cards: 'rgba(101, 101, 101, 0.8)',
            }
        }
        if(code === 51 || code === 53 || code === 55
                 || code === 61 || code === 63 || code === 65
                 || code === 80 || code === 81 || code === 82) return  {
                    background: '/rain20.jpeg',
                    cards: 'rgba(101, 101, 101, 0.8)',
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
                <WeatherCard city={selectedCity} key={selectedCity?.id}/>
                <Forecast city={selectedCity}/>
                {/* <WeatherMap/>q
                 */}
            </main>
        </div>
    )

}