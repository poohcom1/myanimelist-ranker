import React from "react";
import PropTypes from "prop-types";
import LoadingPic from "../assets/anime-loading-gif-8.gif";
import styled from "styled-components";

const MessageScreen = styled.div`
  display: flex;
  justify-content: center;

  margin-top: 50px;

  p {
    color: grey;
    font-weight: 900;
    font-size: larger;
  }
`;

/**
 * Injects Component with promiseData
 * @param {React.Component} Component
 * @returns {React.Component}
 */
export default function withPromiseLoading(Component) {
  class Wrapper extends React.Component {
    constructor(props) {
      super(props);

      this.state = {
        loaded: false,
        error: false,
      };

      this.data = null;
    }

    componentDidMount() {
      this.callPromise();
    }

    callPromise() {
      this.props.promise
        .then((newData) => {
          this.data = newData;

          this.setState({ loaded: true, error: false });
        })
        .catch((e) => {
          console.log(e);
          this.setState({ loaded: false, error: true });
        });
    }

    componentDidUpdate(prevProps) {
      if (JSON.stringify(this.props.deps) !== JSON.stringify(prevProps.deps)) {
        this.setState({ loaded: false, error: false });
        this.callPromise();
      }
    }

    render() {
      return (
        <>
          {this.state.loaded ? (
            <Component promiseData={this.data} {...this.props} />
          ) : (
            <MessageScreen>
              <div>
                {!this.state.error ? (
                  <img src={LoadingPic} alt="Loading..."></img>
                ) : (
                  <p>{this.props.errMessage}</p>
                )}
              </div>
            </MessageScreen>
          )}
        </>
      );
    }
  }

  Wrapper.propTypes = {
    promise: PropTypes.instanceOf(Promise),
    deps: PropTypes.array,
    errMessage: PropTypes.string,
  };

  return Wrapper;
}
