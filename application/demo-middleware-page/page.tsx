import React from "react";

const TaiGame = ({ searchParams }: { searchParams: { os: string } }) => {
  return (
    <div>
      <h1 style={{ textAlign: "center", marginTop: "10%" }}>
        Xin Chào !!! Thiết bị: {searchParams.os}
      </h1>
      <div style={{ marginTop: "50%" }}></div>
    </div>
  );
};

export default TaiGame;
