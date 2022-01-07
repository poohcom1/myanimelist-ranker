import React from "react";
import "./Footer.css";
import GithubMark from "../assets/GitHub-Mark-Light-64px.png";

export default function Footer(props) {
  return (
    <div className="footer">
      <p>Source Code:</p>
      <a href="https://github.com/poohcom1/myanimelist-ranker">
        <img src={GithubMark} alt="Github Link" />
      </a>
    </div>
  );
}
