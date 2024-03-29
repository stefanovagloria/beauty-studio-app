import ProceduresLink from "./ProceduresLink/ProceduresLink";
import ArticlesLink from "./ArticlesLink/ArticlesLink";

import styles from "./Navigation.module.css";

const Navigation = () => {
  return (
    <>
      <div className={styles.dropdownLinks}>
        <ArticlesLink />
        <ProceduresLink />
      </div>
    </>
  );
};

export default Navigation;
