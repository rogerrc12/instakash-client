import React from "react";
import NoProfilePic from "../../../assets/images/no-profile-pic.png";

import classes from "./ProfilePhoto.module.scss";

const ProfilePhoto = (props) => {
  return (
    <div className={`${classes.ProfilePhoto} ${props.className || ""}`}>
      <img src={props.photo || NoProfilePic} alt="profile" />
    </div>
  );
};

export default ProfilePhoto;
