import React, { useEffect } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { FaUserCircle } from "react-icons/fa";

import ProfilePhoto from "../UI/ProfilePhoto";

import classes from "./Profile.module.scss";

const Profile = (props) => {
  useEffect(() => {
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  });

  const handleClick = (e) => {
    if (props.node.current && !props.node.current.contains(e.target)) {
      return props.click();
    }
  };

  return (
    <div className={classes.Profile}>
      <span className={classes.ProfileIcon}>
        <FaUserCircle />
      </span>

      <ProfilePhoto photo={props.user.photoURL} />

      <p className='font-bold ml-2 md:ml-0'>
        {props.user.name}
        <br />
        <small className='font-normal'>{props.user.companyName}</small>
      </p>
      <span className={classes.Arrow + " md:ml-4"} onClick={props.click} tabIndex={0}>
        <IoIosArrowDown />
      </span>
    </div>
  );
};

export default Profile;
