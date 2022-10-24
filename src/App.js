import './App.scss';
import { useState } from 'react';
import Container from 'react-bootstrap/Container';

import Header from './Header';
import Body from './Body';
import Footer from './Footer';


function App(props = 'radio') {
const [currentPrice, setCurrentPrice] = useState(0);  
const [radioValue, setRadioValue] = useState('low');
const [hourValue, setHourValue] = useState(1);
const [bestTimeRange, setBestTimeRange] = useState({
  from: 0,
  until: 0,
  timestamp: null,
  bestPrice: 0,
});

const [worstTimeRange, setWorstTimeRange] = useState({
  from: 0,
  until: 0,
  worstPrice: 0,
});

const [selectedCountry, setSelectedCountry] = useState ({key:'ee', title: 'Eesti'});

  return (
   <Container>
    <Header 
    setRadioValue={setRadioValue} 
    radioValue={radioValue}
    currentPrice={currentPrice}
    setCurrentPrice={setCurrentPrice}
    selectedCountry={selectedCountry}
    setSelectedCountry={setSelectedCountry}
     />
    <Body 
    radioValue={radioValue}
    hourValue={hourValue}
    setBestTimeRange={setBestTimeRange} 
    setWorstTimeRange={setWorstTimeRange}
    selectedCountry={selectedCountry}
    />
    <Footer 
    radioValue={radioValue}
    hourValue={hourValue}
    setHourValue={setHourValue}
    bestTimeRange={bestTimeRange} 
    currentPrice={currentPrice}
    worstTimeRange={worstTimeRange}/>

    </Container>
    
  );
}

export default App;
