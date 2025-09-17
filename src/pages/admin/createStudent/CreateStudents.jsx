// import React, { useState } from "react";
// import PhoneInput from "react-phone-input-2";
// import "react-phone-input-2/lib/style.css";
// import "./createStudents.scss";
// import { useGetGroupsCourseIdQuery } from "../../../context/api/groupApi";
// import { useGetCoursesQuery } from "../../../context/api/courseApi";
// import {
//   useCreateStudentMutation,
//   useUpdateStudentMutation,
// } from "../../../context/api/studentApi";
// import { useGetValue } from "../../../hooks/useGetValue";
// import toast from "react-hot-toast";

// const initialState = {
//   firstName: "",
//   lastName: "",
//   phone: "+998",
//   address: "",
//   courseId: "",
//   groupId: "",
//   username: "",
//   password: "",
//   parentsName: "",
//   parentPhone: "+998",
// };

// const CreateStudents = ({ closeModal }) => {
//   const [selectedCourse, setSelectedCourse] = useState("");
//   const [createStudent] = useCreateStudentMutation();
//   const { formData, setFormData, handleChange } = useGetValue(initialState);

//   const { data: courseData, isLoading: isCourseLoading } = useGetCoursesQuery();
//   const { data: groupData, isLoading: isGroupLoading } =
//     useGetGroupsCourseIdQuery(selectedCourse, {
//       skip: !selectedCourse,
//     });

//   console.log(courseData);

//   const handleCourseChange = (e) => {
//     const courseId = parseInt(e.target.value, 10);
//     setSelectedCourse(courseId);
//     setFormData({ ...formData, courseId, groupId: "" });
//   };

//   const handleGroupChange = (e) => {
//     const groupId = parseInt(e.target.value, 10);
//     setFormData({ ...formData, groupId });
//   };

//   const handlePhoneChange = (value, field) => {
//     const sanitizedPhone = `+${value.replace(/[^0-9]/g, "").trim()}`;
//     setFormData({
//       ...formData,
//       [field]: sanitizedPhone,
//     });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     if (
//       !/^\+\d{11,15}$/.test(formData.phone) ||
//       !/^\+\d{11,15}$/.test(formData.parentPhone)
//     ) {
//       toast.error(
//         "Telefon raqam noto‘g‘ri formatda. Iltimos, qayta tekshiring."
//       );
//       return;
//     }

//     createStudent(formData)
//       .unwrap()
//       .then(() => {
//         toast.success("O'quvchi muvaffaqiyatli yaratildi!");
//         setFormData(initialState);
//         closeModal();
//       })
//       .catch((error) => {
//         console.error("Error:", error);
//         toast.error(
//           "O'quvchini yaratishda xatolik yuz berdi:\n" +
//             (error?.data?.message || "Noma'lum xatolik")
//         );
//       });
//   };

//   return (
//     <div className="createStudents ">
//       <form onSubmit={handleSubmit}>
//         <label htmlFor="firstName">
//           Ism
//           <input
//             type="text"
//             id="firstName"
//             name="firstName"
//             placeholder="Ismingizni kiriting"
//             value={formData.firstName}
//             onChange={handleChange}
//             required
//           />
//         </label>
//         <label htmlFor="lastName">
//           Familiya
//           <input
//             type="text"
//             id="lastName"
//             name="lastName"
//             placeholder="Familiyangizni kiriting"
//             value={formData.lastName}
//             onChange={handleChange}
//             required
//           />
//         </label>
//         <label htmlFor="phone">
//           Telefon raqam
//           <div>
//             <PhoneInput
//               country={"uz"}
//               className="createStudent-phone"
//               value={formData.phone.replace(/^\+/, "")}
//               onChange={(value) => handlePhoneChange(value, "phone")}
//               placeholder="Telefon raqamini kiriting"
//               buttonStyle={{
//                 background: "#f9fafe",
//               }}
//             />
//           </div>
//         </label>
//         <label htmlFor="parentsName">
//           Ota ona ismi
//           <input
//             type="text"
//             id="parentsName"
//             name="parentsName"
//             placeholder="Ota ona ismini kiriting"
//             value={formData.parentsName}
//             onChange={handleChange}
//             required
//           />
//         </label>
//         <label htmlFor="parentPhone">
//           Ota ona telefon raqami
//           <div>
//             <PhoneInput
//               country={"uz"}
//               className="createStudent-phone"
//               value={formData.parentPhone.replace(/^\+/, "")}
//               onChange={(value) => handlePhoneChange(value, "parentPhone")}
//               placeholder="Telefon raqamini kiriting"
//               buttonStyle={{
//                 background: "#f9fafe",
//               }}
//             />
//           </div>
//         </label>
//         <label htmlFor="address">
//           Manzil
//           <input
//             type="text"
//             id="address"
//             name="address"
//             placeholder="Manzilingizni kiriting"
//             value={formData.address}
//             onChange={handleChange}
//             required
//           />
//         </label>
//         <label htmlFor="course">
//           Kurs
//           {isCourseLoading ? (
//             <p>Kurslar yuklanmoqda...</p>
//           ) : (
//             <select
//               name="courseId"
//               id="course"
//               value={formData.courseId}
//               onChange={handleCourseChange}
//               required
//             >
//               <option value="">Kursni tanlang</option>
//               {courseData?.courses?.map((course) => (
//                 <option key={course.id} value={course.id}>
//                   {course.name}
//                 </option>
//               ))}
//             </select>
//           )}
//         </label>
//         <label htmlFor="group">
//           Gruh
//           {isGroupLoading ? (
//             <p>Gruhlar yuklanmoqda...</p>
//           ) : (
//             <select
//               name="groupId"
//               id="group"
//               value={formData.groupId}
//               onChange={handleGroupChange}
//               required
//               disabled={!formData.courseId}
//             >
//               <option value="">Gruhni tanlang</option>
//               {groupData?.length > 0 ? (
//                 groupData.map((group) => (
//                   <option key={group.id} value={group.id}>
//                     {group.name}
//                   </option>
//                 ))
//               ) : (
//                 <option disabled>Gruhlar topilmadi</option>
//               )}
//             </select>
//           )}
//         </label>
//         <button type="submit">Yaratish</button>
//       </form>
//     </div>
//   );
// };

// export default CreateStudents;


import React, { useState } from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import "./createStudents.scss";
import { useGetGroupsCourseIdQuery } from "../../../context/api/groupApi";
import { useGetCoursesQuery } from "../../../context/api/courseApi";
import {
  useCreateStudentMutation,
  useUpdateStudentMutation,
} from "../../../context/api/studentApi";
import { useGetValue } from "../../../hooks/useGetValue";
import toast from "react-hot-toast";

const initialState = {
  firstName: "",
  lastName: "",
  phone: "+998",
  address: "",
  courseId: "",
  groupId: "",
  username: "",
  password: "",
  parentsName: "",
  parentPhone: "+998",
};

const CreateStudents = ({ closeModal }) => {
  const [selectedCourse, setSelectedCourse] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [createStudent] = useCreateStudentMutation();
  const { formData, setFormData, handleChange } = useGetValue(initialState);

  const { data: courseData, isLoading: isCourseLoading } = useGetCoursesQuery();
  const { data: groupData, isLoading: isGroupLoading } =
    useGetGroupsCourseIdQuery(selectedCourse, {
      skip: !selectedCourse,
    });

  console.log(courseData);

  const handleCourseChange = (e) => {
    const courseId = parseInt(e.target.value, 10);
    setSelectedCourse(courseId);
    setFormData({ ...formData, courseId, groupId: "" });
  };

  const handleGroupChange = (e) => {
    const groupId = parseInt(e.target.value, 10);
    setFormData({ ...formData, groupId });
  };

  const handlePhoneChange = (value, field) => {
    const sanitizedPhone = `+${value.replace(/[^0-9]/g, "").trim()}`;
    setFormData({
      ...formData,
      [field]: sanitizedPhone,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (isSubmitting) return; // Agar allaqachon yuborilayotgan bo'lsa, qaytish
    
    if (
      !/^\+\d{11,15}$/.test(formData.phone) ||
      !/^\+\d{11,15}$/.test(formData.parentPhone)
    ) {
      toast.error(
        "Telefon raqam noto'g'ri formatda. Iltimos, qayta tekshiring."
      );
      return;
    }

    setIsSubmitting(true);

    try {
      await createStudent(formData).unwrap();
      toast.success("O'quvchi muvaffaqiyatli yaratildi!");
      setFormData(initialState);
      closeModal();
    } catch (error) {
      console.error("Error:", error);
      toast.error(
        "O'quvchini yaratishda xatolik yuz berdi:\n" +
          (error?.data?.message || "Noma'lum xatolik")
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="createStudents ">
      <form onSubmit={handleSubmit}>
        <label htmlFor="firstName">
          Ism
          <input
            type="text"
            id="firstName"
            name="firstName"
            placeholder="Ismingizni kiriting"
            value={formData.firstName}
            onChange={handleChange}
            required
            disabled={isSubmitting}
          />
        </label>
        <label htmlFor="lastName">
          Familiya
          <input
            type="text"
            id="lastName"
            name="lastName"
            placeholder="Familiyangizni kiriting"
            value={formData.lastName}
            onChange={handleChange}
            required
            disabled={isSubmitting}
          />
        </label>
        <label htmlFor="phone">
          Telefon raqam
          <div>
            <PhoneInput
              country={"uz"}
              className="createStudent-phone"
              value={formData.phone.replace(/^\+/, "")}
              onChange={(value) => handlePhoneChange(value, "phone")}
              placeholder="Telefon raqamini kiriting"
              disabled={isSubmitting}
              buttonStyle={{
                background: "#f9fafe",
              }}
            />
          </div>
        </label>
        <label htmlFor="parentsName">
          Ota ona ismi
          <input
            type="text"
            id="parentsName"
            name="parentsName"
            placeholder="Ota ona ismini kiriting"
            value={formData.parentsName}
            onChange={handleChange}
            required
            disabled={isSubmitting}
          />
        </label>
        <label htmlFor="parentPhone">
          Ota ona telefon raqami
          <div>
            <PhoneInput
              country={"uz"}
              className="createStudent-phone"
              value={formData.parentPhone.replace(/^\+/, "")}
              onChange={(value) => handlePhoneChange(value, "parentPhone")}
              placeholder="Telefon raqamini kiriting"
              disabled={isSubmitting}
              buttonStyle={{
                background: "#f9fafe",
              }}
            />
          </div>
        </label>
        <label htmlFor="address">
          Manzil
          <input
            type="text"
            id="address"
            name="address"
            placeholder="Manzilingizni kiriting"
            value={formData.address}
            onChange={handleChange}
            required
            disabled={isSubmitting}
          />
        </label>
        <label htmlFor="course">
          Kurs
          {isCourseLoading ? (
            <p>Kurslar yuklanmoqda...</p>
          ) : (
            <select
              name="courseId"
              id="course"
              value={formData.courseId}
              onChange={handleCourseChange}
              required
              disabled={isSubmitting}
            >
              <option value="">Kursni tanlang</option>
              {courseData?.courses?.map((course) => (
                <option key={course.id} value={course.id}>
                  {course.name}
                </option>
              ))}
            </select>
          )}
        </label>
        <label htmlFor="group">
          Gruh
          {isGroupLoading ? (
            <p>Gruhlar yuklanmoqda...</p>
          ) : (
            <select
              name="groupId"
              id="group"
              value={formData.groupId}
              onChange={handleGroupChange}
              required
              disabled={!formData.courseId || isSubmitting}
            >
              <option value="">Gruhni tanlang</option>
              {groupData?.length > 0 ? (
                groupData.map((group) => (
                  <option key={group.id} value={group.id}>
                    {group.name}
                  </option>
                ))
              ) : (
                <option disabled>Gruhlar topilmadi</option>
              )}
            </select>
          )}
        </label>
        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Yaratilmoqda..." : "Yaratish"}
        </button>
      </form>
    </div>
  );
};

export default CreateStudents;