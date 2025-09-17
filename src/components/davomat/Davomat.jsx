import React, { useState, useEffect } from "react";
import {
  Search,
  Calendar,
  Download,
  Users,
  CheckCircle,
  XCircle,
  Clock,
  Eye,
} from "lucide-react";
import "./davomat.scss";
import { useParams } from "react-router-dom";
import { useGetLessonAttendanceQuery } from "../../context/api/attendanceApi";

const Davomat = () => {
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedClass, setSelectedClass] = useState("");
  const [attendanceData, setAttendanceData] = useState([]);
  const { lessonId } = useParams();

  const { data: lessonAttendanceData, isSuccess } =
    useGetLessonAttendanceQuery(lessonId);

  useEffect(() => {
    if (isSuccess) setAttendanceData(lessonAttendanceData?.students || []);
  }, [isSuccess]);

  const filteredStudents = attendanceData.filter((student) => {
    const matchesSearch = student.studentName
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesClass = !selectedClass || student.class === selectedClass;
    return matchesSearch && matchesClass;
  });

  const updateAttendance = (studentId, status) => {
    setAttendanceData((prev) =>
      prev.map((student) =>
        student.id === studentId ? { ...student, status } : student
      )
    );
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "present":
        return <CheckCircle className="status-icon" />;
      case "absent":
        return <XCircle className="status-icon" />;
      case "late":
        return <Clock className="status-icon" />;
      default:
        return null;
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case "present":
        return "Hozir";
      case "absent":
        return "Yo'q";
      case "late":
        return "Kech";
      default:
        return "";
    }
  };

  const stats = {
    total: filteredStudents.length,
    present: filteredStudents.filter((s) => s.status === "present").length,
    absent: filteredStudents.filter((s) => s.status === "absent").length,
    late: filteredStudents.filter((s) => s.status === "late").length,
  };

  const handleSaveAttendance = () => {
    console.log("Davomat saqlandi:", attendanceData);
    alert("Davomat muvaffaqiyatli saqlandi!");
  };

  const handleExport = () => {
    console.log("Ma'lumotlar eksport qilindi");
    alert("Ma'lumotlar eksport qilindi!");
  };

  return (
    <div className="davomat-container">
      <div className="davomat-wrapper">
        <div className="header-section">
          <h1 className="main-title">O'quvchilar Davomati</h1>
          <p className="main-subtitle">
            O'quvchilarning kunlik davomat holatini kuzatib boring
          </p>
        </div>

        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-content">
              <div className="stat-info">
                <p className="stat-label">Jami O'quvchilar</p>
                <p className="stat-value">
                  {lessonAttendanceData?.statistics?.totalStudents}
                </p>
              </div>
              <Users className="stat-icon stat-icon-blue" />
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-content">
              <div className="stat-info">
                <p className="stat-label">Hozir</p>
                <p className="stat-value stat-value-green">
                  {lessonAttendanceData?.statistics?.present}
                </p>
              </div>
              <CheckCircle className="stat-icon stat-icon-green" />
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-content">
              <div className="stat-info">
                <p className="stat-label">Yo'q</p>
                <p className="stat-value stat-value-red">
                  {lessonAttendanceData?.statistics?.absent}
                </p>
              </div>
              <XCircle className="stat-icon stat-icon-red" />
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-content">
              <div className="stat-info">
                <p className="stat-label">Kech</p>
                <p className="stat-value stat-value-yellow">{stats.late}</p>
              </div>
              <Clock className="stat-icon stat-icon-yellow" />
            </div>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="filters-panel">
          <div className="filters-grid">
            <div className="filter-group">
              <div className="input-wrapper">
                <Search className="input-icon" />
                <input
                  type="text"
                  placeholder="O'quvchi ismini qidiring..."
                  className="search-input"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>

            <div className="filter-group">
              <div className="input-wrapper">
                <Calendar className="input-icon" />
                <input
                  type="date"
                  className="date-input"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                />
              </div>
            </div>

            <button className="export-btn" onClick={handleExport}>
              <Download className="btn-icon" />
              Export
            </button>
          </div>
        </div>

        {/* Attendance Table */}
        <div className="table-container">
          <div className="table-wrapper">
            <table className="attendance-table">
              <thead className="table-head">
                <tr>
                  <th className="table-header">O'quvchi</th>
                  <th className="table-header">Raqam</th>
                  <th className="table-header">Guruh</th>
                  <th className="table-header">Holat</th>
                  <th className="table-header">Amallar</th>
                </tr>
              </thead>
              <tbody className="table-body">
                {filteredStudents
                  .map((student) => (
                    <tr key={student.id} className="table-row">
                      <td className="table-cell">
                        <div className="student-info">
                          <div className="student-avatar">
                            <span className="avatar-text">
                              {student.studentName.charAt(0)}
                            </span>
                          </div>
                          <div className="student-details">
                            <div className="student-name">
                              {student.studentName}
                            </div>
                            {/* <div className="student-id">
                            ID: {student.id.toString().padStart(4, '0')}
                          </div> */}
                          </div>
                        </div>
                      </td>
                      <td className="table-cell">
                        <span className="class-badge">{student.phone}</span>
                      </td>
                      <td className="table-cell">
                        <span className="group-text">{student.groupName}</span>
                      </td>
                      <td className="table-cell">
                        <div
                          className={`status-indicator status-${student.status}`}
                        >
                          {getStatusIcon(student.status)}
                          <span className="status-text">
                            {getStatusText(student.status)}
                          </span>
                        </div>
                      </td>
                      <td className="table-cell">
                        <div className="action-buttons">
                          <button
                            onClick={() =>
                              updateAttendance(student.studentId, "present")
                            }
                            className={`action-btn ${
                              student.status === "present"
                                ? "action-btn-active-green"
                                : "action-btn-green"
                            }`}
                            title="Hozir deb belgilash"
                          >
                            <CheckCircle className="action-icon" />
                          </button>
                          <button
                            onClick={() =>
                              updateAttendance(student.studentId, "absent")
                            }
                            className={`action-btn ${
                              student.status === "absent"
                                ? "action-btn-active-red"
                                : "action-btn-red"
                            }`}
                            title="Yo'q deb belgilash"
                          >
                            <XCircle className="action-icon" />
                          </button>
                          <button
                            onClick={() =>
                              updateAttendance(student.studentId, "late")
                            }
                            className={`action-btn ${
                              student.status === "late"
                                ? "action-btn-active-yellow"
                                : "action-btn-yellow"
                            }`}
                            title="Kech deb belgilash"
                          >
                            <Clock className="action-icon" />
                          </button>
                          <button
                            className="action-btn action-btn-gray"
                            title="Batafsil ko'rish"
                          >
                            <Eye className="action-icon" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                  .reverse()}
              </tbody>
            </table>
          </div>

          {filteredStudents.length === 0 && (
            <div className="empty-state">
              <Users className="empty-icon" />
              <h3 className="empty-title">O'quvchi topilmadi</h3>
              <p className="empty-description">
                Qidiruv mezonlaringizni o'zgartirib ko'ring
              </p>
            </div>
          )}
        </div>

        {/* Save Button */}
        <div className="save-section">
          <button className="save-btn" onClick={handleSaveAttendance}>
            Davomatni Saqlash
          </button>
        </div>
      </div>
    </div>
  );
};

export default Davomat;
