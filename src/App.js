import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { useState } from 'react';
import { Row, Col, Container, ButtonGroup, ToggleButton } from 'react-bootstrap';




function App() {
    
    const [radioValue, setRadioValue] = useState('1');

    const radios = [
      { name: 'High Price', value: '1' },
      { name: 'Low Price', value: '2' },
      
    ];

  return (
   <Container>
     <Row>
      <Col> <h3>Elektrikell</h3> </Col>
     </Row>
     <Row>
     <Col>Status</Col>
     <Col>
     <ButtonGroup>
        {radios.map((radio, idx) => (
          <ToggleButton
            key={idx}
            id={`radio-${idx}`}
            type="radio"
            variant={idx % 2 ? 'outline-success' : 'outline-danger'}
            name="radio"
            value={radio.value}
            checked={radioValue === radio.value}
            onChange={(e) => setRadioValue(e.currentTarget.value)}
            >
            {radio.name}
          </ToggleButton>
        ))}
      </ButtonGroup>
      </Col>
     <Col>HIND</Col>
     </Row>

     <Row></Row>

     <Row>
     <Col>Järgmine tiputund on</Col>
     </Row>

     <Row>
     <Col>21:00st 22:00ni</Col>
     </Row>

     <Row>
     <Col>Siis on kilovatt-tunni hind 30.00 senti, mis on 26% kallim kui praegu</Col>
     </Row>

     <Row>
     <Col>
     Soovitame tiptundide ajal vähendada elektri tarbimist, et aidata kaasa Euroopa ühisele 
     eesmärgile alandada tiputundidel -5% elektri tarbmist ja vähendada maagaasi nõudlust. Loe lähemalt
     </Col>
     </Row>

    </Container>
    
  );
}

export default App;
