import React from "react";
import SideNavInDashboard from "./SideNavInDashboard";
import Navbar from "./Navbar";
import { Box } from "@mui/material";
// import Jobs from "./JobsPosted";
import Cart from "./Cart";
export default function DashBoard() {
  return (
    <>
      <Navbar />
      <Box sx={{ display: "flex" }}>
        <Box sx={{ marginLeft: "0px" }}>
          <SideNavInDashboard />
        </Box>
        <Box
          sx={{
            // border: "2px solid black",
            width: "150vh",
            height: "90vh",
            margin: "10px 0px 0px 10px",
          }}
        >
          {/* <Jobs /> */}
          <Cart></Cart>
        </Box>
      </Box>
    </>
  );
}
