import React, { useState, useEffect } from "react";
import {
  useCreateLessonMutation,
  useDeleteLessonMutation,
  useGetLessonByIdQuery,
} from "../../../context/api/lessonApi";
import { useParams, useNavigate } from "react-router-dom";
import "./lesson.scss";
import Module from "../../../components/Module/Module";
import {
  Calendar,
  Clock,
  Users,
  Plus,
  Edit3,
  Trash2,
  CheckCircle,
  XCircle,
  AlertCircle,
  BookOpen,
  UserCheck,
  Save,
  X
} from "lucide-react";
import SecHeader from "../../../components/secHeader/SecHeader";
import { useGetGroupsIdStudentsQuery } from "../../../context/api/groupApi.js";
import { useCreateAttendanceMutation } from "../../../context/api/attendanceApi.js";

const initialState = {
  lessonName: "",
};

const Lesson = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: lessonsData } = useGetLessonByIdQuery(id);
  const [createLesson, { isSuccess, isLoading:loading }] = useCreateLessonMutation();
  const [createAttendance, { isLoading }] = useCreateAttendanceMutation();
  const [deleteLesson] = useDeleteLessonMutation();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAttendanceModal, setIsAttendanceModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [formData, setFormData] = useState(initialState);
  const [selectedLessonId, setSelectedLessonId] = useState(null);
  const [attendanceData, setAttendanceData] = useState([]);

  const { data: studentData } = useGetGroupsIdStudentsQuery(id);

  useEffect(() => {
    if (isAttendanceModal && studentData) {
      const initialAttendance = studentData.map((student) => ({
        studentId: student.id,
        status: "absent",
        studentName: student.firstName + " " + student?.lastName,
      }));
      setAttendanceData(initialAttendance);
    }
  }, [isAttendanceModal, studentData]);

  const createHandleLesson = async (e) => {
    e.preventDefault();
    try {
      await createLesson({ ...formData, groupId: +id });
      setFormData(initialState);
      setIsModalOpen(false);
    } catch (error) {
      setErrorMessage("Dars yaratishda xatolik yuz berdi!");
    }
  };

  const handleDelete = async (lessonId) => {
    if (window.confirm("Darsni o'chirmoqchimisz")) {
      try {
        await deleteLesson(lessonId);
      } catch (error) {
        setErrorMessage("Darsni o'chirishda xatolik yuz berdi!");
      }
    }
  };

  const handleAttendanceClick = (lessonId, attendances) => {
    setSelectedLessonId(lessonId);
    if (attendances.length === 0) {
      setIsAttendanceModal(true);
    } else {
      navigate(`/dashboard/lessons/group/${id}/lesson/${lessonId}`);
    }
  };

  const handleAttendanceStatusChange = (studentId, status) => {
    setAttendanceData((prev) =>
      prev.map((att) =>
        att.studentId === studentId ? { ...att, status } : att
      )
    );
  };

  const handleCreateAttendance = async (e) => {
    e.preventDefault();
    try {
      const attendancePayload = {
        lessonId: selectedLessonId,
        attendances: attendanceData.map(({ studentId, status }) => ({
          studentId,
          status,
        })),
      };

      await createAttendance(attendancePayload);
      setIsAttendanceModal(false);
      setAttendanceData([]);
      setSelectedLessonId(null);
    } catch (error) {
      setErrorMessage("Davomatni saqlashda xatolik yuz berdi!");
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "present":
        return <CheckCircle className="status-icon status-icon--present" />;
      case "absent":
        return <XCircle className="status-icon status-icon--absent" />;
      case "late":
        return <AlertCircle className="status-icon status-icon--late" />;
      default:
        return <CheckCircle className="status-icon status-icon--present" />;
    }
  };

  return (
    <div className="lesson">
      <SecHeader title={"Darslar Boshqaruvi"}>
        <button
          className="lesson__add-btn"
          onClick={() => setIsModalOpen(true)}
        >
          <Plus className="btn-icon" />
          Yangi Dars Qo'shish
        </button>
      </SecHeader>

      {/* Stats Cards */}
      <div className="lesson__stats">
        <div className="stats-card stats-card--primary">
          <div className="stats-card__icon">
            <BookOpen />
          </div>
          <div className="stats-card__content">
            <h3>{lessonsData?.length || 0}</h3>
            <p>Jami Darslar</p>
          </div>
        </div>
        <div className="stats-card stats-card--success">
          <div className="stats-card__icon">
            <UserCheck />
          </div>
          <div className="stats-card__content">
            <h3>{lessonsData?.filter(l => l.attendances.length > 0).length || 0}</h3>
            <p>Davomat Olingan</p>
          </div>
        </div>
        <div className="stats-card stats-card--warning">
          <div className="stats-card__icon">
            <Clock />
          </div>
          <div className="stats-card__content">
            <h3>{lessonsData?.filter(l => l.attendances.length === 0).length || 0}</h3>
            <p>Davomat Kutilmoqda</p>
          </div>
        </div>
      </div>

      {/* Lessons Grid */}
      <div className="lesson__grid">
        {lessonsData?.map(
          ({ id: lessonId, lessonName, lessonDate, endDate, attendances }) => (
            <div className="lesson-card" key={lessonId}>
              <div className="lesson-card__header">
                <div className="lesson-card__title">
                  <BookOpen className="title-icon" />
                  <h3>{lessonName}</h3>
                </div>
                <div className="lesson-card__actions">
                  <button className="action-btn action-btn--edit">
                    <Edit3 />
                  </button>
                  <button
                    className="action-btn action-btn--delete"
                    onClick={() => handleDelete(lessonId)}
                  >
                    <Trash2 />
                  </button>
                </div>
              </div>

              <div className="lesson-card__content">
                <div className="lesson-info">
                  <div className="info-item">
                    <div>
                      <span className="info-label">Boshlanish:</span>
                      <span className="info-value">
                        {new Date(lessonDate).toLocaleString("uz-UZ")}
                      </span>
                    </div>
                  </div>
                  <div className="info-item">
                    <div>
                      <span className="info-label">Tugash:</span>
                      <span className="info-value">
                        {new Date(endDate).toLocaleString("uz-UZ")}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="lesson-card__footer">
                  <button
                    className={`attendance-btn ${attendances.length > 0
                      ? "attendance-btn--completed"
                      : "attendance-btn--pending"
                      }`}
                    onClick={() => handleAttendanceClick(lessonId, attendances)}
                  >
                    <Users className="btn-icon" />
                    <span>
                      {attendances.length > 0
                        ? "Davomatni Ko'rish"
                        : "Davomat Yaratish"}
                    </span>
                  </button>
                </div>
              </div>
            </div>
          )
        )}
      </div>

      {(!lessonsData || lessonsData.length === 0) && (
        <div className="lesson__empty">
          <BookOpen className="empty-icon" />
          <h3>Hozircha darslar yo'q</h3>
          <p>Birinchi darsni yaratish uchun yuqoridagi tugmani bosing</p>
        </div>
      )}

      {isModalOpen && (
        <Module close={() => setIsModalOpen(false)} width={600} bg={"rgba(0,0,0,0.5)"}>
          <div className="modal-content">
            <div className="modal-header">
              <h3>
                <Plus className="modal-icon" />
                Yangi Dars Yaratish
              </h3>
            </div>
            <form onSubmit={createHandleLesson} className="lesson-form">
              <div className="form-group">
                <label>Dars Nomi</label>
                <input
                  required
                  value={formData.lessonName}
                  onChange={(e) =>
                    setFormData({ ...formData, lessonName: e.target.value })
                  }
                  type="text"
                  placeholder="Masalan: JavaScript Asoslari"
                  className="form-input"
                />
              </div>
              {errorMessage && <div className="error-message">{errorMessage}</div>}
              <div className="form-actions">
                <button
                  type="button"
                  className="btn btn--secondary"
                  onClick={() => setIsModalOpen(false)}
                >
                  Bekor Qilish
                </button>
                <button
                  type="submit"
                  className="btn btn--primary"
                  disabled={loading}
                >
                  <Save className="btn-icon" />
                  {
                    loading
                      ? "Yaratilmoqda..."
                      : "Yaratish"
                  }
                </button>

              </div>
            </form>
          </div>
        </Module>
      )}

      {/* Attendance Creation Modal */}
      {isAttendanceModal && (
        <Module
          close={() => setIsAttendanceModal(false)}
          width={1000}
          bg={"rgba(0,0,0,0.5)"}
        >
          <div className="attendance-modal">
            <div className="modal-header">
              <h3>
                <UserCheck className="modal-icon" />
                Davomat Yaratish
              </h3>
            </div>

            <form onSubmit={handleCreateAttendance} className="attendance-form">
              <div className="students-container">
                <div className="students-header">
                  <span className="header-cell">O'quvchi</span>
                  <span className="header-cell">Davomat Holati</span>
                </div>

                <div className="students-list">
                  {attendanceData.map(({ studentId, studentName, status }) => (
                    <div key={studentId} className="student-row">
                      <div className="student-info">
                        <Users className="student-icon" />
                        <span className="student-name">{studentName}</span>
                      </div>

                      <div className="attendance-options">
                        <label className={`option-label ${status === "present" ? "active" : ""}`}>
                          <input
                            type="radio"
                            name={`attendance_${studentId}`}
                            value="present"
                            checked={status === "present"}
                            onChange={() =>
                              handleAttendanceStatusChange(studentId, "present")
                            }
                          />
                          {getStatusIcon("present")}
                          <span>Kelgan</span>
                        </label>

                        <label className={`option-label ${status === "absent" ? "active" : ""}`}>
                          <input
                            type="radio"
                            name={`attendance_${studentId}`}
                            value="absent"
                            checked={status === "absent"}
                            onChange={() =>
                              handleAttendanceStatusChange(studentId, "absent")
                            }
                          />
                          {getStatusIcon("absent")}
                          <span>Kelmagan</span>
                        </label>

                        <label className={`option-label ${status === "late" ? "active" : ""}`}>
                          <input
                            type="radio"
                            name={`attendance_${studentId}`}
                            value="late"
                            checked={status === "late"}
                            onChange={() =>
                              handleAttendanceStatusChange(studentId, "late")
                            }
                          />
                          {getStatusIcon("late")}
                          <span>Kechikkan</span>
                        </label>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {errorMessage && <div className="error-message">{errorMessage}</div>}

              <div className="form-actions">
                <button
                  type="button"
                  className="btn btn--secondary"
                  onClick={() => setIsAttendanceModal(false)}
                >
                  <X className="btn-icon" />
                  Bekor Qilish
                </button>
                <button
                  type="submit"
                  className="btn btn--primary"
                  disabled={isLoading} 
                >
                  <Save className="btn-icon" />
                  {isLoading ? "Saqlanmoqda..." : "Davomatni Saqlash"}
                </button>

              </div>
            </form>
          </div>
        </Module>
      )}
    </div>
  );
};

export default Lesson;