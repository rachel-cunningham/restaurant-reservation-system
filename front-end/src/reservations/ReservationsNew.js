import { React, useState } from "react";
import { useHistory } from "react-router-dom/";
import { today } from "../utils/date-time";

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
    history.push(`/dashboard/${formData.reservation_date}`);
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
              required={true}
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
              required={true}
            />
          </label>
          <div>
            <label htmlFor="mobile_number">
              Moblie Number:{" "}
              <input
                className="form-style"
                id="mobile_number"
                type="tel"
                name="mobile_number"
                onChange={handleChange}
                placeholder="xxx-xxx-xxxx"
                required={true}
              />
            </label>
          </div>
          <div>
            <label htmlFor="reservation_date">
              Date of Reservation:{" "}
              <input
                className="form-style"
                id="reservation_date"
                type="date"
                name="reservation_date"
                pattern="\d{4}-\d{2}-\d{2}"
                min={today}
                max="2050-12-31"
                onChange={handleChange}
                required={true}
              />
            </label>
          </div>
          <div>
            <label htmlFor="reservation_time">
              Time of Reservation:{" "}
              <input
                className="form-style"
                id="reservation_time"
                type="time"
                name="reservation_time"
                pattern="[0-9]{2}:[0-9]{2}"
                onChange={handleChange}
                required={true}
              />
            </label>
          </div>
        </div>
        <div>
          <label htmlFor="people">
            Party Size:{" "}
            <input
              className="form-style"
              id="people"
              type="number"
              min="1"
              name="people"
              placeholder="1"
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
