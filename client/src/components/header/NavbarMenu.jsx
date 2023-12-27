import { NavLink } from "react-router-dom";
import { useState } from "react";
import { FiAlignLeft } from "react-icons/fi";

const NavbarMenu = () => {
  const [isShowMenu, setIsShowMenu] = useState(false);

  const toggleShowMenu = () => {
    setIsShowMenu(!isShowMenu);
  };

  return (
    <>
      <FiAlignLeft
        className="navbarMenu-menu"
        onClick={() => toggleShowMenu()}
      />

      {isShowMenu && (
        <div className="navbarMenu-mini">
          <NavLink
            className="navbarElem-mini"
            to="/fast-game"
            onClick={() => toggleShowMenu()}
          >
            быстрая игра
          </NavLink>

          <NavLink
            className="navbarElem-mini"
            to="/search"
            onClick={() => toggleShowMenu()}
          >
            поиск
          </NavLink>

          <NavLink
            className="navbarElem-mini"
            to="/create"
            onClick={() => toggleShowMenu()}
          >
            создать
          </NavLink>
        </div>
      )}
    </>
  );
};

export default NavbarMenu;
