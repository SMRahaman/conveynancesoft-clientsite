import React, { useState } from "react";
import { axiosPublic } from "../../Hook/useAxiosPublic";
import Swal from "sweetalert2";
import useConveynanceHook from "../../Hook/useConveynanceHook";
import { useLoaderData, useParams } from "react-router-dom";

const ConveynanceEdit = () => {
  const conveynanceData = useLoaderData();
  let { id } = useParams();
  const conveynance = conveynanceData?.find((con) => con._id === id);
  console.log(conveynance);
  const [transport, setTransport] = useState(conveynance?.MadeofTransport);
  const conveynanceEditHanlder = (event) => {
    event.preventDefault();
    const form = event.target;
    const date = form.date.value;
    const from = form.from.value;
    const to = form.to.value;
    const purpose = form.purpose.value;
    const amount = form.amount.value;
    const amountstrtonum = parseInt(amount);
    const conveynanceData = {
      Date: date,
      From: from,
      To: to,
      PurposeOfVisit: purpose,
      MadeofTransport: transport,
      Amount: amountstrtonum,
    };
    axiosPublic
      .put(`/conveynances/${conveynance._id}`, conveynanceData)
      .then((res) => {
        if (res.data.modifiedCount > 0) {
          Swal.fire({
            title: "Congratulation!",
            text: "Your conveynance data edited successfully",
            icon: "success",
          });
        }
      });
  };
  return (
    <div className="grow p-8 h-screen">
      <h2 className="text-2xl mb-4">Conveynance Data Add</h2>
      <form onSubmit={conveynanceEditHanlder}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3  gap-5 mb-5 ">
          <div className="flex flex-col gap-2">
            <span className="text-white">Date</span>
            <input
              type="date"
              name="date"
              defaultValue={conveynance?.Date}
              placeholder="Type here"
              className="input input-bordered w-full max-w-lg text-black"
            />
          </div>
          <div className="flex flex-col gap-2">
            <span className="text-white">From</span>
            <input
              type="text"
              name="from"
              required
              defaultValue={conveynance?.From}
              placeholder="Type here"
              className="input input-bordered w-full max-w-lg text-black"
            />
          </div>
          <div className="flex flex-col gap-2">
            <span className="text-white">To</span>
            <input
              type="text"
              name="to"
              defaultValue={conveynance?.To}
              required
              placeholder="Type here"
              className="input input-bordered w-full max-w-lg text-black"
            />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-5 ">
          <div className="flex flex-col gap-2">
            <span className="text-white">Purpose of visit/work</span>
            <input
              type="text"
              name="purpose"
              defaultValue={conveynance?.PurposeOfVisit}
              required
              placeholder="Type here"
              className="input input-bordered w-full max-w-lg text-black"
            />
          </div>
          <div className="flex flex-col gap-2">
            <span className="text-white">Made of Transport</span>
            <select
              value={transport}
              required
              onChange={(e) => setTransport(e.target.value)}
              className="input input-bordered w-full max-w-lg text-black"
            >
              <option>{transport}</option>
              <option>Bus</option>
              <option>Rickshaw</option>
              <option>Bike</option>
              <option>Uber</option>
              <option>Pathao</option>
              <option>CNG</option>
              <option>Leguna</option>
              <option>Leguna + Rickshaw</option>
            </select>
          </div>
          <div className="flex flex-col gap-2">
            <span className="text-white">Amount</span>
            <input
              type="text"
              name="amount"
              required
              defaultValue={conveynance?.Amount}
              placeholder="Type here"
              className="input input-bordered w-full max-w-lg text-black"
            />
          </div>
        </div>
        <div className="text-center">
          <button
            type="submit"
            className="btn btn-primary text-lg w-full md:w-1/2 mt-8"
          >
            Conveynance Data Edit
          </button>
        </div>
      </form>
    </div>
  );
};

export default ConveynanceEdit;
