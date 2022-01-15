import "./Ranker.css";
import RankingList from "./RankingList";
import React from "react";
import Controls from "./Controls";
import { getRange, saveRange } from "../../libs/save";

import { getCompletedAnimeList } from "../../libs/mal";

class Ranker extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      user: this.props.user ?? "",
      size: 50,
      minScore: getRange()[0] ?? 0,
      maxScore: getRange()[1] ?? 10,
    };

    this.searchTimeout = null;
    this.setScore = this.setScore.bind(this);
  }

  componentDidUpdate(prevProps) {
    if (this.props.user !== prevProps.user) {
      this.setState({ user: this.props.user });
    }
  }

  setScore(score) {
    saveRange(score);
    this.setState({ minScore: score[0], maxScore: score[1] });
  }

  render() {
    return (
      <>
        <Controls setScore={this.setScore} />
        <RankingList
          promise={getCompletedAnimeList(this.props.user)}
          deps={[this.props.user]}
          errMessage={"User not found"}
          user={this.state.user}
          maxScore={this.state.maxScore}
          minScore={this.state.minScore}
        />
      </>
    );
  }
}

export default Ranker;
