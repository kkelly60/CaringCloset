import React, { useEffect, useState } from "react";
import "./userDetails.css";
import { useNavigate } from "react-router-dom";



function UserDetails() {
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:5542/userData", {
      method: "POST",
      crossDomain: true,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        token: window.localStorage.getItem("token"),
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data, "userData");
        if (data.status === "ok") {
          setUserData(data);
        }
      })
      .catch((error) => {
        console.error("Fetch error:", error);
      });
  }, []);

  const handleLogout = () => {
    window.localStorage.removeItem("token");
    navigate('/login');
  };

  const isAdmin = userData && userData.data.userType === "admin";

  return (
    <div>
      {userData ? (
        <div>
          <section className="user-details">
            <>
              <h2>Welcome back to your account {userData && userData.data.fname}</h2>
              {userData && (
                <div>
                  <p>Name: {userData.data.fname} {userData.data.lname}</p>
                  <p>Email: {userData.data.email}</p>
                </div>
              )}
              <button onClick={handleLogout}>Logout</button>
              {isAdmin && (
                <button onClick={() => navigate('/adminHome')}>Go to Admin Home</button>
              )}
            </>
          </section>
        </div>
      ) : (
        <div>
          <p>You are not logged in</p>
          <a href="/login" className="login-button">Log In</a>
        </div>
      )}
    </div>
  );
}

export default UserDetails;

