import React from 'react'

const FormErrors = ({ message }) => {
    return (
        <>
            <p className='text-danger'>{message}</p>
        </>
    )
}

export default FormErrors;
