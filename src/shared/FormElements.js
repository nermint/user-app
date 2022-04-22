import React from 'react';
import FormErrors from './FormErrors';

export const FormElements = ({type, inputType,label,elementName,formState,formErrors,handleChange,apiData,submitted}) => {
  const renderElementLabel = (name) =>{
    return <label htmlFor={name}>{name}</label>;
  }
  const renderElements = (type, inputType,label,elementName,formState,handleChange,apiData) =>{
      switch(type){
          case 'input':
              return <><input type={inputType} className="form-control" name={elementName} id={elementName} value={formState[elementName]} onChange={handleChange} placeholder={"Enter " + label}/>
              </>
          case 'select':
              return <>
              <select className='form-control' name={elementName} id={elementName} value={formState[elementName]} onChange={handleChange}>
                <option value="" disabled> 
                </option> 
                {apiData.length && apiData.map((item,index)=>(
                   <option key={item?.name?.common} value={item?.name?.common}>{item?.name?.common}</option>
                ))}
              </select></>
        case 'textarea':
              return <>
              <textarea className='form-control' rows="3" name={elementName} id={elementName} cols="10" value={formState[elementName]} onChange={handleChange} placeholder={"Enter " + label}></textarea></>
        default:
            return;
          
      }

  }
  return (
    <>
     <div className="form-group mb-3">
          {renderElementLabel(label)}
          {renderElements(type, inputType,label,elementName,formState,handleChange,apiData)}
          {submitted && <FormErrors message={formErrors[elementName]}/>}
    </div>
    </>
  )
}
