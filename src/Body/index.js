import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer, ReferenceLine, ReferenceArea
} from "recharts";
import { getPriceData } from "../services/apiService";
import ErrorModal from "../ErrorModal";
import moment from 'moment';



function Body(
  {radioValue,
     hourValue,
      setBestTimeRange,
       setWorstTimeRange,
       selectedCountry
      }) {
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [data, setData] = useState(null);
  const [response, setResponse] = useState(null);
  const [hourNowI, setHourNowI] = useState(0);
  const [x1, setX1] = useState(0);
  const [x2, setX2] = useState(0);

  useEffect(() => {
    //внутри открыли асинхронную функцию которая моментально и запускается.
    // немеделенно вызываемая функция 
    (async function () {
      //try - пробует выполнить всё что в его scope
      // при обнаружении ошибки try останавливается и запускает catch scope {} передав ему ошибку
      try {
        // мы спрашиваем если ли ответ с API в состоянии компонента
        if(!response) {
          // если нету то мы делаем запрос и сохраняем в состоянии компонента
          const response = await getPriceData();
          setResponse(response.data);
          return; // гарантируем чтобы код дальше не выполнялся
        }
        // взяв ответ с api мы выбираем выбранную пользователем страну 
        // на массив с данными мы запускаем цыкл MAP который  возвращает нам новый массив
        let priceData = response[selectedCountry.key].map(dataObject => {
          // в цыкле мы с timestamp взяли часы "НН" и назначили x и у
          // у = цена
          // х = время 
          // timestamp = unix timestamp = сколько секунд прошло с 01.01.1970
          return {
            x: moment.unix(dataObject.timestamp).format("HH"),
            y: dataObject.price,
            timestamp: dataObject.timestamp,
          };
        });
        setData(priceData); //назначили новый массив с обработанными данными

        //ищем index в котором записан данный часс
        const hourNowI = priceData.findIndex((dataObject) => {
          return dataObject.x === moment().format("HH");
        });
        setHourNowI(hourNowI);

        // выделяем/фильтруем массив где только будующее время,поскольку знаем чир будущие времяя наступает после 9 индекса
        const futureData = priceData.filter((v, i) => i >= 9);
        const areaPrices = [];

        // допустим ищем 3 самых дешёвых часа,запускаем цыкл на будующие временна
        // каждый цыкл берёт 3 часа / 3 элемента с массива
        // суммирует их и записывает в новый массив с текущим indexom
        //таким образом мы находим самый дешовый диапазон в 3 часа
        futureData.forEach((v, i, arr) => {
          const partData = arr.slice(i, i + hourValue + 1);
          if (partData.length === hourValue + 1) {
            let result = 0;
            for (const p of partData) result += p.y;
            areaPrices.push({ result, i });
          }
          return;
        });

        // сортируем по сумме дешовые в начало
        areaPrices.sort((a, b) => a.result - b.result);
        if (radioValue === 'low'){
          // если ходим знать самые дешовые цены
          // берём будующие времена и ищем обьект с ценой по первому / дешёвому индексу
          // состовляем наши данные для графика и счётчика
          setBestTimeRange({
          from: futureData[areaPrices[0].i + hourValue].x,
          until: futureData[areaPrices[0].i + hourValue].x,
          timestamp: futureData[areaPrices[0].i].timestamp,
          bestPrice: futureData[areaPrices[0].i].y,
          });
          // если хотим самые дорогие то мы переварачиваем самые дешёвые суммы
        } else { 
          areaPrices.reverse();
          setWorstTimeRange({
            from: futureData[areaPrices[0].i + hourValue].x,
            until: futureData[areaPrices[0].i + hourValue].x,
            worstPrice: futureData[areaPrices[0].i].y,
            });
        }
        // добавляем прошлое для графика и назначаем точки выбранного 
          setX1(9 + areaPrices[0].i);
          const x2 = 9 + areaPrices[0].i + hourValue;
          setX2(x2);

      } catch (error) {
        setShowError(true);
        setErrorMessage(error.message);
      }
    })();
  }, [hourValue, data, setBestTimeRange, setWorstTimeRange, radioValue, selectedCountry, response ]);

  return (
    <>
      <Row>
        <Col>
          <ResponsiveContainer width="100%" height="100%" minHeight="500px">
            <LineChart
              width={500}
              height={300}
              data={data}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="x" />
              <YAxis dataKey="y" />
              <Tooltip />
              
              <Line
                type="monotone"
                dataKey="pv"
                stroke="#8884d8"
                activeDot={{ r: 8 }}
              />
              <Line type="monotone" dataKey="y" stroke="#82ca9d" />
              <ReferenceLine x={hourNowI} stroke="red" />
              { radioValue === 'low'
                ? <ReferenceArea x1={x1} x2={x2} stroke="green" fill="green" opacity={0.5} />
                : <ReferenceArea x1={x1} x2={x2} stroke="red" fill="red" opacity={0.5} />
              }
              
            </LineChart>
          </ResponsiveContainer>
        </Col>
      </Row>
      <ErrorModal errorMessage={errorMessage} show={showError} setShow={setShowError} />
    </>
  );
}

export default Body;
