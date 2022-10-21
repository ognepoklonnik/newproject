import Low from './low';
import High from './high';

function Footer(props) {
   return (
    <>
        {props.radioValue === 'low' ? (<Low {...props} />) : 
        (<High currentPrice={props.currentPrice} worstTimeRange={props.worstTimeRange}/>)}
    </>
   
    ) 
}
    



export default Footer;