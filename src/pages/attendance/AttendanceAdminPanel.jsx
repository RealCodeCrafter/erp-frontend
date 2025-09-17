import React, { useState, useEffect, useMemo } from "react";
import {
  Users,
  Search,
  Eye,
  UserCheck,
  UserX,
  Clock,
  RotateCcw,
  Calendar,
} from "lucide-react";
import "./AttendanceAdminPanel.scss";
import { useGetAttendancesDailyStatsQuery } from "../../context/api/attendanceApi";
import dayjs from "dayjs";
import { useGetGroupsAllQuery } from "../../context/api/groupApi";
import { NavLink } from "react-router-dom";

const AttendanceAdminPanel = () => {
  const [selectedGroup, setSelectedGroup] = useState("all");
  const [viewMode, setViewMode] = useState("daily");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDate, setSelectedDate] = useState(
    dayjs().format("YYYY-MM-DD")
  );
  const [hasUserInteracted, setHasUserInteracted] = useState(false);

  const queryParams = useMemo(() => {
    if (!hasUserInteracted) return {};

    const params = {
      period: viewMode,
      date: selectedDate,
    };

    if (selectedGroup !== "all" && selectedGroup) {
      params.groupId = selectedGroup;
    }

    if (searchTerm.trim()) {
      params.studentName = searchTerm.trim();
    }

    return params;
  }, [hasUserInteracted, viewMode, selectedDate, selectedGroup, searchTerm]);

  const {
    data: attendancesDailyStatsData,
    isLoading,
    error,
    refetch,
  } = useGetAttendancesDailyStatsQuery(queryParams, {
    skip: !hasUserInteracted,
  });

  const { data: groupsData, isLoading: groupsLoading } = useGetGroupsAllQuery();

  useEffect(() => {
    const timer = setTimeout(() => {
      setHasUserInteracted(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (hasUserInteracted) {
      const debounceTimer = setTimeout(() => {
        refetch();
      }, 300); // debounce qo'shildi

      return () => clearTimeout(debounceTimer);
    }
  }, [queryParams, hasUserInteracted, refetch]);

  const getStatusIcon = (status) => {
    const iconMap = {
      present: <UserCheck className="status-icon" />,
      absent: <UserX className="status-icon" />,
      late: <Clock className="status-icon" />,
    };
    return iconMap[status] || <Users className="status-icon" />;
  };

  const getStatusText = (status) => {
    const textMap = {
      present: "Keldi",
      absent: "Kelmadi",
      late: "Kechikdi",
    };
    return textMap[status] || status;
  };

  const resetFilters = () => {
    setSelectedGroup("all");
    setSearchTerm("");
    setSelectedDate(dayjs().format("YYYY-MM-DD"));
    setViewMode("daily");
    setHasUserInteracted(false);
    setTimeout(() => setHasUserInteracted(true), 100);
  };

  const handleFilterChange = (setter) => (value) => {
    setter(value);
    setHasUserInteracted(true);
  };

  if (isLoading || groupsLoading) {
    return (
      <div className="attendance-admin-panel">
        <div className="loading-state">
          <div className="spinner"></div>
          <p>Ma'lumotlar yuklanmoqda...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="attendance-admin-panel">
        <div className="error-state">
          <h3>Xatolik yuz berdi</h3>
          <p>{error?.data?.message || error?.message || "Noma'lum xatolik"}</p>
          <button onClick={refetch} className="retry-btn">
            <RotateCcw className="btn-icon" />
            Qayta urinish
          </button>
        </div>
      </div>
    );
  }

  const attendances = attendancesDailyStatsData?.attendances || [];
  const stats = attendancesDailyStatsData || {};

  return (
    <div className="attendance-admin-panel">
      <div className="panel-header">
        <div className="header-content">
          <h2>Davomat Boshqaruv Paneli</h2>
          <div className="header-info">
            <span className="current-date">
              {dayjs(selectedDate).format("DD MMMM, YYYY")}
            </span>
            <span className="view-mode-badge">
              {viewMode === "daily" && "Kunlik ko'rinish"}
              {viewMode === "weekly" && "Haftalik ko'rinish"}
              {viewMode === "monthly" && "Oylik ko'rinish"}
            </span>
          </div>
        </div>
      </div>

      <div className="filters-panel">
        <div className="filters-grid">
          <div className="filter-group">
            <label className="filter-label">
              <Users className="label-icon" />
              Guruh
            </label>
            <select
              value={selectedGroup}
              onChange={(e) =>
                handleFilterChange(setSelectedGroup)(e.target.value)
              }
              className="filter-select"
            >
              <option value="all">Barcha guruhlar</option>
              {groupsData?.groups?.map((group) => (
                <option key={group.id} value={group.id}>
                  {group.name}
                </option>
              ))}
            </select>
          </div>

          <div className="filter-group">
            <label className="filter-label">
              <Clock className="label-icon" />
              Ko'rinish
            </label>
            <select
              value={viewMode}
              onChange={(e) => handleFilterChange(setViewMode)(e.target.value)}
              className="filter-select"
            >
              <option value="daily">Kunlik</option>
              <option value="weekly">Haftalik</option>
              <option value="monthly">Oylik</option>
            </select>
          </div>

          <div className="filter-group">
            <label className="filter-label">
              <Calendar className="label-icon" />
              Sana
            </label>
            <input
              type="date"
              value={selectedDate}
              onChange={(e) =>
                handleFilterChange(setSelectedDate)(e.target.value)
              }
              className="filter-input"
              max={dayjs().format("YYYY-MM-DD")}
            />
          </div>

          <div className="filter-group">
            <label className="filter-label">
              <Search className="label-icon" />
              Qidiruv
            </label>
            <div className="search-input-wrapper">
              <Search className="search-icon" />
              <input
                type="text"
                placeholder="O'quvchi, guruh yoki kurs nomi..."
                value={searchTerm}
                onChange={(e) =>
                  handleFilterChange(setSearchTerm)(e.target.value)
                }
                className="search-input"
              />
            </div>
          </div>

          <div className="filter-group">
            <label className="filter-label invisible">Amallar</label>
            <button
              onClick={resetFilters}
              className="reset-filters-btn"
              title="Filtrlarni tozalash"
            >
              <RotateCcw className="btn-icon" />
              Tozalash
            </button>
          </div>
        </div>
      </div>

      <div className="stats-grid">
        <div className="stat-card stat-card-primary">
          <div className="stat-content">
            <div className="stat-info">
              <p className="stat-label">Jami o'quvchilar</p>
              <p className="stat-value">{stats.totalAttendances || 0}</p>
              <p className="stat-percentage">100%</p>
            </div>
            <div className="stat-icon stat-icon-primary">
              <Users />
            </div>
          </div>
        </div>

        <div className="stat-card stat-card-success">
          <div className="stat-content">
            <div className="stat-info">
              <p className="stat-label">Kelganlar</p>
              <p className="stat-value">{stats.present || 0}</p>
              {stats.totalAttendances > 0 && (
                <p className="stat-percentage">
                  {Math.round((stats.present / stats.totalAttendances) * 100)}%
                </p>
              )}
            </div>
            <div className="stat-icon stat-icon-success">
              <UserCheck />
            </div>
          </div>
        </div>

        <div className="stat-card stat-card-danger">
          <div className="stat-content">
            <div className="stat-info">
              <p className="stat-label">Kelmaganlar</p>
              <p className="stat-value">{stats.absent || 0}</p>
              {stats.totalAttendances > 0 && (
                <p className="stat-percentage">
                  {Math.round((stats.absent / stats.totalAttendances) * 100)}%
                </p>
              )}
            </div>
            <div className="stat-icon stat-icon-danger">
              <UserX />
            </div>
          </div>
        </div>

        <div className="stat-card stat-card-warning">
          <div className="stat-content">
            <div className="stat-info">
              <p className="stat-label">Kechikkanlar</p>
              <p className="stat-value">{stats.late || 0}</p>
              {stats.totalAttendances > 0 && (
                <p className="stat-percentage">
                  {Math.round((stats.late / stats.totalAttendances) * 100)}%
                </p>
              )}
            </div>
            <div className="stat-icon stat-icon-warning">
              <Clock />
            </div>
          </div>
        </div>
      </div>

      <div className="attendance-table-container">
        <div className="table-header">
          <h3 className="table-title">Davomat ma'lumotlari</h3>
          <div className="table-summary">
            <span className="results-count">
              {attendances.length} ta natija topildi
            </span>
            {searchTerm && (
              <span className="search-summary">
                {' '} <i>"{searchTerm}"</i> {" "}  bo'yicha qidiruv
              </span>
            )}
          </div>
        </div>

        <div className="table-wrapper">
          {attendances.length > 0 ? (
            <table className="attendance-table">
              <thead className="table-head">
                <tr>
                  <th className="table-header-cell">O'quvchi</th>
                  <th className="table-header-cell">Guruh</th>
                  <th className="table-header-cell">Kurs</th>
                  <th className="table-header-cell">Vaqt</th>
                  <th className="table-header-cell">Holat</th>
                  <th className="table-header-cell">Amallar</th>
                </tr>
              </thead>
              <tbody className="table-body">
                {attendances?.map((item) => (
                  <tr key={item.id} className="table-row">
                    <td className="table-cell">
                      <div className="student-info">
                        <div className="student-name">{item.student}</div>
                      </div>
                    </td>
                    <td className="table-cell">
                      <span className="group-badge">{item.group}</span>
                    </td>
                    <td className="table-cell">
                      <div className="course-name">{item.course}</div>
                    </td>
                    <td className="table-cell time-cell">
                      <div className="time-info">
                        <div className="date">
                          {dayjs(item.createdAt).format("DD.MM.YYYY")}
                        </div>
                        <div className="time">
                          {dayjs(item.createdAt).format("HH:mm")}
                        </div>
                      </div>
                    </td>
                    <td className="table-cell">
                      <span className={`status-badge status-${item.status}`}>
                        {getStatusIcon(item.status)}
                        <span className="status-text">
                          {getStatusText(item.status)}
                        </span>
                      </span>
                    </td>
                    <td className="table-cell">
                      <div className="action-buttons">
                          <NavLink to={`/dashboard/students/${item?.studentId}`}
                            className="action-btn action-btn-view"
                            title="Batafsil ko'rish"
                          >
                            <Eye className="action-icon" />
                          </NavLink>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className="no-data-state">
              <div className="no-data-icon">
                <Users />
              </div>
              <h3>Ma'lumot topilmadi</h3>
              <p>Tanlangan parametrlar bo'yicha davomat ma'lumotlari topilmadi</p>
              <button
                onClick={resetFilters}
                className="reset-filters-btn"
              >
                <RotateCcw className="btn-icon" />
                Filtrlarni tozalash
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AttendanceAdminPanel;
