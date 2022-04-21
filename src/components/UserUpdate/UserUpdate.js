import React, { useEffect, useState } from 'react';
import './UserUpdate.css';
import { apiInstance } from '../../api/instance';
import FormErrors from '../../shared/FormErrors';

export const UserUpdate = () => {
  const [countries, setCountries] = useState([]);
  const [formState, setFormState] = useState({ firstname: '',lastname:'',email:'',country:'', address: ''});
  const [formErrors, setFormErrors] = useState({ firstname: '',lastname:'',email:'',country:'', address: '' });
  const [submitted, setSubmitted] = useState(false);

  useEffect(()=>{
    getCountries();
  },[]);

  const getCountries = () =>{
    apiInstance.get('all').then((res) => {
      setCountries(res.data);
    });
  }

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setFormState({ ...formState, [name]: value });
  };

  const validate = () =>{

  }

  const onSubmitForm = (event) => {
    console.log(event);
    event.preventDefault();
    setSubmitted(true);
    const isValid = this.validate();
    console.log('submitting', formState);
  };

  return (
    <>
      <div className="container-form">
      <div className="wrap-form">
      <form onSubmit={onSubmitForm} noValidate>
        <div className='form-title text-center'><h2>Add User</h2></div>
        <div className='form-inline d-flex justify-content-between'>
          <div className="form-group my-3">
            <label htmlFor="firstname">First Name</label>
            <input type="text" className="form-control mr-2" name='firstname' id="firstname" value={formState.firstname} onChange={handleChange} placeholder="Enter first name" required/>
            {submitted && <FormErrors control={formState.firstname} name={'First name'}/>}
          </div>
          <div className="form-group my-3">
            <label htmlFor="lastname">Last Name</label>
            <input type="text" className="form-control ml-2" name='lastname' id="lastname" value={formState.lastname} onChange={handleChange} placeholder="Enter last name" />
          </div>
        </div>
        <div className="form-group mb-3">
          <label htmlFor="email">Email address</label>
          <input type="email" className="form-control" name='email' id="email" value={formState.email} onChange={handleChange} placeholder="Enter email" />
        </div>
        <div className="form-group mb-3">
          <label htmlFor="country">Country</label>
          <select className='form-control' id='country' name='country' value={formState.country} onChange={handleChange}>
            <option value="" disabled> 
            </option> 
            {countries.length && countries.map((item,index)=>(
               <option key={item?.name?.common} value={item?.name?.common}>{item?.name?.common}</option>
            ))}
          </select>
        </div>
        <div className="form-group mb-3">
          <label htmlFor="country">Address</label>
         <textarea className='form-control' rows="3" name='address' cols="10" value={formState.address} onChange={handleChange} placeholder='Enter your address'></textarea>
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
      </div>
      </div>
    </>
  )
}

export default UserUpdate;