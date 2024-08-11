import { useEffect, useState } from "react";

import axios from "axios";

import CategoriesList from "./CategoriesList/CategoriesList";
import AddProcedure from "./AddProcedure/AddProcedure";
import ProceduresList from "./ProceduresList/ProceduresList";

import styles from "./Procedures.module.scss";
import { Card } from "@mui/material";

const Procedures = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedProcedure, setSelectedProcedure] = useState({});
  const [procedures, setProcedures] = useState([]);

  useEffect(() => {
    if (selectedCategory && selectedCategory._id) {
      const getProceduresByCategory = async () => {
        const response = await axios.get(
          `http://localhost:4000/procedures/${selectedCategory._id}`
        );
        setProcedures(response.data);
      };

      getProceduresByCategory();
    }
  }, [selectedCategory]);

  const handleClickOpen = () => {
    setShowModal(true);
  };

  const handleClose = () => {
    setShowModal(false);
    setSelectedProcedure({});
  };

  const handleSelectCategory = (category) => {
    setSelectedCategory(category);
  };

  const setProcedure = (procedure) => {
    console.log(procedure);
    setSelectedProcedure(procedure);
    setShowModal(true);
  };

  const updateProcedures = ({ type, procedure }) => {
    if (type === "add") {
      setProcedures((values) => [...values, procedure]);
    } else if (type === "edit") {
      const procedureIndex = procedures.findIndex(
        (p) => p._id === procedure._id
      );

      const updatedProcedures = procedures;
      updatedProcedures[procedureIndex] = procedure;
      setProcedures(updatedProcedures);
    }
  };

  return (
    <>
      <CategoriesList type="procedures" selectCategory={handleSelectCategory} />

      {selectedCategory && (
        <>
          <h1>Категория - {selectedCategory.name}</h1>
          <div className={styles.mainContainer}>
            <div className={styles.addContainer}>
              <Card className={styles.btnContainer} onClick={handleClickOpen}>
                +
              </Card>
            </div>
            <ProceduresList
              procedures={procedures}
              setProcedure={setProcedure}
            />
          </div>
          <AddProcedure
            show={showModal}
            hide={handleClose}
            category={selectedCategory}
            selectedProcedure={selectedProcedure}
            updateProcedures={updateProcedures}
          />
        </>
      )}
    </>
  );
};

export default Procedures;
