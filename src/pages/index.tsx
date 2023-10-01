import {createContext, useContext, useState} from "react";

import Header from "@/container/Header";
import CountryList from "@/container/countryList/CountryList";

import {Stack} from "@mui/material";
import Grid from "@mui/material/Grid";
import SideBar from "@/container/SideBar";

interface ContextProps {
    score?: number
    difficulty?: number
    clearData?: (enable: boolean) => void
    scoreHandler?: (item: number) => void
    selectedGeoCountry?: Array<WeatherModel>
    difficultyHandler?: (item: number) => void
    addToSelectedGeo?: (items: WeatherModel) => void
}

const ContextGeo = createContext<ContextProps>({})


function Home() {
    const [difficulty, setDifficulty] = useState<number>(3);

    const [selectedGeoCountry, setSelectedGeoCountry] = useState<Array<WeatherModel>>([]);

    const [score, setScore] = useState<number>(0)

    const difficultyHandler = (item: number) => {
        setDifficulty(item)
    }

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
        <ContextGeo.Provider value={{
            score,
            clearData,
            difficulty,
            scoreHandler,
            addToSelectedGeo,
            difficultyHandler,
            selectedGeoCountry,
        }}>
            <Stack direction={"column"} spacing={2} alignItems={"center"} width='100%'>
                <Header/>
                <Grid container rowSpacing={2}>
                    <Grid item xs={12} sm={12} md={12} lg={3} xl={3}>
                        <SideBar/>
                    </Grid>
                    <Grid item xs={12} sm={12} md={12} lg={9} xl={9}>
                        <CountryList/>
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