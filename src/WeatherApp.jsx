import React,{ useState } from "react";

function WeatherApp (){

const [city,setCity] = useState("")
const [weather,setWeather] = useState(null)

const API_key='892b0d527a53423de3d871daec12afd5'


async function fetchWeather(city) {
    
    //error handling:
    if(!city) return; // exit the function if no city is provided 
    
    try{
        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_key}`
        );
        const data = await response.json() //convert from JSON to work with
    
        if(data.cod === 200){ setWeather(data)} else alert('City not found')
     } catch(error) {

        console.error("ERROR fetching the weather data:",error) //logging any appearing error 
        alert("Failed to fetch weather data")
}
}       
return(
        <div>
        <input
        type="text"
        placeholder="Enter city name"
        value={city}
        onChange={(e)=> setCity(e.target.value)}/>
        <br/>
        <button onClick={()=>fetchWeather(city)} >See Weather</button>
        
       {weather && (<div id="response"> 
                   <h2  > {weather.name} </h2>
                   <p id="p1" >{weather.weather[0].description} </p>
                   <p id="p2" >Temperature: {Math.round(weather.main.temp - 273.15)}°C </p>
                     </div>        
                   ) 
       } 
        </div>

)

} export default WeatherApp