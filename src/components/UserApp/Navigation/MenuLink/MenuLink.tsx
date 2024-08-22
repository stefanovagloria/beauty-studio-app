import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { setActiveUrl } from "../../../../store/activeUrlSlice";

import Button from "@mui/material/Button";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import Grow from "@mui/material/Grow";
import Paper from "@mui/material/Paper";
import Popper from "@mui/material/Popper";
import MenuItem from "@mui/material/MenuItem";
import MenuList from "@mui/material/MenuList";
import ArrowDropDownSharpIcon from "@mui/icons-material/ArrowDropDownSharp";
import { RootState } from "../../../../store";

interface SubLink {
  _id: number;
  name: string;
  url?: string;
}

interface MenuLinkProps {
  subLinks?: SubLink[];
  name?: string;
  url?: string;
}

const MenuLink: React.FC<MenuLinkProps> = ({ subLinks, name, url }) => {
  const [open, setOpen] = useState(false);
  const anchorRef = useRef<HTMLButtonElement | null>(null);
  const dispatch = useDispatch();
  const currentlyActiveUrl = useSelector(
    (state: RootState) => state.activeUrl.url
  );

  const handleToggle = (url: string) => {
    setOpen((prevOpen) => !prevOpen);
    dispatch(setActiveUrl(url));
  };

  const handleClose = (event: MouseEvent | TouchEvent) => {
    if (anchorRef.current && anchorRef.current.contains(event.target as Node)) {
      return;
    }
    setOpen(false);
  };

  function handleListKeyDown(event: React.KeyboardEvent<HTMLUListElement>) {
    if (event.key === "Tab") {
      event.preventDefault();
      setOpen(false);
    } else if (event.key === "Escape") {
      setOpen(false);
    }
  }

  const prevOpen = useRef(open);
  useEffect(() => {
    if (prevOpen.current === true && open === false) {
      if (anchorRef.current) {
        anchorRef.current.focus();
      }
    }
    prevOpen.current = open;
  }, [open]);

  return (
    <div>
      <Button
        ref={anchorRef}
        id="composition-button"
        aria-controls={open ? "composition-menu" : undefined}
        aria-expanded={open ? "true" : undefined}
        aria-haspopup="true"
        sx={{
          color: "black",
          fontWeight: currentlyActiveUrl === url ? "bold" : "",
          fontSize: "1em",
        }}
        onClick={() => handleToggle(url || "")}
      >
        {subLinks ? (
          <>
            {name}
            <ArrowDropDownSharpIcon />
          </>
        ) : (
          <Link
            to={url ?? "#"}
            style={{
              color: "black",
              fontWeight: currentlyActiveUrl === url ? "bold" : "",
              fontSize: "1em",
            }}
          >
            {name}
          </Link>
        )}
      </Button>

      {subLinks && (
        <Popper
          open={open}
          anchorEl={anchorRef.current}
          role={undefined}
          placement="bottom-start"
          transition
          disablePortal
        >
          {({ TransitionProps, placement }) => (
            <Grow
              {...TransitionProps}
              style={{
                transformOrigin:
                  placement === "bottom-start" ? "left top" : "left bottom",
              }}
            >
              <Paper
                style={{
                  zIndex: 2,
                  paddingRight: "1em",
                }}
              >
                <ClickAwayListener onClickAway={handleClose}>
                  <MenuList
                    component="ul"
                    autoFocusItem={open}
                    id="composition-menu"
                    aria-labelledby="composition-button"
                    onKeyDown={handleListKeyDown}
                  >
                    {subLinks.map((link) => (
                      <Link
                        to={link.url ? link.url : `${url}/${link._id}`}
                        style={{ textDecoration: "none" }}
                        key={link._id}
                      >
                        <MenuItem
                          sx={{
                            color: "black",
                            "&:hover": {
                              fontWeight: "bold",
                            },
                          }}
                          onClick={() => {
                            setOpen(false); // Close the menu after selecting
                          }}
                        >
                          {link.name}
                        </MenuItem>
                      </Link>
                    ))}
                  </MenuList>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Popper>
      )}
    </div>
  );
};

export default MenuLink;
