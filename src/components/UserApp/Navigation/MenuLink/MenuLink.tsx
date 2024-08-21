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
  const [currentlyActiveId, setCurrentlyActiveId] = useState("");
  const anchorRef = useRef<HTMLButtonElement | null>(null);

  const handleToggle = (url: string) => {
    setOpen((prevOpen) => !prevOpen);
    setCurrentlyActiveId(url);
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
    <Stack direction="row" spacing={2}>
      <div>
        <Button
          ref={anchorRef}
          id="composition-button"
          aria-controls={open ? "composition-menu" : undefined}
          aria-expanded={open ? "true" : undefined}
          aria-haspopup="true"
          style={{ color: "blueviolet", fontSize: "1em", fontWeight: "300" }}
          onClick={handleToggle}
        >
          {subLinks ? (
            <>
              {name}
              <ArrowDropDownSharpIcon />
            </>
          ) : (
            <Link to={url ?? "#"}> {name}</Link>
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
                <Paper style={{ zIndex: 2 }}>
                  <ClickAwayListener onClickAway={handleClose}>
                    <MenuList
                      component="ul"
                      autoFocusItem={open}
                      id="composition-menu"
                      aria-labelledby="composition-button"
                      onKeyDown={handleListKeyDown}
                    >
                      {subLinks.map((link) => (
                        <Link to={link.url ? link.url : `${url}/${link._id}`} className={link.url === currentlyActiveId ? 'activeLink': ""}>
                          <MenuItem key={link._id} onClick={() => handleToggle(link.url)}>
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
    </Stack>
  );
};

export default MenuLink;
