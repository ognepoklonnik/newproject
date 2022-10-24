import { useState, useEffect} from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import ToggleButton from 'react-bootstrap/ToggleButton';
import { getCurrentPrice } from '../services/apiService';
import ErrorModal from '../ErrorModal';




function Header (
  {currentPrice,
     setCurrentPrice,
      radioValue,
       setRadioValue,
        selectedCountry,
        setSelectedCountry})  {
 
  
  const [showError, setShowError] = useState (false);
  const [errorMessage, setErrorMessage] = useState ('');

  const countries = [
    {key:'ee', title: 'Eesti'},
    {key:'fi', title: 'Soome'},
    {key:'lt', title: 'Leedu'},
    {key:'lv', title: 'Läti'}
  ];

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

function handeleOnChangePrice(event) {
  setRadioValue(event.currentTarget.value);
};

function handeleOnSelectCountry (key, event) {
  setSelectedCountry(countries.find(country => country.key === key));
};



return (
<>
<Row>
  <Col> <h3>Elektrikell</h3> </Col>
    <Col> 
      <DropdownButton
            as={ButtonGroup}
            key='Secondary'
            id={`dropdown-variants-${'Secondary'}`}
            variant={'Secondary'.toLowerCase()}
            title={selectedCountry.title}
            onSelect={handeleOnSelectCountry}
          > 
            {countries.map(country => <Dropdown.Item key={country.key} eventKey={country.key}>{country.title}</Dropdown.Item>)}
            
      </DropdownButton>
      </Col>
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
                  onChange={handeleOnChangePrice}
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