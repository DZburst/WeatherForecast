const tdy_deg = document.querySelector(".today .deg");
const tdy_weather = document.querySelector(".today .weather img");
const tdy_hum = document.querySelector(".today .hum");
const tmrw_deg = document.querySelector(".tomorrow .deg");
const tmrw_weather = document.querySelector(".tomorrow .weather img");
const tmrw_hum = document.querySelector(".tomorrow .hum");
const aft_tmrw_deg = document.querySelector(".aft_tomorrow .deg");
const aft_tmrw_weather = document.querySelector(".aft_tomorrow .weather img");
const aft_tmrw_hum = document.querySelector(".aft_tomorrow .hum");

document.getElementById("btn").addEventListener("click", function(event) {
    event.preventDefault();
    requestWeather();
});

function requestWeather (){
    const city = document.getElementById("inp").value;
    
    if (city === "") {
        alert("Please enter a city name");
        return;
    }
    else {
        console.log(city);
    }

    const apiKey = "6bb2eb45d63cf5714d90c22b5ab20dcb";
    const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}`;

    console.log(apiUrl);

    fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
        const today = data.list[0];
        const deg_0 = (today.main.temp - 273.15).toFixed(1);
        const wth_0 = today.weather[0].icon.slice(0, 2) + "d";
        const hum_0 = today.main.humidity;

        tdy_deg.innerHTML = `${deg_0}°C`;
        tdy_weather.src = `http://openweathermap.org/img/wn/${wth_0}@2x.png`;
        tdy_hum.innerHTML = `${hum_0}%`;

        const tomorrow = data.list[8];
        const deg_1 = (tomorrow.main.temp - 273.15).toFixed(1);
        const wth_1 = tomorrow.weather[0].icon.slice(0, 2) + "d";
        const hum_1 = tomorrow.main.humidity;

        tmrw_deg.innerHTML = `${deg_1}°C`;
        tmrw_weather.src = `http://openweathermap.org/img/wn/${wth_1}@2x.png`;
        tmrw_hum.innerHTML = `${hum_1}%`;

        const aft_tomorrow = data.list[16];
        const deg_2 = (aft_tomorrow.main.temp - 273.15).toFixed(1);
        const wth_2 = aft_tomorrow.weather[0].icon.slice(0, 2) + "d";
        const hum_2 = aft_tomorrow.main.humidity;

        aft_tmrw_deg.innerHTML = `${deg_2}°C`;
        aft_tmrw_weather.src = `https://openweathermap.org/img/wn/${wth_2}@2x.png`;
        aft_tmrw_hum.innerHTML = `${hum_2}%`;
    })
    .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
    });
}

