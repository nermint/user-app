import React, { useEffect, useState } from "react";
import { apiInstance } from "../api/instance";
import "./SearchableSelect.css";

export const SearchableSelect = ({ onChangeSelect, country }) => {
  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState(country);

  useEffect(() => {
    setSelectedCountry(country);
  }, [country]);

  const getCountryByName = (event) => {
    setSelectedCountry(event.target.value);
    const url = event.target.value ? `name/${event.target.value}` : "all";
    apiInstance.get(url).then((res) => {
      setCountries(res.data);
    });
  };

  const selectCountry = (value) => {
    onChangeSelect(value);
    setCountries([]);
  };
  return (
    <>
      <label htmlFor="country">Country</label>
      <div className="dropdown-content mb-3">
        <input
          type="text"
          placeholder="Search.."
          className="search-input"
          value={selectedCountry}
          onChange={getCountryByName}
        />
        {countries.length
          ? countries.map((item, i) => (
              <span key={i} onClick={() => selectCountry(item?.name?.common)}>
                {item?.name?.common}
              </span>
            ))
          : ""}
      </div>
    </>
  );
};
