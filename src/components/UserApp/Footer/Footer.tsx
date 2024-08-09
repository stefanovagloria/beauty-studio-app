import styles from "./Footer.module.scss";
import image from "../../../assets/1.jpg";

const articles = [
  "Лазерна епилация с диоден лазер DiolaseXL",
  "Лазерна епилация с александритен лазер GentleLase Pro-U",
  "Проблемни нокти",
  "Целулит и отслабващи процедури",
  "Стрии",
];

const Footer = () => {
  return (
    <div className={styles.container}>
      <div className={styles.aboutUs}>
        <h3>За нас</h3>
        <p>
          Екипът от професионалисти на <b>Beauty Studio Nefertiti</b> ще Ви
          помогне в грижата за Вашата перфектна визия. Предлагаме услуги на
          изключително високо ниво, които няма да Ви оставят незабелязани.
          Дългогодишният опит, подбраната козметика и високият клас апаратура, с
          които разполагаме Ви гарантират най-добрите резултати.
        </p>
      </div>
      <div className={styles.articles}>
        <h3>Последни публикации</h3>
        <ul>
          {articles.map((a, index) => (
            <li key={index}>{a}</li>
          ))}
        </ul>
      </div>
      <div className={styles.gallery}>
        <h3>Галерия</h3>
        <div>
          <img src={image} className={styles.img} />
          <img src={image} className={styles.img} />
          <img src={image} className={styles.img} />
          <img src={image} className={styles.img} />
          <img src={image} className={styles.img} />
          <img src={image} className={styles.img} />
        </div>
      </div>
      <div className={styles.contacts}>
        <h3>Контакти</h3>
        <div>
          Работно време: Понеделник-Неделя 
          09:00-19:00ч. 
          Без почивен ден
          studio.nefertiti1@gmail.com 0894 791 917
        </div>
      </div>
    </div>
  );
};

export default Footer;
