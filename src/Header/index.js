import { useState, useEffect} from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import ToggleButton from 'react-bootstrap/ToggleButton';
import { getCurrentPrice } from '../services/apiService';
import ErrorModal from '../ErrorModal';



function Header ({currentPrice, setCurrentPrice, radioValue, setRadioValue})  {
 
 
  const [showError, setShowError] = useState (false);
  const [errorMessage, setErrorMessage] = useState ('');


  useEffect(() => {
    (async function () {
      try {
        const response = await getCurrentPrice();
        setCurrentPrice(response.data[0].price);
      } catch (error) {
        setShowError(true);
        setErrorMessage(error.message);
      }
    })();
  }, [setCurrentPrice]);
  


const radios = [
  { name: 'Low Price', value: 'low' },
  { name: 'High Price', value: 'high' },
  
];

function handeleOnChange(event) {
  
  setRadioValue(event.currentTarget.value);
};

return (
<>
<Row>
<Col> <h3>Elektrikell</h3> </Col>
  </Row>
      <Row>
    <Col>Status</Col>
        <Col>
          <ButtonGroup >
            {radios.map((radio, idx) => (
                <ToggleButton
                  key={idx}
                  id={`radio-${idx}`}
                  type="radio"
                  variant={idx % 2 ?  'outline-danger' : 'outline-success'}
                  name="radio"
                  value={radio.value}
                  checked={radioValue === radio.value}
                  onChange={handeleOnChange}
                  >
                  {radio.name} 
                </ToggleButton>
             ))} 
          </ButtonGroup>
        </Col>
      <Col>HIND {Math.round(currentPrice /10)} €/KWh </Col>
      </Row>
      <ErrorModal errorMessage={errorMessage} show={showError} setShow={setShowError} />
      </>
)

};

export default Header;