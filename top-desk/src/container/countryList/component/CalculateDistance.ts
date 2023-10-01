const CalculateDistance = (userSelected: Array<WeatherModel>) => {
    let counter: number = 0
    const fallTime = new Set<number>()

    userSelected.map((weather) => {
        const pi: number = 9.8
        let rainFall: boolean = false
        const distanceFromSea: number = weather.main.sea_level
        const windSpeed: number = weather.wind.speed

        if (weather.weather) {
            weather.weather.map(item => {
                if (item.description.includes('rain')) {
                    rainFall = true
                }
            })
        }

        const evaluate = 2 * (Math.sqrt((2 * distanceFromSea) / (pi + windSpeed - (rainFall ? 0.5 : 0))))
        fallTime.add(evaluate)
    })

    fallTime.forEach(time => {
        counter += time
    })

    return Math.floor(counter / 4)
}

export default CalculateDistance