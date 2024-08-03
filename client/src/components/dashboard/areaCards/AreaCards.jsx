import { useEffect, useState } from "react";
import AreaCard from "./AreaCard";
import "./AreaCards.scss";
import axios from "axios";

const AreaCards = () => {
  const [totalSurvey, setTotalSurvey] = useState();
  useEffect(() => {
    axios
      .get("http://localhost:8080/api/survey/get-total-surveys")
      .then((response) => {
        setTotalSurvey(response.data);

        // const surveysWithId = response.data.map((survey) => ({
        //   ...survey,
        //   id: survey._id,
        //   questionCount: survey.questions.length,
        //   url: survey.url,
        // }));
        // setSurveys(surveysWithId);
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
        percentFillValue={7}
        cardInfo={{
          title: "Total Deleted Survey",
          value: "7",
          text: "There are 7 deleted survey",
        }}
      />
    </section>
  );
};

export default AreaCards;
