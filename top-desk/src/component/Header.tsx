import {Container, Typography} from "@mui/material";

const Header = ()=>{
    return(
        <Container maxWidth={"md"} sx={{backgroundColor: 'blue', pt: '16px', pb: '16px', borderRadius: '6px'}}>
            <Typography>
                بازی کن تا دیرتر به کف زمین بخوری
            </Typography>
            <Typography>
                فقط، همه چیو در نظر بگیر
            </Typography>
        </Container>
    )
}

export default Header