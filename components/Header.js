import React, { useCallback, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSession, signIn, signOut } from "next-auth/client";

import { Navbar, Image as BulmaImage } from "react-bulma-components";
const classNames = require("classnames");

const Header = () => {

  const [session] = useSession();

  const handleLogin = (e) => {
    e.preventDefault();
    signIn();
  };

  const handleLogout = (e) => {
    e.preventDefault();
    signOut();
  };

  const [mobileOpen, setMobileOpen] = useState(false);
  const toggleMobileMenu = useCallback(
    () => setMobileOpen(!mobileOpen),
    [mobileOpen]
  );

  const navMenu = classNames({
    "is-active": mobileOpen,
  });

  return (
    <header>
      <Navbar py={2}>
        <Navbar.Burger onClick={toggleMobileMenu} aria-label="menu" />
        <Navbar.Menu renderAs="div" className={navMenu}>
          <Navbar.Container align="right" renderAs="ul">
            <Navbar.Item renderAs="li">
              <Link href="/">Home</Link>
            </Navbar.Item>

            {session ? (
              <>
                <Navbar.Item renderAs="li">
                  <Link href="/profile-sg">
                    <a className="media">
                      <BulmaImage
                        size={24}
                        rounded
                        className="media-left"
                        src={session.user.image}
                        alt={session.user.login}
                      />{" "}
                      Profile
                    </a>
                  </Link>
                </Navbar.Item>
                <Navbar.Item renderAs="li">
                  <a onClick={handleLogout} className="logout">
                    Logout
                  </a>
                </Navbar.Item>
              </>
            ) : (
              <Navbar.Item renderAs="li">
                <a onClick={handleLogin} className="logout">
                  Login
                </a>
              </Navbar.Item>
            )}

            <Navbar.Item renderAs="li">
              <a href="https://github.com/vvo/next-iron-session">
                <Image
                  src="/GitHub-Mark-Light-32px.png"
                  width="32"
                  height="32"
                  alt="GitHub"
                />
              </a>
            </Navbar.Item>
          </Navbar.Container>
        </Navbar.Menu>
      </Navbar>
    </header>
  );
};

export default Header;
