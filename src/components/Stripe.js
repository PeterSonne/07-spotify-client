import React from "react";
import { CardElement, injectStripe } from "react-stripe-elements";
import axios from "axios";

class Stripe extends React.Component {
  state = {
    message: {
      content: "",
      type: ""
    }
  };
  pay = () => {
    this.props.stripe.createToken().then(token => {
      console.log(token);
      if (token.hasOwnProperty("error")) {
        let message = token.error;
        message.content = message.message;
        this.setState({ message });
      } else {
        axios
          .post(`${process.env.REACT_APP_API}/pay`, token)
          .then(payment => {
            console.log(payment);
            this.setState({
              message: {
                content: "Payment Successful. Thank you.",
                type: "success"
              }
            });
            setTimeout(this.props.closePaywall(), 2000);
          })
          .catch(err => console.log(err));
      }
    });
  };
  getMessageClass = () => {
    if (!this.state.message.type) {
      return "";
    } else if (this.state.message.type === "success") {
      return "success";
    } else {
      return "error";
    }
  };
  render() {
    return (
      <>
        <CardElement />
        {this.state.message ? (
          <div className={this.getMessageClass()}>
            {this.state.message.content}
          </div>
        ) : (
          ""
        )}
        <button className="submit" onClick={this.pay}>
          Pay
        </button>
      </>
    );
  }
}

export default injectStripe(Stripe);
