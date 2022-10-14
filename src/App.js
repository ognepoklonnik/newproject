import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { useState } from 'react';
import Container from 'react-bootstrap/Container';

import Header from './Header';
import Body from './Body';
import Footer from './Footer';

// App - React компонент, написан через функцию.
// Компоненты всегда начинаются с Заглавной буквы
// Компоненты как и функции принимают аргументы только называются они тут properties (props)
// Компоненты возвращает (return) React element/JSX
// React элемент должен возвращать только один заглавный элемент
function App(props = 'radio') {
const [radioValue, setRadioValue] = useState('low');
const [hourValue, setHourValue] = useState(1);
// useState - это React hook , позволяющий работать с состоянием компонента
// useState принимает как аргумент изночальное состояние - radioValue = 'low';
// useState вовращает массив из двух эелементов
// [1] = изночальное или новое значение состояние/переменной.
// [2] = функцию которая может изменить значение состояния/переменнойю
// при изменении состония запускается rerender компонента.
// все названия React hook-ов начинаются с 'use', все функции изменения состоянения начинаются с 'set',
  return (
   <Container>
    <Header setRadioValue={setRadioValue} radioValue={radioValue} />
    <Body radioValue={radioValue} hourValue={hourValue} />
    <Footer radioValue={radioValue} hourValue={hourValue} setHourValue={setHourValue}/>

    </Container>
    
  );
}

export default App;
