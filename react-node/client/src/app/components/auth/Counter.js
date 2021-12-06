import React, { useState, useEffect } from "react";

const Counter = () => {
  const [card, setCard] = useState([1, 2, 3, 4]);
  const [countList, setCountList] = useState([]);
  const [id, setId] = useState("");

  useState(() => {
    const countList = [];
    for (let i in card) {
      countList[i] = { seconds: 0, minutes: 0 };
    }
    setCountList(countList);
  }, []);

  const header = () => {
    return (
      <div
        style={{
          width: "100%",
          height: "80px",
          padding: "5px",
          border: "1px solid #000",
        }}
      >
        {countList.map((item, i) => (
          <div key={i} style={{ width: "150px", float: "left" }}>
            counter {i + 1} <br /> {item.minutes}:{item.seconds}
          </div>
        ))}
      </div>
    );
  };

  const count = (i) => {
    setInterval(() => {
      setTime(i);
    }, 1000);
  };

  const total = [0, 0, 0, 0];
  const setTime = async (i) => {
    const count = JSON.parse(JSON.stringify(countList));
    ++total[i];
    count[i].seconds = pad(total[i] % 60, i);
    count[i].minutes = pad(parseInt(total[i] / 60), i);
    await setCountList(count);
  };

  const pad = (val, i) => {
    let valString = val + "";
    if (valString.length < 2) {
      return "0" + valString;
    } else {
      return valString;
    }
  };

  return (
    <div>
      {header()}
      <div style={{ padding: "50px", textAlign: "center" }}>
        {card.map((item, i) => (
          <div
            key={i}
            style={{
              width: "150px",
              height: "100px",
              border: "1px solid #000",
              float: "left",
              margin: "5px",
              padding: "20px",
            }}
            onClick={() => count(i)}
          >
            Card {item}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Counter;
