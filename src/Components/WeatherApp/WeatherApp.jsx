import React, { useState } from "react";
import "./WeatherApp.css";

import search_icon from "../Assets/search.png";
import clear_icon from "../Assets/clear.png";
import cloud_icon from "../Assets/cloud.png";
import drizzle_icon from "../Assets/drizzle.png";
import rain_icon from "../Assets/rain.png";
import snow_icon from "../Assets/snow.png";
import wind_icon from "../Assets/wind.png";
import humidity_icon from "../Assets/humidity.png";

export const WeatherApp = () => {
  const api_key = process.env.REACT_APP_API_KEY;
  let [humidity, setHumidity] = useState('')
  let [wind, setWind] = useState('')
  let [temperature, setTemperature] = useState('')
  let [location, setLocation] = useState('')
  let [wicon,setWicon] = useState(cloud_icon)

  const search = async () => {
    const element = document.getElementsByClassName("cityInput")[0].value
    if (element === "") return 
    console.log(element)

    let url = `https://api.openweathermap.org/data/2.5/weather?q=${element}&units=metric&appid=${api_key}`
    let response = await fetch(url)
    let data = await response.json()
    if(data.message === "city not found") return 

    setHumidity(data.main.humidity)
    setWind(Math.floor(data.wind.speed))
    setTemperature(data.main.temp)
    setLocation(data.name)

    const weatherData = data.weather[0].icon
    if (weatherData.includes("01d" || "01n")) setWicon(clear_icon)
    else if (weatherData.includes("02d" || "02n")) setWicon(cloud_icon)
    else if (weatherData.includes("03d" || "03n")) setWicon(drizzle_icon)
    else if (weatherData.includes("04d" || "04n")) setWicon(drizzle_icon)
    else if (weatherData.includes("09d" || "09n")) setWicon(rain_icon)
    else if (weatherData.includes("10d" || "10n")) setWicon(rain_icon)
    else if (weatherData.includes("13d" || "13n")) setWicon(snow_icon)
    else setWicon(clear_icon)
  };

  return (
    <div className="container">
      <div className="top-bar">
        <input type="text" className="cityInput" placeholder="Search" />
        <div className="search-icon" onClick={() => {search()}}>
          <img src={search_icon} alt="" />
        </div>
      </div>
      <div className="weather-image">
        <img src={wicon} alt="" />
      </div>
      <div className="weather-temp">{temperature}°C</div>
      <div className="weather-location">{location}</div>
      <div className="data-container">
        <div className="element">
          <img src={humidity_icon} alt="" className="icon" />
          <div className="data">
            <div className="humidity-percent">{humidity}%</div>
            <div className="text">Humidity</div>
          </div>
        </div>
        <div className="element">
          <img src={wind_icon} alt="" className="icon" />
          <div className="data">
            <div className="wind-rate">{wind} km/h</div>
            <div className="text">Wind Speed</div>
          </div>
        </div>
      </div>
    </div>
  );
};
