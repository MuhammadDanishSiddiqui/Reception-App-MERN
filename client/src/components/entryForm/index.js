import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import CustomInput from "../customInput";
import axios from "axios";

const EntryForm = () => {
  let { id } = useParams();
  const navigate = useNavigate();
  const [details, setDetails] = useState({
    name: "",
    phone: "",
    purpose: "",
    personToMeet: "",
    dateTime: "",
  });
  const [detailsError, setDetailsError] = useState({
    name: "",
    phone: "",
    purpose: "",
    personToMeet: "",
    dateTime: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDetails((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const handleSubmit = async () => {
    setDetailsError({
      name: "",
      phone: "",
      purpose: "",
      personToMeet: "",
      dateTime: "",
    });
    if (!details.name) {
      setDetailsError((prev) => {
        return {
          ...prev,
          name: "Name is required",
        };
      });
    }
    if (!details.phone) {
      setDetailsError((prev) => {
        return {
          ...prev,
          phone: "Phone is required",
        };
      });
    }
    if (!details.purpose) {
      setDetailsError((prev) => {
        return {
          ...prev,
          purpose: "Purpose is required",
        };
      });
    }
    if (!details.personToMeet) {
      setDetailsError((prev) => {
        return {
          ...prev,
          personToMeet: "Person is required",
        };
      });
    }
    if (!details.dateTime) {
      setDetailsError((prev) => {
        return {
          ...prev,
          dateTime: "Date Time is required",
        };
      });
    }
    if (
      !details.name ||
      !details.phone ||
      !details.purpose ||
      !details.personToMeet ||
      !details.dateTime
    )
      return;
    if (id) {
      try {
        await axios.patch(`/api/visitors/${id}`, {
          ...details,
        });
        navigate("/visitors");
      } catch (error) {
        console.log(error);
      }
      return;
    }
    try {
      await axios.post("/api/visitors", {
        ...details,
        id: Date.now(),
      });
      navigate("/visitors");
    } catch (error) {
      console.log(error);
    }
  };
  const getDetails = async () => {
    console.log(id);
    const { data } = await axios.get(`/api/visitors/${id}`);
    console.log(data);
    const { name, phone, purpose, personToMeet, dateTime } = data.data;
    setDetails({
      name,
      phone,
      purpose,
      personToMeet,
      dateTime,
    });
  };
  useEffect(() => {
    if (id) {
      getDetails();
    }
  }, [id]);

  return (
    <div className="flex justify-center mt-4">
      <div className="w-full max-w-xs">
        <h3 className="text-center font-semibold text-lg">
          {id ? "Update" : "Add"} Visitor
        </h3>
        <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <CustomInput
            title={"Name"}
            name="name"
            value={details.name}
            type="text"
            placeholder={"Name"}
            onChange={handleChange}
            error={detailsError.name}
          />
          <CustomInput
            title={"Phone"}
            name="phone"
            value={details.phone}
            type="number"
            placeholder={"Phone"}
            onChange={handleChange}
            error={detailsError.phone}
          />
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="purpose"
            >
              Purpose
            </label>
            <textarea
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="text"
              id="purpose"
              placeholder="Purpose for visit"
              value={details.purpose}
              onChange={handleChange}
              name="purpose"
            />
            <p className="text-red-500 text-xs italic">
              {detailsError.purpose && !details.purpose
                ? detailsError.purpose
                : null}
            </p>
          </div>
          <CustomInput
            title={"Person To Meet"}
            name="personToMeet"
            value={details.personToMeet}
            type="text"
            placeholder={"person To Meet"}
            onChange={handleChange}
            error={detailsError.personToMeet}
          />
          <CustomInput
            title={"Date Time"}
            name="dateTime"
            value={details.dateTime}
            type="datetime-local"
            placeholder={"Select Date Time"}
            onChange={handleChange}
            error={detailsError.dateTime}
          />
          <div className="flex items-center justify-between">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="button"
              onClick={handleSubmit}
            >
              {id ? "Update" : "Add"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EntryForm;
