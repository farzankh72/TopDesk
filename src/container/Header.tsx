import {useEffect, useState} from "react";

import {useGeoContext} from "@/pages";

import Stack from "@mui/material/Stack";
import {Box, Container, Typography} from "@mui/material";

const Header = () => {
    const {score, selectedGeoCountry} = useGeoContext()
    const [scoreData, setScoreData] = useState<string>()

    useEffect(() => {
        const hasScore = localStorage.getItem('score')
        if (hasScore) {
            setScoreData(hasScore)
        }
    }, [score, selectedGeoCountry])

    return (
        <Container maxWidth={"xl"}
                   sx={{backgroundColor: '#0073e6', pt: '16px', pb: '16px', borderRadius: '6px', color: '#F5F5F5'}}>
            <Stack direction={"row"} justifyContent={"space-between"}>
                <Box>
                    <Typography variant={'h4'} fontWeight={'bolder'}>
                        Be like a yo-yo,
                    </Typography>
                    <Typography variant={"body1"} fontWeight={"bold"}>
                        Aim to reach your lowest point fashionably late!
                    </Typography>
                </Box>
                <Box alignSelf={"end"} display={scoreData ? 'inherit' : "none"}>
                    <Typography variant={"body2"}>
                        Higher Score: {scoreData} s
                    </Typography>
                </Box>
            </Stack>
        </Container>
    )
}

export default Header