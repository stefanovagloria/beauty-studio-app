import styles from "./About.module.scss";
import image from "./../../../assets/aboutUs.png"

const About = () =>{
    return(
        <>
        <img src={image} className={styles.image}/>
        </>
    )
}

export default About;