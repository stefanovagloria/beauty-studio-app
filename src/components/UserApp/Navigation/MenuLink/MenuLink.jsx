import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";

import Button from "@mui/material/Button";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import Grow from "@mui/material/Grow";
import Paper from "@mui/material/Paper";
import Popper from "@mui/material/Popper";
import MenuItem from "@mui/material/MenuItem";
import MenuList from "@mui/material/MenuList";
import Stack from "@mui/material/Stack";
import ArrowDropDownSharpIcon from "@mui/icons-material/ArrowDropDownSharp";

import styles from "./MenuLink.module.css";

const MenuLink = ({ subLinks, name, url }) => {
  const [open, setOpen] = useState(false);
  const anchorRef = useRef(null);

  const handleToggle = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  function handleListKeyDown(event) {
    if (event.key === "Tab") {
      event.preventDefault();
      setOpen(false);
    } else if (event.key === "Escape") {
      setOpen(false);
    }
  }

  // return focus to the button when we transitioned from !open -> open
  const prevOpen = useRef(open);
  useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }

    prevOpen.current = open;
  }, [open]);

  return (
    <Stack direction="row" spacing={2}>
      <div>
        <Button
          ref={anchorRef}
          id="composition-button"
          aria-controls={open ? "composition-menu" : undefined}
          aria-expanded={open ? "true" : undefined}
          aria-haspopup="true"
          onMouseEnter={handleToggle}
          onMouseLeave={handleClose}
          style={{ color: "blueviolet", fontSize: "1em" }}
        >
          {subLinks && (
            <>
              {name}
              <ArrowDropDownSharpIcon />
            </>
          )}
          {!subLinks && <Link to={url}> {name}</Link>}
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
                <Paper>
                  <ClickAwayListener onClickAway={handleClose}>
                    <MenuList
                      autoFocusItem={open}
                      id="composition-menu"
                      aria-labelledby="composition-button"
                      onKeyDown={handleListKeyDown}
                    >
                      {subLinks.map((link) => (
                        <MenuItem key={link._id} onClick={handleClose}>
                          <Link to={link.url ? link.url : `${url}/${link._id}`}>
                            {link.name}
                          </Link>
                        </MenuItem>
                      ))}
                    </MenuList>
                  </ClickAwayListener>
                </Paper>
              </Grow>
            )}
          </Popper>
        )}
      </div>
    </Stack>
  );
};

export default MenuLink;
