import { useState } from "react";
import styled from "styled-components";

const MainDiv = styled.div`
  margin: auto;
  display: flex;

  flex-direction: column;
  align-items: center;
`;

export default function Home(props) {
  const [user, setUser] = useState("");

  return (
    <MainDiv>
      <h1>Welcome to Anime Ranker!</h1>
      <div>
        <label htmlFor="homeNameInput">Type a username: </label>
        <input
          id="homeNameInput"
          onChange={(e) => setUser(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && user !== "") {
              props.setUser(user);
            }
          }}
        ></input>
      </div>
    </MainDiv>
  );
}
