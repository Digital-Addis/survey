import React, { useContext, useEffect, useState } from "react";
import { DARK_THEME, LIGHT_THEME } from "../../constants/themeConstants";
import { AreaTop } from "../../components";
import Sidebar from "../../components/sidebar/Sidebar";
import { ToastContainer, toast } from "react-toastify";
import { IoIosAdd } from "react-icons/io";
import { DataGrid } from "@mui/x-data-grid";
import { ThemeContext } from "../../context/ThemeContext";
import { NavLink } from "react-router-dom";
import { MdDeleteForever } from "react-icons/md";
import { CiEdit } from "react-icons/ci";
import axios from "axios";
import "./Survey.css";

import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import { PiWarningCircle } from "react-icons/pi";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

export default function Surveys() {
  const [surveys, setSurveys] = useState([]);
  const [openDelete, setOpenDelete] = useState(false);
  const [surveyToDelete, setSurveyToDelete] = useState(null);

  const handleClickOpenDelete = (id) => {
    setSurveyToDelete(id);
    setOpenDelete(true);
  };

  const handleCloseDelete = () => {
    setOpenDelete(false);
    setSurveyToDelete(null);
  };

  const handleDeleteSurvey = () => {
    // Find the survey to delete from the surveys state
    const survey = surveys.find((survey) => survey.id === surveyToDelete);

    axios
      .delete(
        `http://localhost:8080/api/survey/delete-survey/${surveyToDelete}`
      )
      .then(() => {
        axios
          .post(`http://localhost:8080/api/survey/deleted-collection-survey`, {
            deletedId: survey.id,
            title: survey.title,
            description: survey.description,
            questions: survey.questions.length,
          })
          .then(() => {
            setSurveys((prevSurveys) =>
              prevSurveys.filter((survey) => survey.id !== surveyToDelete)
            );
            toast.success("Survey deleted successfully");
            handleCloseDelete();
          })
          .catch((error) => {
            console.error(
              "There was an error registering the deleted survey!",
              error
            );
            toast.error("Error registering deleted survey");
          });
      })
      .catch((error) => {
        console.error("There was an error deleting the survey!", error);
        toast.error("Error deleting survey");
      });
  };

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/survey/get-surveys")
      .then((response) => {
        const surveysWithId = response.data.map((survey) => ({
          ...survey,
          id: survey._id,
          questionCount: survey.questions.length,
          url: survey.url,
        }));
        setSurveys(surveysWithId);
      })
      .catch((error) => {
        console.error("There was an error fetching the surveys!", error);
      });
  }, []);

  const handleCopyLink = async (id) => {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/survey/get-survey-link/${id}`
      );
      const surveyLink = response.data;
      const surveyUrl = `http://localhost:3000/survey/${surveyLink}`;
      await navigator.clipboard.writeText(surveyUrl);

      toast.success("Link copied!");
    } catch (error) {
      console.error("There was an error copying the survey link!", error);
      toast.error("Error copying link");
    }
  };

  const columns = [
    { field: "id", headerName: "ID", width: 90 },
    { field: "title", headerName: "Title", width: 260 },
    { field: "questionCount", headerName: "Number of Questions", width: 150 },
    { field: "response", headerName: "Number of Responses", width: 160 },
    { field: "date", headerName: "Created on", width: 120 },
    {
      field: "url",
      headerName: "Survey Link",
      width: 100,
      renderCell: (params) => (
        <div>
          <button
            className="copyButton"
            onClick={() => handleCopyLink(params.row.id)}
          >
            Copy
          </button>
        </div>
      ),
    },
    {
      field: "actions",
      headerName: "Actions",
      width: 100,
      sortable: false,
      renderCell: (params) => (
        <div>
          <button
            onClick={() => {
              window.location.pathname = `/dashboard-update-survey/${params.row.id}`;
            }}
          >
            <CiEdit className="editButton" />
          </button>
          <button onClick={() => handleClickOpenDelete(params.row.id)}>
            <MdDeleteForever className="deleteButton" />
          </button>
        </div>
      ),
    },
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
              Survey Management
            </h2>
            <Button
              variant="contained"
              style={{
                background: "#475be8",
                color: "white",
              }}
              endIcon={<IoIosAdd />}
            >
              <NavLink
                to="/dashboard-create-survey"
                style={{
                  color: "white",
                }}
              >
                Create Survey
              </NavLink>
            </Button>
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
                rows={surveys}
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
        <Dialog
          open={openDelete}
          TransitionComponent={Transition}
          keepMounted
          onClose={handleCloseDelete}
          aria-describedby="alert-dialog-slide-description"
        >
          <PiWarningCircle
            style={{
              fontSize: "46px",
              fontWeight: "900",
              color: "rgba(255, 0, 0, 0.87)",
              width: "80%",
              margin: "auto",
              padding: "0",
            }}
          />
          <DialogTitle
            style={{
              fontSize: "36px",
              width: "80%",
              padding: "0px",
              margin: "auto",
              textAlign: "center",
            }}
          >
            Are you sure?
          </DialogTitle>
          <DialogContent>
            <DialogContentText
              id="alert-dialog-slide-description"
              style={{
                width: "80%",
                margin: "auto",
                textAlign: "center",
              }}
            >
              Do you really want to delete this survey? This process cannot be
              undone.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={handleCloseDelete}
              style={{
                backgroundColor: "gray",
                color: "white",
              }}
            >
              No
            </Button>
            <Button
              onClick={handleDeleteSurvey}
              style={{
                backgroundColor: "red",
                color: "white",
              }}
            >
              Yes
            </Button>
          </DialogActions>
        </Dialog>
      </main>
    </>
  );
}
