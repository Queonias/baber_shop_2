import About from "./About";
import Footer from "./Footer";
import Galeria from "./Galeria";
import Navbar from "./Navbar";
import Welcome from "./welcome";

import Head from "next/head";

export default function Layout({ children }) {
    return (
        <>
            <Head>
                <link rel="shortcut icon" href="./images/favicon.ico" />
                <title>Baber_shop</title>
            </Head>
            <Navbar />
            <About />
            <Welcome />
            {/* <Galeria /> */}
            {/* <main className="main-container">{children}</main> */}
            {/* <Footer /> */}
        </>
    );
}