import React, {useState, useEffect} from 'react';
import './App.css';
import Axios from 'axios';
import Card from './components/cards/Cards';


function App() {

const [values, setValues] = useState();
const [listenGames, setListenGames] = useState();

console.log(listenGames)
const handleCangeValues = (value) =>{

  setValues(preValue => ({
    ...preValue,
    [value.target.name]: value.target.value,
  }))
}
const handleClickbutton = () =>{
  Axios.post("http://localhost:3001/register",{
    name: values.name,
    cost: values.cost,
    category: values.category,  
  }).then((response) => {
    console.log(response);
  });
};

useEffect(()=>{
   Axios.get("http://localhost:3001/getCards").then((response)=>{
    setListenGames(response.data);
   })
},[])

  return (
    <div className="App--container">
      <div className='register--container'>
        <h1 className='register--title'>Scrim Shop</h1>
          <input type="text" name="name" placeholder="Name" className='register--input' onChange={handleCangeValues} />
          <input type="text" name="cost" placeholder="Preco" className='register--input' onChange={handleCangeValues} />
          <input type="text" name="category" placeholder="Categoria" className='register--input'  onChange={handleCangeValues} />
          <button className='register--button'  onClick={() => handleClickbutton()} >Cadastrar</button> 
       </div>
       {typeof listenGames !== "undefined" && listenGames.map((value) =>{
          return <Card/>
       })}
    
    </div>
  );
}

export default App;
