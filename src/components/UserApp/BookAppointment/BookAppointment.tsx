import { useParams } from "react-router-dom";

import styles from "./BookAppointment.module.scss";

const BookAppointment = () => {
  const { id } = useParams();
    return <h1>Запази час</h1>;
};

export default BookAppointment;
