// import React, { useState } from "react";
// import { useGetLessonByIdQuery } from "../../../context/api/lessonApi";
// import { Link, useParams } from "react-router-dom";
// import { useGetAssignmentQuery } from "../../../context/api/assigment";
// import EditIcon from "@mui/icons-material/Edit";
// import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
// import { GoTasklist } from "react-icons/go";
// import { RiFileInfoLine } from "react-icons/ri";
// import Module from "../../../components/Module/Module";
// import { useCreateSubmissionMutation } from "../../../context/api/submissionApi";
// const LessonStudent = () => {
//   const { id } = useParams();
//   const { data } = useGetLessonByIdQuery(id);
//   const [selectedLessonId, setSelectedLessonId] = useState(null);
//   const [isModalSubmit, setIsModalSubmit] = useState(false);
//   const [submitAnswer] = useCreateSubmissionMutation({ selectedLessonId });
//   console.log("data", data);

//   return (
//     <div className="lesson">
//       <div className="lessons-container">
//         {data?.map(({ id, lessonName, lessonNumber, lessonDate, endDate }) => (
//           <div className="lesson-card" key={id}>
//             <h3>{lessonNumber}</h3>
//             <h3 className="lesson__theme__name">{lessonName}</h3>
//             <p>
//               <strong>Dars boshlanishi:</strong>
//               {new Date(lessonDate).toLocaleString()}
//             </p>
//             <p>
//               <strong>Dars tugashi:</strong>
//               {new Date(endDate).toLocaleString()}
//             </p>
//             <div className="lesson__card__info__btn">
//               <button
//                 className="lesson__card__btn"
//                 onClick={() => {
//                   setIsModalSubmit(true);
//                   setSelectedLessonId(id);
//                 }}
//               >
//                 <GoTasklist />
//                 <span>Vazifa</span>
//               </button>
//               <button className="lesson__card__btn">
//                 <Link
//                   className="lesson__card__btn__link"
//                   to={`/admin/task/${id}`}
//                 >
//                   <RiFileInfoLine />
//                   <span>Yuklash</span>
//                 </Link>
//               </button>
//             </div>
//           </div>
//         ))}
//       </div>
//       {isModalSubmit ? (
//         <Module close={() => setIsModalSubmit(false)} width={800} bg={"#aaa6"}>
//           <h1>Javob </h1>
//           <form action="">
//             <input type="text" />
//           </form>
//         </Module>
//       ) : (
//         <></>
//       )}
//     </div>
//   );
// };

// export default LessonStudent;

import React, { useState } from "react";
import { useGetLessonByIdQuery } from "../../../context/api/lessonApi";
import { Link, useParams } from "react-router-dom";
import { GoTasklist } from "react-icons/go";

const LessonStudent = () => {
  const { id } = useParams();
  const { data } = useGetLessonByIdQuery(id);

  return (
    <div className="lesson">
      <div className="lessons-container">
        {data?.map(({ id, lessonName, lessonNumber, lessonDate, endDate }) => (
          <div className="lesson-card" key={id}>
            <h3>{lessonNumber}</h3>
            <h3 className="lesson__theme__name">{lessonName}</h3>
            <p>
              <strong>Dars boshlanishi:</strong>
              {new Date(lessonDate).toLocaleString()}
            </p>
            <p>
              <strong>Dars tugashi:</strong>
              {new Date(endDate).toLocaleString()}
            </p>

            <div className="lesson__card__info__btn">
              <Link to={`/admin/taskStudent/${id}`}>
                <button className="lesson__card__btn">
                  <GoTasklist />
                  <span>Vazifani ko'rish</span>
                </button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LessonStudent;
