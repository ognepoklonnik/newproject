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
import { setCurrentPrice, setSelectedCountry  } from '../services/stateService';
import './header.scss';
import Logo from './Logo.png';
import { useNavigate, useLocation } from 'react-router-dom';


function Header (props)  {
 
  const [showError, setShowError] = useState (false);
  const [errorMessage, setErrorMessage] = useState ('');
  const currentPrice = useSelector((state) => state.currentPrice); 
  const selectedCountry = useSelector((state) => state.selectedCountry);
  
  const dispach = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

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
  { name: 'Low Price', value: '/low' },
  { name: 'High Price', value: '/high' },
  
];

function handeleOnChangePrice(event) {
 
  return navigate(event.currentTarget.value);
};

function handeleOnSelectCountry (key, event) {
  dispach(setSelectedCountry(countries.find(country => country.key === key)));
};

return (
<>
<Row>
  <Col> 
    <h3 className="mt-2 ml-3">
    <img src={Logo} width="300" alt='Elektrikell-logo'/>
    </h3>
  </Col>
    <Col > 
      <DropdownButton className="float-end mt-2" 
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

          {/* <Link to="/high"><High /></Link>  <Link to="/low"> <Low {...props} /></Link> */}

          <ButtonGroup>
            {radios.map((radio, idx) => (
                <ToggleButton   
                  key={idx}
                  id={`radio-${idx}`}
                  type="radio"
                  variant={idx % 2 ?  'outline-danger' : 'outline-success'}
                  name="radio"
                  value={radio.value}
                  checked={location.pathname.includes(radio.value) || (idx === 0 && location.pathname === '/')}
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