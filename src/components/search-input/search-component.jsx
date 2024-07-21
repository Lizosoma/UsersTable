import React, { useState } from 'react';

const SearchComponent = ({ onSearch }) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [genders, setGenders] = useState({
    male: false,
    female: false,
  });
  const [age, setAge] = useState('');

  const handleGenderChange = (event) => {
    const { value, checked } = event.target;
    setGenders((prevGenders) => ({
      ...prevGenders,
      [value]: checked,
    }));
  };

  const handleSearch = () => {
    const filters = {
      ...(name && { firstName: name }),
      ...(phone && { phone }),
      ...(address && { 'address.address': address }),
      ...(city && { 'address.city': city }),
      ...(Object.keys(genders).filter((g) => genders[g]).length > 0 && {
        gender: Object.keys(genders)
          .filter((g) => genders[g])
          .join(','),
      }),
      ...(age && { age }),
    };
    onSearch(filters);
  };

  return (
    <div className="search-component">
      <div className="search-form-1">
        <label className="label">
          Name:
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
        </label>
        <label className="label">
          Phone:
          <input type="text" value={phone} onChange={(e) => setPhone(e.target.value)} />
        </label>
        <label className="label">
          Age:
          <input type="number" value={age} onChange={(e) => setAge(e.target.value)} />
        </label>
      </div>
      <div className="search-form-2">
        <label className="label">
          City:
          <input type="text" value={city} onChange={(e) => setCity(e.target.value)} />
        </label>
        <label className="label">
          Address:
          <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} />
        </label>
        <label className="label">
          Gender:
          <label className="gender">
            <input
              type="checkbox"
              value="male"
              checked={genders.male}
              onChange={handleGenderChange}
            />
            Male
          </label>
          <label>
            <input
              type="checkbox"
              value="female"
              checked={genders.female}
              onChange={handleGenderChange}
            />
            Female
          </label>
        </label>
      </div>
      <button className="search-button" onClick={handleSearch}>
        Search
      </button>
    </div>
  );
};

export default SearchComponent;
