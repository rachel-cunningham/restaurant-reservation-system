import { React, useState } from "react";
import { useHistory } from "react-router-dom";

function TableNew() {
  const history = useHistory();
  const initialFormState = {
    table_name: "",
    capacity: "",
  };
  const [formData, setFormData] = useState({ ...initialFormState });
  const handleChange = ({ target }) => {
    setFormData({
      ...formData,
      [target.name]: target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    // const response = await TableNew(formData);
    history.push(`/dashboard`);
    setFormData({ initialFormState });
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="table_name">
            Table Name:{" "}
            <input
              className="form-control"
              id="table_name"
              type="text"
              minLength="2"
              required={true}
              onChange={handleChange}
            />
          </label>
        </div>
        <div>
          <label htmlFor="capacity">
            Capacity:{" "}
            <input
              className="capacity"
              id="capacity"
              type="number"
              onChange={handleChange}
              required={true}
              min="1"
              max="6"
              placeholder="1"
            />
          </label>
        </div>
      </form>
    </div>
  );
}

export default TableNew;
