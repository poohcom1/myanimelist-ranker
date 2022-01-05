import Ranking from './pages/Ranking'
import React from 'react'
import Header from './components/Header';
import { getUser } from './libs/save';

const SEARCH_DELAY = 500

export default class App extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      user: getUser() ?? ""
    }

    this.setUser = this.setUser.bind(this)
    this.searchTimeout = null
  }

  setUser(user) {
    clearTimeout(this.searchTimeout)

    this.searchTimeout = setTimeout(() => this.setState({ user: user }), SEARCH_DELAY)
  }

  render() {
    return (
      <div>
        <Header setUser={this.setUser} />
        {this.state.user ? <Ranking user={this.state.user} /> : <></>}
      </div>
    );
  }
}

