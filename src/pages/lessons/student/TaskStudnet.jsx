import React from "react";
import { useParams } from "react-router-dom";
import { useGetAssignmentQuery } from "../../../context/api/assigment";
import { useCreateSubmissionMutation } from "../../../context/api/submissionApi";
import { useGetValue } from "../../../hooks/useGetValue";

const initialState = {
  content: "",
};

const TaskStudent = () => {
  const { id } = useParams(); // ID-ni to‘g‘ri olamiz
  const { data } = useGetAssignmentQuery(id);
  const [createSubmission] = useCreateSubmissionMutation(); // ID ni kiritmang
  const { formData, setFormData, handleChange } = useGetValue(initialState);
  console.log(id);
  // console.log("data", data[0].id);

  const createSubmissionHandle = async (e) => {
    e.preventDefault();
    const id = data[0].id;
    if (!formData.content.trim()) {
      alert("Iltimos, javob kiriting!");
      return;
    }

    try {
      await createSubmission({ id, content: formData.content.trim() });
      console.log("Yuborildi:", formData);
      setFormData(initialState);
    } catch (error) {
      console.error("Xatolik:", error);
    }
  };
  return (
    <div className="assignments-container">
      {data?.map(({ id, assignment }) => (
        <div key={id} className="assignment-card">
          <h3>{assignment}</h3>
          <h4>Uyga vazifani shu yerga yuklang</h4>
          <form onSubmit={createSubmissionHandle}>
            <input
              type="text"
              value={formData.content}
              name="content"
              onChange={handleChange}
              placeholder="Javobni kiriting"
            />
            <button type="submit">Yuborish</button>
          </form>
        </div>
      ))}
    </div>
  );
};

export default TaskStudent;
