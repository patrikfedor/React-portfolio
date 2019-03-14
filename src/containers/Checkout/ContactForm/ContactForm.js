import React, { Component } from "react";
import Button from "../../../components/UI/Button/Button";
import Spinner from "../../../components/UI/Spinner/Spinner";
import styles from "../../../css/contactForm.module.css";
import axios from "../../../axios-orders";
import Input from "../../../components/UI/Input/Input";
import {connect} from "react-redux";

class ContactForm extends Component {
  state = {
    orderForm: {
      name: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Your Name"
        },
        elementValue: "",
        elementErrorMessage: "Please add valid name and surname.",
        validation: {
          required: true
        },
        valid: false,
        touched: false
      },
      street: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Street"
        },
        elementValue: "",
        elementErrorMessage: "Please add valid street.",
        validation: {
          required: true
        },
        valid: false,
        touched: false
      },
      zipCode: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "ZIP Code"
        },
        elementValue: "",
        elementErrorMessage: "Please add valid ZIP CODE e.g: 07205.",
        validation: {
          required: true,
          minLength: 5,
          maxLength: 5
        },
        valid: false,
        touched: false
      },
      country: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Country"
        },
        elementValue: "",
        elementErrorMessage: "Please add valid country.",
        validation: {
          required: true
        },
        valid: false,
        touched: false
      },
      email: {
        elementType: "input",
        elementConfig: {
          type: "email",
          placeholder: "Your E-Mail"
        },
        elementValue: "",
        elementErrorMessage: "Please add valid e-mail address.",
        validation: {
          required: true
        },
        valid: false,
        touched: false
      },
      deliveryMethod: {
        elementType: "select",
        elementConfig: {
          options: [
            { value: "standard", displayValue: "Standard" },
            { value: "fastest", displayValue: "Fastest" }
          ]
        },
        elementValue: "standard",
        validation: {},
        valid: true
      }
    },
    formIsValid: false,
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
      ingredients: this.props.ingrds,
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

  checkValidity(value, rules) {
    let isValid = true;
    if (rules.required) {
      // using trim to remove white spaces
      isValid = value.trim() !== "" && isValid;
    }
    if (rules.minLength) {
      isValid = value.length >= rules.minLength && isValid;
    }
    if (rules.maxLength) {
      isValid = value.length <= rules.maxLength && isValid;
    }
    return isValid;
  }

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
    updatedFormElement.valid = this.checkValidity(
      updatedFormElement.elementValue,
      updatedFormElement.validation
    );
    updatedFormElement.touched = true;
    updatedOrderForm[inputIdentifier] = updatedFormElement;
    //console.log(updatedFormElement);
    let formIsValid = true;
    for (let inputIdentifier in updatedOrderForm) {
      formIsValid = updatedOrderForm[inputIdentifier].valid && formIsValid;
    }
    // console.log(formIsValid);
    this.setState({ orderForm: updatedOrderForm, formIsValid: formIsValid });
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
            invalid={!formElement.setup.valid}
            shouldValidate={formElement.setup.validation}
            touched={formElement.setup.touched}
            errorMessage={formElement.setup.elementErrorMessage}
            changed={event => this.inputChangedHandler(event, formElement.id)}
          />
        ))}
        <Button btnType="Success" disabled={!this.state.formIsValid}>
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

const mapStateToProps = state => {
  return {
    ingrds: state.ingredients,
    price: state.totalPrice
  }
}

export default connect(mapStateToProps)(ContactForm);
