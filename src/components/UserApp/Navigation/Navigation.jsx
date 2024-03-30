import ProceduresLink from "./ProceduresLink/ProceduresLink";
import ArticlesLink from "./ArticlesLink/ArticlesLink";

import styles from "./Navigation.module.css";
import ShopLink from "./ShopLink/ShopLink";
import MenuLink from "./MenuLink/MenuLink";
import Header from "./Header/Header";

const Navigation = () => {
  return (
    <>
    <Header/>
      <div className={styles.dropdownLinks}>
        <ArticlesLink />
        <ProceduresLink />
        <ShopLink />
        <MenuLink name={'Промоции'}/>
        <MenuLink name={'Галерия'}/>
        <MenuLink name={'За нас'}/>
      </div>
    </>
  );
};

export default Navigation;
