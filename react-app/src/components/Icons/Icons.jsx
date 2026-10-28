import clearIcon from './clear.svg'
import cloudyIcon from './cloudy.svg'
import partlyCloudyIcon from './partly-cloudy.svg'
import fogIcon from './fog.svg'
import rainIcon from './rain.svg'
import snowIcon from './snow.svg'
import stormIcon from './storm.svg'

export function getWeatherIcon(code){
    if(code===0 || code ===1) return clearIcon
    if(code === 2) return partlyCloudyIcon
    if(code === 3) return cloudyIcon
    if(code === 45 || code === 48) return fogIcon
    if(code === 51 || code === 53 || code === 55
         || code === 61 || code === 63 || code === 65
         || code === 80 || code === 81 || code === 82) return rainIcon
    if(code === 71 || code === 73 || code === 75) return snowIcon
    if(code ===95) return stormIcon
    
    
       
        
        
        
}