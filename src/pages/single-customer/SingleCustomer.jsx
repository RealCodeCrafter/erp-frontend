import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AiOutlinePlus } from "react-icons/ai";

import "./singleCustomer.scss";
import Module from "../../components/Module/Module";
import PaymeForm from "../../components/paymeForm/PaymeForm";
import {
  useGetPaymetByIdQuery,
  useGetPaymetsQuery,
} from "../../context/api/paymetApi";
import Typography from "@mui/material/Typography";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

const SingleCustomer = () => {
  const [updete, setUpdete] = useState(null);
  const [payme, setPayme] = useState(false);
  const [storeHide, setStoreHide] = useState(false);
  const { id } = useParams();
  const { data } = useGetCustomerByIdQuery(id);
  const [SingleUpdete, { data: single, isSuccess, isLoading }] =
    useUpdateCustomerMutation();
  const { data: store } = useGetPaymetByIdQuery(id);
  const [page, setPage] = React.useState(1);
  const handleChange = (event, value) => {
    setPage(value);
  };

  const handleUpdete = (e) => {
    e.preventDefault();
    let updeteSingle = {
      fname: updete.fname,
      lname: updete.lname,
      phone_primary: updete.phone_primary,
      address: updete.address,
    };

    SingleUpdete({ body: updeteSingle, id: updete._id });
  };

  const StoreData = store?.innerData?.map((el) => (
    <div className="single__store__info">
      <div>
        <p className="single__store__info-price">{el?.amount} so'm</p>
        <span className="single__store__info-comment">
          comment: {el?.comment}
        </span>
      </div>
      <div>
        <p className="single__store__info-price">
          {el?.adminId?.fname}
          {el?.adminId?.lname}
        </p>
        <p className="single__store__info-clock">
          {el?.updatedAt.split("T")[0]}{" "}
          {el?.updatedAt.split("T")[1].split(".")[0]}
        </p>
      </div>
    </div>
  ));

  useEffect(() => {
    if (isSuccess) {
      setUpdete((prev) => !prev);
    }
  }, [isSuccess]);

  return (
    <>
      <div className="single">
        <div className="single__card">
          <div className="single__left">
            <p>
              {data?.innerData?.fname} {data?.innerData?.lname}
            </p>
            <p>{data?.innerData?.address}</p>
            <p>{data?.innerData?.phone_primary}</p>
          </div>
          <div className="single__right">
            <p>
              {data?.innerData?.adminId?.fname}{" "}
              {data?.innerData?.adminId?.lname}
            </p>
            <p>{data?.innerData?.budget}</p>

            <div className="single__right__btns">
              {updete ? (
                <Module bg={"#aaa9"} width={500} close={setUpdete}>
                  <form
                    onSubmit={handleUpdete}
                    className="single__edit"
                    action=""
                  >
                    <label htmlFor="">
                      Ism
                      <input
                        value={updete?.fname}
                        onChange={(e) =>
                          setUpdete((prev) => ({
                            ...prev,
                            fname: e.target.value,
                          }))
                        }
                        placeholder="fname"
                        type="text"
                      />
                    </label>
                    <label htmlFor="">
                      Familiya
                      <input
                        value={updete?.lname}
                        onChange={(e) =>
                          setUpdete((prev) => ({
                            ...prev,
                            lname: e.target.value,
                          }))
                        }
                        placeholder="lname"
                        type="text"
                      />
                    </label>
                    <label htmlFor="">
                      Telefon raqam
                      <input
                        onChange={(e) =>
                          setUpdete((prev) => ({
                            ...prev,
                            phone_primary: e.target.value,
                          }))
                        }
                        value={updete?.phone_primary}
                        placeholder="phone_primary"
                        type="text"
                      />
                    </label>
                    <label htmlFor="">
                      Manzil
                      <input
                        value={updete?.address}
                        onChange={(e) =>
                          setUpdete((prev) => ({
                            ...prev,
                            address: e.target.value,
                          }))
                        }
                        placeholder="address"
                        type="text"
                      />
                    </label>
                    <button>{isLoading ? "Saving..." : "Save"}</button>
                  </form>
                </Module>
              ) : (
                <></>
              )}
              <button
                onClick={() => setUpdete(data?.innerData)}
                className="single__right__btns-view"
              >
                O'zgartirish
              </button>
              {payme ? (
                <Module close={setPayme} width={400} bg={"#aaa9"}>
                  <PaymeForm id={id} close={setPayme} />
                </Module>
              ) : (
                <></>
              )}
              <button
                onClick={() => setPayme(true)}
                className="single__right__btns-paymet"
              >
                To'lov
              </button>
              <button
                onClick={() => setStoreHide(true)}
                className="single__btn"
              >
                <AiOutlinePlus /> Tolov Tarixi
              </button>
            </div>
          </div>
        </div>
        {storeHide ? (
          <Module width={600} bg={"#aaa6"} close={setStoreHide}>
            <div className="single__store">
              {StoreData}
              {/* <div className="single__store__pagenation">
                <Stack spacing={2}>
                  <Pagination count={10} page={page} onChange={handleChange} />
                </Stack>
              </div> */}
            </div>
          </Module>
        ) : (
          <></>
        )}
      </div>
    </>
  );
};

export default SingleCustomer;
