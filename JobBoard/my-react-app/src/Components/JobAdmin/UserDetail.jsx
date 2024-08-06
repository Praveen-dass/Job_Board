import axios from "axios";
import React, { useEffect, useState } from "react";
import Pagination from "@mui/material/Pagination";
import SideNavInDashboard from "./SideNavInDashboard";
import Navbar from "./Navbar";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Checkbox,
  Button,
} from "@mui/material";

export default function UserDetail() {
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 7;

  useEffect(() => {
    const fetch = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/details/get/user"
        );
        console.log(response.data);
        setUsers(response.data);
      } catch (e) {
        console.error(e);
      }
    };
    fetch();
  }, []);

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  const offset = (currentPage - 1) * usersPerPage;
  const currentUsers = users.slice(offset, offset + usersPerPage);
  const pageCount = Math.ceil(users.length / usersPerPage);

  const handleDownload = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/files/download/1`,
        {
          responseType: "blob",
        }
      );
      const url = window.URL.createObjectURL(
        new Blob([response.data], { type: "application/pdf" })
      );
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "resume.pdf");
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error("There was an error downloading the file!", error);
    }
  };

  return (
    <div>
      <Navbar></Navbar>
      <div className="flex">
        <SideNavInDashboard></SideNavInDashboard>
        <Box className="h-[100vh] w-[60%]  container mx-auto ">
          <TableContainer component={Paper} className="mt-[1%]">
            <Table>
              <TableHead className="bg-blue-50 border-4 shadow-lg shadow-blue-500/100">
                <TableRow>
                  <TableCell padding="checkbox">
                    <Checkbox />
                  </TableCell>
                  <TableCell>UserName</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>Gender</TableCell>
                  <TableCell>Age</TableCell>
                  <TableCell>Experience</TableCell>
                  <TableCell>Resume</TableCell>
                </TableRow>
              </TableHead>
              <TableBody className="divide-y bg-blue-100 shadow-2xl shadow-blue-500/100">
                {currentUsers.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell padding="checkbox">
                      <Checkbox />
                    </TableCell>
                    <TableCell>{user.username}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>{user.gender}</TableCell>
                    <TableCell>{user.age}</TableCell>
                    <TableCell>{user.experience}</TableCell>
                    <TableCell>
                      <button
                        className="bg-blue-500 p-2 rounded-lg"
                        onClick={handleDownload}
                      >
                        Download
                      </button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <Box display="flex" justifyContent="center" mt={4}>
            <Pagination
              count={pageCount}
              page={currentPage}
              onChange={handlePageChange}
              color="primary"
            />
          </Box>
        </Box>
      </div>
    </div>
  );
}
