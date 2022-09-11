import React, {useState} from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

const ConfirmAlert = (props) => {

    const {action, alertOpen, closeAlert, handleCheckClick, handleDeleteClick} = props

    const [open, setOpen] = useState(alertOpen);

    const handleClickOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
      closeAlert()
    };
 
    const handleCheck = () => {
        setOpen(false);
      closeAlert();
      handleCheckClick();
    }

    const handleDelete = () => {
        setOpen(false);
      closeAlert();
      handleDeleteClick();
    }

    return (
      <div>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            {action==='check'&&"Do you really want to set the location as visited?"}
            {action==='delete'&&"Do you really want to delete this record?"}
          </DialogTitle>

          <DialogActions sx={{display:'flex', justifyContent:"center"}}>
            {action==='check'&&(<>
                        <Button variant="outlined" color='info' onClick={handleClose}>NO</Button>
            <Button variant="contained" color='primary' onClick={handleCheck} autoFocus>
              YES
            </Button>
            </>)}
            {action==='delete'&&(<>
                        <Button variant="outlined" color='info' onClick={handleClose}>NO</Button>
            <Button variant="contained" color='error' onClick={handleDelete} autoFocus>
              Yes, DELETE
            </Button>
            </>)}

          </DialogActions>
        </Dialog>
      </div>
    );
}

export default ConfirmAlert