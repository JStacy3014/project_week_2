import React from 'react';

function CustomerList (params) {
    const{customers, handleListClick, formObject} = params;
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
              {params.customers.map(
                (item, index) => {
                  return (<tr key={item.id} 
                  //below code pulls in css formatting for .selected to make it bold 
                  className={ (item.id===params.formObject.id)?'selected':''}
                  onClick={()=>params.handleListClick(item)} 
                  >
                    <td>{item.name}</td>
                    <td>{item.email}</td>
                    <td>{item.password.replace(/./g, '*')}</td>
                  </tr>);
                }
              )}
            </tbody>
          </table>
      </div>
      </div>
    );
}
//line 27 replaced password with asterisks - is there a better way to do this?

export default CustomerList;