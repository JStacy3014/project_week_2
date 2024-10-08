import React, {useState, useEffect} from 'react';
import { getAll, post, put, deleteById } from './memdb.js';
import './App.css';
import CustomerList from './components/CustomerList.js';
import CustomerForm from './components/CustomerAddUpdateForm.js';

function log(message){console.log(message);}

export function App(params) {
  let blankCustomer = { "id": -1, "name": "", "email": "", "password": "" };
  const [customers, setCustomers] = useState([]);
  //let formObject = customers[0];
  //adding const line to check useState 
  const [formObject, setFormObject] = useState(blankCustomer);
  let mode = (formObject.id >= 0) ? 'Update' : 'Add';
  useEffect(() => { getCustomers() }, []);
 
  const getCustomers =  function(){
    log("in getCustomers()");
    setCustomers (getAll () );
  }
  //getAll was not returning - issue with memdb.js appeared to be the export portion
 
  const handleListClick = function(item){
    log("in handleListClick()");
    //tried setFormObject(item) as if statement and did not work, so switched them and it worked. 
    if(item.id === formObject.id) {
      setFormObject(blankCustomer);
    } else {
      setFormObject(item);
    }
  }  
  
  const handleInputChange = function (event) {
    log("in handleInputChange()");
    const name = event.target.name;
    const value = event.target.value;
    let newFormObject = {...formObject};
    newFormObject[name] = value;
    setFormObject(newFormObject);
  }
  
  let onCancelClick = function () {
    log("in onCancelClick()");
    //below code sets the value of the formObject from "blank customer" variable
    //with this code clicking cancel removes info from input form and de-selects
    setFormObject(blankCustomer);
  }
  
  let onDeleteClick = function () {
    if (formObject.id >=0) {
      deleteById(formObject.id);
    }
    setFormObject(blankCustomer);
  }
 
  let onSaveClick = function () {
    if (mode ==='Add') {
      post(formObject);
    }
    if (mode === 'Update') {
      put(formObject.id, formObject);
    }
    setFormObject(blankCustomer);
    log("in onSaveClick()");
  }
  
  return (
    <div>
      <div className="boxed" >
        <h4>Customer List</h4>
        <table id="customer-list">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Pass</th>
            </tr>
          </thead>
          <tbody>
            {customers.map(
              (item, index) => {
                return (<tr key={item.id} 
                //below code pulls in css formatting for .selected to make it bold 
                className={ (item.id===formObject.id)?'selected':''}
                onClick={()=>handleListClick(item)} 
                >
                  <td>{item.name}</td>
                  <td>{item.email}</td>
                  <td>{item.password}</td>
                </tr>);
              }
            )}
          </tbody>
        </table>
    </div>
    <div className="boxed">
      <div>
        <h4>{mode}</h4>
      </div>
      <form >
        <table id="customer-add-update" >
          <tbody>
            <tr>
              <td className={'label'} >Name:</td>
              <td><input
                type="text"
                name="name"
                onChange={(e) => handleInputChange(e)}
                value={formObject.name}
                placeholder="Customer Name"
                required /></td>
            </tr>
            <tr>
              <td className={'label'} >Email:</td>
              <td><input
                type="email"
                name="email"
                onChange={(e) => handleInputChange(e)}
                value={formObject.email}
                placeholder="name@company.com" /></td>
            </tr>
            <tr>
              <td className={'label'} >Pass:</td>
              <td><input
                type="text"
                name="password"
                onChange={(e) => handleInputChange(e)}
                value={formObject.password}
                placeholder="password" /></td>
            </tr>
            <tr className="button-bar">
              <td colSpan="2">
                <input type="button" value="Delete" onClick={onDeleteClick} />
                <input type="button" value="Save" onClick={onSaveClick} />
                <input type="button" value="Cancel" onClick={onCancelClick} />
              </td>
            </tr>
          </tbody>
        </table>
      </form>
    </div>
    </div>
  );
}

export default App;