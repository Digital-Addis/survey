import React, { useContext, useEffect, useState } from "react";
import { DARK_THEME, LIGHT_THEME } from "../../constants/themeConstants";
import { AreaTop } from "../../components";
import Sidebar from "../../components/sidebar/Sidebar";
import { ToastContainer, toast } from "react-toastify";
import { IoIosAdd } from "react-icons/io";
import { DataGrid } from "@mui/x-data-grid";
import { ThemeContext } from "../../context/ThemeContext";
import { NavLink } from "react-router-dom";

import axios from "axios";
export default function Trash() {
  const [surveysDeleted, setSurveysDeleted] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:8080/api/survey/deleted-surveys")
      .then((response) => {
        const surveysWithId = response.data.map((survey) => ({
          ...survey,
          id: survey._id,
          title: survey.title,
          questionCount: survey.questions.length,
          date: survey.date,
        }));
        setSurveysDeleted(surveysWithId);
      })
      .catch((error) => {
        console.error(
          "There was an error fetching the deleted surveys!",
          error
        );
      });
  }, []);
  const columns = [
    { field: "id", headerName: "ID", width: 220 },
    { field: "title", headerName: "Title", width: 220 },
    { field: "questionCount", headerName: "Number of Questions", width: 200 },
    { field: "date", headerName: "Date of deletion", width: 220 },
  ];

  const { theme } = useContext(ThemeContext);

  useEffect(() => {
    if (theme === DARK_THEME) {
      document.body.classList.add("dark-mode");
    } else {
      document.body.classList.remove("dark-mode");
    }
  }, [theme]);

  return (
    <>
      <main className="page-wrapper">
        <Sidebar />
        <AreaTop />
        <ToastContainer />
        <div className="content-wrapper">
          <div
            style={{
              display: "flex",
              alignItems: "flex-end",
              justifyContent: "space-between",
              marginBottom: "12px",
            }}
          >
            <h2
              style={
                theme === LIGHT_THEME
                  ? {
                      color: "black",
                      textAlign: "center",
                      marginBottom: "12px",
                      marginTop: "12px",
                      fontWeight: "bolder",
                    }
                  : {
                      color: "white",
                      textAlign: "center",
                      marginBottom: "12px",
                      marginTop: "12px",
                      fontWeight: "bolder",
                    }
              }
            >
              Deleted Surveys
            </h2>
          </div>
          <div
            style={
              theme === LIGHT_THEME
                ? {
                    color: "black",
                    background: "transparent",
                    width: "100%",
                    height: 400,
                  }
                : {
                    color: "white",
                    background: "#fafafa",
                    width: "100%",
                    height: 400,
                  }
            }
          >
            <div style={{ height: "480px" }}>
              <DataGrid
                rows={surveysDeleted}
                columns={columns}
                initialState={{
                  pagination: {
                    paginationModel: { page: 0, pageSize: 5 },
                  },
                }}
                pageSizeOptions={[5, 10, 15]}
                checkboxSelection
              />
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
