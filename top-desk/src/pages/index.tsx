import Header from "@/container/Header";
import CountryList from "@/container/countryList/CountryList";

import {Stack} from "@mui/material";
import Grid from "@mui/material/Grid";
import SideBar from "@/container/SideBar";
import {createContext, useContext, useState} from "react";

interface ContextProps {
    score?: number
    clearData?: (enable: boolean) => void
    scoreHandler?: (item: number) => void
    selectedGeoCountry?: Array<WeatherModel>
    addToSelectedGeo?: (items: WeatherModel) => void
}

const ContextGeo = createContext<ContextProps>({})

function Home() {
    const [selectedGeoCountry, setSelectedGeoCountry] = useState<Array<WeatherModel>>([]);

    const [score, setScore] = useState<number>(0)

    const scoreHandler = (item: number) => {
        setScore(item)
    }

    const addToSelectedGeo = (item: WeatherModel) => {
        setSelectedGeoCountry(prevSelectedGeoCountry => [...prevSelectedGeoCountry, item]);
    };

    const clearData = (enable: boolean) => {
        if (enable) {
            setSelectedGeoCountry([])
        }
    }

    return (
        <ContextGeo.Provider value={{selectedGeoCountry, addToSelectedGeo, clearData, score, scoreHandler}}>
            <Stack direction={"column"} spacing={2} alignItems={"center"} width='100%'>
                <Header/>
                <Grid container rowSpacing={2}>
                    <Grid item xs={9}>
                        <CountryList/>
                    </Grid>
                    <Grid item xs={3}>
                        <SideBar/>
                    </Grid>
                </Grid>
            </Stack>
        </ContextGeo.Provider>
    )
}

export function useGeoContext() {
    return useContext(ContextGeo)
}

export default Home