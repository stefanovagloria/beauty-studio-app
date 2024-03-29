import { useEffect, useState } from "react";
import axios from "axios";

import MenuLink from "../MenuLink/MenuLink";

const ProceduresLink = () => {
  const [categories, setCategories] = useState({});

  useEffect(() => {
    const getCategories = async () => {
      const response = await axios.get(
        "http://localhost:4000/admin/categories"
      );
      setCategories(response.data);
      console.log(response.data)
    };

    getCategories();
  }, []);

  return <>{categories && <MenuLink subLinks={categories} name={'Процедури'}/>}</>;
};

export default ProceduresLink;
