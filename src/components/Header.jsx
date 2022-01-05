import React from "react"
import "./Header.css"

export default class Header extends React.Component {
    /**
     * 
     * @param {function} props.setUser
     */
    constructor(props) {
        super(props)

    }

    render() {
        return (
            <div className="header">
                <label htmlFor="username">Username: </label>
                <input id="username" onChange={e => this.props.setUser(e.target.value)}></input>
            </div>
        )
    }
}