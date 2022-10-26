import './App.scss';

import Container from 'react-bootstrap/Container';
import Header from './Header';
import Body from './Body';
import Footer from './Footer';


function App(props = 'radio') {
  return (
   <Container >
    <Header />
    <Body  />
    <Footer />
    </Container>
  );
}

export default App;
