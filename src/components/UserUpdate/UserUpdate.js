import React, { useCallback, useEffect, useState } from "react";
import "./UserUpdate.css";
import { apiInstance, localInstance } from "../../api/instance";
import { FormElement } from "../../shared/FormElement";
import { useParams } from "react-router-dom";
import { SearchableSelect } from "../../shared/SearchableSelect";
import { useNavigate } from "react-router-dom";

import FormErrors from "../../shared/FormErrors";

const initialState = {
  firstname: "",
  lastname: "",
  email: "",
  country: "",
  address: "",
};

export const UserUpdate = () => {
  const [countries, setCountries] = useState([]);
  const [formState, setFormState] = useState(initialState);
  const [formErrors, setFormErrors] = useState(initialState);
  const [submitted, setSubmitted] = useState(false);

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    getCountries();
    setFormState(initialState);
    if (id) {
      getUserById(id);
    }
  }, [id]);

  const getCountries = () => {
    apiInstance.get("all").then((res) => {
      setCountries(res.data);
    });
  };

  const getUserById = (id) => {
    localInstance.get(`users/${id}`).then((res) => {
      setFormState(res.data);
    });
  };

  const validateField = useCallback(
    ({ name, value }) => {
      setFormErrors({ ...formErrors, [name]: checkValue(value) });
    },
    [formErrors]
  );

  const handleChange = useCallback(
    (event) => {
      validateField(event.target);
      const { name, value } = event.target;
      setFormState({ ...formState, [name]: value });
    },
    [formState, validateField]
  );

  const handleSelect = (value) => {
    validateField(value);
    setFormState({ ...formState, country: value });
  };

  const checkValue = (value) => value ? "" : "Field is required";

  const validate = () => {
    const obj = {};
    for (const [name, value] of Object.entries(formState)) {
      obj[name] = checkValue(value);
    }
    setFormErrors(obj);
    return !Boolean(Object.values(obj).filter((err) => err).length);
  };

  const onSubmitForm = (event) => {
    event.preventDefault();
    setSubmitted(true);
    const isValid = validate();
    if (isValid) {
      let method = id ? "put" : "post";
      let url = id ? "users/" + id : "users";
      localInstance[method](url, formState).then((res) => {
        let message = id ? " was updated" : " was added";
        alert("User" + message);
        navigate("/");
      });
    }
  };

  return (
    <>
      <div className="container-form">
        <div className="wrap-form">
          <form onSubmit={onSubmitForm} noValidate>
            <div className="form-title text-center mb-4">
              <h2>{id ? "Edit User" : "Add User"}</h2>
            </div>
            <div className="form-inline d-flex justify-content-between">
              <FormElement
                type={"input"}
                inputType={"text"}
                label={"First Name"}
                elementName={"firstname"}
                formState={formState}
                formErrors={formErrors}
                handleChange={handleChange}
                apiData={[]}
                submitted={submitted}
              />
              <FormElement
                type={"input"}
                inputType={"text"}
                label={"Last Name"}
                elementName={"lastname"}
                formState={formState}
                formErrors={formErrors}
                handleChange={handleChange}
                apiData={[]}
                submitted={submitted}
              />
            </div>
            <FormElement
              type={"input"}
              inputType={"text"}
              label={"Email"}
              elementName={"email"}
              formState={formState}
              formErrors={formErrors}
              handleChange={handleChange}
              apiData={[]}
              submitted={submitted}
            />
            <SearchableSelect
              onChangeSelect={handleSelect}
              country={formState.country}
            />
            {submitted && <FormErrors message={formErrors["country"]} />}
            {/* <FormElement
              type={"select"}
              inputType={"text"}
              label={"Country"}
              elementName={"country"}
              formState={formState}
              formErrors={formErrors}
              handleChange={handleChange}
              apiData={countries}
              submitted={submitted}
            /> */}
            <FormElement
              type={"textarea"}
              inputType={"text"}
              label={"Address"}
              elementName={"address"}
              formState={formState}
              formErrors={formErrors}
              handleChange={handleChange}
              apiData={[]}
              submitted={submitted}
            />
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default UserUpdate;
