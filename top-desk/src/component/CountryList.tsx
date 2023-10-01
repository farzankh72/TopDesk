import {useEffect, useState} from "react";

import CountryController from "@/pages/api/api/CountryController";
import WeatherController from "@/pages/api/api/WeatherController";

import {Button, Card, CardActions, CardContent, CardMedia, Container, Grid, Typography} from "@mui/material";

const CountryList = () => {
    const userSelected: Array<WeatherModel> = []
    const fallTime = new Set()

    const [countries, setCountries] = useState<Array<CountryModel>>()

    const [doneChoosing, setDoneChoosing] = useState<boolean>(false)

    useEffect(() => {
        const a = CountryController()


        a.then((item) => {
            const randomItems: Array<CountryModel> = []
            const hasIndex = new Set()

            while (randomItems.length < 20) {
                const randomIndex = Math.floor(Math.random() * item.length)
                if (!hasIndex.has(randomIndex)) {
                    hasIndex.add(randomIndex)
                    randomItems.push(item[randomIndex])
                }
            }
            return randomItems
        }).then((res) => {
            setCountries(res)
        })
    }, [])

    function onClickAddToCountry(latlng: Array<number>) {
        const a = WeatherController(latlng)
        if (userSelected.length < 4) {
            a.then(data => {
                if (data.main.sea_level != undefined) {
                    userSelected.push(data)
                } else {
                    console.log('sorry, select another')
                }
            })
        } else {
            setDoneChoosing(true)
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

                const r = Math.sqrt((2 * distanceFromSea) / (pi + windSpeed - (rainFall ? 0.5 : 0)))
                fallTime.add(r)
            })

            let counter: number = 0
            fallTime.forEach(time => {
                counter += time
            })

            console.log('avg of falling speed', counter / 4)

        }
    }

    if (countries?.length) {
        return (
            <Container maxWidth={'lg'}
                       sx={{backgroundColor: 'blue', pt: '16px', pb: '16px', borderRadius: '6px'}}>
                <Grid container spacing={2} justifyContent={"center"}>
                    {
                        countries?.map((country, index) =>
                            <Grid item key={'index-country' + country.latlng[0] + index}>
                                <Card sx={{width: '210px', height: '240px'}}>
                                    <CardMedia sx={{height: '90px'}} component='img' image={country.flags.png}/>

                                    <CardContent sx={{height: '65px'}}>
                                        <Typography variant='subtitle2' fontWeight='bolder'>
                                            Country: {country.name.common}
                                        </Typography>
                                        <Typography variant={'caption'} fontWeight='bold'>
                                            Capital City: {country.capital}
                                        </Typography>
                                    </CardContent>
                                    <CardActions>
                                        <Button disabled={doneChoosing} size='small' variant={'contained'}
                                                onClick={() => onClickAddToCountry(country.latlng)}>
                                            yes
                                        </Button>
                                    </CardActions>
                                </Card>
                            </Grid>
                        )
                    }
                </Grid>
            </Container>
        )
    } else {
        return (
            <Typography>
                No Country Here!
            </Typography>
        )
    }
}

export default CountryList