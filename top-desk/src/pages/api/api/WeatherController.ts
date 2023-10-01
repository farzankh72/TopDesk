import axios from "axios";

interface WeatherControllerProps {
    lon: number
    lat: number
}


const WeatherController = async (weatherProps: { WeatherControllerProps: WeatherControllerProps }) => {
    const URL_Weather = `https://api.openweathermap.org/data/2.5/weather?lon=${weatherProps.WeatherControllerProps.lon}&lat=${weatherProps.WeatherControllerProps.lat}&APPID=9064425e555f34ea3eb606de9d910cb0`
    return await axios.post(URL_Weather)
}

export default WeatherController