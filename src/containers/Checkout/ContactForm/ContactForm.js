import React, { Component } from "react";
import Button from "../../../components/UI/Button/Button";
import Spinner from "../../../components/UI/Spinner/Spinner";
import styles from "../../../css/contactForm.module.css";
import axios from "../../../axios-orders";
import Input from "../../../components/UI/Input/Input";

class ContactForm extends Component {
  state = {
    orderForm: {
      name: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Your Name"
        },
        elementValue: ""
      },
      street: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Street"
        },
        elementValue: ""
      },
      zipCode: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "ZIP Code"
        },
        elementValue: ""
      },
      country: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Country"
        },
        elementValue: ""
      },
      email: {
        elementType: "input",
        elementConfig: {
          type: "email",
          placeholder: "Your E-Mail"
        },
        elementValue: ""
      },
      deliveryMethod: {
        elementType: "select",
        elementConfig: {
          options: [
            { value: "standard", displayValue: "Standard" },
            { value: "fastest", displayValue: "Fastest" }
          ]
        },
        elementValue: ""
      }
    },
    loading: false
  };

  orderHandler = event => {
    event.preventDefault();
    //console.log(this.props.ingredients);
    // alert("You continue!");
    // for firebase its rule to have .json

    this.setState({ loading: true });
    const formData = {};
    //form ElementIdentifier is simply our name, address, zipcode, ...etc
    for (let formElementIdentifier in this.state.orderForm) {
      formData[formElementIdentifier] = this.state.orderForm[
        formElementIdentifier
      ].elementValue;
    }
    console.log(formData);
    const order = {
      ingredients: this.props.ingredients,
      price: this.props.price,
      orderData: formData
    };
    axios
      .post("/orders.json", order)
      .then(response => {
        this.setState({ loading: false });
        this.props.history.push("/");
      })
      .catch(error => this.setState({ loading: false }));
  };

  inputChangedHandler = (event, inputIdentifier) => {
    //console.log(event.target.value);
    //we need to update state order form value and for that we need to do this immutable by using spread operator [...]
    const updatedOrderForm = {
      ...this.state.orderForm
    };
    //for getting data deeply we need to spread it again by using inputIdenrifier, which is in our case name, street, zipcode, ...etc.
    const updatedFormElement = {
      ...updatedOrderForm[inputIdentifier]
    };
    updatedFormElement.elementValue = event.target.value;
    updatedOrderForm[inputIdentifier] = updatedFormElement;
    this.setState({ orderForm: updatedOrderForm });
  };

  render() {
    const formElementsArray = [];
    for (let key in this.state.orderForm) {
      formElementsArray.push({
        id: key,
        setup: this.state.orderForm[key]
      });
    }
    let form = (
      <form onSubmit={this.orderHandler}>
        {formElementsArray.map(formElement => (
          <Input
            key={formElement.id}
            elementType={formElement.setup.elementType}
            elementConfig={formElement.setup.elementConfig}
            elementValue={formElement.setup.elementValue}
            changed={event => this.inputChangedHandler(event, formElement.id)}
          />
        ))}
        <Button btnType="Success">ORDER</Button>
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
