
import './App.css';
import {useState, useEffect} from 'react'
import axios from 'axios'
function App() {
  const [data, setData]= useState('')
  const [datas, setDatas]= useState([])
  const [edit,setEdit]= useState(null)
  const [editt, SetEditt]= useState('')
  const [id2,setId2]=useState(1)
 // const ref =useRef()
 
  const results = (e)=>{
    console.log(datas)
    axios.post('http://localhost:5500/api/item', {item1:data})
    e.preventDefault()

   if(data==='') return null
   else{
    setId2(id2 + 1)
    const update = {
      id:id2,
      message:data
    
    }
    setDatas([...datas].concat(update))
setData('')
   }


  } 

  const del = async (id)=>{
    try{
      axios.delete(`http://localhost:5500/api/item/${datas.message}`)
      const dele= [...datas].filter((all)=> all.id!==id)
      setDatas(dele)
    }
   catch(error){
    console.log(error.message)
   }
  }

  const editing = (id)=>{
    
    
   const upt= [...datas].map((dt)=>{
   
   if(dt.id===id & editt!==''){
    dt.message=editt
}

else if(dt.id===id & editt==''){
 return dt.message
}

    })
setDatas(upt)
    setEdit(null)
    SetEditt('')
  }
  return (
    <div className="App">
<form onSubmit={results}>
<input type='text' value={data} onChange={(e)=>setData(e.target.value)}></input>
<button type='submit'>submit</button>
</form>
  {datas.map((re)=><div key={re.id}>
  {edit===re.id? (<input type='text' value={editt} onChange={(e)=>SetEditt(e.target.value)} placeholder={re.message}></input>):
  (re.message)}

{edit===re.id? (<button onClick={()=> editing(re.id)}>submit</button>):
(<button onClick={()=> setEdit(re.id)}>edit</button>)}
    <button onClick={()=> del(re.id)}>del</button>
    
    
    
  </div>)}

    </div>
  );
}

export default App;
