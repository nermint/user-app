import React, { useEffect, useState } from 'react';
import './UserUpdate.css';
import { apiInstance, localInstance } from '../../api/instance';
import FormErrors from '../../shared/FormErrors';
import { FormElements } from '../../shared/FormElements';
import { useParams } from 'react-router-dom';

const initialState = { firstname: '',lastname:'',email:'',country:'', address: ''};

export const UserUpdate = () => {
  const [countries, setCountries] = useState([]);
  const [formState, setFormState] = useState(initialState);
  const [formErrors, setFormErrors] = useState(initialState);
  const [submitted, setSubmitted] = useState(false);

  const { id } = useParams()

  useEffect(()=>{
    getCountries();
    if(id){
      getUserById(id);
    }
  },[]);

  const getCountries = () => {
    apiInstance.get('all').then((res) => {
      setCountries(res.data);
    });
  }

  const getUserById = (id) => {
    localInstance.get('users/'+id).then((res =>{
      setFormState(res.data);
    }));
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
      let method = id ? 'put' : 'post';
      let url = id ? 'users/' + id : 'users';
      localInstance[method](url,formState).then(res=>{
        if(!id) setFormState(initialState);
        let message = id ? 'was updated' : 'was added';
        alert('User' + message);
      });
    }
  };

  return (
    <>
      <div className="container-form">
      <div className="wrap-form">
      <form onSubmit={onSubmitForm} noValidate>
        <div className='form-title text-center mb-4'><h2>Add User</h2></div>
        <div className='form-inline d-flex justify-content-between'>
          {/* <div className="form-group my-3">
            <label htmlFor="firstname">First Name</label>
            <input type="text" className="form-control mr-2" name='firstname' id="firstname" value={formState.firstname} onChange={handleChange} placeholder="Enter first name" required/>
            {submitted && <FormErrors message={formErrors.firstname}/>}
          </div> */}
          <FormElements type={'input'} inputType={'text'} label={'First Name'} elementName={'firstname'} formState={formState} formErrors={formErrors} handleChange={handleChange} apiData={[]} submitted={submitted}/>
          <FormElements type={'input'} inputType={'text'} label={'Last Name'} elementName={'lastname'} formState={formState} formErrors={formErrors} handleChange={handleChange} apiData={[]} submitted={submitted}/>
          {/* <div className="form-group my-3">
            <label htmlFor="lastname">Last Name</label>
            <input type="text" className="form-control ml-2" name='lastname' id="lastname" value={formState.lastname} onChange={handleChange} placeholder="Enter last name" />
            {submitted && <FormErrors message={formErrors.lastname}/>}
          </div> */}
        </div>
        {/* <div className="form-group mb-3">
          <label htmlFor="email">Email</label>
          <input type="email" className="form-control" name='email' id="email" value={formState.email} onChange={handleChange} placeholder="Enter email" />
          {submitted && <FormErrors message={formErrors.email}/>}
        </div> */}
        <FormElements type={'input'} inputType={'text'} label={'Email'} elementName={'email'} formState={formState} formErrors={formErrors} handleChange={handleChange} apiData={[]} submitted={submitted}/>
        {/* <div className="form-group mb-3">
          <label htmlFor="country">Country</label>
          <select className='form-control' id='country' name='country' value={formState.country} onChange={handleChange}>
            <option value="" disabled> 
            </option> 
            {countries.length && countries.map((item,index)=>(
               <option key={item?.name?.common} value={item?.name?.common}>{item?.name?.common}</option>
            ))}
          </select>
          {submitted && <FormErrors message={formErrors.country}/>}
        </div> */}
        <FormElements type={'select'} inputType={'text'} label={'Country'} elementName={'country'} formState={formState} formErrors={formErrors} handleChange={handleChange} apiData={countries} submitted={submitted}/>
        <FormElements type={'textarea'} inputType={'text'} label={'Address'} elementName={'address'} formState={formState} formErrors={formErrors} handleChange={handleChange} apiData={[]} submitted={submitted}/>
        {/* <div className="form-group mb-3">
          <label htmlFor="country">Address</label>
         <textarea className='form-control' rows="3" name='address' cols="10" value={formState.address} onChange={handleChange} placeholder='Enter your address'></textarea>
         {submitted && <FormErrors message={formErrors.address}/>}
        </div> */}
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
      </div>
      </div>
    </>
  )
}

export default UserUpdate;