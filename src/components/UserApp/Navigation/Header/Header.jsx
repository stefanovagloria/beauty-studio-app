import { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";

import styles from "./Header.module.scss";
import { styled } from "@mui/material/styles";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Badge from "@mui/material/Badge";
import IconButton from "@mui/material/IconButton";
import { CartContext } from "../../../../context/CartContext";

const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    right: -15,
    top: 13,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: "0 4px",
  },
}));

const Header = () => {
  const [itemsCount, setItemsCount] =  useState(0);
  const {items} = useContext(CartContext);

  useEffect(()=>{
    setItemsCount(items.length)
  }, [items])
  return (
    <div className={styles.container}>
      <div>Понеделник до Неделя : 09:00-19:00ч. БЕЗ ПОЧИВЕН ДЕН</div>
      <div>studio.nefertiti1@gmail.com</div>
      <div> 0894 791 917</div>
      <div>
        <Link to="/shopping-cart">
          <IconButton aria-label="cart">
            <StyledBadge badgeContent={itemsCount} color="secondary">
              <ShoppingCartIcon />
            </StyledBadge>
          </IconButton>
        </Link>
      </div>
    </div>
  );
};

export default Header;
