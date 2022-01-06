import Ranking from './pages/Ranking'
import React from 'react'
import Header from './components/Header';
import { getUser } from './libs/save';

const SEARCH_DELAY = 500

export default class App extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      user: getUser() ?? "",
      maxScore: 10,
      minScore: 1
    }

    this.searchTimeout = null
    this.setUser = this.setUser.bind(this)
    this.setMaxScore = this.setMaxScore.bind(this)
    this.setMinScore = this.setMinScore.bind(this)
    this.setScore = this.setScore.bind(this)
  }

  setUser(user) {
    clearTimeout(this.searchTimeout)

    this.searchTimeout = setTimeout(() => this.setState({ user }), SEARCH_DELAY)
  }

  setMaxScore(maxScore = this.state.maxScore) {
    this.setState({ maxScore })
  }

  setMinScore(minScore = this.state.minScore) {
    this.setState({ minScore })
  }

  setScore(score) {
    this.setState({ minScore: score[0], maxScore: score[1] })
  }

  render() {
    return (
      <div>
        <Header setUser={this.setUser} setScore={this.setScore} setMinScore={this.setMinScore} setMaxScore={this.setMaxScore} />
        {this.state.user ? <Ranking user={this.state.user}
          maxScore={this.state.maxScore}
          minScore={this.state.minScore} /> : <></>}
      </div>
    );
  }
}

