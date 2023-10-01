import axios from "axios";

const WeatherController = (lan) => {
    const URL_Weather = `https://api.openweathermap.org/data/2.5/weather?lat=${lan[0]}&lon=${lan[1]}&appid=9064425e555f34ea3eb606de9d910cb0`

    const fetchData = axios.post(URL_Weather).then(res => res.data as WeatherModel).catch(err => err)

    return fetchData
}

export default WeatherController