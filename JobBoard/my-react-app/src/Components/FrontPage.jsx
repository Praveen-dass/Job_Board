import React from "react";
import FrontPage1 from "./FrontPageChild1";
import SignUp from "./FrontPageChild2";
import Post from "./FrontPageChild3";
import Stats from "./FrontPageChild4";
import Footer from "./Footer";
import { Container } from "@mui/material";


export default function FrontPage(){
    return(
        <>
            <Container >
                <FrontPage1 />
                <SignUp />
                <Post />
                <Stats />
            </Container>
        <Footer />
        </>

    )
}