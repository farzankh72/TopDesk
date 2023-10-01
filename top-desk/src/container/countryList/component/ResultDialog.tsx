import {useEffect} from "react";

import RandomHint from "@/container/RandomHint";

import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import Typography from "@mui/material/Typography";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";

interface DialogProps {
    fallTime: number
    hintDialog: boolean
    onCloseDialog: () => void
}

const ResultDialog = ({hintDialog, fallTime, onCloseDialog}: DialogProps) => {
    useEffect(() => {
        const localData = localStorage.getItem('score');
        if (localData) {
            if (+localData < fallTime) {
                localStorage.setItem('score', fallTime.toString())
            }
        } else {
            localStorage.setItem('score', fallTime.toString())
        }
    }, [fallTime])

    if (hintDialog) {
        return (
            <Dialog open={hintDialog} maxWidth={'xs'}>
                <DialogTitle>
                    <Typography>
                        Hint
                    </Typography>
                </DialogTitle>
                <DialogContent>
                    <Stack spacing={2}>
                        {RandomHint()}
                        <Typography variant={'body2'}>
                            The time you hitting the ground is : {fallTime}
                        </Typography>
                    </Stack>
                </DialogContent>
                <DialogActions>
                    <Button onClick={onCloseDialog}>
                        Restart
                    </Button>
                </DialogActions>
            </Dialog>
        )
    }
}

export default ResultDialog