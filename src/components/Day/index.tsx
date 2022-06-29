import React from "react";

export default function Day({ day }: any) {
  return (
    <div>
      {day.map((oneDay: any) => {
        console.log(oneDay);
        return (
          <>
            <h1>{oneDay.format("ddd").toUpperCase()}</h1>
            <h3>{oneDay.format("DD")}</h3>
          </>
        );
      })}
    </div>
  );
}
