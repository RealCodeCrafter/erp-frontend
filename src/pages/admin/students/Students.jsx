import React, { useState } from "react";
import Table from "../../../components/table/Table";
import { useGetStudentQuery } from "../../../context/api/studentApi";
import SecHeader from "../../../components/secHeader/SecHeader";
import Module from "../../../components/Module/Module";
import CreateStudents from "../createStudent/CreateStudents";
import { useGetGroupsAllQuery } from "../../../context/api/groupApi";

const Students = () => {
  const { data } = useGetStudentQuery();
  const { data: groupData } = useGetGroupsAllQuery();
  const [filter, setFilter] = useState(true);
  const [createHide, setCreatHide] = useState(false);
  console.log("adata", data);
  const closeModal = () => {
    setCreatHide(false);
  };

  return (
    <div>
      <SecHeader title={"Studentlar"}>
        <button
          style={{
            border: "1px solid transparent",
            padding: "5px 10px",
            borderRadius: "5px",
            fontSize: "16px",
            background: "#2980b9",
            color: "white",
          }}
          onClick={() => setCreatHide(true)}
        >
          + O'quvchi yaratish
        </button>
      </SecHeader>
      <div style={{ padding: "0px 20px" }}>
        <Table
          data={data}
          len={data?.length}
          hide={filter}
          filterBtn={true}
          groupData={groupData}
          payment={true}
        />
      </div>
      {createHide && (
        <Module bg="#aaa4" close={closeModal}>
          <CreateStudents closeModal={closeModal} />
        </Module>
      )}
    </div>
  );
};

export default Students;
