import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

function Category(props) {
  const [activeCat, setActiveCat] = useState(null);
    
   useEffect(() => {
     async function fetchData() {
      const res = await fetch("http://localhost:3001/categories/"+props._id);

      if (!res.ok) { throw new Error(res.status); }

      const data = await res.json();
      console.log("data: " + JSON.stringify(data));
      
      setActiveCat(data);
     }
      fetchData();
  },[]);
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
        <>
      { activeCat ? 
        <div>
          <h2>Category: {activeCat.name}</h2><br/>
            <button onClick={(e) => updateCategory(e, activeCat._id)}>Update</button>&nbsp;<button onClick={(e) => deleteCategory(e, activeCat._id)}>Delete</button><br/>
            <textarea name="description" value={activeCat.description} onChange={e => setActiveCat({...activeCat, description: e.target.value})}/>
        </div>
        :
        <span>Loading Category...</span>
      }
      <Link to="/">Back</Link>
      </>
    )
}

export default Category;