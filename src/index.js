import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

// ReactDOM отвечает за связь между React и DOM 
// DOM - {Document object model}  обьектная модель документа - это структутра html документа в javascript обьекте.
const root = ReactDOM.createRoot(document.getElementById('root'));
// Здесь мы берём из документа (DOM) элемент с ID "root" и вставляем в этот элемент React App (приложение).
root.render(
    <App />
);

//Render берёт React элементы/комоненты и обрабатывает их в html(DOM)
// Изза кмплненьлв и состояния React изменяет только то что необходимо, следственно работа сайта быстрая.

