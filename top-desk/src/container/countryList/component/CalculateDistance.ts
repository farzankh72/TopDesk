const CalculateDistance = (userSelected: Array<WeatherModel>) => {
    let counter: number = 0

    const fallTime = new Set<number>()

    userSelected.map((weather) => {
        const pi: number = 9.8
        const distanceFromSea: number = weather.main.sea_level
        const windSpeed: number = weather.wind.speed
        let rainFall: boolean = false
        if (weather.weather) {
            weather.weather.map(item => {
                if (item.description.includes('raid')) {
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

    return counter
}

export default CalculateDistance