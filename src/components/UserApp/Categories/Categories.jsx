import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const Categories = () => {
  const { id } = useParams();
  const [procedures, setProcedures] = useState([]);

  useEffect(() => {
    const getProcedures = async () => {
      const response = await axios.get(
        `http://localhost:4000/procedures/${id}`
      );
      setProcedures(response.data);
    };

    getProcedures();
  }, [id]);


  return <>
  <h1>Categories</h1>
  {procedures && procedures.map((p) => (
    <p key={p._id}>{p.name}</p>
  ))}
  </>;
};

export default Categories;
