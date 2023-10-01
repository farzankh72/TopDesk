import {
    Box,
    Button,
    Card,
    CardActions,
    CardContent,
    CardMedia,
    Container,
    Grid,
    Stack,
    Typography
} from "@mui/material";
import {useEffect, useState} from "react";
import CountryController from "@/pages/api/CountryController";
import WeatherController from "@/pages/api/WeatherController";

function Home() {

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

    function onClickAddToCountry(latlng: Array<number>) {
        const a = WeatherController(latlng)
        a.then(data => {
            console.log(data)
        })
    }

    if (countries?.length > 0) {
        return (
            <Stack direction={"column"} spacing={2} alignItems={"center"} width='100%'>
                <Container maxWidth={"md"} sx={{backgroundColor: 'blue', pt: '16px', pb: '16px', borderRadius: '6px'}}>
                    <Typography>
                        بازی کن تا دیرتر به کف زمین بخوری
                    </Typography>
                    <Typography>
                        فقط، همه چیو در نظر بگیر
                    </Typography>
                </Container>
                <Container maxWidth={'lg'}
                           sx={{backgroundColor: 'blue', pt: '16px', pb: '16px', borderRadius: '6px'}}>
                    <Grid container spacing={2} justifyContent={"center"}>
                        {
                            countries?.map(country =>
                                <Grid item>
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
                                            <Button size='small' variant={'contained'}
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
            </Stack>
        )
    } else {
        return (
            <></>
        )
    }
}

export default Home