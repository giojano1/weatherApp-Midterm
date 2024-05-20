const latitude = "44.8015";
const longitude = "41.6938";
const url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,wind_speed_10m,is_day,wind_speed_10m`;
const latText = document.getElementById("lat");
const lonText = document.getElementById("lon");
const time = document.getElementById("time");
const cloud = document.getElementById("cloud");
const temp = document.getElementById("temp");
const far = document.getElementById("far");
const wind = document.getElementById("wind");
latText.textContent = latitude;
lonText.textContent = longitude;
fetch(url)
  .then((response) => response.json())
  .then((data) => {
    data = data.current;
    if (data.is_day === 0) {
      time.src = "img/night.png";
    } else {
      time.src = "img/day.png";
    }
    if (data.temperature_2m < 0) {
      cloud.src = "img/snow.png";
    } else if (data.temperature_2m >= 0 && data.temperature_2m <= 10) {
      cloud.src = "img/rain.png";
    } else if (data.temperature_2m >= 11 && data.temperature_2m <= 30) {
      cloud.src = "img/cloud.png";
    } else if (data.temperature_2m > 30) {
      cloud.src = "img/sunny.png";
    }
    temp.textContent = data.temperature_2m;
    wind.textContent = `${data.wind_speed_10m} km/h`;
    far.textContent = Math.floor((9 / 5) * data.temperature_2m + 32);
  });
