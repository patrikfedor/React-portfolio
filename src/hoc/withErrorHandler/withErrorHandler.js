import React, { Component } from "react";

import Modal from "../../components/UI/Modal/Modal";
import Aux from "../Aux/Aux";

const withErrorHandler = (WrappedComponent, axios) => {
  // using factory class (inner class)
  return class extends Component {
    state = {
      error: null
    };

    componentWillMount() {
      // !!! in interceptors we need to always return particular usage, for response it's response ...etc.
      // with .request interceptors we want to clear errors, when request is sent, so we clear console.error();
      this.reqInterceptor = axios.interceptors.request.use(req => {
        this.setState({ error: null });
        return req;
      });

      // arguments in .use(response, error) and we are interested in 2nd argument
      this.respInterceptor = axios.interceptors.response.use(
        resp => resp,
        error => {
          this.setState({ error: error });
        }
      );
    }

    componentWillUnmount() {
      // set up to see if this works
      //console.log("Will Unmount", this.reqInterceptor, this.respInterceptor);
      axios.interceptors.request.eject(this.reqInterceptor);
      axios.interceptors.response.eject(this.respInterceptor);
    }
    errorConfirmedHandler = () => {
      this.setState({ error: null });
    };
    render() {
      return (
        <Aux>
          <Modal
            show={this.state.error}
            modalClosed={this.errorConfirmedHandler}
          >
            {this.state.error ? this.state.error.message : null}
          </Modal>
          <WrappedComponent {...this.props} />
        </Aux>
      );
    }
  };
};

export default withErrorHandler;
