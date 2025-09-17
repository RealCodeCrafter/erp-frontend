import React, { useEffect, useState, useMemo } from "react";
import {
  Plus,
  Edit3,
  Trash2,
  BookOpen,
  Users,
  Calendar,
  Search,
  Filter,
  X,
  Save,
  CheckCircle,
  User,
  Group,
  SortAsc,
  SortDesc,
} from "lucide-react";
import "./course.scss";
import Module from "../../components/Module/Module";
import {
  useCreateCourseMutation,
  useDeleteCourseMutation,
  useGetCoursesQuery,
  useUpdateCourseMutation,
} from "../../context/api/courseApi";

import { useGetValue } from "../../hooks/useGetValue";
import toast from "react-hot-toast";
import DeleteModule from "../../components/deleteModule/DeleteModule";

const initialState = {
  name: "",
  description: "",
};

const Course = () => {
  const [courseHide, setCourseHide] = useState(false);
  const [createHide, setCreateHide] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [editingCourse, setEditingCourse] = useState(null);
  const [sortBy, setSortBy] = useState("name");
  const [sortOrder, setSortOrder] = useState("asc");
  const [filterActive, setFilterActive] = useState(false);

  const { data } = useGetCoursesQuery();
  console.log(data);
  const { formData, setFormData, handleChange } = useGetValue(initialState);
  const [createCourse, { data: createData, isSuccess, isError }] =
    useCreateCourseMutation();
  const [deleteCourse] = useDeleteCourseMutation();
  const [update] = useUpdateCourseMutation();

  const [deleteId, setDeleteId] = useState(null);
  const [deleteHide, setDeleteHide] = useState(false);
  console.log(data);

  const createHandleCourse = (e) => {
    e.preventDefault();
    createCourse(formData);
    setFormData(initialState);
    setCreateHide(false);
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success("Kurs muoffaqiyatli yaratildi");
    }
  }, [isSuccess]);

  useEffect(() => {
    if (isError) {
      toast.error("Kurs yaratishda xatolik yuz berdi");
    }
  }, [isError]);

  const handleEdit = (course) => {
    setEditingCourse(course);
    setFormData({ name: course.name, description: course.description });
    setCourseHide(true);
  };

  const handleUpdate = (e) => {
    e.preventDefault();

    if (!formData.name.trim()) {
      return toast.error("Kurs nomi majburiy!");
    }
    if (
      !formData.description.trim() ||
      formData.description.trim().length < 10
    ) {
      return toast.error("Tavsif kamida 10 ta belgidan iborat bo‘lishi kerak!");
    }

    update({
      id: editingCourse.id, // bu query param sifatida yuboriladi
      body: {
        name: formData.name.trim(),
        description: formData.description.trim(),
      },
    });

    setCourseHide(false);
    setEditingCourse(null);
    setFormData(initialState);
    toast.success("Kurs muoffaqiyatli yangilandi");
  };

  const handleDelete = (id) => {
    deleteCourse(id);
    toast.success("Kurs muoffaqiyatli o'chirildi");
  };

  const filteredAndSortedCourses = useMemo(() => {
    if (!data) return [];

    let filtered = data?.courses;

    if (searchTerm.trim()) {
      filtered = data?.courses?.filter((course) => {
        const searchLower = searchTerm.toLowerCase();
        return (
          course.name?.toLowerCase().includes(searchLower) ||
          course.description?.toLowerCase().includes(searchLower) ||
          course.id?.toString().includes(searchTerm)
        );
      });
    }

    const sortedFiltered = [...filtered].sort((a, b) => {
      let aValue, bValue;

      switch (sortBy) {
        case "name":
          aValue = a.name?.toLowerCase() || "";
          bValue = b.name?.toLowerCase() || "";
          break;
        case "students":
          aValue = a.studentsCount || 0;
          bValue = b.studentsCount || 0;
          break;
        case "groups":
          aValue = a.groupsCount || 0;
          bValue = b.groupsCount || 0;
          break;
        case "created":
          aValue = new Date(a.createdAt || 0);
          bValue = new Date(b.createdAt || 0);
          break;
        default:
          return 0;
      }

      if (aValue < bValue) return sortOrder === "asc" ? -1 : 1;
      if (aValue > bValue) return sortOrder === "asc" ? 1 : -1;
      return 0;
    });

    return sortedFiltered;
  }, [data, searchTerm, sortBy, sortOrder]);

  const handleSort = (field) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortBy(field);
      setSortOrder("asc");
    }
  };

  const clearSearch = () => {
    setSearchTerm("");
  };

  const totalStudents = data?.statistics?.totalStudents;
  const thisMonthCourses =
    data?.courses?.filter((course) => {
      const courseDate = new Date(course.createdAt);
      const currentDate = new Date();
      return (
        courseDate.getMonth() === currentDate.getMonth() &&
        courseDate.getFullYear() === currentDate.getFullYear()
      );
    }).length || 0;

  return (
    <div className="course-container">
      <div className="main-wrapper">
        <div className="header-section">
          <div className="header-content">
            <div className="header-text">
              <h1 className="title">Kurs Boshqaruvi</h1>
              <p className="subtitle">
                O'quv kurslarini yaratish, tahrirlash va boshqarish
              </p>
            </div>

            <button
              onClick={() => setCreateHide(true)}
              className="create-button"
            >
              <Plus className="w-5 h-5" />
              <span>Yangi Kurs</span>
            </button>
          </div>

          <div className="search-filter-section">
            <div className="search-container">
              <Search className="search-icon" />
              <input
                type="text"
                placeholder="Kurs nomi, tavsifi yoki ID bo'yicha qidirish..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-input"
              />
            </div>

            <div className="filter-sort-controls">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="sort-select"
              >
                <option value="name">Nom bo'yicha</option>
                <option value="students">Talabalar soni</option>
                <option value="groups">Guruhlar soni</option>
                <option value="created">Yaratilgan sana</option>
              </select>

              <button
                onClick={() => handleSort(sortBy)}
                className="sort-order-button"
              >
                {sortOrder === "asc" ? (
                  <SortAsc className="w-4 h-4" />
                ) : (
                  <SortDesc className="w-4 h-4" />
                )}
              </button>
            </div>
          </div>

          {searchTerm && (
            <div className="search-results-info">
              <p>
                "{searchTerm}" bo'yicha {filteredAndSortedCourses.length} ta
                kurs topildi
                {filteredAndSortedCourses.length !== data?.length &&
                  ` (${data?.statistics?.totalCourses} tadan)`}
              </p>
            </div>
          )}
        </div>

        <div className="stats-section">
          <div className="stat-card">
            <div className="stat-content">
              <div className="stat-info">
                <p className="stat-label">
                  {searchTerm ? "Topilgan Kurslar" : "Jami Kurslar"}
                </p>
                <p className="stat-value">
                  {searchTerm
                    ? filteredAndSortedCourses.length
                    : data?.statistics?.totalCourses || 0}
                </p>
              </div>
              <div className="stat-icon books">
                <BookOpen />
              </div>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-content">
              <div className="stat-info">
                <p className="stat-label">Jami Talabalar</p>
                <p className="stat-value">{totalStudents}</p>
              </div>
              <div className="stat-icon users">
                <Users />
              </div>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-content">
              <div className="stat-info">
                <p className="stat-label">Bu Oyda</p>
                <p className="stat-value">
                  {data?.statistics?.coursesThisMonth}
                </p>
              </div>
              <div className="stat-icon calendar">
                <Calendar />
              </div>
            </div>
          </div>
        </div>

        {filteredAndSortedCourses.length > 0 ? (
          <div className="course-grid">
            {filteredAndSortedCourses.map((course) => (
              <div key={course.id} className="course-card">
                <div className="card-header">
                  <div className="course-icon">
                    <BookOpen />
                  </div>
                  <div className="action-buttons">
                    <button
                      onClick={() => handleEdit(course)}
                      className="action-button edit"
                    >
                      <Edit3 />
                    </button>
                    <button
                      onClick={() => {
                        setDeleteId(course?.id);
                        setDeleteHide(true);
                      }}
                      className="action-button delete"
                    >
                      <Trash2 />
                    </button>
                  </div>
                </div>

                <div className="course-info">
                  <h3 className="course-title">{course?.name}</h3>
                  <p className="course-description">{course?.description}</p>
                </div>

                <div className="course-meta">
                  <div className="meta-item">
                    <User />
                    <span>{course?.studentsCount || 0} talaba</span>
                  </div>
                  <div className="meta-item">
                    <Users />
                    <span>{course?.groupsCount || 0} guruhlar</span>
                  </div>
                </div>

                <div className="course-status">
                  <div className="status-indicator">
                    <div className="status-dot"></div>
                    <span className="status-text">Faol</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="empty-state">
            <div className="empty-icon">
              {searchTerm ? <Search /> : <BookOpen />}
            </div>
            <h3 className="empty-title">
              {searchTerm
                ? "Qidiruv natijalari topilmadi"
                : "Kurslar mavjud emas"}
            </h3>
            <p className="empty-description">
              {searchTerm
                ? `"${searchTerm}" bo'yicha hech qanday kurs topilmadi. Boshqa kalit so'zlar bilan qidiring.`
                : "Hozircha kurslar mavjud emas. Yangi kurs yarating."}
            </p>
            {searchTerm && (
              <button onClick={clearSearch} className="clear-search-button">
                Qidiruvni tozalash
              </button>
            )}
          </div>
        )}
      </div>

      {deleteHide && (
        <DeleteModule
          close={() => setDeleteHide(false)}
          onConfirm={() => {
            handleDelete(deleteId);
            setDeleteHide(false);
          }}
          bg="rgba(0,0,0,0.6)"
          width="300px"
        />
      )}

      {createHide && (
        <Module close={setCreateHide} bg={"#aaa6"} width={"500px"}>
          <div className="modal-content">
            <div className="modal-header">
              <h2 className="modal-title">Yangi Kurs Yaratish</h2>
            </div>

            <form className="modal-form" onSubmit={createHandleCourse}>
              <div className="form-group">
                <label className="form-label">Kurs nomi</label>
                <input
                  required
                  value={formData.name}
                  onChange={handleChange}
                  name="name"
                  type="text"
                  placeholder="Kurs nomini kiriting"
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label className="form-label">Tavsif</label>
                <textarea
                  type="text"
                  value={formData.description}
                  onChange={handleChange}
                  name="description"
                  placeholder="Kurs tavsifini kiriting"
                  rows="4"
                  className="form-textarea"
                />
              </div>

              <div className="form-actions">
                <button
                  type="button"
                  onClick={() => setCreateHide(false)}
                  className="cancel-button"
                >
                  Bekor qilish
                </button>
                <button type="submit" className="submit-button create">
                  <Save />
                  <span>Yaratish</span>
                </button>
              </div>
            </form>
          </div>
        </Module>
      )}

      {courseHide && (
        <Module close={setCourseHide} bg={"#aaa6"} width={"500px"}>
          <div className="modal-content">
            <div className="modal-header">
              <h2 className="modal-title">Kursni Tahrirlash</h2>
            </div>

            <form className="modal-form" onSubmit={handleUpdate}>
              <div className="form-group">
                <label className="form-label">Kurs nomi</label>
                <input
                  required
                  value={formData.name}
                  onChange={handleChange}
                  name="name"
                  type="text"
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label className="form-label">Tavsif</label>
                <textarea
                  required
                  value={formData.description}
                  onChange={handleChange}
                  name="description"
                  rows="4"
                  className="form-textarea"
                />
              </div>

              <div className="form-actions">
                <button
                  type="button"
                  onClick={() => {
                    setCourseHide(false);
                    setEditingCourse(null);
                  }}
                  className="cancel-button"
                >
                  Bekor qilish
                </button>
                <button type="submit" className="submit-button update">
                  <CheckCircle />
                  <span>Saqlash</span>
                </button>
              </div>
            </form>
          </div>
        </Module>
      )}
    </div>
  );
};

export default Course;
