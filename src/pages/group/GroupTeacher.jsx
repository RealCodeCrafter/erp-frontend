import React, { useState, useMemo, useEffect } from "react";
import {
  Users,
  Search,
  Filter,
  BookOpen,
  Calendar,
  MoreVertical,
  Eye,
  Edit,
  GraduationCap,
  Clock,
} from "lucide-react";
import { useGetGroupsTeacherQuery } from "../../context/api/groupApi";
import { Link } from "react-router-dom";
import "./groupTeacher.scss";
import { useGetTeacherStatisticQuery, useSearchTeacherQuery } from "../../context/api/teacherApi";

const GroupTeacher = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");

  const {data: groups,
    refetch: refetchGroups,
    isLoading: isGroupsLoading,
    isSuccess
  } = useGetGroupsTeacherQuery(undefined, {
    refetchOnMountOrArgChange: true,
    refetchOnFocus: true,
  });

  const {
    data: searchResults,
    refetch: refetchSearch
  } = useSearchTeacherQuery(
    { groupName: searchTerm },
    {
      skip: !searchTerm.trim(),
      refetchOnMountOrArgChange: true,
    }
  );

  useEffect(() => {
    refetchGroups();
  }, [refetchGroups]);

  useEffect(() => {
    if (searchTerm.trim()) {
      refetchSearch();
    }
  }, [searchTerm, refetchSearch]);

  console.log("Groups:", groups);
  console.log("Search Results:", searchResults);

  const filteredGroups = useMemo(() => {
    if (!groups?.groups) return [];

    if (searchTerm.trim() && searchResults?.groups) {
      return searchResults.groups;
    }

    if (searchTerm.trim()) {
      return groups.groups.filter(group =>
        group.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (filterStatus !== "all") {
      return groups.groups.filter(group => group.status === filterStatus);
    }

    return groups.groups;
  }, [groups?.groups, searchTerm, searchResults?.groups, filterStatus]);

  const getStatusColor = (status) => {
    switch (status) {
      case "active":
        return "status-active";
      case "completed":
        return "status-completed";
      case "pending":
        return "status-pending";
      default:
        return "status-default";
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case "active":
        return "Faol";
      case "completed":
        return "Tugallangan";
      case "pending":
        return "Kutilmoqda";
      default:
        return "Noma'lum";
    }
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const clearSearch = () => {
    setSearchTerm("");
  };

  const handleRefresh = () => {
    refetchGroups();
    if (searchTerm.trim()) {
      refetchSearch();
    }
  };

  return (
    <div className="group-teacher">
      <div className="header-card">
        <div className="header-content">
          <div className="title-section">
            <div className="icon-wrapper">
              <GraduationCap className="header-icon" />
            </div>
            <div className="title-content">
              <h1 className="page-title">Mening Guruhlarim</h1>
              <p className="page-subtitle">
                O'qitayotgan guruhlar va darslar statistikasi
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="search-filter-card">
        <div className="search-filter-content">
          <div className="search-wrapper">
            <Search className="search-icon" />
            <input
              type="text"
              placeholder="Guruhlar ichida qidiruv..."
              value={searchTerm}
              onChange={handleSearchChange}
              className="search-input"
            />
          </div>
          <div className="filter-actions">
            <button className="filter-btn">
              <Filter className="filter-icon" />
              <span>Filter</span>
            </button>
          </div>
        </div>
      </div>

      <div className="stats-grid">
        <div className="stat-card stat-total">
          <div className="stat-content">
            <div className="stat-info">
              <p className="stat-label">Jami Guruhlar</p>
              <p className="stat-value">{groups?.stats?.totalGroups || filteredGroups.length}</p>
              <p className="stat-change">+2 oxirgi hafta</p>
            </div>
            <div className="stat-icon-wrapper">
              <Users className="stat-icon" />
            </div>
          </div>
          <div className="stat-progress">
            <div className="progress-bar total-progress"></div>
          </div>
        </div>

        <div className="stat-card stat-active">
          <div className="stat-content">
            <div className="stat-info">
              <p className="stat-label">Faol Guruhlar</p>
              <p className="stat-value">{groups?.stats?.activeGroups || filteredGroups.filter(g => g.status === 'active').length}</p>
              <p className="stat-change">Hozirda davom etmoqda</p>
            </div>
            <div className="stat-icon-wrapper">
              <BookOpen className="stat-icon" />
            </div>
          </div>
          <div className="stat-progress">
            <div className="progress-bar active-progress"></div>
          </div>
        </div>

        <div className="stat-card stat-lessons">
          <div className="stat-content">
            <div className="stat-info">
              <p className="stat-label">Jami Darslar</p>
              <p className="stat-value">{groups?.stats?.totalLessons || 0}</p>
              <p className="stat-change">
              </p>
            </div>
            <div className="stat-icon-wrapper">
              <Calendar className="stat-icon" />
            </div>
          </div>
          <div className="stat-progress">
            <div className="progress-bar lessons-progress"></div>
          </div>
        </div>
      </div>

      <div className="groups-section">
        <div className="section-header">
          <h2 className="section-title">
            Guruhlar Ro'yxati
            {searchTerm && (
              <span className="search-results-count">
                ({filteredGroups.length} ta natija topildi)
              </span>
            )}
          </h2>
          <p className="section-subtitle">
            {searchTerm
              ? `"${searchTerm}" bo'yicha qidiruv natijalari`
              : "Sizga tayinlangan barcha o'quv guruhlari"
            }
          </p>
        </div>

        {isGroupsLoading ? (
          <div className="loading-state">
            <p>Ma'lumotlar yuklanmoqda...</p>
          </div>
        ) : (
          <div className="groups-grid">
            {filteredGroups?.map((group) => (
              <div key={group?.id} className="group-card">
                <div className="group-header">
                  <div className="group-info">
                    <h3 className="group-title">{group.name}</h3>
                    <div className="group-meta">
                      <span className="group-id">
                        {group?.daysOfWeek}
                      </span>
                      <span style={{ fontSize: "12px" }} className="group-time">
                        {group?.time}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="group-stats">
                  <div className="stat-item">
                    <div className="stat-icon-container">
                      <Users className="mini-icon" />
                    </div>
                    <div className="stat-details">
                      <span className="stat-mini-label">O'quvchilar</span>
                      <span className="stat-mini-value">
                        {group?.studentCount || 0}
                      </span>
                    </div>
                  </div>

                  <div className="stat-item">
                    <div className="stat-icon-container">
                      <Clock className="mini-icon" />
                    </div>
                    <div className="stat-details">
                      <span className="stat-mini-label">Darslar</span>
                      <span className="stat-mini-value">
                        {group?.lessonCount || 0}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="group-actions">
                  <Link
                    to={`/dashboard/lessons/group/${group?.id}`}
                    className="action-btn primary-btn"
                    onClick={() => {
                      handleRefresh();
                    }}
                  >
                    <Eye className="btn-icon" />
                    <span>Darslarni Ko'rish</span>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {!isGroupsLoading && filteredGroups?.length === 0 && (
        <div className="empty-state">
          <div className="empty-icon">
            <Users className="empty-icon-svg" />
          </div>
          <h3 className="empty-title">
            {searchTerm ? "Qidiruv natijalari topilmadi" : "Guruhlar topilmadi"}
          </h3>
          <p className="empty-description">
            {searchTerm
              ? `"${searchTerm}" bo'yicha qidiruv natijasi topilmadi. Boshqa kalit so'z bilan qidirib ko'ring.`
              : "Qidiruv parametrlariga mos guruhlar mavjud emas yoki sizga hali guruh tayinlanmagan"
            }
          </p>
          <div className="empty-actions">
            {searchTerm ? (
              <button onClick={clearSearch} className="contact-admin-btn">
                Qidiruvni tozalash
              </button>
            ) : (
              <>
                <button onClick={handleRefresh} className="contact-admin-btn">
                  Qayta yuklash
                </button>
                <button className="contact-admin-btn">
                  Admin bilan bog'laning
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default GroupTeacher;