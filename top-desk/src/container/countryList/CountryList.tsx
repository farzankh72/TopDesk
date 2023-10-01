import {useEffect, useState} from "react";

import CountryController from "@/pages/api/api/CountryController";
import CountryItem from "@/container/countryList/component/CountryItem";

import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";

const CountryList = () => {

    const [countries, setCountries] = useState<Array<CountryModel>>()

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

    if (countries?.length) {
        return (
            <Container maxWidth={'lg'}
                       sx={{backgroundColor: 'blue', pt: '16px', pb: '16px', borderRadius: '6px'}}>
                <Grid container spacing={2} justifyContent={"center"}>
                    {
                        countries?.map((country, index) =>
                            <Grid item key={'index-country' + country.latlng[0] + index}>
                                <CountryItem countryItemProps={{countryItem: country}}/>
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