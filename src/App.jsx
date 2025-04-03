import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import axios from 'axios'
import Boxes from './components/Boxes'
import "./App.css"
function App() {
  const [count, setCount] = useState([]);
  function getgifs() {
    axios
      .get(
        "https://api.giphy.com/v1/gifs/trending?api_key=KoM752KiyhJo1D6TxKo3EsnColVCJOe3&limit=10&offset=0&rating=g&bundle=messaging_non_clips"
      )
      .then((data) => {
        setCount(data.data.data)
        console.log(data.data);
      })
      .catch((err) => {
        console.log("error",err);
      });
  }
  const[first,setfirst]=useState("")
  return <>
  
  <div className='grid'>
    {
    count && count.map((data,key)=>(<div>
      <Boxes key={key} img={data.images.fixed_height.url} id={data.id} />
    </div>))
    }
    </div>
  
        <button onClick={getgifs}>Click</button>

  </>;
}

export default App
