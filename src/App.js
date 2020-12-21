import './App.css';
import Button from 'react-bootstrap/Button';
import {Container, Row, Col, Alert} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState, useEffect } from 'react';
const ReactMarkdown = require('react-markdown');

const pages = [
  {
    title : "A day at Columbia -- Choose your own Adventure!",
		details: `This game was created as a final project for Origins and Meaning.

    You should run through the game multiple times -- it's short -- and keep an eye out for anything that changes every time you play the game.

    You'll see a lightbulb button at the bottom of some pages. If you click that button, you'll get a hint about any scientific concepts that appear on that page of the story. (More details will be in the explainer.)

    Hit the explainer button below if you want some more info about the scientific concepts in the game, but you should play it through a few times first!
    
    Written and developed by Pierre Rodgers`,
    options:[
      {
        text:"Start",
        next:1
      },
      {
        text:"Explainer",
        next:14
      }
    ],
    peek:""
  }, 
  {
    title : "Havemeyer 309. Physics Lecture.",
		details: "'To sum up, the act of observation on a photon does have an impact on that photon's position. As we see in the double slit experiment, the probability wave collapses when we observe a photon's position. Good luck with the reading, and see you next class.' The professor booms across the lecture hall filled with attentive eyes and minds squinting and shaking at the thought of physical uncertainty. 'Wow,' you think to yourself. It's pretty impressive that the mere act of observation can have an impact on our perception of reality.\nYou gather your belongings, your head still hurting a little from this perceived undermining of fundamental bases of reality, and you head to the front of the lecture hall. SHOELACE You have a couple more questions about today's lecture — do you talk to the professor, or do you leave the lecture hall?",
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
    replace:{
      target:"SHOELACE",
      with:["You notice your shoelace is undone, so you take a minute to tie up your shoe.", ""],
      frequency:0.8
    },
    peek : "Is your shoelace untied? 80% of the time you play the game, it will be."
  },
  {
    title : "You head up to the front of the lecture hall.",
		details: "'Professor,' you say quietly, your eyes drawn to his bright COLOR bowtie. 'I just can't get over the fact that something changes when we observe it. Surely a photon is in one place or another, we just don't know until we look?'\n 'It's not quite that simple, actually,' he responds. 'Until you observe the photon, its location is literally uncertain — it follows a certain probabilistic wave function that collapses upon observation. It's in neither location until you actually look!' You scratch your chin, this all seems so much to take in.\n 'Have a closer reading of this week's chapter, maybe that'll help it settle in a bit.' You say thanks, and walk away. You remember that one philosophy lecture you went to, about epistemology; the professor asked — how do you know there aren't 100 goblins outside the door of the lecture hall right now? This lecture would suggest that you don't know until you observe; it's not just a philosophical question, but a literal manifestation of the logic of quantum mechanics! You leave the room — no goblins! — and where do you head next?",
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
    replace:{
      target:"COLOR",
      with:["red", "orange"],
      frequency:0.4
    },
    peek : "Is the professor's tie red? 40% of the time it will be. 60% of the time, it'll be orange."
  },
  {
    title : "You head into the hallway",
		details: "As you walk out, you remember that one philosophy lecture you went to, about epistemology; the professor asked — how do you know there aren't 100 goblins outside the door of the lecture hall right now? This lecture would suggest that you don't know until you observe; it's not just a philosophical question, but a literal manifestation of the logic of quantum mechanics! You leave the room — no goblins!\nYou step out the door, but you hear someone calling your name. You stop, turn around, and FRIENDNAME is behind you! 'Hey!' you say. 'Fancy seeing you here.'\n 'It's been a while!' FRIENDNAME says. 'A couple of friends and I are heading to the lawns outside Butler for a picnic.' You notice the rug in FRIENDNAME's hand. 'Wanna come?'",
    replace : {
      target: "FRIENDNAME",
      with: ["Will", "Tara"],
      frequency: 0.3
    },
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
    peek : "Who did you run into? Will or Tara. Most likely Tara (70% of the time), but maybe Will (30% of the time)."
  },
  {
    title : "You're heading back to your dorm.",
		details: "You trudge across campus, down Low steps, and through College Walk onto Broadway. A few more blocks, and you're at your dorm. You notice some leaves starting to fall from the mostly-green trees — a reminder of the fall foliage that'll soon arrive! The ground is still a bit damp from last night's rain, but now the sun is shining with barely a cloud in the sky. Into your building, past the group huddling out the front discussing Thursday night plans, up the elevator, and into your dorm. Your roommate is sitting at their desk, busy studying, so you don't say anything. \n You realise you forgot to eat breakfast this morning, so you look in the fridge for some leftovers. Luckily, there's a FOOD sitting there. Sitting at your desk, you scoff down the meal before you remember you have another lecture in twenty minutes. Do you go?",
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
    replace : {
      target: "FOOD",
      with: ["leftover salad from Sweetgreen", "half-eaten burrito from Chipotle"],
      frequency: 0.5
    },
    peek : "What food is in the fridge? Sometimes Sweetgreen, sometimes Chipotle. 50/50 chance."
  },
  {
    title : "You head to John Jay Dining Hall",
		details: "You leave the lecture hall and head out across campus, down Low Steps, past Butler on your way to John Jay. The leaves have started to change, and the ground outside John Jay has started to be covered with the brown, red, and orange foliage. You swipe your card and head into the dining hall, the hubbub of people chatting and the clinking of cutlery fills the room. In the kitchen now, some 2000s pop tune blaring through the speakers. FOOD on offer today, not your favourite but it'll do! You grab a plate, and go to sit down. Where do you sit?",
    replace: {
      target:"FOOD",
      with:["General Tso's Chicken", "Meatball Pasta"],
      frequency:0.2
    },
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
    peek : "What's on offer in the kitchen. Probably Meatball Pasta, but sometimes (20% of the time) it's General Tso's Chicken."
  },
  {
    title : "You're on your way to the picnic.",
		details: "You follow your friend out of Havemeyer, down Low Steps, across campus and onto the lawns out the front of Butler. There's a group of NUMBER or so sitting there, picnic rugs scattered across the grass, someone's brought a portable speaker and is playing some music — you recognise the song, it's your favourite part, the moment just before the chorus. Goosebumps.\n 'Guys,' you exclaim, 'I just had the wildest lecture in my physics class.' Some people listen to your story about quantum mechanics and photons and electrons, others tune out and start up their own conversation. You wonder how they're not as struck by the thought of quantum probability and uncertainty as you are! You sit there, chatting, revelling in the sunshine, smiling. Then it hits you — you have lecture in 20 minutes! Do you go?",
    replace:{
      target:"NUMBER",
      with:["6", "10"],
      frequency:0.5
    },
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
    peek : "How big is the group? About 6 people, or about 10?"
  },
  {
    title : "You've got an economics lecture to get to!",
		details: "You rush to your class, and make it in the nick of time! You sit down in the lecture hall, and FRIENDNAME sits down beside you. 'Hey,' FRIENDNAME says, 'I'm surprised you're here.' You chuckle. 'I know, I always miss this class.' Microeconomics just doesn't have the same intrigue that the mind-breaking questions of physics do.\n Class finishes, and FRIENDNAME asks you if you want to join them for coffee at Joe. You remember, you're meant to be meeting a friend downtown for dinner. Do you go back to your dorm and change, or do you get coffee instead?",
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
    replace:{
      target:"FRIENDNAME",
      with:["Issy", "Alex"],
      frequency:0.4
    },
    peek : "Who do you run into? Issy or Alex? "
  },
  {
    title : "Nap time.",
		details: "You lie your head down on your bed while the hustle and bustle of Broadway outside your window lulls you to sleep. You drift off into a weird half-dream, you're not tired enough to properly fall asleep but you're also not conscious. You hear a ringtone. 'I didn't set an alarm,' you think to yourself. You peel open your eyes and peek at your phone, and see that FRIENDNAME is ringing you. You pick it up.\n 'Missed you in class today buddy!'\n 'I know,' you respond, 'I slept through it! What's up?'\n 'Wanna meet me at Joe for a quick coffee. I've got a free coffee card to use.' FRIENDNAME chuckles. You look at your watch. 4.30pm. You have to meet a friend downtown for dinner but you probably have time. Do you go to get coffee? ",
    replace:{
      target:"FRIENDNAME",
      with:["Issy", "Alex"],
      frequency:0.4
    },
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
    peek : "Who calls you? Issy or Alex?"
  },
  {
    title : "You sit down in the main dining area",
		details: "You walk over to the main dining hall, and spot a free circular table. You rush over to pull up a seat, and at the same time, someone else rushes over to grab the table. You're ready to argue over who gets to claim the table, but as you're about to speak, you look up and realise it's your friend Will. You both sit down, and he strikes up a conversation, something mindless, something about the food. You reach across the table to take the salt and pepper, but you realise the salt is empty! 'Oh well,' you think, 'I didn't really need salt anyway.' 'Did you just come from class?' Will asks.\n 'Yeah! I just had the wildest class, learnt about quantum mechanics and probability wave functions and all sorts of crazy stuff'.\n 'Hey, come on, you know that physics stuff just goes straight over my head.'\n You finish your meal, drop off your dirty dishes, and realise you have lecture in 5! Do you go?",
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
    peek : "The salt shaker is empty. Try the King's Table next time."
  },
  {
    title : "You sit down at the King's Table.",
		details: "You walk over to the King's Table dining area, it's pretty much empty. Nice and peaceful. You pull up a chair at a table next to the window, and stare out at the passers by, when suddenly, someone taps on your shoulder. 'Hey Amber!' She sits down next to you, and starts ranting about some girl she's talking to on Hinge. Your eyes glaze over, and you reach across the table to take the salt and pepper, but you realise the pepper is empty! 'Oh well,' you think, 'I didn't really need pepper anyway.' \n'Did you just come from class?' Amber asks.\n 'Yeah! I just had the wildest class, learnt about quantum mechanics and probability wave functions and all sorts of crazy stuff'.\n 'Hey, come on, you know that physics stuff just goes straight over my head.'\n You finish your meal, drop off your dirty dishes, and realise you have lecture in 5! Do you go?",
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
    peek : "The pepper shaker is empty. Try the main dining hall next time."
  },
  {
    title : "Time for coffee.",
		details: "Your usual order at Joe, you walk out with an oat cortado in hand, and you and your friend sit down on one of the seats outside of Furnald. The sun is only just beginning to set, but it's still warm enough out, pleasant and peaceful. The light is reflecting off Butler in such a pretty way; you tune out of the conversation for a second and appreciate the almost heavenly quality in the air right now. The soft wind that's slowly becoming cooler, the constant movement of people to and from class, the family with the toddler and cutest little puppy running about on the grass. It's almost time to leave for your dinner downtown — do you text your friend to let them know you might be running late?",
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
    peek : ""
  },
  {
    title : "You go back to your dorm to change.",
		details: "You've checked the forecast, and you know it's going to cool right down tonight — not tee shirt weather anymore! You go to your cupboard to take out your favourite COLOR sweatshirt — the one you got at the concert downtown a few weeks ago. It's not there! You remember the stain you got on it the other day, no time to wash it just yet. Anyway, you have options. No need to stress. Do you wear your red sweater, or your navy blue hoodie?",
    options:[
      {
        text:"Red sweater",
        next:13
      },
      {
        text:"Navy blue hoodie",
        next:13
      }
    ],
    replace:{
      target:"COLOR",
      with:["green", "orange"],
      frequency:0.35
    },
    peek : "What colour is the sweatshirt in the wash? 35% of the time it'll be green, 65% of the time it'll be orange."
  },
  {
    title : "Time to head downtown for dinner",
		details: "You rush onto Broadway and run to the 116th 1 station. No trouble swiping your Metrocard, you rush down to the platform — 'Shit! 10 minutes!'. You sit down on one of the seats, pull out your AirPods, and start listening to your favourite podcast — it's this podcast that was turned into a TV show, The Midnight Gospel. You're listening, and the host is talking so prophetically about questions of mortality and life and meaning that you get whisked away into your thoughts, so immersed in this other world that you don't even realise your feet have taken you into the subway car, that you've sat down, that you're on your way to dinner.\nAll you can think about is this podcast — life, what does it all mean? What does our paltry existence in this world matter if we will all die in the end? The universe will die, knowledge will be lost, pretty much everything will be gone, all remnants of memory and thought — even the very thought of your existence will die out! You're so wrapped up in this existential crisis that you aren't really aware of yourself as you climb the subway stairs out up to the sidewalk and step onto the road and your noise cancelling headphones are blocking out the sound of the outside world but they're not loud enough to shut out the blare of the horn of the car that slams into you. And just like that, it all ends.",
    options:[
      {
        text:"Restart",
        next:0
      },
      {
        text:"Explainer",
        next:14
      }
    ],
    peek : ""
  },
]

function App() {
  const [currentPage, setCurrentPage] = useState(0);

  const updatePage = function(page) {
    setCurrentPage(page);
    console.log("Page updated");
  };

  if (currentPage === pages.length) {
    return (
    <Container>
      <div>
        <h1>
          Explainer
        </h1>
        <h5>
          This game was made for a final project for <i>Origins and Meaning</i>
        </h5>

        <h2 id="861763ca-88a4-4c6a-9bd0-5aaaa0ad6b1f" class="">Why a choose your own adventure game?</h2><p id="b711b544-b71c-4367-ad02-1f198760a540" class="">The game aims to illustrate the illusion of choice that we may experience in our reality. When considering what it means to be conscious, there are many philosophical and physical arguments that come into play. In Chapter 5 of Until the End of Time, Greene references an example of seeing a red Ferrari – our perception of seeing a red Ferrari is merely light waves travelling through the air, hitting the back of our eyes, and triggering chemical changes in our brain that we perceive as red (Greene 2020, Chapter 5). Extending this further, perhaps our decisions are made by chemical changes and biological processes as a result of stimuli. This concept can be extended out of just consciousness, however, and we can look at the way that physics work on a more general level: any movement in the universe, any change, can be predicted/reduced to the product of some other physical action. At least in classical physics, given the forces acting upon a given particle, we can predict what will happen to that particle (Greene 2020, Chapter 3). Whilst quantum uncertainty complicates this (as will be addressed later in this explanation), overall, changes/movement is just the product of other movement. </p><p id="b8269bba-17d3-4f24-81ed-1594f406a4a6" class="">
        </p><p id="f311a100-ebe8-4f45-802d-751cb96f5d69" class="">If our minds are merely physical objects made up of molecules and atoms that follow the rules of physics, then <strong>what is it to be conscious?</strong> Is our conception of consciousness just us living out the process of stimuli and input and our brains reacting to that input? And what does that mean for free will? If our own physical movements are just the result of physics, then what does that mean for free will? Are we also <strong>living a pre-ordained path in the way that we ‘choose’ to act?</strong></p><p id="78fcc17c-c329-4ac0-a786-a21bf36f0411" class="">
        </p><p id="50fdace0-681f-422d-a9cd-1bfea7103481" class="">The ending in this game is the same each time, no matter how many times you run the story through, you still reach the same place. Therefore – what does it mean to have free will? <strong>Is the illusion of free will (as you have through the story) enough</strong>? Does that make the experience worthwhile? If we extend this analogy to our real lives, maybe the illusion of free will in our own lives is strong enough to make it worthwhile or meaningful?</p><h2 id="0e15e572-91aa-4183-b114-1ceb3dc420ba" class="">Quantum uncertainty</h2><p id="07bbe368-a6b4-4eb0-80bb-2e6c5cc49082" class="">The game is centred around the player leaving a lecture about quantum uncertainty, and the way that the act of observation can determine certain particle&#x27;s states. Atoms can assume certain states based on whether or not they are observed/interacted with, and the state of a certain atom or molecule can be predicted or explained using a probability function (Greene 2000, Chapter 5). <strong>What if this concept were extended to a larger scale in real life? </strong></p><p id="4f7bd054-a458-460b-a5a8-80e95d5e2d0a" class="">
        </p><p id="6624b84a-be91-43dd-97bd-bd923e020e5c" class="">Scattered through the game are certain small elements that change every time you play the game. For example, if you go up to ask the professor a question, sometimes your shoelace will be untied, and sometimes it will be tied; <strong>the probability that your shoelace is untied is 80%</strong>. If you play the game enough times, this trend will emerge (it&#x27;s been hard coded into the game). There are also other little easter eggs scattered through the game. For example, who do you run into when if you leave the lecture hall instead of asking a question? Is there a probability function that emerges? <strong>Check out the lightbulb hints for more on each page.</strong></p><p id="3c38aea2-193f-442d-a4bf-63d09da6439e" class="">
        </p><p id="5457f12f-f2fb-4c61-afcc-f9639b073239" class="">This mirrors the concept of the particular uncertainties only being decided upon observation; the appearance of certain things follow probability functions just as the location of an electron is unclear until observation. On a larger scale, these concepts are easier to visualise and comprehend.</p><p id="593c73cb-0dfc-4a6d-b83b-10c04454d151" class="">
        </p><h2 id="38cd2ce9-7e39-4f3f-84e0-f0d6e9f71bec" class="">Quantum entanglement</h2><p id="f3a54819-8951-4d1c-b621-e7b5ec94db25" class="">Similar to the inclusion of uncertainty and probability fields, quantum entanglement is incorporated into the story – albeit at a larger scale than it actually plays out in reality. In the game, if you go to John Jay Dining Hall, and go to the main room, you&#x27;ll find that the salt is empty; inversely, if you go to the King&#x27;s Table dining area, the pepper is empty. This mirrors the way that on a quantum level, the spin (or other attributes) of particular electrons, photons, etc. can determine the spin of another particle elsewhere in the universe (Greene 2005, Chapter 4).</p><p id="61afb8e1-a173-42d9-ba72-462d6081473a" class="">
        </p><h2 id="e69d0588-e0c6-4af9-98b8-0cd38e5972de" class="">Mortality</h2><p id="5a6870e9-4de0-4ca4-bd81-66cc3a03fec5" class="">This class has forced students to reckon with and comprehend the reality of mortality, not only on a personal level, but also the death of the universe. As Greene speaks about in <em>Until the End of Time</em>, &quot;[m]ost of us, in the service of sanity, don&#x27;t fixate on the end&quot; (Greene 2020, Chapter 1). How do we respond when our mortality is centred in our experience, when we are reminded of the fact that we will die, no matter what we do. But it&#x27;s not just our own mortality that will occur, but the death of the universe, of thought itself (Greene 2020, Chapter 9). How do we respond to the certainty of mortality and death? What happens when such mortality is unavoidable, despite our choices? Once again, is the illusion or suppression of reality enough?</p><p id="09102cca-e53c-442e-8429-dfcbbc6b7032" class="">
        </p><h3 id="6ea7e6a7-5b30-4c06-8bd2-5a51740355a9" class="">Sources</h3><p id="846d227b-241d-49bc-86ad-ddbdb3c670dc" class="">Green, Brian. <em>The Fabric of the Cosmos</em>. Vintage, 2005.</p><p id="e7db86b0-96fb-4d3b-ad8d-fee0cf7a8022" class="">Greene, Brian. <em>The Elegant Universe -- Superstrings, Hidden Dimensions, and the Quest for the Ultimate Theory</em>. Vintage Books, 2000.</p><p id="a5719e85-9d5d-4e72-a6bb-0707ca25c025" class="">Greene, Brian. <em>Until the End of Time: Mind, Matter, and Our Search for Meaning in an Evolving Universe</em>. Knopf, 2020.</p><p id="03c68840-aad3-4974-90a0-44279f482886" class="">
        </p>

        <Button variant="outline-primary" onClick = {() => {
          setCurrentPage(0);
        }}>
          Restart game
        </Button>
      
      </div>
      
    </Container>
    );
  }

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
  let pageDetails;
  if ("replace" in props.page) {
    const details = props.page.details;
    const random = Math.random();
    const idx = (random < props.page.replace.frequency) ? 0 : 1;
    pageDetails = details.replaceAll(props.page.replace.target, props.page.replace.with[idx]);
  }
  else {
    pageDetails = props.page.details;
  }
  
  return (
    <Col>
      <Row className="mb4">
        <h1>
          {props.page.title}
        </h1>
      </Row>

      <Row>
        <p className="display-linebreak">
          {pageDetails}
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

  if(props.text === "") return null;

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
