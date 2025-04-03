import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import axios from 'axios'
import Boxes from './components/Boxes'

function App() {
  const [count, setCount] = useState({});
  function getgifs() {
    axios
      .get(
        "https://raw.githubusercontent.com/PokeAPI/cries/main/cries/pokemon/latest/132.ogg"
      )
      .then((data) => {
        setCount(data.data.data)
        console.log(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  const[first,setfirst]=useState("")
  return <>
  {
    count && count.map((data,key)=>(<div>
      <Boxes key={data.id} img={data.url} id={data.id} />
    </div>))
  }
  
  </>;
}

export default App
