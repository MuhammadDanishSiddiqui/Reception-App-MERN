import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import moment from "moment";

const Visitors = () => {
  const [visitorsData, setVisitorsData] = useState([]);
  const getVisitors = async () => {
    try {
      const { data } = await axios.get("/api/visitors");
      setVisitorsData(data.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getVisitors();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/visitors/${id}`);
      const temp = [...visitorsData];
      const updatedData = temp.filter((data) => data.id != id);
      setVisitorsData(updatedData);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-8 px-8">
      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">
              Visitor Name
            </th>
            <th scope="col" className="px-6 py-3">
              Phone
            </th>
            <th scope="col" className="px-6 py-3">
              Purpose
            </th>
            <th scope="col" className="px-6 py-3">
              Person To Meet
            </th>
            <th scope="col" className="px-6 py-3">
              Date Time
            </th>
            <th scope="col" className="px-6 py-3">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {visitorsData?.map((visitor) => {
            return (
              <tr
                key={visitor.id}
                className="bg-white border-b dark:bg-gray-900 dark:border-gray-700"
              >
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {visitor.name}
                </th>
                <td className="px-6 py-4">{visitor.phone}</td>
                <td className="px-6 py-4">{visitor.purpose}</td>
                <td className="px-6 py-4">{visitor.personToMeet}</td>
                <td className="px-6 py-4">
                  {moment(visitor.dataTime).format("lll")}
                </td>
                <td className="px-6 py-4">
                  <Link
                    to={`/entry/${visitor.id}`}
                    className="font-medium text-green-600 hover:underline mr-4"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => handleDelete(visitor.id)}
                    className="font-medium text-red-600 hover:underline"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Visitors;
