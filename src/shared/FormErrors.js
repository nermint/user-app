import React from 'react'

const FormErrors = ({ control,name }) => {
    return (
        <>
            <div className='errors'>
                {/* {Object.keys(errors).map((fieldName, i) => {
                    if (errors[fieldName].length > 0) {
                        return (
                            <p key={i}>{fieldName} {errors[fieldName]}</p>
                        )
                    } else {
                        return '';
                    }
                })} */}
                {!control  ? <p className='text-danger'>{name} is required</p> : ''}
            </div>
        </>
    )
}

export default FormErrors;
