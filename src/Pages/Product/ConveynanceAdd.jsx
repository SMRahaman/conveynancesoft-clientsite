import React, { useContext, useState } from "react";
import { axiosPublic } from "../../Hook/useAxiosPublic";
import Swal from "sweetalert2";
import { AuthContext } from "../../context/AuthContextProvider";
const ConveynanceAdd = () => {
  const { user } = useContext(AuthContext);
  const [transport, setTransport] = useState("");
  const conveynanceAddHanlder = (event) => {
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
      Email: user.email,
    };
    axiosPublic.post("/conveynance", conveynanceData).then((res) => {
      if (res.data.insertedId) {
        Swal.fire({
          title: "Congratulation!",
          text: "Your conveynance adta add successfully",
          icon: "success",
        });
      }
      form.reset();
    });
  };
  return (
    <div className="grow p-8  ">
      <h2 className="text-2xl mb-4">Conveynance Data Add</h2>
      <form onSubmit={conveynanceAddHanlder}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3  gap-5 mb-5 ">
          <div className="flex flex-col gap-2">
            <span className="text-white">Date</span>
            <input
              type="date"
              name="date"
              placeholder="Type here"
              required
              className="input input-bordered w-full max-w-lg text-black"
            />
          </div>
          <div className="flex flex-col gap-2">
            <span className="text-white">From</span>
            <input
              type="text"
              name="from"
              required
              placeholder="Type here"
              className="input input-bordered w-full max-w-lg text-black"
            />
          </div>
          <div className="flex flex-col gap-2">
            <span className="text-white">To</span>
            <input
              type="text"
              name="to"
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
              required
              placeholder="Type here"
              className="input input-bordered w-full max-w-lg text-black"
            />
          </div>
          <div className="flex flex-col gap-2">
            <span className="text-white">Made of Transport</span>
            <select
              onChange={(e) => setTransport(e.target.value)}
              required
              className="input input-bordered w-full max-w-lg text-black"
            >
              <option>Select Transport</option>
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
              placeholder="Type here"
              className="input input-bordered w-full max-w-lg text-black"
            />
          </div>
        </div>
        <div className="text-center">
          <button
            type="submit"
            className="btn btn-primary text-lg md:w-1/2 w-full mt-8"
          >
            Conveynance Data Add
          </button>
        </div>
      </form>
    </div>
  );
};

export default ConveynanceAdd;
