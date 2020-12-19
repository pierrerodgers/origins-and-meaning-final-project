import logo from './logo.svg';
import './App.css';
import Button from 'react-bootstrap/Button';
import {Container, Row, Col} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <Container>
      <Page title = "Welcome to the Choose your own Adventure game!" details = "Details for each page of the game will go here!" options = {["Potential next step", "Potential next step"]}/>
    </Container>
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
    <Col>
      <Row>
        <h1>
          {props.title}
        </h1>
      </Row>
      <Row>
        <p>
          {props.details}
        </p>
      </Row>
      <Row>
        {props.options.map((option) => {
            return(
            <Col>
              <Button variant = "primary" key={option}>
                {option}
              </Button>
            </Col>)
          })}
      </Row>
    </Col>
    
  )
}

export default App;
