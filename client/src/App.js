import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <form className="registery-box">
          <img src={logo} className="App-logo" alt="logo" />
          <p> Create Your Account </p>
          <label for="username">Username:</label>
          <input type="text" id="username" name="username" placeholder="Enter your username"></input>
          <label for="password">Password:</label>
          <input type="password" id="password" name="password" placeholder="Enter your password"></input>
          <button className = "register-button"> Register </button>
        </form> 
      </header>
      
    </div>
  );
}

export default App;
