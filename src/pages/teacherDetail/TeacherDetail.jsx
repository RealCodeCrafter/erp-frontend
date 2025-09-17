import React, { useState } from "react";
import {
  User,
  Phone,
  MapPin,
  Book,
  Users,
  Calendar,
  Award,
  ChevronLeft,
  Mail,
  Clock,
} from "lucide-react";
import "./teacherDetail.scss";
import { useParams } from "react-router-dom";
import { useGetTeacherByIdQuery } from "../../context/api/teacherApi";

const TeacherDetail = () => {
  const { id } = useParams();
  const { data: teacher } = useGetTeacherByIdQuery(id);
  console.log(teacher);

  return (
    <div className="teacher-detail-container">
      <div className="content">
        <div className="teacher-info">
          <div className="teacher-card">
            <div className="teacher-avatar">
              <User size={60} />
            </div>

            <div className="teacher-details">
              <h2>
                {teacher?.firstName} {teacher?.lastName}
              </h2>
              <div className="teacher-subject">
                <Book className="icon" />
                <span>{teacher?.specialty}</span>
              </div>

              <div className="contact-info">
                <div className="info-item">
                  <Phone className="icon" />
                  <span>{teacher?.phone}</span>
                </div>

                <div className="info-item">
                  <Mail className="icon" />
                  <span>{teacher?.role}</span>
                </div>

                <div className="info-item">
                  <MapPin className="icon" />
                  <span>{teacher?.address}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Guruhlar ma'lumoti - chap tarf */}
        <div className="groups-info">
          <div className="groups-header">
            <h3>Guruhlar</h3>
            <span className="groups-count">
              {teacher?.groups.length} ta guruh
            </span>
          </div>

          <div className="groups-list">
            {teacher?.groups.map((group) => (
              <div key={group?.id} className="group-card">
                <div className="group-header">
                  <h4>{group?.name}</h4>
                  <span className="subject-tag">{group?.status}</span>
                </div>

                <div className="group-details">
                  <div className="detail-item">
                    <Users className="icon" />
                    <span>{group?.students.length} ta o'quvchi</span>
                  </div>

                  <div className="detail-item">
                    <Clock className="icon" />
                    <span>
                      {group?.startTime} - {group?.endTime}
                    </span>
                  </div>

                  <div className="detail-item">
                    <Calendar className="icon" />
                    <span>
                      {group?.daysOfWeek && group?.daysOfWeek.length > 0
                        ? group.daysOfWeek.join(" - ")
                        : "******"}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeacherDetail;
