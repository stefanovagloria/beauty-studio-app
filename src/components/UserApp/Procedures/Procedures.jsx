import { useEffect, useState } from "react";
import axios from "axios";
import styles from "./Procedures.module.css";

const Procedures = () => {
  const [procedures, setProcedures] = useState([]);

  useEffect(() => {
    const getProcedures = async () => {
      const response = await axios.get("http://localhost:4000/procedures");
      setProcedures(response.data);
    };

    getProcedures();
  }, []);

  return (
    <>
      <h1>Procedures</h1>
      <div>
        {procedures && procedures.map((p) => (
            <p>{p.name}</p>
        ))}
      </div>
    </>
  );
};

export default Procedures;
