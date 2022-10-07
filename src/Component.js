import React,{useState} from 'react';





const SComponent = (props) => {
    const [count, setCount] = useState(0);
    return (
     <div>
        Privet ot {props.firstName} {props.lastName} {count} 
        <button onClick={() => setCount(count+1)} >+</button>
        <button onClick={() => setCount(0)}>Reset</button>
        <button onClick={() => setCount(count-1)}>-</button>
        
     </div>
    )
}

// class CComponent extends React.Component {
//     render () {
//         return (
//             <div>Privet ot Class Component</div>
//         )
//     }
// }


    // function FComponent (){
    //     return (
    //         <div>Privet ot FComponent</div>
    
    //     )
    // }

export default SComponent;