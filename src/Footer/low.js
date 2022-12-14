import ButtonGroup from "react-bootstrap/ButtonGroup";
import ToggleButton from "react-bootstrap/ToggleButton";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Countdown from 'react-countdown';
import React from "react";
import { useState } from 'react';
import { useEffect } from "react";
import moment from "moment";
import './footer.scss';
import { useSelector, useDispatch } from "react-redux";
import { setHourValue } from "../services/stateService";
import { useParams, useNavigate } from "react-router-dom";
import { localUrl } from "../services/apiService";

function Low() {
  const [showElement, setShowElement] = useState("countdown");
  const [time, setTime] = useState(null);
  const hourValue = useSelector((state) => state.hourValue);
  const dispatch = useDispatch();
  const { hours } = useParams();
  const navigate = useNavigate();
  const currentPrice = useSelector((state) => state.currentPrice);
  const bestTimeRange = useSelector((state) => state.bestTimeRange);
  
  const cheapHours = [
    { label: "1h", value: 1 },
    { label: "2h", value: 2 },
    { label: "3h", value: 3 },
    { label: "4h", value: 4 },
    { label: "6h", value: 6 },
    { label: "8h", value: 8 },
  ];

  useEffect(() => {
    const countDownUntil = moment.unix(bestTimeRange.timestamp).toDate();
    setTime(countDownUntil);
    dispatch(setHourValue(+hours || 1));
    if (bestTimeRange.timestamp > moment().unix()) {
      setShowElement("countdown");
    } else {
      setShowElement("Right now");
    }
  }, [bestTimeRange, hours, dispatch]);

  function handleOnChange(event) {
    const hour = event.currentTarget.value;
    navigate(localUrl + '/low/' + hour)
    dispatch(setHourValue(+hour));
  }

  return (
    <div className="text-center">
      <Row>
        <Col>
          <ButtonGroup className="hourButton mt-4 ml-3">
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
        <Col className="besttime mt-3 ml-2 fs-5">
          Parim aeg selleks on {`${bestTimeRange.from}:00st ${bestTimeRange.until}:00ni`}, milleni on j????nud
        </Col>
      </Row>

      <Row>
        <Col className="timer m-1 ml-1">
          {showElement === "countdown" && time ? (
            <Countdown date={time} />
          ) : (
            <h3>Right Now!</h3>
          )}
        </Col>
      </Row>

      <Row>
        <Col className="besttime fs-3 m-0 text-success">
          Siis on kilovatt-tunni hind {Math.round(bestTimeRange.bestPrice / 10)}{" "}
          senti, mis on{" "}
          {Math.round(100 - (bestTimeRange.bestPrice / currentPrice) * 100)} %
          odavam kui praegu
        </Col>
      </Row>
    </div>
  );
}

export default Low;