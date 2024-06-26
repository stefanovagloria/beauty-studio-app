import styles from "./SelectItem.module.scss";
import image from "../../../../assets/productsImage.png";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";

import { styled } from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import axios from "axios";
import { useEffect, useState } from "react";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const SelectItem = ({
  type,
  show,
  hide,
  addToRelatedItems,
  selectedRelateditemsIds,
}) => {
  const [items, setitems] = useState([]);
  const [input, setInput] = useState("");
  const [filtereditems, setFiltereditems] = useState([]);

  useEffect(() => {
    const getitems = async () => {
      console.log(type)
      let result = {};
      if (type === "products") {
        const response = await axios.get("http://localhost:4000/products");
        result = response.data;
      } else {
        const response = await axios.get("http://localhost:4000/procedures");
        result = response.data;
      }

      setitems(() => result);
      setFiltereditems(() => result);
    };

    getitems();
  }, []);

  useEffect(() => {
    const updateditems = items.filter((p) =>
      p.name.toLowerCase().includes(input.toLowerCase())
    );
    setFiltereditems(updateditems);
  }, [input]);

  const onInputChange = (e) => {
    setInput(e.target.value);
  };

  const onItemSelect = (product) => {
    addToRelatedItems(product);
  };

  return (
    <Dialog
      open={show}
      onClose={hide}
      aria-labelledby="responsive-dialog-title"
      PaperProps={{
        style: {
          position: "absolute",
          right: 0,
          margin: 0,
          width: "400px", // Custom width
          maxWidth: "400px", // Custom max-width
          height: "430px",
          maxHeight: "430px",
        },
      }}
    >
      <DialogContent>
        <div className={styles.inputContainer}>
          <input
            type="text"
            onChange={onInputChange}
            className={styles.input}
          />
        </div>

        <Box sx={{ width: "100%" }}>
          <Grid
            container
            rowSpacing={2}
            columnSpacing={{ xs: 2, sm: 3, md: 4 }}
          >
            {filtereditems.map((p) => (
              <Grid item xs={12} sm={6}>
                <Item
                  key={p.id}
                  onClick={() => onItemSelect(p)}
                  className={`${styles.item}  ${
                    selectedRelateditemsIds !== undefined &&
                    selectedRelateditemsIds.includes(p._id)
                      ? styles.selectedItem
                      : ""
                  }`}
                >
                  <img className={styles.img} src={image} alt={p.name} />
                  <p>{p.name}</p>
                </Item>
              </Grid>
            ))}
          </Grid>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default SelectItem;
