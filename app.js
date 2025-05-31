const apiKey ="584c7308d21ab732ede9059a091ce4f8"; // Replace with your API key

const cityInput = document.getElementById("city-input");
const searchBtn = document.getElementById("search-btn");
const weatherResult = document.getElementById("weather-result");
const errorMessage = document.getElementById("error-message");

const cityName = document.getElementById("city-name");
const description = document.getElementById("description");
const temp = document.getElementById("temp");
const humidity = document.getElementById("humidity");
const wind = document.getElementById("wind");

async function fetchWeather(city) {
  try {
    errorMessage.classList.add("hidden");
    weatherResult.classList.add("hidden");

    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
    );

    if (!response.ok) {
      throw new Error("City not found");
    }

    const data = await response.json();

    cityName.textContent = `${data.name}, ${data.sys.country}`;
    description.textContent = data.weather[0].description;
    temp.textContent = data.main.temp.toFixed(1);
    humidity.textContent = data.main.humidity;
    wind.textContent = data.wind.speed.toFixed(1);

    weatherResult.classList.remove("hidden");
  } catch (error) {
    errorMessage.textContent = error.message;
    errorMessage.classList.remove("hidden");
  }
}

searchBtn.addEventListener("click", () => {
  const city = cityInput.value.trim();
  if (city) {
    fetchWeather(city);
  }
});

cityInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    searchBtn.click();
  }
});
