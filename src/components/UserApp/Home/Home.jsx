import styles from "./Home.module.scss";
import image from "../../../assets/studioNefertiti.jpg";

const Home = () => {
  return (
    <div>
      <div>
        <img src={image} className={styles.img} />
      </div>

      <div>
        <h1>Процедури</h1>
        <p>Красотата изисква експертна грижа и внимание. Вашата красота е нашето призвание.</p>
      </div>
    </div>
  );
};

export default Home;
