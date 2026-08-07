import { useState } from 'react'
import './Search.css'
import Card from '../Card/Card'

export default function Search({city, setCity, addCity, refreshAll, setError}){
    

    function changeCity(e){
        setCity(e.target.value)
        setError('')
    }

    

    return (
        <div className="search">
            <input 
                type="text" 
                className="search__input"   
                placeholder='Введите город' 
                value={city}
                onChange={changeCity}
                
            />
            <button onClick={addCity}>+ Добавить</button>
            <button onClick={refreshAll}>Обновить все</button>
            
        </div>
    )
}