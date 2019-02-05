import React, { Component } from "react";
import Button from "../../../components/UI/Button/Button";
import Spinner from "../../../components/UI/Spinner/Spinner";
import styles from "../../../css/contactForm.module.css";
import axios from "../../../axios-orders";

class ContactForm extends Component {
  state = {
    name: "",
    email: "",
    address: {
      street: "",
      postalCode: ""
    },
    loading: false
  };

  orderHandler = event => {
    event.preventDefault();
    //console.log(this.props.ingredients);
    // alert("You continue!");
    // for firebase its rule to have .json

    this.setState({ loading: true });
    const order = {
      ingredients: this.props.ingredients,
      price: this.props.price,
      customer: {
        name: "Janko Hladný",
        address: {
          street: "Hamburgerová 4",
          zipCode: "04405",
          country: "Hamburgerland"
        },
        email: "janko.hladny@burger.sk"
      },
      deliveryMethod: "okamžite"
    };
    axios
      .post("/orders.json", order)
      .then(response => {
        this.setState({ loading: false });
        this.props.history.push("/");
      })
      .catch(error => this.setState({ loading: false }));
  };

  render() {
    let form = (
      <form>
        <input
          className={styles.Input}
          type="text"
          name="name"
          placeholder="Your Name"
        />
        <input
          className={styles.Input}
          type="email"
          name="email"
          placeholder="Your Mail"
        />
        <input
          className={styles.Input}
          type="text"
          name="street"
          placeholder="Street"
        />
        <input
          className={styles.Input}
          type="text"
          name="postal"
          placeholder="Postal Code"
        />
        <Button btnType="Success" clicked={this.orderHandler}>
          ORDER
        </Button>
      </form>
    );
    if (this.state.loading) {
      form = <Spinner />;
    }
    return (
      <div className={styles.ContactForm}>
        <h4>Enter Your contact Data</h4>
        {form}
      </div>
    );
  }
}

export default ContactForm;
