import logo from './logo.svg';
import './App.css';
import React, { useState } from 'react';


async function digestMessage(message) {
  const msgUint8 = new TextEncoder().encode(message); 
  const hashBuffer = await crypto.subtle.digest("SHA-256", msgUint8); 
  const hashArray = Array.from(new Uint8Array(hashBuffer)); 
  const hashHex = hashArray
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
  return hashHex;
}

function validatePassword(password) {
  let has_numerical = false;
  let has_upper_case = false;
  let char_count = 0;

  for (let i = 0; i < password.length; i++) {
    let digit = password[i];
    if (Number.isInteger(parseInt(digit))) {
      has_numerical = true;
    }
    else if (digit === digit.toUpperCase()) {
      has_upper_case = true;
    }
    char_count++;
  }
  console.log(has_numerical, " ", has_upper_case, " ", char_count);
  if ((has_numerical && has_upper_case) && (char_count >= 5)) {
    return true;
  }
  else {
    return false;
  }
}

function register_function() {
    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;
    var password2 = document.getElementById("password2").value;

    if(password === password2) {
      if(validatePassword(password)) {
        digestMessage(username).then((username_digestHex) => console.log("Hashed Username: ", username_digestHex));
        digestMessage(password).then((password_digestHex) => console.log("Hashed Password: ", password_digestHex));
        throw new Error('Password created succesfully!')
      } 
      else {
        throw new Error('Oops! Password is not secure enough!');
      }
    }
    else {
      throw new Error('Oops! Passwords do not match!');
    }
}

function App() {
  const [statusMessage, setStatusMessage] = useState(null);

  const handleButtonClick = (event) => {
    event.preventDefault(); // REMOVES PAGE REFRESH ON BUTTON CLICK
    try {
      register_function();
    } catch (status) {
      setStatusMessage(status.message);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <form className="registery-box">
          <img src={logo} className="App-logo" alt="logo" />
          <p className = "title"> Create Your Account </p>
          <p className = "desc"> Password must have:</p>
          <ul>
            <li>At least 5 characters.</li>
            <li>At least 1 upper-case character.</li>
            <li>At least 1 integer.</li>
          </ul>
          <label for="username">Username:</label>
          <input type="text" id="username" name="username" placeholder="Enter your username"></input>
          <label for="password">Password:</label>
          <input type="password" id="password" name="password" placeholder="Enter your password"></input>
          <label for="confirm_password">Confirm Password:</label>
          <input type="password" id="password2" name="password2" placeholder="Re-enter your password"></input>
          <button className = "register-button" onClick={handleButtonClick}> Register </button>
          {statusMessage && <div className='status-message'>{statusMessage}</div>}
        </form> 
      </header>
    </div>
  );
}

export default App;
