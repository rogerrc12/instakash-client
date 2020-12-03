import React from "react";
import { useSelector } from "react-redux";

import Details from "./ProfileDetails";

import classes from "./Profile.module.scss";

const Profile = () => {
  const userInfo = useSelector((state) => state.auth.user);

  return (
    <main className={classes.Profile}>
      <Details user={userInfo} />
    </main>
  );
};

export default Profile;
