import React, { useState } from 'react';
import './signin.css';

function SignUp() {
  const [fname, setFname] = useState('');
  const [lname, setLname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userType, setUserType] = useState('');
  const [secretKey, setSecretKey] = useState('');

  const handleSubmit = (e) => {
    if(userType=="Admin" && secretKey!="CaringCloset"){
      e.preventDefault();
      alert("Invalid Admin")
    } else{
      e.preventDefault();
    }
    e.preventDefault();

    console.log(fname, lname, email, password, userType, secretKey);
    fetch('http://localhost:5542/register', {
      method: 'POST',
      crossDomain: true,
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify({
        fname,
        email,
        lname,
        password,
        userType,
        secretKey,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data, 'userRegister');
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Sign Up</h3>
      Register As
      <div>
        <input
          type="radio"
          name="UserType"
          value="User"
          onChange={(e) => setUserType(e.target.value)}
        />
        User
        <input
          type="radio"
          name="UserType"
          value="Admin"
          onChange={(e) => setUserType(e.target.value)}
        />
        Admin
      </div>
      {userType === 'Admin' ? (
        <div className="form">
          <label>Secret Key</label>
          <input
            type="text"
            className="form-control"
            placeholder="Secret Key"
            onChange={(e) => setSecretKey(e.target.value)}
          />
        </div>
      ) : null}

      <div className="form">
        <label>First name</label>
        <input
          type="text"
          className="form-control"
          placeholder="First name"
          onChange={(e) => setFname(e.target.value)}
        />
      </div>

      <div className="form">
        <label>Last name</label>
        <input
          type="text"
          className="form-control"
          placeholder="Last name"
          onChange={(e) => setLname(e.target.value)}
        />
      </div>

      <div className="form">
        <label>Email address</label>
        <input
          type="email"
          className="form-control"
          placeholder="Enter email"
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      <div className="form">
        <label>Password</label>
        <input
          type="password"
          className="form-control"
          placeholder="Enter password"
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      <div className="d-grid">
        <button type="submit" className="btn btn-primary">
          Sign Up
        </button>
      </div>
      <p className="forgot-password text-right">
        Already registered <a href="/login">sign in?</a>
      </p>
    </form>
  );
}

export default SignUp;


