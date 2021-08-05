import React, { useCallback, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSession, signIn, signOut } from "next-auth/client";

import { Navbar, Image as BulmaImage } from "react-bulma-components";
import { IoPersonCircleOutline, IoLogIn, IoLogOut } from "react-icons/io5";

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
        <Navbar.Brand>
          <Navbar.Item renderAs="li">
            <Link href="/" passHref>
              <Image
                src="/Zakari-Mark-Light-32px.png"
                width="32"
                height="32"
                alt="Zakari Brand"
              />
            </Link>
          </Navbar.Item>
          <Navbar.Item renderAs="li">
            <Link href="/">Home</Link>
          </Navbar.Item>
        </Navbar.Brand>
        <Navbar.Burger onClick={toggleMobileMenu} aria-label="menu" />
        <Navbar.Menu renderAs="div" className={navMenu}>
          <Navbar.Container align="right" renderAs="ul">
            {session ? (
              <>
                <Navbar.Item renderAs="li">
                  <span className="media">
                    {session.user.image ? (
                      <BulmaImage
                        size={24}
                        rounded
                        className="media-left"
                        src={session.user.image}
                        alt={session.user.login}
                      />
                    ) : (
                      <IoPersonCircleOutline
                        size={24}
                        className="media-left"
                        alt={session.user.login}
                      />
                    )}
                    {session.user.login}
                  </span>
                </Navbar.Item>
                <Navbar.Item renderAs="li">
                  <a onClick={handleLogout} className="logout">
                    <span className="media">
                      <IoLogOut size={24} className="media-left" /> Logout
                    </span>
                  </a>
                </Navbar.Item>
              </>
            ) : (
              <Navbar.Item renderAs="li">
                <a onClick={handleLogin} className="logout">
                  <span className="media">
                    <IoLogIn size={24} className="media-left" /> Login
                  </span>
                </a>
              </Navbar.Item>
            )}

            <Navbar.Item renderAs="li">
              <a href="https://github.com/grankontel/zakari-nextjs">
                <Image
                  src="/GitHub-Mark-Light-32px.png"
                  width="32"
                  height="32"
                  alt="This project on GitHub"
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
