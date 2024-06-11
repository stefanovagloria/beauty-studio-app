import styles from './Home.module.scss';
import image from "../../../assets/studioNefertiti.jpg";

const Home = () =>{
    return(
        <img src={image} className={styles.img}/>
    )
}

export default Home;