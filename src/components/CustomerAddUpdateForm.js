import React from 'react';
import validator from "validator";

function CustomerForm (params) {
    const{formObject, handleInputChange, onCancelClick, onDeleteClick, onSaveClick, mode} = params;

   //this will check to ensure that the name field is not blank
    const validateName = (name) => {
        if (validator.isEmpty(name)) {
            alert ("Name field cannot be left blank");
            return false;
        } return true;
    }
    
    //this code will check that the email is a valid email 
    const validateEmail = (email) => {
        if (!validator.isEmail(email)) {
            alert ("Please enter a valid email in the format abc@deg.com");
            return false;
        } return true;
    }

    //this code will check the password requirements
    const validatePassword = (password) => {
        if (!validator.isStrongPassword(password, {
            minLength: 10, 
            minLowercase: 1, 
            minUppercase: 1, 
            minNumbers: 2, 
            minSymbols: 1
        })) {
            alert ("Please enter a valid password that includes 10 characters, an upper and lower case letter, 2 numbers and a symbol ");
            return false; 
        } return true;
    }

    //this will check to make sure all the validations are true before allowing a save
    const handleSavingCustomer = () => {
        const isNameValid = validateName(formObject.name)
        const isEmailValid = validateEmail(formObject.email);
        const isPasswordValid = validatePassword(formObject.password); 
        
        if (isNameValid && isEmailValid && isPasswordValid) {
            onSaveClick();
        }
    }
    
    return (
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
                onChange={(e) => params.handleInputChange(e)}
                value={params.formObject.name}
                placeholder="Customer Name"
                required /></td>
            </tr>
            <tr>
              <td className={'label'} >Email:</td>
              <td><input
                type="email"
                name="email"
                onChange={(e) => params.handleInputChange(e)}
                value={params.formObject.email}
                placeholder="name@company.com" /></td>
            </tr>
            <tr>
              <td className={'label'} >Pass:</td>
              <td><input
                type="text"
                name="password"
                onChange={(e) => params.handleInputChange(e)}
                value={params.formObject.password}
                placeholder="password" /></td>
            </tr>
            <tr className="button-bar">
              <td colSpan="2">
                <input type="button" value="Delete" onClick={params.onDeleteClick} />
                <input type="button" value="Save" onClick={handleSavingCustomer} />
                <input type="button" value="Cancel" onClick={params.onCancelClick} />
              </td>
            </tr>
          </tbody>
        </table>
      </form>
    </div>);
}
//line 87 updated to the handleSavingCustomer to be sure validation runs before saving

export default CustomerForm;