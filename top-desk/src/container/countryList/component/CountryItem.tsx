import {useContext, useEffect, useMemo, useState} from "react";

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
import {useGeoContext} from "@/pages";
import {ButtonBase} from "@mui/material";

interface countryItemProps {
    fetchCountry: () => void
    countryItem: CountryModel
}

let userSelected: Array<WeatherModel> = []

const CountryItem = ({countryItemProps}: { countryItemProps: countryItemProps }) => {
    const {addToSelectedGeo, clearData, scoreHandler} = useGeoContext()
    const [fallTime, setFallTime] = useState<number>(0)
    const [resultDialogDisplay, setResultDialogDisplay] = useState<boolean>(false)
    const [noneDistanceSnack, setNoneDistanceSnack] = useState<boolean>(false)

    const [addedItem, setAddedItem] = useState<boolean>(false)

    const {data, loading, fetching} = useGetCurrentWeather({enable: false})

    useEffect(() => {
        if (data?.main && data.main.sea_level != undefined) {
            if (addToSelectedGeo) {
                addToSelectedGeo(data)
            }
            userSelected.push(data)
        } else if (data) {
            setNoneDistanceSnack(true)
        }

        if (userSelected.length === 3) {
            const tempFallTime = CalculateDistance(userSelected);
            if (scoreHandler) {
                scoreHandler(tempFallTime)
            }
            setFallTime(tempFallTime)
            setResultDialogDisplay(true)
        }
    }, [data])

    function onClickAddToCountry(latlng: Array<number>) {
        setAddedItem(true)
        fetching({weatherProps: {lat: latlng[0], lon: latlng[1]}}).then()
    }

    const handleCloseDialog = () => {
        userSelected = []
        setResultDialogDisplay(false)
        countryItemProps.fetchCountry()
        if (clearData) {
            clearData(true)
        }
    }

    return (
        <ButtonBase disabled={resultDialogDisplay || loading}
                    onClick={() => onClickAddToCountry(countryItemProps.countryItem.latlng)}>
            <Card sx={{
                width: '210px',
                height: '190px',
                filter: addedItem ? 'grayscale(100%)' : 'none',
                opacity: !noneDistanceSnack ? '100%' : '30%'
            }}>
                <CardMedia sx={{height: '90px'}} component='img' image={countryItemProps.countryItem.flags.png}/>
                <CardContent sx={{height: '65px'}}>
                    <Typography variant='subtitle2' fontWeight='bolder'>
                        Country: {countryItemProps.countryItem.name.common}
                    </Typography>
                    <Typography variant={'caption'} fontWeight='bold'>
                        Capital City: {countryItemProps.countryItem.capital}
                    </Typography>
                </CardContent>
                <ResultDialog
                    fallTime={fallTime}
                    onCloseDialog={handleCloseDialog}
                    resultDialogDisplay={resultDialogDisplay}
                />
            </Card>
        </ButtonBase>
    )
}

export default CountryItem