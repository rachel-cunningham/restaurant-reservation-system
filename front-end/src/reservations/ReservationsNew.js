import { React, useState } from "react";
import { useHistory } from "react-router-dom/";

function NewReservation() {
  const history = useHistory();
  const initialFormState = {
    first_name: "",
    last_name: "",
    mobile_number: "",
    reservation_date: "",
    reservation_time: "",
    numberOfPeople: "",
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
    const response = await NewReservation(formData);
    history.push(`/dashboard/${response.reservation_date}`);
    setFormData({ initialFormState });
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="first_name">
            First Name:{" "}
            <input
              className="form-style"
              id="first_name"
              type="text"
              name="first_name"
              onChange={handleChange}
            />
          </label>
        </div>
        <div>
          <label htmlFor="last_name">
            Last Name:{" "}
            <input
              className="form-style"
              id="last_name"
              type="text"
              name="last_name"
              onChange={handleChange}
            />
          </label>
          <div>
            <label htmlFor="mobile_number">
              Moblie Number:{" "}
              <input
                className="form-style"
                id="mobile_number"
                type="text"
                name="mobile_number"
                onChange={handleChange}
                placeholder="xxx-xxx-xxxx"
              />
            </label>
          </div>
          <div>
            <label htmlFor="reservation_date">
              Date of Reservation:{" "}
              <input
                className="form-style"
                id="reservation_date"
                type="text"
                name="reservation_date"
                onChange={handleChange}
                placeholder="2023-07-09"
              />
            </label>
          </div>
          <div>
            <label htmlFor="reservation_time">
              Time of Reservation:{" "}
              <input
                className="form-style"
                id="reservation_time"
                type="text"
                name="reservation_time"
                onChange={handleChange}
              />
            </label>
          </div>
        </div>
        <div>
          <label htmlFor="people">
            Number of People in Party:{" "}
            <input
              className="form-style"
              id="people"
              type="text"
              name="people"
              onChange={handleChange}
            />
          </label>
        </div>
        <div class="c-buttons">
          <button
            name="cancel"
            className="btn btn-secondary mr-1"
            onClick={() => history.push(`/`)}
          >
            Cancel
          </button>
          <div className="divider"> </div>
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}

export default NewReservation;
