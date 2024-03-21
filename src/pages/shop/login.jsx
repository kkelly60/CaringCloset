import React, { Component } from 'react';
import "./signin.css";

class Login extends Component {
  constructor(props) {
    super(props)
    this.state = {
      email: "",
      password: ""
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    const { email, password } = this.state;
    //console.log(email, password);

    fetch("http://localhost:5542/login-user", {
      method: "POST",
      crossDomain: true,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data, "userRegister");
        if (data.status == "ok") {
          alert("Login successful");
          window.localStorage.setItem("token", data.data);
          // Store token in a more secure way (e.g., HTTP-only cookie)
          // Redirect to UserDetails page
          window.location.href = "./userDetails";
        } else {
          alert("Login failed");
        }
      })
      .catch((error) => {
        console.error("Error during login:", error);
        alert("An error occurred during login");
      });
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>

        <h3>Sign In</h3>

        <div className="form">
          <label>Email address</label>
          <input
            type="email"
            className="form-control"
            placeholder="Enter email"
            onChange={(e) => this.setState({email: e.target.value})}
          />
        </div>

        <div className="form">
          <label>Password</label>
          <input
            type="password"
            className="form-control"
            placeholder="Enter password"
            onChange={(e) => this.setState({password: e.target.value})}
          />
        </div>

        <div className="form">
          <div className="custom-control custom-checkbox">
            <input
              type="checkbox"
              className="custom-control-input"
              id="customCheck1"
            />
            <label className="custom-control-label" htmlFor="customCheck1">
              Remember me
            </label>
          </div>
        </div>

        <div className="d-grid">
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </div>
        <p className="forgot-password text-right">
          Forgot <a href="#">password?</a>
        </p>
      </form>
    )
  }
}

export default Login;
