import { useState, useEffect} from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import ToggleButton from 'react-bootstrap/ToggleButton';
import { getCurrentPrice } from '../services/apiService';
import ErrorModal from '../ErrorModal';
import { useSelector, useDispatch } from 'react-redux';
import { setCurrentPrice, setRadioValue, setSelectedCountry  } from '../services/stateService';




function Header ()  {
 
  const [showError, setShowError] = useState (false);
  const [errorMessage, setErrorMessage] = useState ('');
  const currentPrice = useSelector((state) => state.currentPrice); 
  const radioValue = useSelector((state) => state.radioValue);
  const selectedCountry = useSelector((state) => state.selectedCountry);

  const dispach = useDispatch();

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
        dispach(setCurrentPrice(response.data[0].price));
      } catch (error) {
        setShowError(true);
        setErrorMessage(error.message);
      }
    })();
  }, [dispach]);
  


const radios = [
  { name: 'Low Price', value: 'low' },
  { name: 'High Price', value: 'high' },
  
];

function handeleOnChangePrice(event) {
  dispach(setRadioValue(event.currentTarget.value));
};

function handeleOnSelectCountry (key, event) {
  dispach(setSelectedCountry(countries.find(country => country.key === key)));
};



return (
<>
<Row>
  <Col> <h3>Elektrikell</h3> </Col>
    <Col > 
      <DropdownButton className="float-end"
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
        <Col className="text-center">
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
      <Col className="text-end" >HIND {Math.round(currentPrice /10)} €/KWh </Col>
      </Row>
      <ErrorModal errorMessage={errorMessage} show={showError} setShow={setShowError} />
      </>
)

};

export default Header;