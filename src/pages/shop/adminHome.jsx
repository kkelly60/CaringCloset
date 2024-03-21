import React, { Component, useEffect, useState} from "react";

export default function AdminHome({userData}) {
    const logOut= () => {
        window.localStorage.clear();
        window.location.href = "./sign-in";
    };

  return (
    <div className="auth-wrapper">
      <div className="auth-inner">

          <button onClick={logOut} className="btn btn-primary">
            Log Out
          </button>
        </div>
      </div>

  );
}