import React, { useEffect, useState } from 'react'
import { getDatabase , push, ref, set, onValue, remove} from "firebase/database";


const App = () => {
  const [inputData, setInputaData]= useState('')

  const [todoList,setTodoList]=useState([])
  const db = getDatabase();


  const handelSubmit =()=>{

    set(push(ref(db, "todos/")), {
      todoname: inputData
    });
    setInputaData('')
  }
  
const handleDelete= (id)=>{
  remove(ref(db,"todos/" + id))
  
}

  useEffect(()=>{

  onValue(ref(db, 'todos/'), (snapshot) => {
    let arr = []
    snapshot.forEach((item)=>{

      arr.push({...item.val(), id: item.key});

      })

    setTodoList(arr)
});
  },[])

  return (
    <div>
      <h1>Attendance</h1>
      <input value={inputData} type="text" placeholder='Present Student' onChange={(e)=>setInputaData(e.target.value)}/>
      <button onClick={handelSubmit}>submit</button>

      <ul>
       {todoList.map((item)=>(
         <li key={item.id}><p>{item.todoname}</p>
          <button onClick={()=>handleDelete(item.id)} className='delete'>Absent</button>
          </li>
       ))}
      </ul>
    </div>
  )
}

export default App