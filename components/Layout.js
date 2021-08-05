import React from "react";
import Head from "next/head";
import Header from "./Header";
import PropTypes from "prop-types";
import { Container } from "react-bulma-components";
import getConfig from "next/config";
const { publicRuntimeConfig } = getConfig()
const Layout = ({ children }) => (
  <>
    <Head>
      <title>Zakari Client : Web version — version { publicRuntimeConfig.versionNumber }</title>
      <link
        rel="apple-touch-icon"
        sizes="180x180"
        href="/favicons/apple-touch-icon.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="32x32"
        href="/favicons/favicon-32x32.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="16x16"
        href="/favicons/favicon-16x16.png"
      />
      <link rel="manifest" href="/favicons/site.webmanifest" />
      <link
        rel="mask-icon"
        href="/favicons/safari-pinned-tab.svg"
        color="#5bbad5"
      />
      <link rel="shortcut icon" href="/favicons/favicon.ico" />
      <meta name="msapplication-TileColor" content="#ffc40d" />
      <meta name="msapplication-config" content="/favicons/browserconfig.xml" />
      <meta name="theme-color" content="#ffffff" />
    </Head>
    <Header />
    <main>
      <Container breakpoint="desktop" my={2} max>
        {children}
      </Container>
    </main>
  </>
);

export default Layout;

Layout.propTypes = {
  children: PropTypes.node,
};
