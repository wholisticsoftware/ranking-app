import React, { useState, useEffect } from "react";
import logo from './logo.svg';
import './App.css';

import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [hasError, setErrors] = useState(false);
  const [categories, setCategories] = useState({});
  const [catName, setCatName] = useState("");
  const [activeCat, setActiveCat] = useState(null);
    
  useEffect(() => {
    async function fetchData() {
      //const res = await fetch("https://swapi.co/api/planets/");
      const res = await fetch("http://localhost:3001/categories");
      res
        .json()
        .then(res => { 
          console.log("res: " + res);
          setCategories(res) ;
        })
        .catch(err => { 
          console.log("err: " + err);
          setErrors(err);
        });
    }

    fetchData();
  },[]);
    
  let addCategory = (evt) => {
    evt.preventDefault();
    console.info("adding category: " + catName);
    let body = JSON.stringify({"name": catName});
    console.log("body: " + body);
    fetch('http://localhost:3001/categories', {
      method: 'post',
      headers: {'Content-Type':'application/json'},
      body: body
    });
  }
  let activateCategory = async (evt, id) => {
      evt.preventDefault();
      const res = await fetch("http://localhost:3001/categories/"+id);

      if (!res.ok) { throw new Error(res.status); }

      const data = await res.json();
      console.log("data: " + JSON.stringify(data));
      
      setActiveCat(data);
  }
  let deleteCategory = async (evt, _id) => {
      evt.preventDefault();
      const res = await fetch("http://localhost:3001/categories/"+_id, {method:'delete'});
  }
  let updateCategory = async (evt, _id) => {
    let body = JSON.stringify(activeCat);
    const res = await fetch("http://localhost:3001/categories/"+_id, {
      method:'put',
      headers: {'Content-Type':'application/json'},
      body: body
    });      
  }
  return (
    <div className="App">
      <h3>A Simple Demo of API Use</h3>
      <div>
        {activeCat ? <>
          Category: {activeCat.name} ({activeCat._id})<br/>
          <button onClick={(e) => updateCategory(e, activeCat._id)}>Update</button>&nbsp;<button onClick={(e) => deleteCategory(e, activeCat._id)}>Delete</button><br/>
          <textarea name="description" value={activeCat.description} onChange={e => setActiveCat({...activeCat, description: e.target.value})}/>
        </> : ""
        
        }
        <hr />
        <button onClick={addCategory}>Add Category</button><input type="text" name="category-name" value={catName} onChange={e => setCatName(e.target.value)}></input>
        {categories.results ? categories.results.map(({_id, name}) => <div><a href="" onClick={(e) => activateCategory(e, _id) }>{name} - {_id}</a></div>) : ""}
        <br/>
        <hr />
        <span>Has error: {JSON.stringify(hasError)}</span>
      </div>
    </div>
  );
}

export default App;
//<span>{JSON.stringify(categories)}</span>
//<img src={logo} className="App-logo" alt="logo" />
//  <a className="App-link" href="https://reactjs.org" target="_blank" rel="noopener noreferrer">Learn React</a>