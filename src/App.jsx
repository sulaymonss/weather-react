import { useState } from "react";

const api = {
  key: "fc817628282ce96e9855729ea1ca00e2",
  baseURL: "https://api.openweathermap.org/data/2.5/",
};

function App() {

  const [query, setQuery] = useState('')
  const [weather, setWeather] = useState({});
  
  const search = (e) =>{
    if(e.key === 'Enter'){
      fetch(`${api.baseURL}weather?q=${query}&units=metric&APPID=${api.key}`)
      .then(res => res.json())
      .then((result) => {
        setWeather(result)
        setQuery('')
        console.log(result);
      })
    }
  }

  const dateBuilder = (time) => {
    let months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    let days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];

    let day = days[time.getDay()];
    let date = time.getDate()
    let month = months.[time.getMonth()]
    let year = time.getFullYear()

    return `${day} ${date} ${month} ${year}`
  };

  return (
    <div className={
      (typeof weather.main !== 'undefined') ? ((weather.main.temp > 15) ? 'app' : 'app cold') : 'app'}>
      <main>
        <div className="search-box">
        <h1 className="title">Weather App</h1>
          <input type="text" className="search-bar" placeholder="Search..." onChange={(e) => setQuery(e.target.value)} value={query} onKeyPress={search} />
        </div>
        {(typeof weather.main !== 'undefined') ? (
          <div className="location-box">
          <div className="location">{weather.name}, {weather.sys.country}</div>
          <div className="date">{dateBuilder(new Date())}</div>
          <div className="weather-box">
            <div className="temp">{Math.round(weather.main.temp)}°C</div>
            <div className="weather">{weather.weather[0].main}</div>
          </div>
        </div>
        ) : (<h2 className="info">Enter the state or city you need correctly</h2>)}
      </main>
    </div>
  );
}

export default App;
