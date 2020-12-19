import logo from './logo.svg';
import './App.css';
import Button from 'react-bootstrap/Button';
import {Container, Row, Col} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from 'react';

const pages = [
  {
    title : "Welcome to the Choose your own Adventure game!",
    details : "Details for each page of the game will go here!",
    options:[
      {
        text:"Potential next step 1",
        next:1
      },
      {
        text:"Potential next step 2",
        next:1
      }
    ]
  },

  {
    title : "Second page!",
    details : "Details for each page of the game will go here!",
    options:[
      {
        text:"Potential next step 1",
        next:0
      },
      {
        text:"Potential next step 2",
        next:0
      }
    ]
  }
]

function App() {
  const [currentPage, setCurrentPage] = useState(0);

  const updatePage = function(page) {
    setCurrentPage(page);
    console.log("Page updated");
  };

  return (
    <Container>
      <Page page={pages[currentPage]} updatePage={updatePage}/>
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
          {props.page.title}
        </h1>
      </Row>

      <Row>
        <p>
          {props.page.details}
        </p>
      </Row>

      <Row>
        {props.page.options.map((option) => {
            return(
            <Col>
              <Button variant = "primary" key={option} onClick={() => {props.updatePage(option.next)}}>
                {option.text}
              </Button>
            </Col>)
          })}
      </Row>

    </Col>
    
  )
}

export default App;
