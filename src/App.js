import React, {useState, useEffect} from 'react';
import { getAll, post, put, deleteById } from './restdb.js';
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
  useEffect(() => { getCustomers() }, [formObject]);

  const getCustomers =  function(){
    log("in getCustomers()");
    getAll(setCustomers);
  }
  //getAll was not returning - issue with memdb.js appeared to be the export portion

  const handleListClick = function(item){
    log("in handleListClick()");
    //if item.id = formobject.id that means it is already selected and should be deselected
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
    let postopCallback = () => {setFormObject(blankCustomer);}
    if (formObject.id >=0) {
      deleteById(formObject.id, postopCallback);
    } else {
        setFormObject(blankCustomer);
    }
  }

  let onSaveClick = function () {
    let postopCallback = () => {setFormObject(blankCustomer); }
    if (mode ==='Add') {
      post(formObject, postopCallback);
    }
    if (mode === 'Update') {
      put(formObject, postopCallback);
    }
    setFormObject(blankCustomer);
    log("in onSaveClick()");
  }
  
  return (
    <div>
      <CustomerList
        customers={customers}
        formObject={formObject}
        handleListClick={handleListClick}/>
      <CustomerForm
        formObject={formObject}
        handleInputChange={handleInputChange}
        onCancelClick={onCancelClick}
        onDeleteClick={onDeleteClick}
        onSaveClick={onSaveClick}
        mode={mode}/>
    </div>
  );
}

export default App;