import { useContext } from "react";
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

const data = [
  {
    month: "Jan",
    negative: 0,
    positive: 5,
  },
  {
    month: "Feb",
    negative: 5,
    positive: 5,
  },
  {
    month: "Mar",
    negative: 5,
    positive: 90,
  },
  {
    month: "April",
    negative: 90,
    positive: 20,
  },
  {
    month: "May",
    negative: 55,
    positive: 10,
  },
  {
    month: "Jun",
    negative: 30,
    positive: 30,
  },
  {
    month: "Jul",
    negative: 32,
    positive: 13,
  },
  {
    month: "Aug",
    negative: 62,
    positive: 22,
  },
  {
    month: "Sep",
    negative: 55,
    positive: 20,
  },
  {
    month: "Oct",
    negative: 55,
    positive: 8,
  },
  {
    month: "Nov",
    negative: 55,
    positive: 2,
  },
  {
    month: "Dec",
    negative: 55,
    positive: 10,
  },
];

const AreaBarChart = () => {
  const { theme } = useContext(ThemeContext);

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
        <h5 className="bar-chart-title">Total Survey</h5>
        <div className="chart-info-data">
          <div className="info-data-value">80</div>
          <div className="info-data-text">
            {/* <FaArrowUpLong />
            <p>5% than last month.</p> */}
          </div>
        </div>
      </div>
      <div className="bar-chart-wrapper">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            width={500}
            height={200}
            data={data}
            margin={{
              top: 5,
              right: 5,
              left: 0,
              bottom: 5,
            }}
          >
            <XAxis
              padding={{ left: 10 }}
              dataKey="month"
              tickSize={0}
              axisLine={false}
              tick={{
                fill: `${theme === LIGHT_THEME ? "#676767" : "#000000"}`,
                fontSize: 14,
              }}
            />
            <YAxis
              padding={{ bottom: 10, top: 10 }}
              tickFormatter={formatYAxisLabel}
              tickCount={6}
              axisLine={false}
              tickSize={0}
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
              dataKey="positive"
              fill="#475be8"
              activeBar={false}
              isAnimationActive={false}
              barSize={24}
              radius={[4, 4, 4, 4]}
            />
            <Bar
              dataKey="negative"
              fill="#e3e7fc"
              activeBar={false}
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
