import {useGeoContext} from "@/pages";

import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import ListItemText from "@mui/material/ListItemText";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemButton from "@mui/material/ListItemButton";
import {Box} from "@mui/material";

const SideBar = () => {
    const {selectedGeoCountry} = useGeoContext()
    return (
        <Container maxWidth={'xl'} sx={{borderRadius: '6px'}}>
            <Container sx={{backgroundColor: '#F5F5F5'}}>
                <Typography variant={'h6'} fontWeight={'bolder'}>Chosen Item</Typography>
                <List>
                    {
                        selectedGeoCountry?.map(item =>
                            <ListItem disablePadding key={`country-${item.main.sea_level}-${item.name}`}>
                                <ListItemButton>
                                    <ListItemIcon>
                                        {item.main.sea_level}
                                    </ListItemIcon>
                                    <ListItemText primary={<Typography
                                        variant={'subtitle2'}>{item.name} | {item.weather[0].description.includes('rain') ? 'Rainy' : 'no-rainy'} </Typography>}/>
                                </ListItemButton>
                            </ListItem>
                        )
                    }
                </List>

                <Box bgcolor='#0073e6' borderRadius='6px' p={1} color='#F5F5F5'>
                    <Typography variant={'h6'} fontWeight={'bolder'}>The formal is:</Typography>
                    <Box>
                        <Typography variant={'caption'}>
                            (2 * Distance country from sea ) / (9.8 + wind speed - rain )

                        </Typography>
                    </Box>
                </Box>
            </Container>
        </Container>
    )
}

export default SideBar