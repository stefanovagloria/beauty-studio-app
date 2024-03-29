import ProceduresLink from "./ProceduresLink/ProceduresLink";
import ArticlesLink from "./ArticlesLink/ArticlesLink";

import styles from "./Navigation.module.css";
import ShopLink from "./ShopLink/ShopLink";

const Navigation = () => {
  return (
    <>
      <div className={styles.dropdownLinks}>
        <ArticlesLink />
        <ProceduresLink />
        <ShopLink />
      </div>
    </>
  );
};

export default Navigation;
