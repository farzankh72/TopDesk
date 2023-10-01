import {FC, useCallback, useEffect, useState} from "react";
import WeatherController from "@/pages/api/api/WeatherController";

interface WeatherProps {
    lat?: number
    lon?: number
    enable?: boolean | true
}

const UseGetCurrentWeather = ({lon, lat, enable}: { WeatherProps: WeatherProps }) => {
    const [data, setData] = useState<WeatherModel>()
    const [error, setError] = useState<boolean>(false)
    const [loading, setLoading] = useState<boolean>(false)

    const fetching = useCallback(async ({weatherProps}: { weatherProps: WeatherProps }) => {

        try {
            setLoading(true)

            const weatherService = await WeatherController({
                WeatherControllerProps: {
                    lat: weatherProps?.lat || 0,
                    lon: weatherProps?.lon || 0,
                }
            })
            setData(weatherService.data as WeatherModel)
        } catch (e) {
            setError(e)
        } finally {
            setLoading(false)
        }

    }, [])

    useEffect(() => {
        if (enable) {
            fetching({weatherProps: {lat, lon}}).then()
        }
    }, [])

    return {data, loading, error, fetching}
}

export default UseGetCurrentWeather