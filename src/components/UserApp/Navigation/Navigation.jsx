import ProceduresLink from "./ProceduresLink/ProceduresLink";
import ArticlesLink from "./ArticlesLink/ArticlesLink";

import styles from "./Navigation.module.css";
import ShopLink from "./ShopLink/ShopLink";
import MenuLink from "./MenuLink/MenuLink";
import Header from "./Header/Header";

const Navigation = () => {
  return (
    <>
      <Header />
      <div className={styles.dropdownLinks}>
        <MenuLink name={"Начало"} url="/" />
        <ArticlesLink />
        <ProceduresLink />
        <ShopLink />
        <MenuLink name={"Промоции"} url="/promotions" />
        <MenuLink name={"Галерия"} url="/gallery" />
        <MenuLink name={"За нас"} url="/about-us" />
      </div>
    </>
  );
};

export default Navigation;
