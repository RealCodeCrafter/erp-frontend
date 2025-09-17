import React from "react";
import {
  useGetGroupsCourseIdQuery,
  useGetGroupsIdStudentsQuery,
} from "../../../context/api/groupApi";
import { useParams } from "react-router-dom";
// import Ranking from "../../../components/rangking/Ranking";
import Table from "../../../components/table/Table";
import "./singleGroup.scss";

const SingleGroup = () => {
  const { id } = useParams();
  const { data } = useGetGroupsIdStudentsQuery(id);
  console.log(data);

  // console.log(data?.[0].name);

  return (
    <div className="single-group">
      {/* <h2>{data}</h2> */}
      <Table data={data} hide={true} filet={false} payment={false} />
      {/* <Ranking data={data} id={id} /> */}
    </div>
  );
};

export default SingleGroup;
