import { useContext, useState, useEffect } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { ThemeContext } from "../../../context/ThemeContext";
import { LIGHT_THEME } from "../../../constants/themeConstants";
import "./AreaCharts.scss";
import axios from "axios";

const AreaBarChart = () => {
  const [surveyData, setSurveyData] = useState([]);
  const { theme } = useContext(ThemeContext);
  const [totalSurvey, setTotalSurvey] = useState();

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/survey/get-total-surveys")
      .then((response) => {
        setTotalSurvey(response.data);
      })
      .catch((error) => {
        console.error("There was an error fetching the surveys!", error);
      });
  }, []);

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/survey/get-surveys")
      .then((res) => {
        const formattedData = res.data.map((survey) => ({
          title: survey.title,
          Questions: survey.questions.length,
          Responses: survey.responses.length,
        }));
        setSurveyData(formattedData);
      })
      .catch((err) => {
        console.error("There was an error fetching the survey data", err);
      });
  }, []);

  const formatTooltipValue = (value) => {
    return `${value}`;
  };

  const formatYAxisLabel = (value) => {
    return `${value}`;
  };

  const formatLegendValue = (value) => {
    return value.charAt(0).toUpperCase() + value.slice(1);
  };

  return (
    <div className="bar-chart">
      <div className="bar-chart-info">
        <h5 className="bar-chart-title">Total Survey Data</h5>
        <div className="chart-info-data">
          <div className="info-data-value">{totalSurvey}</div>
          <div className="info-data-text"></div>
        </div>
      </div>
      <div className="bar-chart-wrapper">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            width={500}
            height={200}
            data={surveyData}
            margin={{
              top: 0,
              right: 5,
              left: 0,
              bottom: 25,
            }}
          >
            <XAxis
              dataKey="title"
              // tickSize={0}
              interval={0}
              axisLine={true}
              tick={{
                fill: `${theme === LIGHT_THEME ? "#676767" : "#000000"}`,
                fontSize: 14,
              }}
              style={{ width: "100%" }}
            />
            <YAxis
              padding={{ bottom: 10, top: 10 }}
              tickFormatter={formatYAxisLabel}
              // tickCount={6}
              axisLine={true}
              // tickSize={0}
              tick={{
                fill: `${theme === LIGHT_THEME ? "#676767" : "#000000"}`,
              }}
            />
            <Tooltip
              formatter={formatTooltipValue}
              cursor={{ fill: "transparent" }}
            />
            <Legend
              iconType="circle"
              iconSize={10}
              verticalAlign="top"
              align="right"
              formatter={formatLegendValue}
            />
            <Bar
              dataKey="Responses"
              fill="#475be8"
              isAnimationActive={false}
              barSize={29}
              radius={[4, 4, 4, 4]}
            />
            <Bar
              dataKey="Questions"
              fill="#6AB187"
              isAnimationActive={false}
              barSize={24}
              radius={[4, 4, 4, 4]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default AreaBarChart;
