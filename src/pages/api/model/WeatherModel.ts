interface WeatherModel {
    name: string
    rain: {
        '1h': number
    }
    weather: Array<{
        description: string
    }>
    wind: {
        speed: number
    }
    main: {
        sea_level: number
    }
}