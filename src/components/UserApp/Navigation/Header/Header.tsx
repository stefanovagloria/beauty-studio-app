import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

import styles from "./Header.module.scss";
import { styled } from "@mui/material/styles";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Badge from "@mui/material/Badge";
import IconButton from "@mui/material/IconButton";
import AccessTimeOutlinedIcon from "@mui/icons-material/AccessTimeOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import PhoneInTalkOutlinedIcon from "@mui/icons-material/PhoneInTalkOutlined";
import { RootState } from "../../../../store";

const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    right: -15,
    top: 13,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: "0 4px",
  },
}));

const Header = () => {
  const itemsCount = useSelector((state: RootState) => state.cart.totalItems);

  return (
    <div className={styles.container}>
      <div>
        <span>
          <AccessTimeOutlinedIcon></AccessTimeOutlinedIcon>
        </span>
        <span>09:00-19:00ч. БЕЗ ПОЧИВЕН ДЕН</span>
      </div>
      <div>
        <span>
          <EmailOutlinedIcon></EmailOutlinedIcon>
        </span>
        studio.nefertiti1@gmail.com
      </div>
      <div>
        <span>
          <PhoneInTalkOutlinedIcon></PhoneInTalkOutlinedIcon>
        </span>
        0894 791 917
      </div>
      <div>
        <Link to="/shopping-cart">
          <IconButton aria-label="cart">
            <StyledBadge badgeContent={itemsCount} color="secondary">
              <ShoppingCartIcon sx={{ color: "white" }} />
            </StyledBadge>
          </IconButton>
        </Link>
      </div>
    </div>
  );
};

export default Header;
