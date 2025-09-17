import React from "react";
import { useGetPaymetsAcceptedQuery } from "../../context/api/paymetApi";

const PaymentAccepted = () => {
  const { data } = useGetPaymetsAcceptedQuery();
  console.log(data);

  return <div>PaymentAccepted 123</div>;
};

export default PaymentAccepted;
