import { useEffect, useState } from "react";

import axios from "axios";

import CategoriesList from "./CategoriesList/CategoriesList";
import AddProcedure from "./AddProcedure/AddProcedure";
import ProceduresList from "./ProceduresList/ProceduresList";

import styles from "./Procedures.module.scss";
import { Card } from "@mui/material";
import { Category } from "../../../models/category";
import { Procedure } from "../../../models/procedure";
import LinearLoader from "../../Loader/LinearLoader";

interface UpdateProceduresParams {
  type: "add" | "edit";
  procedure: Procedure;
}

const Procedures = () => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [selectedCategory, setSelectedCategory] = useState<Category | "">("");
  const [selectedProcedure, setSelectedProcedure] = useState<Procedure | {}>(
    {}
  );
  const [procedures, setProcedures] = useState<Procedure[]>([]);
  const [showLoader, setShowLoader] = useState<boolean>(false);

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

  const handleSelectCategory = (category: Category) => {
    setSelectedCategory(category);
  };

  const setProcedure = (procedure: Procedure) => {
    console.log(procedure);
    setSelectedProcedure(procedure);
    setShowModal(true);
  };

  const updateProcedures = ({ type, procedure }: UpdateProceduresParams) => {
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

  const showLoaderHandler = (value: boolean) => {
    setShowLoader(value);
  };

  return (
    <>
      <CategoriesList type="procedures" selectCategory={handleSelectCategory} />

      {selectedCategory && (
        <>
          <h1>{selectedCategory.name}</h1>
          <div className={styles.mainContainer}>
            <div className={styles.addContainer}>
              <Card className={styles.btnContainer} onClick={handleClickOpen}>
                +
              </Card>
            </div>
            {showLoader && <LinearLoader />}
            {!showLoader && (
              <>
                <ProceduresList
                  procedures={procedures}
                  setProcedure={setProcedure}
                />
                <AddProcedure
                  show={showModal}
                  hide={handleClose}
                  category={selectedCategory}
                  selectedProcedure={selectedProcedure}
                  updateProcedures={updateProcedures}
                  showLoaderHandler={showLoaderHandler}
                />
              </>
            )}
          </div>
        </>
      )}
    </>
  );
};

export default Procedures;
