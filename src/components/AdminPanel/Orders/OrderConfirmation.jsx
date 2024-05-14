import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogActions from "@mui/material/DialogActions";

const OrderConfirmation = ({ openModal, closeModalHandler, updateOrderStatus }) => {
  const handleClose = () => {
    closeModalHandler();
  };

  return (
    <>
      <Dialog
        open={openModal}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Изпращане на поръчката?"}
        </DialogTitle>
        <DialogActions>
          <Button onClick={handleClose}>Откажи</Button>
          <Button onClick={updateOrderStatus} autoFocus>
            Потвърди изпращане
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default OrderConfirmation;
