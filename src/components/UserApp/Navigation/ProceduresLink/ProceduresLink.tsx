import { useEffect, useState } from "react";
import axios from "axios";

import MenuLink from "../MenuLink/MenuLink";

const ProceduresLink = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const getCategories = async () => {
      const response = await axios.get(
        "http://localhost:4000/categories"
      );
      setCategories(response.data);
    };

    getCategories();
  }, []);

  return (
    <>
      {categories && (
        <MenuLink subLinks={categories} name={"Процедури"} url={"/categories"} />
      )}
    </>
  );
};

export default ProceduresLink;
