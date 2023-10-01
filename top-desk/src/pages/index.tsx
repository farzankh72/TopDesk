import Header from "@/component/Header";
import CountryList from "@/component/CountryList";

import {Stack} from "@mui/material";

function Home() {
    return (
        <Stack direction={"column"} spacing={2} alignItems={"center"} width='100%'>
            <Header/>
            <CountryList/>
        </Stack>
    )
}

export default Home