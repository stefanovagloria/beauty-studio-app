import { useParams } from "react-router-dom";

const BookAppointment = () => {
  const { id } = useParams();
    return <h1>Запази час</h1>;
};

export default BookAppointment;
