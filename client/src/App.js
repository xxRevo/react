import logo from './logo.svg';
import './App.css';

async function digestMessage(message) {
  const msgUint8 = new TextEncoder().encode(message); 
  const hashBuffer = await crypto.subtle.digest("SHA-256", msgUint8); 
  const hashArray = Array.from(new Uint8Array(hashBuffer)); 
  const hashHex = hashArray
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
  return hashHex;
}

async function validatePassword(password) {
  return true;
}

function register_function(event) {
    event.preventDefault(); // REMOVES PAGE REFRESH ON BUTTON CLICK
    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;
    var password2 = document.getElementById("password2").value;

    if(password === password2) {
      if(validatePassword(password)) {
        console.log("Username: " + username);
        console.log("Password: " + password);
        digestMessage(username).then((username_digestHex) => console.log("Hashed Username: ", username_digestHex));
        digestMessage(password).then((password_digestHex) => console.log("Hashed Password: ", password_digestHex));
      }
    }
    else {
      console.log("Passwords do not match!");
    }
}

function App() {
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
            <li>At least 1 numerical character.</li>
          </ul>
          <label for="username">Username:</label>
          <input type="text" id="username" name="username" placeholder="Enter your username"></input>
          <label for="password">Password:</label>
          <input type="password" id="password" name="password" placeholder="Enter your password"></input>
          <label for="confirm_password">Confirm Password:</label>
          <input type="password" id="password2" name="password2" placeholder="Re-enter your password"></input>
          <button className = "register-button" onClick={register_function}> Register </button>
        </form> 
      </header>
    </div>
  );
}

export default App;
