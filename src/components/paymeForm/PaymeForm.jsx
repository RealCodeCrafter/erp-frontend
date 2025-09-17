import React, { useEffect, useState } from "react";
import { useCreatePaymetMutation } from "../../context/api/paymetApi";

import "./paymeForm.scss";

const PaymeForm = ({ id, close }) => {
  console.log(id);
  let initialState = {
    customerId: id,
    amount: "",
    comment: "",
  };

  const [payme, setPayme] = useState(initialState);
  const [paymeCreate, { data, isLoading, isSuccess }] =
    useCreatePaymetMutation(id);

  const handleChange = (e) => {
    let { value, name } = e.target;
    setPayme((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    paymeCreate(payme);
    // setPayme(initialState);
  };

  useEffect(() => {
    if (isSuccess) {
      close(false);
    }
  }, [isSuccess]);

  return (
    <div className="payme">
      <h2>To'lov amalga oshirish</h2>
      <form className="payme__form" onSubmit={handleSubmit} action="">
        <input
          placeholder="amount"
          value={payme.amount}
          name="amount"
          onChange={handleChange}
          type="number"
        />
        <input
          placeholder="comment"
          value={payme.comment}
          name="comment"
          onChange={handleChange}
          type="text"
        />
        <button>{isLoading ? "Loading..." : "Save"}</button>
      </form>
    </div>
  );
};

export default PaymeForm;
