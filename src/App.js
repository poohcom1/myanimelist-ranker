import Ranking from './components/Ranking'
import React from 'react'
import Header from './components/Header';
import Footer from './components/Footer'
import { getRange, getUser, saveRange } from './libs/save';

const SEARCH_DELAY = 500

export default class App extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      user: getUser() ?? "",
      size: 50,
      minScore: getRange()[0] ?? 0,
      maxScore: getRange()[1] ?? 10,
    }

    this.searchTimeout = null
    this.setUser = this.setUser.bind(this)
    this.setScore = this.setScore.bind(this)
  }

  setUser(user) {
    clearTimeout(this.searchTimeout)

    this.searchTimeout = setTimeout(() => this.setState({ user }), SEARCH_DELAY)
  }

  setScore(score) {
    saveRange(score)
    this.setState({ minScore: score[0], maxScore: score[1] })
  }

  render() {
    return (
      <div>
        <Header 
          setUser={this.setUser} 
          setScore={this.setScore}  />


        {this.state.user ? <Ranking user={this.state.user}
          maxScore={this.state.maxScore}
          minScore={this.state.minScore} /> 
          : 
          <>
          
          </>}

        <Footer/>
      </div>
    );
  }
}

