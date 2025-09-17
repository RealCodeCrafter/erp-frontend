import React, { useState } from "react";
import { useCreateExpensMutation } from "../../context/api/expensApi";

import "./createExpens.scss";

const CreateExpens = ({ id, close }) => {
  let initialState = {
    sellerId: id,
    amount: "",
    comment: "",
  };
  const [paymeExp, setPaymeExp] = useState(initialState);
  const [paymeExpens, { data }] = useCreateExpensMutation();

  const handleChange = (e) => {
    let { value, name } = e.target;
    setPaymeExp((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    paymeExpens(paymeExp);
    close(false);
  };

  return (
    <div>
      <form className="form__expens" onSubmit={handleSubmit} action="">
        <input
          value={paymeExp.amount}
          onChange={handleChange}
          name="amount"
          placeholder="amount"
          type="text"
        />
        <input
          value={paymeExp.comment}
          onChange={handleChange}
          name="comment"
          placeholder="comment"
          type="text"
        />
        <button>Create</button>
      </form>
    </div>
  );
};

export default CreateExpens;
