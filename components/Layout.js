import React from "react";
import Head from "next/head";
import Header from "./Header";
import PropTypes from "prop-types";
import { Container } from "react-bulma-components";

const Layout = ({ children }) => (
  <>
    <Head>
      <title>With Iron Session</title>
    </Head>
    <Header />
    <main>
      <Container breakpoint="desktop" my={2} max>{children}</Container>
    </main>
  </>
);

export default Layout;

Layout.propTypes = {
  children: PropTypes.node,
};
