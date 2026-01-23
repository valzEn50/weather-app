
// To toggle the units at each selection

const unitOpts = document.querySelectorAll('.nav .units .drop-opt label');
const unitSwitch = document.querySelector('.unit-dropdown');

console.log(unitSwitch);

unitOpts.forEach(opts => {
    opts.addEventListener('click', () => {
        unitSwitch.checked = false;
    })
})


for (let i = 0; i < 7; i++) {
  console.log(
    new Intl.DateTimeFormat('en-US', {weekday: 'long'}).format(new Date().setDate(new Date().getDate() + i))
  )
}

// Assign HTML variables to variables


const upper = document.querySelector('.upper');
const apiError = document.querySelector('.api-error');
const searchDropCon = document.querySelector('.search-drop-con');
const searchDrop = document.querySelector('.search-drop');
const searchInput = document.querySelector('#searchInput');
const search = document.getElementById('search');
const searchInProgress = document.querySelector('.search-in-progress');
const retry = document.querySelector('.retry');
const forecast = document.querySelector('.forecast');
const loadCon = document.querySelector('.load-con');
const imperialSwitch = document.getElementById('imperial-switch');
const celsiusSwitch = document.getElementById('celsius-switch');
const fahrenheitSwitch = document.getElementById('fahrenheit-switch');
const kmSwitch = document.getElementById('km-switch');
const mphSwitch = document.getElementById('mph-switch');
const millimetersSwitch = document.getElementById('millimeters-switch');
const inchesSwitch = document.getElementById('inches-switch');

// Temporary data holder to pass information or data

let nameDetails;
let latDetails;
let lonDetails;

// Units selection onchange events 

imperialSwitch.addEventListener('change', ()=>{
  if (imperialSwitch.checked) {
    console.log(imperialSwitch.parentElement)
    imperialSwitch.previousElementSibling.textContent = 'Switch to Metric';
  }else{
    console.log('hi')
    imperialSwitch.previousElementSibling.textContent = 'Switch to Imperial';
  }

  if (forecast.style.display !== 'none') {
    getWeatherData(nameDetails, latDetails, lonDetails);
  }
});
celsiusSwitch.addEventListener('change', ()=>{
    fahrenheitSwitch.checked = false;
  if (forecast.style.display !== 'none') {
    getWeatherData(nameDetails, latDetails, lonDetails);
  }
});
fahrenheitSwitch.addEventListener('change', ()=>{
    celsiusSwitch.checked = false;
  if (forecast.style.display !== 'none') {
    getWeatherData(nameDetails, latDetails, lonDetails);
  }
});
kmSwitch.addEventListener('change', ()=>{
    mphSwitch.checked = false;
  if (forecast.style.display !== 'none') {
    getWeatherData(nameDetails, latDetails, lonDetails);
  }
});
mphSwitch.addEventListener('change', ()=>{
    kmSwitch.checked = false;
  if (forecast.style.display !== 'none') {
    getWeatherData(nameDetails, latDetails, lonDetails);
  }
});
millimetersSwitch.addEventListener('change', ()=>{
    inchesSwitch.checked = false;
  if (forecast.style.display !== 'none') {
    getWeatherData(nameDetails, latDetails, lonDetails);
  }
});
inchesSwitch.addEventListener('change', ()=>{
    millimetersSwitch.checked = false;
  if (forecast.style.display !== 'none') {
    getWeatherData(nameDetails, latDetails, lonDetails);
  }
});

// Input search onInput events and default state 

searchInput.value.trim() === '' ? search.disabled = true : search.disabled = false
searchInput.addEventListener('input', () => {
    if(searchInput.value.trim() === ''){
        search.disabled = true;
        searchDrop.innerHTML = '';
        searchDropCon.style.display = 'none';

    }else{
      search.disabled = false;
    }
})

// Search click event to get the location options

search.addEventListener('click', () => {
    getLocationData(searchInput.value.toLowerCase().trim());
    console.log(searchInput.value.toLowerCase().trim())
})

// Retry onclick event to call loading 

retry.addEventListener('click', () => {
   loading();
})

// Loading state 

function loading(){
  upper.style.display = 'block';
  apiError.style.display = 'none';
  forecast.style.display = 'none';
  loadCon.style.display = 'grid';

}

loading();


// Getting the location and location list from the API 

async function getLocationData(searchQuery) {

    // The API url 
    const url = `https://geocoding-api.open-meteo.com/v1/search?name=${searchQuery}&count=10&language=en&format=json`;

    // Setting the search in progeress container display state 
    searchInProgress.style.display = 'flex';

    // Fetching from the API url 
    try {
        const response = await fetch(url);

        const result = await response.json();
        if(!response.ok){
            throw new Error("an error occured");
        }
        console.log(result.results)
        const locationData = result.results;

        searchInProgress.style.display = 'none';
        searchDrop.innerHTML = '';

        locationData.map((location) => {
            searchDropCon.style.display = 'block';

            const searchOption = document.createElement('button');
            const country = document.createElement('p');
            const description = document.createElement('p');

            searchOption.classList.add('search-opt')
            country.classList.add('country');
            description.classList.add('description');

            country.textContent = `${location.name}, ${location.country}`;
            description.textContent = `${location.admin1}`;

            searchOption.addEventListener('click', () => {
                getWeatherData(country.textContent, location.latitude, location.longitude);
                searchDrop.innerHTML = '';
                searchDropCon.style.display = 'none';

                // Empty the Data holder

                nameDetails = '';
                latDetails = '';
                lonDetails = '';

                nameDetails = country.textContent;
                latDetails = location.latitude;
                lonDetails = location.longitude;
            })

            searchOption.appendChild(country);
            searchOption.appendChild(description);

            searchDrop.appendChild(searchOption);

        })


    } catch (error) {
        console.log('Failed to Fetch', error);
        upper.style.display = 'none';
        apiError.style.display = 'block';
        searchInput.value = '';
        search.disabled = true;
        searchInProgress.style.display = 'none';
        forecast.style.display = 'none';
        loadCon.style.display = 'none';
        
        
    }

    
}

// Weather code image objects

const weatherCodes = {
          0: 'sunny.webp',
          1: 'sunny.webp',
          2: 'partly-cloudy.webp',
          3: 'overcast.webp',
          45: 'fog.webp',
          48: 'fog.webp',
          51: 'drizzle.webp',
          53: 'drizzle.webp',
          55: 'drizzle.webp',
          56: 'drizzle.webp',
          57: 'drizzle.webp',
          61: 'rain.webp',
          63: 'rain.webp',
          65: 'rain.webp',
          66: 'rain.webp',
          67: 'rain.webp',
          71: 'snow.webp',
          73: 'snow.webp',
          75: 'snow.webp',
          77: 'snow.webp',
          80: 'rain.webp',
          81: 'rain.webp',
          82: 'rain.webp',
          85: 'snow.webp',
          86: 'snow.webp',
          95: 'storm.webp',
          96: 'storm.webp',
          99: 'storm.webp'
        };


        // Get and render the weather data information 

async function getWeatherData(name = 'Berlin', lat = 52.52, lon = 13.41) {


  // Default unit values 

  let temp = 'celsius';
  let speed = 'kmh';
  let precipitation = 'mm';

  // Switch to checked unit 

  if (imperialSwitch.checked) {
    temp = 'fahrenheit';
    speed = 'mph';
    precipitation = 'inch';
  }

  if (celsiusSwitch.checked) {
    temp = 'celsius';
  }

  if (fahrenheitSwitch.checked) {
    temp = 'fahrenheit';
  }

  if (kmSwitch.checked) {
    speed = 'km/h';
  }

  if (mphSwitch.checked) {
    speed = 'mph';
  }

  if (millimetersSwitch.checked) {
    precipitation = 'mm';
  }
  if (inchesSwitch.checked) {
    precipitation = 'inch';
  }

  // Weather data API url 

    const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&daily=weather_code,temperature_2m_max,temperature_2m_min,apparent_temperature_max,apparent_temperature_min,sunrise,sunset,daylight_duration,sunshine_duration,uv_index_max,uv_index_clear_sky_max,rain_sum,showers_sum,snowfall_sum,precipitation_sum,precipitation_hours,precipitation_probability_max,wind_speed_10m_max,wind_gusts_10m_max,wind_direction_10m_dominant,shortwave_radiation_sum,et0_fao_evapotranspiration&hourly=temperature_2m,relative_humidity_2m,dew_point_2m,apparent_temperature,precipitation_probability,precipitation,rain,showers,snowfall,snow_depth,weather_code,pressure_msl,surface_pressure,cloud_cover,cloud_cover_low,cloud_cover_mid,cloud_cover_high,visibility,evapotranspiration,et0_fao_evapotranspiration,vapour_pressure_deficit,wind_speed_10m,wind_speed_80m,wind_speed_120m,wind_speed_180m,wind_direction_10m,wind_direction_80m,wind_direction_120m,wind_direction_180m,wind_gusts_10m,temperature_80m,temperature_120m,temperature_180m&current=temperature_2m,relative_humidity_2m,apparent_temperature,is_day,precipitation,rain,showers,snowfall,weather_code,cloud_cover,pressure_msl,surface_pressure,wind_speed_10m,wind_direction_10m,wind_gusts_10m&wind_speed_unit=${speed}&temperature_unit=${temp}&precipitation_unit=${precipitation}`;

    // Get the API result 

    try {
      loading();
      const response = await fetch(url);
      const result = await response.json()
      const data = result;
      const {
            current,
            daily,
            hourly
        } = data;
        console.log(result);

        const {apparent_temperature,
               is_day, relative_humidity_2m,
               temperature_2m,
               weather_code,
               wind_speed_10m,
               precipitation} = current;

        const {temperature_2m_max,
               temperature_2m_min,
               weather_code: daily_weather_code} = daily;

        // const {temperature_2m: hourly_temperature_2m,
        //        time,
        //        weather_code: hourly_weather_code} = hourly;


        // Create and append the repective data 

        const leftBox = document.createElement('div');
        const rightBox = document.createElement('div');

        leftBox.classList.add('left-box');
        rightBox.classList.add('right-box');

        upper.style.display = 'block';
        apiError.style.display = 'none';
        loadCon.style.display = 'none';
        forecast.style.display = 'grid';

        forecast.innerHTML = '';

        leftBox.innerHTML = `
        <div class="display-forecast">
              <picture>
                <source media="(max-width: 544px)" srcset="./assets/images/bg-today-small.svg">
                <img src="assets/images/bg-today-large.svg" alt="" class="display-img">
              </picture>
              <div class="detail-nd-temp">
                <div class="details">
                  <p class="location">${name}</p>
                  <p class="location">
                    ${new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric', year: 'numeric' })}
                  </p>
                </div>
                <div class="temp-con">
                  <img src="assets/images/icon-${weatherCodes[weather_code]}" alt="">
                  <h2 class="temp">${temperature_2m}&deg;</h2>
                </div>
              </div>
            </div>

            <div class="feel-forecast">
              <div class="box">
                <p class="box-text">Feels Like</p>
                <p class="box-temp">${apparent_temperature}&deg;</p>
              </div>
              <div class="box">
                <p class="box-text">Humidity</p>
                <p class="box-temp">${relative_humidity_2m}%</p>
              </div>
              <div class="box">
                <p class="box-text">Wind</p>
                <p class="box-temp">${wind_speed_10m} km/h</p>
              </div>
              <div class="box">
                <p class="box-text">Prepicitation</p>
                <p class="box-temp">${precipitation} mm</p>
              </div>
            </div>
        `;

        const dailyForecast = document.createElement('div');
        const dailyTitle = document.createElement('h3');
        const dailyCon = document.createElement('div');

        dailyForecast.classList.add('daily-forecast');
        dailyCon.classList.add('daily-con');

        dailyTitle.textContent = 'Daily Forecast';

        for(let i = 0; i < 7; i++){
          console.log('hi');

          const box = document.createElement('div');
          const day = document.createElement('p');
          const img = document.createElement('img');
          const tempDaily = document.createElement('div');
          const maxTemp = document.createElement('span');
          const minTemp = document.createElement('span');

          box.classList.add('box');
          day.classList.add('day');
          tempDaily.classList.add('temp-daily');



          
          const date = new Date();
          const options = { weekday: 'short' };
          const dayName = new Intl.DateTimeFormat('en-US', options).format(new Date(date.getTime() + i * 24 * 60 * 60 * 1000));
          console.log(dayName);
          console.log(new Date(date.getTime() + i * 24));

          day.textContent = dayName;
          maxTemp.textContent = `${temperature_2m_max[i]}°`;
          minTemp.textContent = `${temperature_2m_min[i]}°`;
          img.src = `assets/images/icon-${weatherCodes[daily_weather_code[i]]}`;




          dailyCon.appendChild(box);
          box.appendChild(day);
          box.appendChild(img);
          box.appendChild(tempDaily);
          tempDaily.appendChild(maxTemp);
          tempDaily.appendChild(minTemp);


        }  
        
        hourlyForercast();





        forecast.appendChild(leftBox);
        forecast.appendChild(rightBox);
        leftBox.appendChild(dailyForecast)
        dailyForecast.appendChild(dailyTitle)
        dailyForecast.appendChild(dailyCon)

        return {
          hourly: hourly
        }
    } catch (error) {
        console.log('Error Fetching Data:',error);
        upper.style.display = 'none';
        apiError.style.display = 'block';
        searchInput.value = '';
        search.disabled = true;
        searchInProgress.style.display = 'none';
        forecast.innerHTML = '';
        loadCon.style.display = 'none';
        
    }


}

async function hourlyForercast(first = 0, last = 24){

  const hoursDay = document.querySelector('.drop').firstElementChild;
  const hoursDate = new Date().toLocaleDateString('en-US', { weekday: 'long'})
  hoursDay.textContent = hoursDate;

  const hourChecked = document.getElementById(`${hoursDate.toLowerCase}-switch`);
  hourChecked.checked = true;

  let min = first * last;
  let max = min + last - 1;

  // Might be error

  const {hourly} = await getWeatherData();

  const {temperature_2m: hourly_temperature_2m,
           time,
           weather_code: hourly_weather_code} = hourly;

  const hourlyForecast = document.createElement('div');
        hourlyForecast.classList.add('hourly-forecast');

        hourlyForecast.innerHTML = `
          <div class="hourly-title">
            <h4>Hourly forecast</h4>
            <label for="day-switch" class="drop-day">
              <input type="checkbox" name="day-switch" id="day-switch" class="day-switch">
              <div class="drop">
                Tuesday <img src="assets/images/icon-dropdown.svg" alt="" class="day-icon-dropdown">
              </div>
              <div class="day-drop-opt">

              </div>
            </label>
          </div>
        `;

        const dayDropOpt = document.querySelector('.day-drop-opt');

        for(let i = 0; i < 7; i++){
          let newDay = new Intl.DateTimeFormat('en-US', {weekday: 'long'}).format(new Date().setDate(new Date().getDate() + i));
          const attributeString = `${newDay.toLowerCase()}-switch`;

          console.log(newDay);

          // Hour elements 

          const dropHour = document.createElement('label');
          const dropHourTxt = document.createElement('div');
          const dropHourInput = document.createElement('input');

          // Set Label attributes

          dropHour.setAttribute('for', attributeString);
          dropHour.setAttribute('id', attributeString);

          // Set text 

          dropHourTxt.textContent = newDay;

          // Set input attributes

          dropHourInput.setAttribute('type', 'checkbox');
          dropHourInput.setAttribute('name', attributeString);
          dropHourInput.setAttribute('id', attributeString);
          dropHourInput.classList.add('weekdaySwitch')

          // Append all 

          dayDropOpt.appendChild(dropHour)
          dropHour.appendChild(dropHourTxt)
          dropHour.appendChild(dropHourInput)

          
        }

        const hourlyRightBox = document.querySelector('.right-box');
        hourlyRightBox.appendChild(hourlyForecast);

        const listCon = document.createElement('div');
        listCon.classList.add('list-con');
        hourlyForecast.appendChild(listCon);

        for(let j = min; j < (max + 1); j++){
          const hourBox = document.createElement('div');
          const detail = document.createElement('div');
          const hourImg = document.createElement('img');
          const hourTime = document.createElement('span');
          const tempBox = document.createElement('span');

          hourBox.classList.add('hour-box');
          detail.classList.add('detail');
          hourTime.classList.add('time');
          tempBox.classList.add('temp');

          const hour = new Date(time[j]).getHours();
          const period = hour >= 12 ? 'PM' : 'AM';
          const displayHour = hour % 12 || 12;
          hourTime.textContent = `${displayHour} ${period}`;   
          hourImg.src = `assets/images/icon-${weatherCodes[hourly_weather_code[j]]}`;
          tempBox.textContent = `${hourly_temperature_2m[j]}°`;

          listCon.appendChild(hourBox);
          hourBox.appendChild(detail);
          detail.appendChild(hourImg)
          detail.appendChild(hourTime);
          hourBox.appendChild(tempBox);
        }
}

const weekdaySwitch = document.querySelectorAll('.weekdaySwitch');

// Click event of each week day switch

weekdaySwitch.forEach((weekday,weekIndex) =>{
  weekday.addEventListener('change', ()=>{
    offWeekdaySwitch();
    weekday.checked = true;
    hourlyForercast(weekIndex, 24);
  })
})

// To off the checked state of each weekday

function offWeekdaySwitch(){
  weekdaySwitch.forEach( day =>{
    day.checked = false;
  })
}
