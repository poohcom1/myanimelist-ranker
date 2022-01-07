import React from "react"
import { Link, Route, Routes } from "react-router-dom"
import "./Header.css"
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { getUser } from "../libs/save"

const HeaderItemDiv = styled.div`
    padding: 10px;

    background-color: ${props => props.active ? "var(--bg-secondary)" : "white"};
    color: ${props => props.active ? "white" : "var(--primary)"};

    text-decoration: none;

    &:hover {
        background-color: var(--bg-hover);
        color: white;
    }
`

const HeaderStyledText = styled.p`
    text-decoration: none;
`

const HeaderItemContainer = styled.div`
    margin: 15px;
    display: flex;
`

const HeaderItem = (props) => (
  <Link to={props.to}>
    <Routes>
      {/* When current path matches, highlight */}
      <Route path={props.to} element={
        <HeaderItemDiv active={true}>
          <HeaderStyledText>{props.children}</HeaderStyledText>
        </HeaderItemDiv>
      } />
      {/* Everything else */}
      <Route path="*" element={
        <HeaderItemDiv active={false}>
          <HeaderStyledText>{props.children}</HeaderStyledText>
        </HeaderItemDiv>
      } />
    </Routes>
  </Link>
)

const UserInput = styled.div`
  margin-left: auto;

  label {
    color: var(--primary);
    font-weight: 600;

    margin-right: 5px;
    margin-left: 5px;
  }

  input {
    height: fit-content;
  }
`

HeaderItem.propTypes = {
  title: PropTypes.string,
  active: PropTypes.bool,
  to: PropTypes.string
}

export default class Header extends React.Component {
  render() {
    return (
      <div className="Header">
        <h1>Anime Ranking!</h1>
        <HeaderItemContainer>
          <HeaderItem to='/myanimelist-ranker'>Ranker</HeaderItem>
          <HeaderItem to='/three-by-three'>3x3</HeaderItem>
        </HeaderItemContainer>

        <UserInput>
          <label htmlFor="username">Username: </label>
          <input id="username" onChange={e => this.props.setUser(e.target.value)} placeholder={getUser()}></input>
        </UserInput>
      </div>
    )
  }
}