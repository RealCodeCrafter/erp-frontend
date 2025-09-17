import React, { useState } from "react";
import { useGetGroupsTeacherQuery } from "../../context/api/groupApi";
import { Link } from "react-router-dom";
import { Edit } from "@mui/icons-material";
import { Clock, Eye, MoreVertical, Users } from "lucide-react";
import "./paymentTeacher.scss";

const PaymentTeacher = () => {
  const { data } = useGetGroupsTeacherQuery();
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");

  return (
    <div>
      <div className="groups-grid" style={{ margin: "20px" }}>
        {data?.groups?.map((group) => (
          <div key={group?.id} className="group-card">
            <div className="group-header">
              <div className="group-info">
                <h3 className="group-title">{group.name}</h3>
                <div className="group-meta">
                  <div className="group-meta">
                    <span className="group-id">{group?.daysOfWeek}</span>
                    <span style={{ fontSize: "12px" }} className="group-time">
                      {group?.time}
                    </span>
                  </div>
                </div>
              </div>
              <div className="group-menu">
                <button className="menu-btn">
                  <MoreVertical className="menu-icon" />
                </button>
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
                to={`/dashboard/group/paymetTeacher/${group?.id}`}
                className="action-btn primary-btn"
              >
                <Eye className="btn-icon" />
                <span>O'quvchilarni Ko'rish</span>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PaymentTeacher;
