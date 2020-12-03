import React from "react";
import { useDispatch } from "react-redux";
import * as actions from "../../store/actions";
import { Link } from "react-router-dom";
import { FiUser, FiLogOut } from "react-icons/fi";
import classes from "./Profile.module.scss";

const ProfileNav = React.forwardRef((props, ref) => {
  const dispatch = useDispatch();
  const logout = () => dispatch(actions.logoutInit());

  return props.opened ? (
    <div className={classes.ProfileNav} ref={ref}>
      <Link to="/mi-perfil" className="flex items-center justify-start">
        <span className="mr-3">
          <FiUser />
        </span>
        Ver perfil
      </Link>
      <button className="flex items-center justify-start" onClick={logout}>
        <span className="mr-3">
          <FiLogOut />
        </span>
        Cerrar sesión
      </button>
    </div>
  ) : null;
});

export default ProfileNav;
