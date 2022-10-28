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
import './header.scss';
import Logo from './Logo.png';


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
        const response = await getCurrentPrice(selectedCountry);
        dispach(setCurrentPrice(response.data[0].price));
        console.log(response.data);
      } catch (error) {
        setShowError(true);
        setErrorMessage(error.message);
      }
    })();
  
  }, [dispach, selectedCountry]);
  


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

console.log(currentPrice);



return (
<>
<Row>
  <Col> 
    <h3 >
    <img src={Logo} width="300" alt='Elektrikell-logo'/>

    </h3>
  </Col>
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
    <Col> <div className='status'>Status</div></Col>
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
      <Col className="text-end" >HIND {currentPrice} €/KWh </Col>
      </Row>
      <ErrorModal errorMessage={errorMessage} show={showError} setShow={setShowError} />
      </>
)

};

export default Header;