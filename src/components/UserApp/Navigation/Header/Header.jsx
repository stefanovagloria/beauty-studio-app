import { Link } from "react-router-dom";

import styles from "./Header.module.scss";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

const Header = () => {
  return (
    <div className={styles.container}>
      <div>Понеделник до Неделя : 09:00-19:00ч. БЕЗ ПОЧИВЕН ДЕН</div>
      <div>studio.nefertiti1@gmail.com</div>
      <div> 0894 791 917</div>
      <div>
        <Link to='/shopping-cart'>
          <ShoppingCartIcon className={styles.icon}/>
        </Link>
      </div>
    </div>
  );
};

export default Header;
