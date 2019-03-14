import React, { Component } from "react";
import { Route } from "react-router-dom";
import { connect } from "react-redux";

import CheckoutSummary from "../../components/Order/CheckoutSummary/CheckoutSummary";
import ContactForm from "./ContactForm/ContactForm";

class Checkout extends Component {
  checkoutCanceledHandler = () => {
    this.props.history.goBack();
  };

  checkoutContinueHandler = () => {
    this.props.history.replace("/checkout/contact-form");
  };

  render() {
    return (
      <div>
        <CheckoutSummary
          ingredients={this.props.ingrds}
          checkoutContinued={this.checkoutContinueHandler}
          checkoutCanceled={this.checkoutCanceledHandler}
        />
        <Route
          path={this.props.match.path + "/contact-form"}
          component={ContactForm}
        />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    ingrds: state.ingredients
  };
};

export default connect(mapStateToProps)(Checkout);
