import React, { useState, useRef } from "react";
import { isMobile } from "react-device-detect";
import { FaWhatsapp } from "react-icons/fa";

import Hamburger from "../../Navigation/Hamburger";
import ProfileInfo from "../../Navigation/Profile";
import ProfileNav from "../../Navigation/ProfileNav";

import classes from "./Header.module.scss";

const Header = (props) => {
  let locationTitle = props.location.replace("/", "").split("-").join(" ");

  const [opened, setOpened] = useState(false);
  const nodeRef = useRef();

  const toggleProfileHandler = () => setOpened((prevOpened) => !prevOpened);

  return (
    <header className={classes.Header + " flex justify-between py-6 md:py-2 px-4 md:px-6 md:pr-12 items-center"}>
      <Hamburger open={props.openHandler} />
      {!isMobile ? <h1 className='capitalize ml-6 md:ml-0 text-base md:text-2xl font-bold text-black'>{locationTitle}</h1> : null}
      <div className={classes.ContactInfo}>
        <a
          href='https://wa.me/51929324006?text=Hola%20deseo%20informacion'
          target='_blank'
          rel='noopener noreferrer'
          className={classes.Whatsapp + " flex items-center font-bold rounded-lg"}
        >
          <span className='mr-2'>
            <FaWhatsapp />
          </span>{" "}
          929 324 006
        </a>
        <p>
          <span className='mr-1'>Lunes a Viernes:</span> <b>9AM a 7PM</b> <br /> <span className='mr-1'>Sábados y feriados:</span> <b>9AM a 3PM</b>
        </p>
      </div>

      <ProfileInfo user={props.user} node={nodeRef} click={toggleProfileHandler} />
      <ProfileNav opened={opened} ref={nodeRef} />
    </header>
  );
};

export default Header;
