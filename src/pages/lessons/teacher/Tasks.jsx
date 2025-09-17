import React from "react";
import { useParams } from "react-router-dom";
import {
  useDeleteAssignmentMutation,
  useGetAssignmentQuery,
} from "../../../context/api/assigment";
import "./task.scss";
import { useGetLessonIdSubmissionQuery } from "../../../context/api/submissionApi";

const Tasks = () => {
  const { id } = useParams();
  const { data } = useGetAssignmentQuery(id);
  const { data: submissionData } = useGetLessonIdSubmissionQuery(id);
  const [deleteAssignment] = useDeleteAssignmentMutation();
  console.log("task", submissionData);

  const handleDelete = (id) => {
    deleteAssignment(id);
  };

  return (
    <div className="assignment">
      <div className="assignment-container">
        {data?.map(({ id, assignment, dueDate, updatedAt, submissions }) => (
          <div key={id} className="assignment-card">
            <h3>Uyga Vazifani ko'rinishi</h3>
            <button className="assignment-btn" onClick={() => handleDelete(id)}>
              delete
            </button>
            <p>{assignment}</p>
            <h4>Uyga vazifa topshirgan o'quvchilar royxati</h4>
            <div>
              {submissionData?.map((el) => (
                <div key={id}>
                  <h3>
                    {el?.student?.lastName} {el?.student?.firstName}
                  </h3>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Tasks;
