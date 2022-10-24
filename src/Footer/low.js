import ButtonGroup from "react-bootstrap/ButtonGroup";
import ToggleButton from "react-bootstrap/ToggleButton";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Countdown from 'react-countdown';
import {useState} from 'react';
import { useEffect } from "react";
import moment from "moment";

function Low({ hourValue, setHourValue, bestTimeRange, currentPrice }) {

    const [showElement, setShowElement] = useState ('countdown');
    const [time, setTime] = useState (null);

    const cheapHours = [
        { label: '1h', value: 1 },
        { label: '2h', value: 2 },
        { label: '3h', value: 3 },
        { label: '4h', value: 4 },
        { label: '6h', value: 6 },
        { label: '8h', value: 8 },
      ];

    useEffect(() => {
      const countDownUntil = moment.unix(bestTimeRange.timestamp).toDate();
      setTime(countDownUntil);
    }, [bestTimeRange])
    



    function handleOnChange(event) {
        const hour = event.currentTarget.value;
        if(bestTimeRange.timestamp > moment().unix()) { 
          setShowElement ('countdown'); 
        } else  { setShowElement ('right now');
        }
        setHourValue(+hour);
    };
    

     
    return (
      <>
        <Row>
          <Col>
            <ButtonGroup className="hourButton">
              {cheapHours.map((hour) => (
                <ToggleButton
                  className="duration"
                  key={hour.value}
                  type="radio"
                  name="hour"
                  id={`hour-${hour.value}`}
                  variant={"warning"}
                  value={hour.value}
                  checked={hourValue === hour.value}
                  onChange={handleOnChange}
                >
                  {hour.label}
                </ToggleButton>
              ))}
            </ButtonGroup>
          </Col>
        </Row>

        <Row>
          <Col>Parim aeg selleks on {`${bestTimeRange.from}:00st ${bestTimeRange.until}:00ni`}, milleni on jäänud</Col>
        </Row>

        <Row>
          <Col>   
            {showElement === 'countdown' && time ? <Countdown date = {time} /> : <h3>Right Now!</h3>}
          </Col>
        </Row>  

        <Row>
          <Col>
            Siis on kilovatt-tunni hind {Math.round(bestTimeRange.bestPrice /10)} senti, 
            mis on {Math.round(100 - bestTimeRange.bestPrice / currentPrice * 100)} % odavam kui praegu
          </Col>
        </Row>
      </>
    );
}

export default Low;