import React from "react";
import Image from "next/image";
import Link from "next/link";
import useUser from "../lib/useUser";
import { useRouter } from "next/router";
import fetchJson from "../lib/fetchJson";

const Header = () => {
  const { user, mutateUser } = useUser();
  const router = useRouter();
  return (
    <header className="mb-4">
      <nav className="py-2">
        <ul>
          <li>
            <Link href="/">
              <a>Home</a>
            </Link>
          </li>
          {!user?.isLoggedIn && (
            <li>
              <Link href="/login">
                <a>Login</a>
              </Link>
            </li>
          )}
          {user?.isLoggedIn && (
            <>
              <li>
                <Link href="/profile-sg">
                  <a>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={user.avatarUrl}
                      width={20}
                      height={20}
                      alt={user.login}
                    />{" "}
                    Profile (Static Generation, recommended)
                  </a>
                </Link>
              </li>
              <li>
                <Link href="/profile-ssr">
                  <a>Profile (Server-side Rendering)</a>
                </Link>
              </li>
              <li>
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
              </li>
            </>
          )}
          <li>
            <a href="https://github.com/vvo/next-iron-session">
              <Image
                src="/GitHub-Mark-Light-32px.png"
                width="32"
                height="32"
                alt="GitHub"
              />
            </a>
          </li>
        </ul>
      </nav>
      <style jsx>{`
        ul {
          display: flex;
          list-style: none;
          margin-left: 0;
          padding-left: 0;
        }

        li {
          margin-right: 1rem;
          display: flex;
        }

        li:first-child {
          margin-left: auto;
        }

        a {
          color: #fff;
          text-decoration: none;
          display: flex;
          align-items: center;
        }

        a img {
          margin-right: 1em;
        }

        header {
          padding: 0.2rem;
          color: #fff;
          background-color: #333;
        }
      `}</style>
    </header>
  );
};

export default Header;
