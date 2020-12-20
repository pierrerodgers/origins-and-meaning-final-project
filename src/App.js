import './App.css';
import Button from 'react-bootstrap/Button';
import {Container, Row, Col, Alert} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState, useEffect } from 'react';

const pages = [
  {
    title : "Welcome to the choose your own adventure game.",
		details: "Get started!",
    options:[
      {
        text:"Start",
        next:1
      }
    ],
    peek : "This is where some extra info would go about any of the scientific concepts visible on the page."
  }, 
  {
    title : "You're a student at Columbia and you've just finished listening to a lecture about entropy.",
		details: "Do you talk to professor or leave the lecutere hall?",
    options:[
      {
        text:"Talk to professor",
        next:2
      },
      {
        text:"Leave the lecture hall",
        next:3
      }
    ],
    peek : "This is where some extra info would go about any of the scientific concepts visible on the page."
  },
  {
    title : "You ask the professor a question and listen intently.",
		details: "Where do you head next? Your dorm or the dining hall?",
    options:[
      {
        text:"Head to your dorm",
        next:4
      },
      {
        text:"Go to the dining hall",
        next:5
      }
    ],
    peek : "This is where some extra info would go about any of the scientific concepts visible on the page."
  },
  {
    title : "You head into the hallway and bump into your friend",
		details: "They invite you to a picnic on the lawns outside Butler. Do you go with them?",
    options:[
      {
        text:"Yes go with them",
        next:6
      },
      {
        text:"No, go back to your dorm",
        next:4
      }
    ],
    peek : "This is where some extra info would go about any of the scientific concepts visible on the page."
  },
  {
    title : "You're heading back to your dorm.",
		details: "You head up the elevator, into your dorm, and your roommate is there, busy studying. You grab some leftover food (LEFTOVER CHIPOTLE, LEFTOVER SWEETGREEN) from the mini fridge. You have a lecture in 20 mins. Do you go?",
    options:[
      {
        text:"You go to lecture",
        next:7
      },
      {
        text:"No, stay in your dorm and have a nap",
        next:8
      }
    ],
    peek : "This is where some extra info would go about any of the scientific concepts visible on the page."
  },
  {
    title : "You head to John Jay Dining Hall",
		details: "Do you sit down in the main dining area (9), or the one off to the side — the King's Table (10)? ",
    options:[
      {
        text:"Main dining area",
        next:9
      },
      {
        text:"King's Table",
        next:10
      }
    ],
    peek : "This is where some extra info would go about any of the scientific concepts visible on the page."
  },
  {
    title : "You sit down at the picnic, lovely time.",
		details: "You sit down at the picnic, lovely time. You're late to lecture — you forgot! Do you go? Yes (7) or no (8)?",
    options:[
      {
        text:"Go to lecture",
        next:7
      },
      {
        text:"Go back to your dorm and have a nap",
        next:8
      }
    ],
    peek : "This is where some extra info would go about any of the scientific concepts visible on the page."
  },
  {
    title : "You rush to your class, it's an economics (?) lecture.",
		details: "Your friend next to you, A/B, invites you for coffee. You remember you're meant to be meeting a friend downtown for dinner. Do you go back to your dorm and change (12), or do you get coffee (11)?",
    options:[
      {
        text:"Go back to your dorm and change",
        next:12
      },
      {
        text:"Get a coffee with your friend",
        next:11
      }
    ],
    peek : "This is where some extra info would go about any of the scientific concepts visible on the page."
  },
  {
    title : "You have a nap.",
		details: "Wake up. See a text from a friend inviting you for coffee. Do you go get coffee (11), or do you go to the subway to go downtown for dinner (13)?",
    options:[
      {
        text:"Go get coffee",
        next:11
      },
      {
        text:"Go to the subway to go downtown for dinner",
        next:13
      }
    ],
    peek : "This is where some extra info would go about any of the scientific concepts visible on the page."
  },
  {
    title : "You sit down in the main dining area",
		details: "nd run into a friend. On the table there are TWO PEPPER SHAKERS and NO SALT. You've got lecture! Do you go? Yes (7) or no (8)?",
    options:[
      {
        text:"Yes, you go!",
        next:7
      },
      {
        text:"No, you go back to your dorm for a nap.",
        next:8
      }
    ],
    peek : "This is where some extra info would go about any of the scientific concepts visible on the page."
  },
  {
    title : "You sit down at the King's Table.",
		details: "there are TWO SALT SHAKERS and NO PEPPER. You've got lecture! Do you go? Yes (7) or no (8)?",
    options:[
      {
        text:"Yes, you go!",
        next:7
      },
      {
        text:"No, you go back to your dorm for a nap.",
        next:8
      }
    ],
    peek : "This is where some extra info would go about any of the scientific concepts visible on the page."
  },
  {
    title : "You sit down, have a nice coffee.",
		details: "Vibe. Do you text your friend to let them know you might be running 10-15 mins late, or do you just go and hope for the best?",
    options:[
      {
        text:"Text your friend that you're running late",
        next:13
      },
      {
        text:"Go downtown for dinner",
        next:13
      }
    ],
    peek : "This is where some extra info would go about any of the scientific concepts visible on the page."
  },
  {
    title : "You go back to your dorm to change.",
		details: "Your favourite sweatshirt is in the laundry basket! Do you wear RED sweater or BLUE hoodie?",
    options:[
      {
        text:"Red sweater",
        next:13
      },
      {
        text:"Blue sweater",
        next:13
      }
    ],
    peek : "This is where some extra info would go about any of the scientific concepts visible on the page."
  },
  {
    title : "You head downtown for dinner",
		details: "You get in the subway, go downtown. Get off the subway, listen to podcast about mortality. Get hit by a car. END",
    options:[
      {
        text:"Restart",
        next:0
      }
    ],
    peek : "This is where some extra info would go about any of the scientific concepts visible on the page."
  },
]

function App() {
  const [currentPage, setCurrentPage] = useState(0);

  const updatePage = function(page) {
    setCurrentPage(page);
    console.log("Page updated");
  };

  return (
    <Container>
      <Page className="mb-44" page={pages[currentPage]} updatePage={updatePage}/>
      <Row>
        <Col>
          <Peek text = {pages[currentPage].peek}/>
        </Col>
        
      </Row>
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
      <Row className="mb4">
        <h1>
          {props.page.title}
        </h1>
      </Row>

      <Row>
        <p>
          {props.page.details}
        </p>
      </Row>

      <Row className="mb-4">
        {props.page.options.map((option) => {
            return(
            <Col>
              <Button variant = "outline-primary" key={option} onClick={() => {props.updatePage(option.next)}}>
                {option.text}
              </Button>
            </Col>)
          })}
      </Row>
      </Col>

    
  )
}

function Peek(props) {
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect( () => {
    setIsVisible(false);
  }, [props.text])

  if (isVisible) return (
    <Alert variant="info">
      <h2 onClick = {() => {
      setIsVisible(false)
      }}>
        💡
      </h2>
      <p>
        {props.text}
      </p>
    </Alert>
  )

  return(
    
    <div onClick = {() => {
      setIsVisible(true)
    }}>
      <h2>
      💡
      </h2>
      <p>
        Click the lightbulb for more
      </p>
    </div>


  )
}

export default App;
