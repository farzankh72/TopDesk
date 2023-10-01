import {useEffect} from "react";

import RandomHint from "@/container/RandomHint";

import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import Typography from "@mui/material/Typography";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import {Box} from "@mui/material";

interface DialogProps {
    fallTime: number
    hintDialog: boolean
    onCloseDialog: () => void
}

const ResultDialog = ({hintDialog, fallTime, onCloseDialog}: DialogProps) => {
    useEffect(() => {
        if (fallTime) {
            const localData = localStorage.getItem('score');
            if (localData) {
                if (+localData < fallTime) {
                    localStorage.setItem('score', fallTime.toString())
                }
            } else {
                localStorage.setItem('score', fallTime.toString())
            }
        }
    }, [fallTime])

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
                    </Stack>
                </DialogContent>
                <DialogActions>
                    <Button variant={'contained'} onClick={onCloseDialog} size={"small"}>
                        Restart
                    </Button>
                </DialogActions>
            </Dialog>
        )
    }
}

export default ResultDialog