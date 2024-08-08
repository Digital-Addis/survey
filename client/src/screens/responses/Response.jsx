import React, { useContext, useEffect, useState } from "react";
import { DARK_THEME, LIGHT_THEME } from "../../constants/themeConstants";
import { ThemeContext } from "../../context/ThemeContext";
import Sidebar from "../../components/sidebar/Sidebar";
import axios from "axios";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import LeftArrow from "../../assests/images/angle-left-solid.svg";
import RightArrow from "../../assests/images/angle-right-solid.svg";
import { GoDot } from "react-icons/go";
import { BsDot } from "react-icons/bs";
import { NavLink } from "react-router-dom";
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ComposedChart,
  CartesianGrid,
} from "recharts";
import "./Response.css";

import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

import { DataGrid } from "@mui/x-data-grid";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

export default function Response() {
  const SlickArrowLeft = ({ currentSlide, slideCount, ...props }) => (
    <img src={LeftArrow} alt="prevArrow" {...props} />
  );

  const SlickArrowRight = ({ currentSlide, slideCount, ...props }) => (
    <img src={RightArrow} alt="nextArrow" {...props} />
  );

  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 2,
    prevArrow: <SlickArrowLeft />,
    nextArrow: <SlickArrowRight />,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  const { theme } = useContext(ThemeContext);
  const [surveys, setSurveys] = useState([]);
  const [surveyName, setSurveyName] = useState([]);
  const [selectedSurvey, setSelectedSurvey] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/survey/get-surveys")
      .then((res) => {
        setSurveys(res.data);
      })
      .catch((error) => {
        console.error("There was an error fetching the surveys!", error);
      });
  }, []);
  useEffect(() => {
    if (selectedSurvey) {
      const surveyResponses = selectedSurvey.responses.map(
        (response, index) => ({
          id: index + 1,
          title: response[`question-0`], // or whichever question index you want
        })
      );
      setSurveyName(surveyResponses);
    }
  }, [selectedSurvey]);

  useEffect(() => {
    if (theme === DARK_THEME) {
      document.body.classList.add("dark-mode");
    } else {
      document.body.classList.remove("dark-mode");
    }
  }, [theme]);

  const handleSurveyClick = (survey) => {
    setSelectedSurvey(survey);
  };

  const columns = [
    { field: "id", headerName: "No.", width: 90 },
    { field: "title", headerName: "Response", width: 320 },
  ];

  const COLORS = [
    "rgba(255, 0, 0,0.7)",
    "rgba(0, 0, 255,0.7)",
    "#FFBB28",
    "#FF8042",
    "#FF6384",
    "#36A2EB",
  ];

  const calculateResponseCounts = (questionIndex) => {
    const counts = {};
    selectedSurvey.responses.forEach((response) => {
      const questionResponse = response[`question-${questionIndex}`];
      if (typeof questionResponse === "string") {
        counts[questionResponse] = (counts[questionResponse] || 0) + 1;
      } else {
        Object.keys(questionResponse).forEach((key) => {
          if (questionResponse[key]) {
            counts[key] = (counts[key] || 0) + 1;
          }
        });
      }
    });
    return counts;
  };

  const RADIAN = Math.PI / 180;
  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
    index,
  }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor={x > cx ? "start" : "end"}
        dominantBaseline="central"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  const renderChart = (question, questionIndex) => {
    const responseCounts = calculateResponseCounts(questionIndex);
    const data = question.options.map((option) => ({
      name: option,
      value: responseCounts[option] || 0,
    }));

    if (question.questionType === "single choice") {
      return (
        <div style={{ width: "90%", margin: "auto" }}>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={data}
                dataKey="value"
                nameKey="name"
                outerRadius={100}
                fill="#8884d8"
                label={renderCustomizedLabel}
                labelLine={false}
              >
                {data.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      );
    } else if (question.questionType === "multiple choice") {
      return (
        <div style={{ width: "90%", margin: "auto" }}>
          <ResponsiveContainer width="100%" height={300}>
            <ComposedChart
              width={500}
              height={400}
              data={data}
              margin={{
                top: 20,
                right: 20,
                bottom: 20,
                left: 20,
              }}
            >
              <CartesianGrid stroke="#f5f5f5" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="value" fill="	#1ebbd7" barSize={70} />
            </ComposedChart>
          </ResponsiveContainer>
        </div>
      );
    }
    return null;
  };

  const renderTextResponses = (questionIndex) => {
    return (
      <div style={{ width: "72%", margin: "auto" }}>
        {/* {selectedSurvey.responses.map((response, index) =>
          setSurveyName(response[`question-${questionIndex}`])
        )} */}
        <ul>
          <div style={{ height: "375px" }}>
            <DataGrid
              rows={surveyName}
              columns={columns}
              initialState={{
                pagination: {
                  paginationModel: { page: 0, pageSize: 4 },
                },
              }}
              pageSizeOptions={[10, 15]}
              checkboxSelection
            />
          </div>
        </ul>
      </div>
    );
  };

  return (
    <>
      <main className="page-wrapper-of-response">
        <Sidebar />
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
              Survey Response Management
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
            <div>
              <Slider {...settings} className="sliderContainer">
                {surveys.map((survey) => (
                  <NavLink
                    key={survey._id}
                    onClick={() => handleSurveyClick(survey)}
                    className={`titleNavigation ${
                      selectedSurvey && selectedSurvey._id === survey._id
                        ? "active-survey"
                        : "surveyList"
                    }`}
                  >
                    {survey.title}
                  </NavLink>
                ))}
              </Slider>
            </div>
            <br />
            <br />
            <br />
            {selectedSurvey && (
              <div>
                {selectedSurvey.responses.length === 0 ? (
                  <div>
                    <h3 style={{ textAlign: "center" }}>
                      There is no response for this survey yet but, the below
                      are question found in the survey!
                    </h3>
                    <br />
                    <ul
                      className="ResponseulContainer"
                      style={{ paddingLeft: "12px" }}
                    >
                      {selectedSurvey.questions.map((question, index) => (
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "flex-start",
                            gap: "6px",
                            marginBottom: "11px",
                          }}
                          key={index}
                        >
                          <div
                            key={question._id}
                            style={{
                              display: "flex",
                              alignItems: "flex-start",
                              flexDirection: "column",
                              justifyContent: "flex-start",
                              gap: "5px",
                            }}
                          >
                            <p>
                              {" "}
                              {index + 1}. {question.questionText}
                            </p>
                            {question.options.map((option, idx) => (
                              <p key={idx}>
                                {" "}
                                <BsDot /> {option}
                              </p>
                            ))}
                          </div>
                        </div>
                      ))}
                    </ul>
                  </div>
                ) : (
                  <ul className="ResponseulContainer">
                    {selectedSurvey.questions.map((question, index) => (
                      <div
                        style={{
                          paddingBottom: "15px",
                        }}
                      >
                        <li key={question._id}>
                          <p
                            style={{
                              textAlign: "center",
                              fontSize: "17px",
                              paddingBottom: "11px",
                            }}
                          >
                            {question.questionText}
                          </p>
                          {question.questionType === "text"
                            ? renderTextResponses(index)
                            : renderChart(question, index)}
                        </li>
                      </div>
                    ))}
                  </ul>
                )}
              </div>
            )}
          </div>
        </div>
      </main>
    </>
  );
}
