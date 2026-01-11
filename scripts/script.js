

const unitOpts = document.querySelectorAll('.nav .units .drop-opt label');
const unitSwitch = document.querySelector('.unit-dropdown');

console.log(unitSwitch);

unitOpts.forEach(opts => {
    opts.addEventListener('click', () => {
        unitSwitch.checked = false;
    })
})





const search = document.getElementById('search');
search.addEventListener('click', () => {
    getLocationData(searchInput.value.toLowerCase().trim());
    console.log(searchInput.value.toLowerCase().trim())
})


const searchDropCon = document.querySelector('.search-drop-con');
const searchDrop = document.querySelector('.search-drop');
const searchInput = document.querySelector('#searchInput');

searchInput.addEventListener('input', () => {
    if(searchInput.value.trim() === ''){
        searchDrop.innerHTML = '';
        searchDropCon.style.display = 'none';

    }
})

async function getLocationData(searchQuery) {

    const url = `https://geocoding-api.open-meteo.com/v1/search?name=${searchQuery}&count=10&language=en&format=json`;

    try {
        const response = await fetch(url);

        const result = await response.json();
        if(!response.ok){
            throw new Error("an error occured");
        }
        console.log(result.results)
        const locationData = result.results;

        
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

            searchOption.appendChild(country);
            searchOption.appendChild(description);

            searchDrop.appendChild(searchOption);

        })


    } catch (error) {
        console.log(error);
    }

    
}


async function getWeatherData() {

    const url = `https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.41&daily=weather_code,temperature_2m_max,temperature_2m_min,apparent_temperature_max,apparent_temperature_min,
    sunrise,sunset,daylight_duration,sunshine_duration,uv_index_max,uv_index_clear_sky_max,rain_sum,showers_sum,snowfall_sum,precipitation_sum,precipitation_hours,precipitation_probability_max,wind_speed_10m_max,wind_gusts_10m_max,
    wind_direction_10m_dominant,shortwave_radiation_sum,et0_fao_evapotranspiration&hourly=temperature_2m,relative_humidity_2m,dew_point_2m,apparent_temperature,precipitation_probability,precipitation,rain,showers,snowfall,snow_depth,weather_code,pressure_msl,surface_pressure,cloud_cover,cloud_cover_low,
    cloud_cover_mid,cloud_cover_high,visibility,evapotranspiration,et0_fao_evapotranspiration,vapour_pressure_deficit,wind_speed_10m,wind_speed_80m,wind_speed_120m,wind_speed_180m,wind_direction_10m,wind_direction_80m,wind_direction_120m,
    wind_direction_180m,wind_gusts_10m,temperature_80m,temperature_120m,temperature_180m&current=temperature_2m,relative_humidity_2m,apparent_temperature,is_day,precipitation,rain,showers,snowfall,weather_code,cloud_cover,pressure_msl,surface_pressure,
    wind_speed_10m,wind_direction_10m,wind_gusts_10m`;


}