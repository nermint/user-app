import React, { useEffect, useState } from 'react';
import './UserUpdate.css';
import { apiInstance, localInstance } from '../../api/instance';
import FormErrors from '../../shared/FormErrors';

const initialState = { firstname: '',lastname:'',email:'',country:'', address: ''};

export const UserUpdate = () => {
  const [countries, setCountries] = useState([]);
  const [formState, setFormState] = useState(initialState);
  const [formErrors, setFormErrors] = useState(initialState);
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
    validateField(event.target);
    const {name, value} = event.target;
    setFormState({ ...formState, [name]: value });
  };

  const checkValue = (value) =>{
    return value ? '' : 'Field is required';
  }

  const validateField = ({name, value}) => {
    setFormErrors({...formErrors, [name]: checkValue(value)});
  };

  const validate = () =>{
    const obj = {};
    for (const [name, value] of Object.entries(formState)) {
      obj[name] = checkValue(value);
    }
    setFormErrors(obj);
    return !Boolean(Object.values(obj).filter(err => err).length);
  }

  const onSubmitForm = (event) => {
    event.preventDefault();
    setSubmitted(true);
    const isValid = validate();
    if(isValid){
      localInstance.post('users',formState).then(res=>{
        setFormState(initialState);
        alert('User added');
      });
    }
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
            {submitted && <FormErrors message={formErrors.firstname}/>}
          </div>
          <div className="form-group my-3">
            <label htmlFor="lastname">Last Name</label>
            <input type="text" className="form-control ml-2" name='lastname' id="lastname" value={formState.lastname} onChange={handleChange} placeholder="Enter last name" />
            {submitted && <FormErrors message={formErrors.lastname}/>}
          </div>
        </div>
        <div className="form-group mb-3">
          <label htmlFor="email">Email</label>
          <input type="email" className="form-control" name='email' id="email" value={formState.email} onChange={handleChange} placeholder="Enter email" />
          {submitted && <FormErrors message={formErrors.email}/>}
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
          {submitted && <FormErrors message={formErrors.country}/>}
        </div>
        <div className="form-group mb-3">
          <label htmlFor="country">Address</label>
         <textarea className='form-control' rows="3" name='address' cols="10" value={formState.address} onChange={handleChange} placeholder='Enter your address'></textarea>
         {submitted && <FormErrors message={formErrors.address}/>}
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
      </div>
      </div>
    </>
  )
}

export default UserUpdate;