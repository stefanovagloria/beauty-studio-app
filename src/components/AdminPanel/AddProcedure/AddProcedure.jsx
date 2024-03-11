import styles from "./AddProcedure.module.css";

import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import useMediaQuery from "@mui/material/useMediaQuery";

const AddProcedure = ({ show, hide, category }) => {
  return (
    <Dialog
      fullScreen={fullScreen}
      open={show}
      onClose={hide}
      aria-labelledby="responsive-dialog-title"
    >
      <DialogContent>
          <label>Име на процедура:</label>
          <input/>
          <div>
          {category}
          </div>
          <div>
            Снимки на процедурата:
            <div>
            <Button>+</Button>
            </div>
          </div>
          <label>Цена:</label>
          <input/>
          <label>Промоционална цена:</label>
          <input/>
          <label>Характеристики:</label>
          <input/>
          <label>Описание на продукт:</label>
          <input/>
          <div>
            Сходни продукти:
            <div>
            <Button>+</Button>
            </div>
          </div>
          <DialogActions>
            <Button autoFocus onClick={hide}>
              Отказ
            </Button>
            <Button onClick={hide} autoFocus>
              Запази процедура
            </Button>
          </DialogActions>

      </DialogContent>
    </Dialog>
  );
};

export default AddProcedure;
