import {useEffect, useState} from "react";

import RandomHint from "@/container/countryList/component/RandomHint";

import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import Typography from "@mui/material/Typography";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import {Box} from "@mui/material";
import useGetRandomJoke from "@/pages/api/hooks/useGetRandomJoke";

interface DialogProps {
    fallTime: number
    hintDialog: boolean
    onCloseDialog: () => void
}

const ResultDialog = ({hintDialog, fallTime, onCloseDialog}: DialogProps) => {
    const [hasReward, setHasReward] = useState<boolean>(false)

    useEffect(() => {
        if (fallTime) {
            const localData = localStorage.getItem('score');
            if (localData) {
                if (+localData < fallTime) {
                    setHasReward(true)
                    localStorage.setItem('score', fallTime.toString())
                }
            } else {
                setHasReward(true)
                localStorage.setItem('score', fallTime.toString())
            }
        }
    }, [fallTime])


    const {loading, error, data, fetchData} = useGetRandomJoke({enable: false})

    function onRewardDisplay() {
        fetchData().then()
    }

    if (hintDialog) {
        return (
            <Dialog open={hintDialog} maxWidth={'xs'}>
                <DialogTitle>
                    <Typography variant={'h6'} fontWeight={"bolder"}>
                        Result
                    </Typography>
                </DialogTitle>
                <DialogContent>
                    <Stack spacing={2}>
                        <Box bgcolor={'#0073e6'} borderRadius='6px'>
                            {RandomHint()}
                        </Box>
                        <Stack direction={"row"} alignItems={"end"}>
                            <Typography variant={'body2'}>
                                The time you hitting the ground is :
                            </Typography>
                            <Typography variant={'h4'} fontWeight={"bolder"}>
                                {fallTime}
                            </Typography>
                            <Typography variant={'body2'}>
                                s
                            </Typography>
                        </Stack>
                        <Box bgcolor={'#0073e6'} borderRadius='6px' p={2} display={hasReward ? 'inherit' : 'none'}>
                            <Stack direction={"row"}>
                                <Typography variant={'body2'} fontWeight={"bolder"} color={'#F5F5F5'}>
                                    <Typography variant={'h6'} fontWeight={'bolder'}>Reward is Joke :</Typography>
                                    {loading ? 'Loading...' : error ? 'error...' : data?.value}
                                </Typography>
                            </Stack>
                        </Box>
                    </Stack>
                </DialogContent>
                <DialogActions>
                    <Stack direction={'row'} justifyContent={"space-between"} width='100%'>
                        <Button
                            size={"small"}
                            color={'secondary'}
                            disabled={!hasReward}
                            variant={'contained'}
                            onClick={onRewardDisplay}>
                            {loading ? 'Loading...' : 'Reward'}
                        </Button>
                        <Button variant={'contained'} onClick={onCloseDialog} size={"small"}>
                            Restart
                        </Button>
                    </Stack>
                </DialogActions>
            </Dialog>
        )
    }
}

export default ResultDialog