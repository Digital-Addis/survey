import { useEffect, useState } from "react";
import AreaCard from "./AreaCard";
import "./AreaCards.scss";
import axios from "axios";

const AreaCards = () => {
  const [totalSurvey, setTotalSurvey] = useState();
  const [totalDeletedSurvey, setTotalDeletedSurvey] = useState();

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/survey/deleted-survey-number")
      .then((res) => {
        setTotalDeletedSurvey(res.data);
      })
      .catch((err) => {
        console.error(
          "there is error fetching total number of deleted surveys",
          err
        );
      });
  }, []);

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
  return (
    <section className="content-area-cards">
      <AreaCard
        colors={["#e4e8ef", "#475be8"]}
        percentFillValue={totalSurvey}
        cardInfo={{
          title: "Total Survey",
          value: totalSurvey,
          text: `The are ${totalSurvey} survey.`,
        }}
      />
      <AreaCard
        colors={["#e4e8ef", "#4ce13f"]}
        percentFillValue={5}
        cardInfo={{
          title: "Total Update Survey",
          value: "5",
          text: "There are 5 updated surveys.",
        }}
      />
      <AreaCard
        colors={["#e4e8ef", "#f29a2e"]}
        percentFillValue={totalDeletedSurvey}
        cardInfo={{
          title: "Total Deleted Survey",
          value: totalDeletedSurvey,
          text: `There are ${totalDeletedSurvey} deleted survey`,
        }}
      />
    </section>
  );
};

export default AreaCards;
