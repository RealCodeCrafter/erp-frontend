import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import {
  Plus,
  Edit,
  Trash2,
  Users,
  BookOpen,
  User,
  Search,
  X,
  Save,
  GraduationCap,
  Clock,
  ChevronRight,
  Calendar,
  DollarSign,
  MapPin,
  Phone,
} from "lucide-react";
import { useGetCoursesQuery } from "../../context/api/courseApi";
import { useGetTeacherQuery } from "../../context/api/teacherApi";
import {
  useCreateGroupMutation,
  useDeleteGroupMutation,
  useGetGroupsAllQuery,
  useUpdateGroupMutation,
} from "../../context/api/groupApi";
import Module from "../../components/Module/Module";
import DeleteModule from "../../components/deleteModule/DeleteModule";
import "./group.scss";

const initialState = {
  name: "",
  courseId: "",
  teacherId: "",
  startTime: "",
  endTime: "",
  price: "",
  daysOfWeek: [],
};

const Group = () => {
  const { data: courseData } = useGetCoursesQuery();
  const { data: teachersData } = useGetTeacherQuery();
  const { data } = useGetGroupsAllQuery();
  const [createGroup, { isLoading: createLoading }] = useCreateGroupMutation();
  const [deleteGroup] = useDeleteGroupMutation();
  const [updateGroup, { isLoading: updateLoading }] = useUpdateGroupMutation();

  const [formData, setFormData] = useState(initialState);
  const [deleteId, setDeleteId] = useState(null);
  const [deleteHide, setDeleteHide] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentGroupId, setCurrentGroupId] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  // Format number helper
  const formatNumber = (num) => {
    return num?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  };

  // Get days in Uzbek
  const getDaysInUzbek = (days) => {
    const dayMap = {
      Monday: "Du",
      Tuesday: "Se",
      Wednesday: "Ch",
      Thursday: "Pa",
      Friday: "Ju",
      Saturday: "Sh",
      Sunday: "Ya",
    };

    if (Array.isArray(days)) {
      return days.map((day) => dayMap[day] || day).join(", ");
    }
    return "";
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "price") {
      let rawValue = value.replace(/\s/g, "");
      if (!/^\d*$/.test(rawValue)) return;
      setFormData((prev) => ({ ...prev, price: rawValue }));
      return;
    }

    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleDayChange = (dayValue, isChecked) => {
    if (isChecked) {
      setFormData((prev) => ({
        ...prev,
        daysOfWeek: [...prev.daysOfWeek, dayValue],
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        daysOfWeek: prev.daysOfWeek.filter((d) => d !== dayValue),
      }));
    }
  };

  // handleSubmit funksiyasidagi payload qismini quyidagicha o'zgartiring:

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.courseId || !formData.teacherId) {
      toast.error("Barcha majburiy maydonlarni to'ldiring");
      return;
    }

    if (!formData.startTime || !formData.endTime) {
      toast.error("Vaqt maydonlarini to'ldiring");
      return;
    }

    if (formData.daysOfWeek.length === 0) {
      toast.error("Kamida bitta kun tanlang");
      return;
    }

    const payload = {
      name: formData.name,
      courseId: Number(formData.courseId),
      teacherId: Number(formData.teacherId),
      startTime: formData.startTime,
      endTime: formData.endTime,
      price: formData.price ? Number(formData.price.replace(/\s/g, "")) : 0, // Bu qatorni o'zgartirdik
      daysOfWeek: formData.daysOfWeek,
    };

    try {
      if (isEditing) {
        await updateGroup({ id: currentGroupId, ...payload }).unwrap();
        console.log(payload);
        toast.success("Guruh muvaffaqiyatli yangilandi");
      } else {
        await createGroup(payload).unwrap();
        toast.success("Guruh muvaffaqiyatli yaratildi");
      }
      resetForm();
    } catch (error) {
      console.error("Guruh operatsiyasi xatosi:", error);
      toast.error(error?.data?.message || "Xatolik yuz berdi");
    }
  };

  // Yoki handleEdit funksiyasida ham narxni to'g'ri tayyorlang:
  const handleEdit = (group) => {
    // Find teacher and course from the data
    const teacher = teachersData?.find(
      (t) => t.firstName + " " + t.lastName === group.teacher
    );
    const course = courseData?.courses?.find((c) => c.name === group.course);

    // Get group details from teacher's groups
    const groupDetails = teacher?.groups?.find((g) => g.id === group.id);

    setFormData({
      name: group.name || "",
      courseId: course?.id?.toString() || "",
      teacherId: teacher?.id?.toString() || "",
      startTime: groupDetails?.startTime || "",
      endTime: groupDetails?.endTime || "",
      price:
        group.price?.toString().replace(".00", "").replace(/\s/g, "") || "", // Bu qatorni o'zgartirdik
      daysOfWeek: groupDetails?.daysOfWeek || [],
    });

    setCurrentGroupId(group.id);
    setIsEditing(true);
    setIsModalOpen(true);
  };

  const handleDelete = async (id) => {
    try {
      await deleteGroup(id).unwrap();
      toast.success("Guruh muvaffaqiyatli o'chirildi");
      setDeleteHide(false);
    } catch (error) {
      console.error("Delete error:", error);
      toast.error("Guruhni o'chirishda xatolik");
    }
  };

  const resetForm = () => {
    setFormData(initialState);
    setIsModalOpen(false);
    setIsEditing(false);
    setCurrentGroupId(null);
  };

  const openCreateModal = () => {
    setFormData(initialState);
    setIsEditing(false);
    setCurrentGroupId(null);
    setIsModalOpen(true);
  };

  const filteredGroups =
    data?.groups?.filter((group) => {
      if (!searchTerm) return true;
      const searchLower = searchTerm.toLowerCase();
      return (
        group?.name?.toLowerCase().includes(searchLower) ||
        group?.teacher?.toLowerCase().includes(searchLower) ||
        group?.course?.toLowerCase().includes(searchLower)
      );
    }) || [];

  const clearSearch = () => setSearchTerm("");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="group-page">
      <div className="group-container">
        {/* Header */}
        <div className="page-header">
          <div className="header-top">
            <div className="title-section">
              <h1 className="page-title">Guruhlar boshqaruvi</h1>
              <p className="page-subtitle">
                Barcha guruhlarni boshqaring va yangilarini yarating
              </p>
            </div>
            <button className="create-btn" onClick={openCreateModal}>
              <Plus size={20} />
              <span>Yangi Guruh</span>
            </button>
          </div>

          <div className="search-section">
            <div className="search-box">
              <Search className="search-icon" size={20} />
              <input
                type="text"
                placeholder="Guruh, o'qituvchi yoki kurs nomi bo'yicha qidiring..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-input"
              />
              {searchTerm && (
                <button onClick={clearSearch} className="clear-btn">
                  <X size={16} />
                </button>
              )}
            </div>
            {searchTerm && (
              <div className="search-info">
                <span>{filteredGroups.length} ta natija topildi</span>
              </div>
            )}
          </div>
        </div>

        {/* Statistics Cards */}
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-icon">
              <Users size={24} />
            </div>
            <div className="stat-content">
              <h3 className="stat-number">
                {data?.statistics?.totalGroups || 0}
              </h3>
              <p className="stat-label">Jami Guruhlar</p>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon">
              <GraduationCap size={24} />
            </div>
            <div className="stat-content">
              <h3 className="stat-number">
                {data?.statistics?.totalStudents || 0}
              </h3>
              <p className="stat-label">Jami Talabalar</p>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon">
              <BookOpen size={24} />
            </div>
            <div className="stat-content">
              <h3 className="stat-number">
                {data?.statistics?.activeCourses || 0}
              </h3>
              <p className="stat-label">Faol Kurslar</p>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon">
              <Calendar size={24} />
            </div>
            <div className="stat-content">
              <h3 className="stat-number">
                {data?.statistics?.totalGroupsThisMonth || 0}
              </h3>
              <p className="stat-label">Bu Oyda</p>
            </div>
          </div>
        </div>

        {/* Groups Grid */}
        {filteredGroups.length > 0 ? (
          <div className="groups-grid">
            {filteredGroups.map((group) => {
              // Find teacher details for this group
              const teacher = teachersData?.find(
                (t) => t.firstName + " " + t.lastName === group.teacher
              );
              const groupDetails = teacher?.groups?.find(
                (g) => g.id === group.id
              );

              return (
                <div key={group.id} className="group-card">
                  <div className="card-header">
                    <div className="group-title">
                      <h3 className="group-name">
                        <Link to={`/dashboard/groups/${group.id}`}>
                          {group.name}
                        </Link>
                      </h3>
                      <div className="status-badge active">
                        <div className="status-dot"></div>
                        <span>Faol</span>
                      </div>
                    </div>
                    <div className="card-actions">
                      <button
                        onClick={() => handleEdit(group)}
                        className="action-btn edit"
                        title="Tahrirlash"
                      >
                        <Edit size={16} />
                      </button>
                      <button
                        onClick={() => {
                          setDeleteId(group.id);
                          setDeleteHide(true);
                        }}
                        className="action-btn delete"
                        title="O'chirish"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>

                  <div className="card-body">
                    <div className="info-row">
                      <div className="info-item">
                        <User size={16} />
                        <span>
                          <strong>O'qituvchi:</strong> {group.teacher}
                        </span>
                      </div>
                    </div>

                    <div className="info-row">
                      <div className="info-item">
                        <BookOpen size={16} />
                        <span>
                          <strong>Kurs:</strong> {group.course}
                        </span>
                      </div>
                    </div>

                    <div className="info-row">
                      <div className="info-item">
                        <GraduationCap size={16} />
                        <span>
                          <strong>Talabalar:</strong> {group.studentCount} kishi
                        </span>
                      </div>
                    </div>

                    {groupDetails && (
                      <>
                        <div className="info-row">
                          <div className="info-item">
                            <Clock size={16} />
                            <span>
                              <strong>Vaqt:</strong> {groupDetails.startTime} -{" "}
                              {groupDetails.endTime}
                            </span>
                          </div>
                        </div>

                        <div className="info-row">
                          <div className="info-item">
                            <Calendar size={16} />
                            <span>
                              <strong>Kunlar:</strong>{" "}
                              {getDaysInUzbek(groupDetails.daysOfWeek)}
                            </span>
                          </div>
                        </div>
                      </>
                    )}

                    <div className="info-row">
                      <div className="info-item price">
                        <DollarSign size={16} />
                        <span>
                          <strong>Narx:</strong>{" "}
                          {formatNumber(group.price?.replace(".00", ""))} so'm
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="card-footer">
                    <Link
                      to={`/dashboard/groups/${group.id}`}
                      className="view-btn"
                    >
                      Batafsil ko'rish
                      <ChevronRight size={16} />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="empty-state">
            <div className="empty-icon">
              <Users size={48} />
            </div>
            <h3 className="empty-title">
              {searchTerm ? "Guruhlar topilmadi" : "Hali guruhlar yo'q"}
            </h3>
            <p className="empty-message">
              {searchTerm
                ? `"${searchTerm}" so'roviga mos guruhlar mavjud emas.`
                : "Birinchi guruhingizni yaratish uchun yuqoridagi tugmani bosing."}
            </p>
            {searchTerm && (
              <button onClick={clearSearch} className="clear-search-btn">
                Qidiruvni tozalash
              </button>
            )}
            {!searchTerm && (
              <button onClick={openCreateModal} className="create-first-btn">
                <Plus size={20} />
                Birinchi guruhni yaratish
              </button>
            )}
          </div>
        )}
      </div>

      {/* Delete Modal */}
      {deleteHide && (
        <DeleteModule
          close={() => setDeleteHide(false)}
          onConfirm={() => handleDelete(deleteId)}
          bg="rgba(0,0,0,0.6)"
          width="350px"
        />
      )}

      {/* Create/Edit Modal */}
      {isModalOpen && (
        <Module
          close={() => setIsModalOpen(false)}
          bg="rgba(0,0,0,0.7)"
          width="600px"
        >
          <div className="group-modal">
            <div className="modal-header">
              <h2 className="modal-title">
                {isEditing ? "Guruhni Tahrirlash" : "Yangi Guruh Yaratish"}
              </h2>
            </div>

            <div className="modal-body">
              <form className="group-form" onSubmit={handleSubmit}>
                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label">
                      <User size={16} />
                      O'qituvchi *
                    </label>
                    <select
                      name="teacherId"
                      value={formData.teacherId}
                      onChange={handleSelectChange}
                      className="form-select"
                      required
                    >
                      <option value="" disabled>
                        O'qituvchi tanlang
                      </option>
                      {teachersData?.map((teacher) => (
                        <option key={teacher.id} value={teacher.id}>
                          {teacher.firstName} {teacher.lastName}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="form-group">
                    <label className="form-label">
                      <BookOpen size={16} />
                      Kurs *
                    </label>
                    <select
                      name="courseId"
                      value={formData.courseId}
                      onChange={handleSelectChange}
                      className="form-select"
                      required
                    >
                      <option value="" disabled>
                        Kursni tanlang
                      </option>
                      {courseData?.courses?.map((course) => (
                        <option key={course.id} value={course.id}>
                          {course.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">
                    <Users size={16} />
                    Guruh nomi *
                  </label>
                  <input
                    name="name"
                    type="text"
                    placeholder="Masalan: Beginner, Intermediate..."
                    value={formData.name}
                    onChange={handleChange}
                    className="form-input"
                    required
                  />
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label">
                      <Clock size={16} />
                      Boshlanish vaqti *
                    </label>
                    <input
                      name="startTime"
                      type="time"
                      value={formData.startTime}
                      onChange={handleChange}
                      className="form-input"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">
                      <Clock size={16} />
                      Tugash vaqti *
                    </label>
                    <input
                      name="endTime"
                      type="time"
                      value={formData.endTime}
                      onChange={handleChange}
                      className="form-input"
                      required
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">
                    <DollarSign size={16} />
                    Narxi (so'm)
                  </label>
                  <input
                    type="text"
                    name="price"
                    value={formatNumber(formData.price || "")}
                    onChange={handleChange}
                    placeholder="500 000"
                    className="form-input"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">
                    <Calendar size={16} />
                    Dars kunlari *
                  </label>
                  <div className="days-grid">
                    {[
                      { value: "Monday", label: "Dushanba" },
                      { value: "Tuesday", label: "Seshanba" },
                      { value: "Wednesday", label: "Chorshanba" },
                      { value: "Thursday", label: "Payshanba" },
                      { value: "Friday", label: "Juma" },
                      { value: "Saturday", label: "Shanba" },
                      { value: "Sunday", label: "Yakshanba" },
                    ].map((day) => (
                      <label key={day.value} className="day-checkbox">
                        <input
                          type="checkbox"
                          value={day.value}
                          checked={
                            formData?.daysOfWeek?.includes(day.value) || false
                          }
                          onChange={(e) =>
                            handleDayChange(day.value, e.target.checked)
                          }
                        />
                        <span className="checkbox-label">{day.label}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="form-actions">
                  <button
                    type="button"
                    onClick={resetForm}
                    className="btn-cancel"
                  >
                    Bekor qilish
                  </button>
                  <button
                    type="submit"
                    className="btn-submit"
                    disabled={createLoading || updateLoading}
                  >
                    <Save size={16} />
                    <span>
                      {createLoading || updateLoading
                        ? "Saqlanmoqda..."
                        : isEditing
                        ? "Yangilash"
                        : "Yaratish"}
                    </span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </Module>
      )}
    </div>
  );
};
export default Group;
