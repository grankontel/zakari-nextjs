import React, { useCallback, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import useUser from "../lib/useUser";
import { useRouter } from "next/router";
import fetchJson from "../lib/fetchJson";
import {
  Container,
  Navbar,
  Image as BulmaImage,
  Media,
} from "react-bulma-components";
const classNames = require("classnames");

const Header = () => {
  const { user, mutateUser } = useUser();
  const router = useRouter();
  const  [mobileOpen, setMobileOpen]  = useState(false);
  const toggleMobileMenu = useCallback(() => setMobileOpen(!mobileOpen), [mobileOpen]);

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
            {!user?.isLoggedIn && (
              <Navbar.Item renderAs="li">
                <Link href="/login">
                  <a>Login</a>
                </Link>
              </Navbar.Item>
            )}

            {user?.isLoggedIn && (
              <>
                <Navbar.Item renderAs="li">
                  <Link href="/profile-sg">
                    <Media renderAs="a">
                      <BulmaImage
                        size={24}
                        rounded
                        className="media-left"
                        src={user.avatarUrl}
                        alt={user.login}
                      />{" "}
                      Profile (Static Generation, recommended)
                    </Media>
                  </Link>
                </Navbar.Item>
                <Navbar.Item renderAs="li">
                  <Link href="/profile-ssr">
                    Profile (Server-side Rendering)
                  </Link>
                </Navbar.Item>
                <Navbar.Item renderAs="li">
                  {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
                  <a
                    href="/api/logout"
                    onClick={async (e) => {
                      e.preventDefault();
                      mutateUser(
                        await fetchJson("/api/logout", { method: "POST" }),
                        false
                      );
                      router.push("/login");
                    }}
                  >
                    Logout
                  </a>
                </Navbar.Item>
              </>
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
