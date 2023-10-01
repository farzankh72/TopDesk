import {useMemo, useState} from "react";

import RandomHint from "@/container/RandomHint";
import WeatherController from "@/pages/api/api/WeatherController";

import Card from "@mui/material/Card";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import Snackbar from "@mui/material/Snackbar";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import DialogTitle from "@mui/material/DialogTitle";

interface countryItemProps {
    countryItem: CountryModel
}

const CountryItem = ({countryItemProps}: { countryItemProps: countryItemProps }) => {

    const [hintDialog, setHintDialog] = useState<boolean>(false)
    const [noneDistanceSnack, setNoneDistanceSnack] = useState<boolean>(false)

    const userSelected: Array<WeatherModel> = []
    const fallTime = new Set<number>()

    function onClickAddToCountry(latlng: Array<number>) {
        const weatherService = WeatherController(latlng)

        if (userSelected?.length < 4) {
            weatherService.then(data => {
                if (data.main.sea_level != undefined) {
                    userSelected.push(data)
                } else {
                    console.log('sorry, select another')
                    setNoneDistanceSnack(true)
                }
            })
        } else {
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

            let counter: number = 0
            fallTime.forEach(time => {
                counter += time
            })

            setHintDialog(true)
            console.log('avg of falling speed', counter / 4)

        }
    }

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setNoneDistanceSnack(false);
    };

    const SnackbarDisplay = useMemo(() => {
        return (
            <Snackbar
                onClose={handleClose}
                autoHideDuration={2000}
                open={noneDistanceSnack}
                message="This Country Has no data about Distance of Sea!"
            />
        )
    }, [noneDistanceSnack])

    const DialogHintDisplay = useMemo(() => {
        return (
            <Dialog open={hintDialog} onBackdropClick={() => setHintDialog(false)} maxWidth={'xs'}>
                <DialogTitle>
                    <Typography>
                        Hint
                    </Typography>
                </DialogTitle>
                {
                    RandomHint()
                }
            </Dialog>
        )
    }, [hintDialog])

    return (
        <Card sx={{width: '210px', height: '240px'}}>
            <CardMedia sx={{height: '90px'}} component='img' image={countryItemProps.countryItem.flags.png}/>

            <CardContent sx={{height: '65px'}}>
                <Typography variant='subtitle2' fontWeight='bolder'>
                    Country: {countryItemProps.countryItem.name.common}
                </Typography>
                <Typography variant={'caption'} fontWeight='bold'>
                    Capital City: {countryItemProps.countryItem.capital}
                </Typography>
            </CardContent>
            <CardActions>
                <Button size='small' variant={'contained'}
                        onClick={() => onClickAddToCountry(countryItemProps.countryItem.latlng)}>
                    yes
                </Button>
            </CardActions>
            {SnackbarDisplay}
            {DialogHintDisplay}
        </Card>
    )
}

export default CountryItem