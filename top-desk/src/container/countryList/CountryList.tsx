import CountryItem from "@/container/countryList/component/CountryItem";

import useGetCountry from "@/pages/api/hooks/useGetCountry";

import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";

const CountryList = () => {

    const {loading, error, data, fetchData} = useGetCountry()

    if (loading) {
        return (<Typography>
            Loading ...
        </Typography>)
    }

    if (error) {
        return (
            <Typography>
                error...
            </Typography>
        )
    }

    if (data) {
        return (
            <Container maxWidth={'xl'}
                       sx={{backgroundColor: '#F5F5F5', pt: '16px', pb: '16px', borderRadius: '6px'}}>
                <Grid container spacing={2} justifyContent={"center"}>
                    {
                        data?.map((country, index) =>
                            <Grid item key={'index-country' + country.latlng[0] + index}>
                                <CountryItem countryItemProps={{countryItem: country, fetchCountry: fetchData}}/>
                            </Grid>
                        )
                    }
                </Grid>
            </Container>
        )
    }
}

export default CountryList