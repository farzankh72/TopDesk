import {useGeoContext} from "@/pages";

import List from "@mui/material/List";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import ListItem from "@mui/material/ListItem";
import {Box, ButtonGroup} from "@mui/material";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import ListItemText from "@mui/material/ListItemText";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemButton from "@mui/material/ListItemButton";

const SideBar = () => {
    const {selectedGeoCountry, difficultyHandler} = useGeoContext()


    return (
        <Container maxWidth={'xl'}>
            <Container sx={{backgroundColor: '#F5F5F5', borderRadius: '6px'}}>
                <Stack spacing={2}>
                    <Stack direction={"row"} justifyContent={"space-between"} pt={2}>
                        <Stack>
                            <Typography variant={'h6'} fontWeight={'bolder'}>Difficulty</Typography>
                            <ButtonGroup size={"small"} variant={'contained'} color={'primary'}>
                                <Button onClick={() => difficultyHandler && difficultyHandler(5)}>Hard</Button>
                                <Button onClick={() => difficultyHandler && difficultyHandler(3)}>Normal</Button>
                            </ButtonGroup>
                        </Stack>
                    </Stack>
                    <Typography variant={'h6'} fontWeight={'bolder'}>Chosen Item</Typography>
                    <List>
                        {
                            selectedGeoCountry?.map(item =>
                                <ListItem disablePadding key={`country-${item.main.sea_level}-${item.name}`}>
                                    <ListItemButton>
                                        <ListItemIcon>
                                            {item.main.sea_level}
                                        </ListItemIcon>
                                        <ListItemText
                                            primary={`${item.name} | ${item.weather[0].description.includes('rain') ? 'Rainy' : 'no-rainy'}`}/>
                                    </ListItemButton>
                                </ListItem>
                            )
                        }
                    </List>
                    <Box bgcolor='#0073e6' borderRadius='6px' p={1} color='#F5F5F5'>
                        <Typography variant={'subtitle1'} fontWeight={'bolder'}>The formal is:</Typography>
                        <Box>
                            <Typography variant={'subtitle2'} fontWeight={"bolder"}>
                                (2 * EASL ) / (9.8 + WS - RIC )

                            </Typography>
                            <List disablePadding>
                                <ListItem>
                                    <ListItemText disableTypography sx={{fontSize: '12px'}}
                                                  primary={'*EASL : Elevation Above Sea Level'}/>
                                </ListItem>
                                <ListItem>
                                    <ListItemText disableTypography sx={{fontSize: '12px'}}
                                                  primary={'*WS : Wind Speed'}/>
                                </ListItem>
                                <ListItem>
                                    <ListItemText disableTypography sx={{fontSize: '12px'}} primary={'*Pi = 9.8'}/>
                                </ListItem>
                                <ListItem>
                                    <ListItemText disableTypography sx={{fontSize: '12px'}}
                                                  primary={'*RIC : Rainfall Impact Coefficient = 0.5'}/>
                                </ListItem>
                            </List>
                        </Box>
                    </Box>
                </Stack>
            </Container>
        </Container>
    )
}

export default SideBar