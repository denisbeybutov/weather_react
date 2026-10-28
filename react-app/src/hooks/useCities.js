import { useState, useRef, useEffect } from "react"

export function useCities(){
    const [cities, setCities] = useState(()=>{
          const savedCities = localStorage.getItem('cities')
    
          return savedCities
            ? JSON.parse(savedCities)
            : []
        })
    
        const citiesRef = useRef(cities)
    
        useEffect(()=>{
          citiesRef.current = cities
        },[cities])
    
        useEffect(()=>{
          localStorage.setItem('cities', JSON.stringify(cities))
        },[cities])

        return {
            cities,
            setCities,
            citiesRef
        }
}