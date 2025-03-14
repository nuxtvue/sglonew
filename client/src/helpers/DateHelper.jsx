import React from "react";

const DateComponent = ({ date }) => {
  const options = {
    year: "numeric", // Год
    month: "short", // Полное название месяца
    day: "numeric", // День
  };
  let dateFromMongo = new Date(date);

  const formattedDate = dateFromMongo.toLocaleDateString("ru-RU", options);

  return (
    <div>
      <p> {formattedDate}</p>
    </div>
  );
};

export default DateComponent;
