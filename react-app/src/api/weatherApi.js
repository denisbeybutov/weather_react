export async function getCityCoordinates(city) {
    const geoUrl = `https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=1&language=ru&format=json`
    
      const geoPresponse = await fetch(geoUrl)
      const geoData = await geoPresponse.json()

      
      if (!geoData.results || geoData.results.length === 0) {
        setCities(prev => prev.filter(city => city.id !== id));        
        setError("Город не найден");
        setCity('')
        return;
    }

    return geoData.results[0]
}

export async function getWeather(latitude, longitude){
    const weatherUrl = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,weather_code&daily=sunrise,sunset&timezone=auto`

      const weatherResponse = await fetch(weatherUrl)
      return await weatherResponse.json()
}