import React from "react"
import { Range } from 'rc-slider';
import 'rc-slider/assets/index.css';
import { getUser } from "../libs/save"
import "./Header.css"


export default class Header extends React.Component {
    /**
     * 
     * @param {function} props.setUser
     */
    // eslint-disable-next-line no-useless-constructor
    constructor(props) {
        super(props)

    }

    render() {
        return (
            <div className="header">
                <label htmlFor="username">Username: </label>
                <input id="username" onChange={e => this.props.setUser(e.target.value)} placeholder={getUser()}></input>

                <label>Score Range: </label>
                <>
                    <Range
                        className="range"
                        dots
                        min={0} max={10}
                        defaultValue={[0, 10]}
                        allowCross={false}
                        tipFormatter={value => `${value}%`}
                        marks={{ 0: 0, 1: 1, 2: 2, 3: 3, 4: 4, 5: 5, 6: 6, 7: 7, 8: 8, 9: 9, 10: 10 }}

                        onChange={this.props.setScore}
                    />
                </>
            </div>
        )
    }
}