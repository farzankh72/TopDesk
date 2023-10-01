import {Typography} from "@mui/material";

const hintData: Array<string> = [
    'Pick a single country, all your choices land in one, easy-peasy global fun!',
    'More time equals a bigger win, like ordering extra fries for victory!',
    'If a gust of wind blows or rain decides to join the party, it might just spice up the landing!',
]

const RandomHint = () => {
    const randomIndex = Math.floor(Math.random() * hintData.length)

    return (
        <>

            <Typography variant={'body2'} fontWeight={"bolder"} p={2} color={'#F5F5F5'}>
                <Typography variant={'h6'} fontWeight={'bolder'}>Hint is :</Typography>
                {hintData[randomIndex]}
            </Typography>
        </>
    )
}

export default RandomHint