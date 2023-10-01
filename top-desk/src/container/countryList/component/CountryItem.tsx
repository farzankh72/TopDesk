import {useEffect, useMemo, useState} from "react";

import ResultDialog from "@/container/countryList/component/ResultDialog";
import CalculateDistance from "@/container/countryList/component/CalculateDistance";

import useGetCurrentWeather from "@/pages/api/hooks/useGetCurrentWeather";

import Card from "@mui/material/Card";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";

interface countryItemProps {
    fetchCountry: () => void
    countryItem: CountryModel
}

let userSelected: Array<WeatherModel> = []

const CountryItem = ({countryItemProps}: { countryItemProps: countryItemProps }) => {

    const [fallTime, setFallTime] = useState<number>(0)
    const [hintDialog, setHintDialog] = useState<boolean>(false)
    const [noneDistanceSnack, setNoneDistanceSnack] = useState<boolean>(false)

    const [addedItem, setAddedItem] = useState<boolean>(false)

    const {data, loading, error, fetching} = useGetCurrentWeather({enable: false})

    useEffect(() => {
        if (userSelected.length === 3) {
            setFallTime(CalculateDistance(userSelected))
            setHintDialog(true)
        } else {
            if (data?.main && data.main.sea_level != undefined) {
                userSelected.push(data)
            } else if (data) {
                setNoneDistanceSnack(true)
            }
        }
    }, [data])

    function onClickAddToCountry(latlng: Array<number>) {
        setAddedItem(true)
        fetching({weatherProps: {lat: latlng[0], lon: latlng[1]}}).then()
    }

    const handleCloseDialog = () => {
        userSelected = []
        setHintDialog(false)
        countryItemProps.fetchCountry()
    }

    return (
        <Card sx={{width: '210px', height: '240px', filter: addedItem ? 'grayscale(100%)' : 'none'}}>
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
                <Button disabled={loading || error || addedItem} size='small' variant={'contained'}
                        onClick={() => onClickAddToCountry(countryItemProps.countryItem.latlng)}>
                    {loading ? '...loading' : error ? 'error...' : noneDistanceSnack ? 'none-dis' : 'Add'}
                </Button>
            </CardActions>
            <ResultDialog
                fallTime={fallTime}
                hintDialog={hintDialog}
                onCloseDialog={handleCloseDialog}
            />
        </Card>
    )
}

export default CountryItem