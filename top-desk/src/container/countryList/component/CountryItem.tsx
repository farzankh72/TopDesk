import {useEffect, useMemo, useState} from "react";

import RandomHint from "@/container/RandomHint";
import CalculateDistance from "@/container/countryList/component/CalculateDistance";

import useGetCurrentWeather from "@/pages/api/hooks/UseGetCurrentWeather";

import Card from "@mui/material/Card";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import Snackbar from "@mui/material/Snackbar";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import {DialogActions, Stack} from "@mui/material";

interface countryItemProps {
    fetchCountry: () => void
    countryItem: CountryModel
}

let userSelected: Array<WeatherModel> = []

const CountryItem = ({countryItemProps}: { countryItemProps: countryItemProps }) => {

    const [hintDialog, setHintDialog] = useState<boolean>(false)
    const [noneDistanceSnack, setNoneDistanceSnack] = useState<boolean>(false)
    const [fallTime, setFallTime] = useState<number>(0)

    const {data, loading, error, fetching} = useGetCurrentWeather({WeatherProps: {enable: false}})

    useEffect(() => {
        if (userSelected?.length < 4) {
            if (data?.main && data.main.sea_level != undefined) {
                userSelected.push(data)
            } else if (data) {
                setNoneDistanceSnack(true)
            }
        } else {
            setFallTime(CalculateDistance(userSelected))
            setHintDialog(true)
        }
    }, [data])

    function onClickAddToCountry(latlng: Array<number>) {
        fetching({weatherProps: {lat: latlng[0], lon: latlng[1]}}).then()
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
            <Dialog open={hintDialog} maxWidth={'xs'}>
                <DialogTitle>
                    <Typography>
                        Hint
                    </Typography>
                </DialogTitle>
                <DialogContent>
                    <Stack spacing={2}>
                        {RandomHint()}
                        <Typography variant={'subtitle2'}>
                            The time you hitting the ground is : {fallTime}
                        </Typography>
                    </Stack>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => {
                        userSelected = []
                        setHintDialog(false)
                        countryItemProps.fetchCountry()
                    }}>
                        Restart
                    </Button>
                </DialogActions>
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
                <Button disabled={loading || error} size='small' variant={'contained'}
                        onClick={() => onClickAddToCountry(countryItemProps.countryItem.latlng)}>
                    {loading ? '...loading' : error ? 'error...' : 'Click'}
                </Button>
            </CardActions>
            {SnackbarDisplay}
            {DialogHintDisplay}
        </Card>
    )
}

export default CountryItem