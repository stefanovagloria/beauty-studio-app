import styles from "./Home.module.scss";
import image from "../../../assets/studioNefertiti.jpg";
import procedure1 from "../../../assets/procedure1.jpg";
import procedure2 from "../../../assets/procedure2.jpg";
import procedure3 from "../../../assets/procedure3.jpg";
import procedure4 from "../../../assets/procedure4.jpg";

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { CardActionArea, CardActions } from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import { styled } from '@mui/material/styles';

const procedures = [
  {
    _id:1,
    name: "Маникюр & Педикюр",
    photoUrl: procedure1,
    description:
      "Студио Nefertiti ще се погрижи за Вашия маникюр и педикюр. Професионалната грижа за ръцете и краката е важна част от визията на всеки клиент.",
  },
  {
    _id:2,
    name: "Козметика лице и тяло",
    photoUrl: procedure2,
    description:
      "Козметични процедури и терапии - грижи за сияйно лице, шия, деколте и тяло. Комплексната грижа за здравата и стегна кожа на лицето и тялото е гаранция за самочувствие.",
  },
  {
    _id:3,
    name: "Оформяне на тяло с NuEra Tight",
    photoUrl: procedure3,
    description:
      "NuEra Tight е неинвазивна радиочестотна терапия с контролирана температура, която ефективно намалява мастната тъкан, стяга кожата и изглажда бръчките. ",
  },
  {
    _id:4,
    name: "Лазерна епилация Жени | Мъже",
    photoUrl: procedure4,
    description:
      "Студио Nefertiti разполага с два лазерни апарата за лазерна епилация. Diolaze XL и GentleLase PRO с което предоставя по-голяма гъвкавост и ефективност на услугата.",
  },
];


const StyledCheckIcon = styled(CheckIcon)(({ theme }) => ({
  fontSize: 50,
  color: "green",
  padding: "5px 20px",
  border: "1px solid green",
  borderRadius: "20em",
  transition: "all 0.3s ease",
}));

const StyledCard = styled(Card)(({ theme }) => ({
  transition: "all 0.3s ease",
  "&:hover": {
    [`& .MuiSvgIcon-root`]: {  // Targeting the icon within the card on hover
      color: "white",
      backgroundColor: "green",
      borderColor: "white",
    }
  }
}));

const Home = () => {
  return (
    <div>
      <div className={styles.imageContainer}>
        <img src={image} className={styles.homeImg} alt="Studio Nefertiti" />
        <div className={styles.overlay}>
          <h1 className={styles.overlayText}>Beauty Studio Nefertiti</h1>
          <p  className={styles.overlayAddress}>гр.Бургас | кв.Възраждане | ул.Гладстон 35 |</p>
        </div>
      </div>

      <div className={styles.proceduresSection}>
        <h1>Процедури</h1>
        <p className={styles.description}>
          Красотата изисква експертна грижа и внимание. Вашата красота е нашето
          призвание.
        </p>
        <div className={styles.proceduresContainer}>
          {procedures.map((p) => (
            <Card key={p._id}>
              <CardActionArea>
                <CardMedia
                  component="img"
                  height="140"
                  image={p.photoUrl}
                  className={styles.cardImg}
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {p.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {p.description}
                  </Typography>
                </CardContent>
              </CardActionArea>
              <CardActions>
                <button className={styles.cardBtn}>
                  <span >Запази час </span>
                  <span className={styles.arrow}>
                    <ArrowForwardIcon />
                  </span>
                </button>
              </CardActions>
            </Card>
          ))}
        </div>
      </div>

      <div className={styles.aboutSection}>
        <h1>При нас ще получите</h1>

        <div className={styles.aboutCards}>
          <StyledCard>
            <CardActionArea>
              <CardContent>
                <StyledCheckIcon />
                <Typography gutterBottom variant="h5" component="div" sx={{ fontWeight: "bold"}}>
                  Качествено обслужване
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  В студио за красота Nefertiti работи екип от
                  висококвалифицирани козметици и маникюристи, които са обучени
                  и готови да осигурят необходимата консултация и да Ви
                  предложат подходящите процедури, съобразени с типа и
                  състоянието на Вашите нокти и кожа.
                </Typography>
              </CardContent>
            </CardActionArea>
          </StyledCard>
          <StyledCard>
            <CardActionArea>
              <CardContent>
              <StyledCheckIcon  />
                <Typography gutterBottom variant="h5" component="div" sx={{ fontWeight: "bold"}}>
                  Висок клас апарати в естетиката
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Ние осигуряваме комплексни решения за всякакъв тип кожни
                  проблеми и работим с най-съвременните технологии и апаратура
                  за хидратация, подмладяване, стягане, регенерация, почистване
                  на кожата и лазерна епилация, които следват световните
                  тенденции в козметиката и дерматологията.
                </Typography>
              </CardContent>
            </CardActionArea>
          </StyledCard>
          <StyledCard>
            <CardActionArea>
              <CardContent>
              <StyledCheckIcon  />
                <Typography gutterBottom variant="h5" component="div" sx={{ fontWeight: "bold"}}>
                  Внимание към детайлите
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Преди всяка процедура в естетичен център Nefertiti ние правим
                  анализ на типа и състоянието на кожата. Така определяме
                  точните проблеми, върху чието коригиране ще работим и
                  съставяме индивидуална програма, съответстваща на специфичните
                  нужди.
                </Typography>
              </CardContent>
            </CardActionArea>
          </StyledCard>
        </div>
      </div>
    </div>
  );
};

export default Home;
