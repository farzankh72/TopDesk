import {Box, Container, Typography} from "@mui/material";
import {useEffect, useState} from "react";
import Stack from "@mui/material/Stack";

const Header = () => {
    const [score, setScore] = useState<string>()
    useEffect(() => {
        const hasScore = localStorage.getItem('score')
        if (hasScore) {
            setScore(hasScore)
        }
    }, [])
    return (
        <Container maxWidth={"xl"}
                   sx={{backgroundColor: '#0073e6', pt: '16px', pb: '16px', borderRadius: '6px', color: '#F5F5F5'}}>
            <Stack direction={"row"} justifyContent={"space-between"}>
                <Box>
                    <Typography variant={'h3'} fontWeight={'bolder'}>
                        Be like a yo-yo,
                    </Typography>
                    <Typography variant={"body1"} fontWeight={"bold"}>
                        Aim to reach your lowest point fashionably late!
                    </Typography>
                </Box>
                <Box alignSelf={"end"} display={score ? 'inherit' : "none"}>
                    <Typography variant={"body2"}>
                        Your greatest time that you can fly is : {score} second
                    </Typography>
                </Box>
            </Stack>
        </Container>
    )
}

export default Header