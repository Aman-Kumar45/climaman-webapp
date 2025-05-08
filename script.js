let id = '9505fd1df737e20152fbd78cdb289b6a'; // Your OpenWeatherMap API key
let url = 'https://api.openweathermap.org/data/2.5/weather?units=metric&appid=' + id;

let city = document.querySelector('.name');
let form = document.querySelector("form");
let temperature = document.querySelector('.temperature');
let description = document.querySelector('.description');
let valueSearch = document.getElementById('name');
let clouds = document.getElementById('clouds');
let humidity = document.getElementById('humidity');
let pressure = document.getElementById('pressure');
let main = document.querySelector('main');
const themeSwitch = document.getElementById('themeSwitch');
const suggestionBox = document.getElementById('suggestion-box');

const cityList = [
  "London", "New York", "Paris", "Tokyo", "Mumbai", "Delhi", "Sydney", "Moscow", "Cairo", "Berlin",
  "Bangkok", "pakistan", "bangladesh", "Toronto", "Los Angeles", "Rome", "Madrid", "Beijing", "Dubai", "Chicago", "Istanbul", "Seoul", "lucknow", "lalganj"
];

const savedTheme = localStorage.getItem('theme') || 'light';
document.body.classList.toggle('dark', savedTheme === 'dark');
themeSwitch.checked = savedTheme === 'dark';


themeSwitch.addEventListener('change', () => {
  const newTheme = themeSwitch.checked ? 'dark' : 'light';
  document.body.classList.toggle('dark', themeSwitch.checked);
  localStorage.setItem('theme', newTheme);
});

form.addEventListener("submit", (e) => {
  e.preventDefault();
  if (valueSearch.value !== '') {
    searchWeather();
  }
});
const searchWeather = () => {
  fetch(url + '&q=' + valueSearch.value)
    .then(response => response.json())
    .then(data => {
      if (data.cod == 200) {
        city.querySelector('figcaption').innerHTML = data.name;
        city.querySelector('img').src = `https://flagsapi.com/${data.sys.country}/shiny/32.png`;
        temperature.querySelector('img').src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png`;
        temperature.querySelector('span').innerText = data.main.temp;
        description.innerText = data.weather[0].description;
        clouds.innerText = data.clouds.all;
        humidity.innerText = data.main.humidity;
        pressure.innerText = data.main.pressure;
      } else {
        main.classList.add('error');
        setTimeout(() => main.classList.remove('error'), 1000);
      }
      valueSearch.value = '';
    })
    .catch(error => {
      console.error("Error fetching weather data:", error);
      main.classList.add('error');
      setTimeout(() => main.classList.remove('error'), 1000);
    });
}

valueSearch.addEventListener('input', () => {
  const input = valueSearch.value.trim().toLowerCase();
  suggestionBox.innerHTML = '';
  if (input.length === 0) {
    suggestionBox.style.display = 'none';
    return;
  }

  const matches = cityList.filter(city => city.toLowerCase().startsWith(input));
  if (matches.length === 0) {
    suggestionBox.style.display = 'none';
    return;
  }

  matches.forEach(city => {
    const div = document.createElement('div');
    div.textContent = city;
    div.onclick = () => {
      valueSearch.value = city;
      suggestionBox.style.display = 'none';
      searchWeather();
    };
    suggestionBox.appendChild(div);
  });

  suggestionBox.style.display = 'block';
});


document.addEventListener('click', (e) => {
  if (!form.contains(e.target)) {
    suggestionBox.style.display = 'none';
  }
});

const initApp = () => {
  valueSearch.value = 'Lucknow';
  searchWeather();
}

initApp(); 
