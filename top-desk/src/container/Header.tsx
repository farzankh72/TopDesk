import {Container, Typography} from "@mui/material";

const Header = () => {
    return (
        <Container maxWidth={"md"} sx={{backgroundColor: 'blue', pt: '16px', pb: '16px', borderRadius: '6px'}}>
            <Typography variant={'h3'} fontWeight={'bolder'}>
                Be like a yo-yo,
            </Typography>
            <Typography variant={"h6"} fontWeight={"bold"}>
                Aim to reach your lowest point fashionably late!
            </Typography>
        </Container>
    )
}

export default Header