import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useSelector } from 'react-redux';
import './footer.scss';

function High() {
  const currentPrice = useSelector((state) => state.currentPrice); 
  const worstTimeRange = useSelector((state) => state.worstTimeRange); 
  
    return (
      <div className="text-center">
        <Row>
          <Col className="besttime mt-2 fs-4" >Järgmine tiputund on</Col>
        </Row>
        <Row>
          <Col className="besttime mt-2  text-danger fs-1 ml-2">{`${worstTimeRange.from}:00st ${worstTimeRange.until}:00ni`}</Col>
        </Row>
        <Row>
          <Col className="besttime mt-2">
            Siis on <span className='fs-5'>kilovatt-tunni hind</span> <span className='text-danger fs-3'>{Math.round(currentPrice) / 10}</span> <span className="fs-4">senti</span>,
             mis on <span className='text-danger fs-3'>{Math.round(100 - worstTimeRange.worstPrice / currentPrice * 100)}% </span> kallim kui praegu
          </Col>
        </Row>
        <Row>
          <Col className="besttime mt-2">
            Soovitame tiptundide ajal vähendada elektri tarbimist, et aidata
            kaasa Euroopa ühisele eesmärgile alandada tiputundidel <span className='text-danger fs-5'>-5%</span> elektri
            tarbmist ja vähendada maagaasi nõudlust.
          </Col>
        </Row>
      </div>
    );
}

export default High;