import React from "react";

function SearchByPhone() {
  const handleSubmit = async (event) => {
    event.preventDefault();
    // const response = await TableNew(formData);
  };

  return (
    <div>
      <form className="search-form" onSubmit={handleSubmit}>
        <search>
          <form action="./search/">
            <label for="reservation">Find a Reservation By Phone Number:</label>
            <input
              type="search"
              id="phone number"
              placeholder="xxx-xxx-xxxx"
              pattern="\d{3}-\d{3}-\d{4}"
            />
            <button type="submit">Search</button>
          </form>
        </search>
      </form>
    </div>
  );
}

export default SearchByPhone;
