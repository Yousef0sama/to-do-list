"use client"

import "@/../public/css/style.scss"
import { useEffect, useRef, useState } from "react"
import { CookiesProvider } from "react-cookie";
import { useCookies } from "react-cookie";


export default function Home() {

  const [task, setTask] = useState([{text: "", com: false}]);
  const [err, setErr] = useState("");
  const [cookies, setCookie] = useCookies()

  const input = useRef();

  if (!cookies.tasks && cookies.tasks != []) {
   
    setCookie("tasks", [{text: "", com: false}, {text: "click me to be completed, click X to delete me", com: false}], {path: "/", maxAge: 63072000});
    useEffect(() => {
    
      setTask(cookies.tasks);

    }, [cookies.tasks]);

  } else {
    useEffect(() => {
    
      setTask(cookies.tasks);

    }, [cookies.tasks]);
  }

  const check = () => {
    if (!input.current.value) {
      setErr("please input your task");
      return false;
    } else {

      for (let i = 0; i < task.length; i++) {
        if (task[i].text == input.current.value ) {
          setErr("this task is already exists");
          return false;
        }  
      }

      for (let i = 0; i < task.length; i++) {
        if (input.current.value && task[i].text != input.current.value) {
          setErr("");
          return true;
        }  
      }
      
    }
  }

  const add = () => {

    if(check()) {
      const text = input.current.value;
      const item = {text: text, com: false}
      input.current.value = "";
      setCookie("tasks", [...cookies.tasks, item], {path: "/", maxAge: 63072000});
    }

  }

  const checkCom = (i) => {
  
    const arr = [...cookies.tasks];

    arr[i].com = !arr[i].com;

    setCookie("tasks", arr)
    
  } 

  const del = (i) => {

    const arr = [...cookies.tasks];

    arr.splice(i, 1);

    setCookie("tasks", arr);

  }

  return (
    <CookiesProvider>
      <div className="container body">
        <div className="row">
          <div className="col col-sm-12 header">
            <h1>To Do List</h1>
          </div>
          <div className="col col-sm-12 show-section">
            <div className="show">
              <h2>Your Tasks</h2>
              <ul>
                {
                  task.map(({ text, com }, index)=>{
                    return (
                      text == "" ? "" : 
                      <p key={index}>
                        <li className={ com ? "done" : "" } onClick={() => {checkCom(index)}}>
                          {text}
                        </li> 
                        <span className="close" onClick={() => {del(index)}}>X</span> 
                      </p>
                    )
                    
                  })
                }
              </ul>
              <div className="col col-sm-12 input-section">
                <form>
                  <input type="text" className="input" placeholder="input your task" ref={input} />
                  <p className="err"> {err ? err : ""} </p>
                  <button type="button" className="btn" onClick={add}>ADD</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </CookiesProvider>
  )
}
