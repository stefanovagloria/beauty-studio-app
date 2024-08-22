import ProceduresLink from "./ProceduresLink/ProceduresLink";
import ArticlesLink from "./ArticlesLink/ArticlesLink";

import styles from "./Navigation.module.scss";
import ShopLink from "./ShopLink/ShopLink";
import MenuLink from "./MenuLink/MenuLink";
import Header from "./Header/Header";
import { useState } from "react";

const Navigation = () => {
  const [currentlyActiveUrl, setCurrentlyActiveUrl] = useState<string>("");

  const changeActiveUrl = (url: string) => {
    setCurrentlyActiveUrl(url);
  };
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
