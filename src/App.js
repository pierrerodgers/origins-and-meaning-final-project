import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <Page title = "Welcome to the Choose your own Adventure game!" details = "Details for each page of the game will go here!" options = {["Potential next step", "Potential next step"]}/>
  );
}

function Page(props) {
  /*
    props:
      title : String
      details : String
      options : String
  */
  
  return (
    <div>
      <h1>
        {props.title}
      </h1>

      <p>
        {props.details}
      </p>

      <div>
        {props.options.map((option) => {
          return(<p key={option}>
            {option}
          </p>)
        })}
      </div>
    </div>
  )
}

export default App;
