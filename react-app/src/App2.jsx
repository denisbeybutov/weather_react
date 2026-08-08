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

    const getBackground = (code) => {
        if (code === 0) {
            return '/bg_clear.jpeg'
        }
        return '/bg5.jpg'
    }

    const background = getBackground(selectedCity?.weatherCode)
    return (
        <div className='app'
            style={{
                backgroundImage: `url(${background})`,
                // color: 'black'
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