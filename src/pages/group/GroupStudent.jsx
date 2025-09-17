import React from "react";
import { useGetGroupsStudentQuery } from "../../context/api/groupApi";
import { Link } from "react-router-dom";
import "./group.scss";

const GroupStudent = () => {
  const { data: groups } = useGetGroupsStudentQuery();

  return (
    <div className="group">
      <div className="group__top">
        <h2 className="group__title">Guruhlar</h2>
      </div>
      <ul className="group__list">
        {groups?.map((group) => (
          <li key={group.id} className="group__item">
            <Link to={`/admin/lessonStudent/${group?.id}`}>
              <div className="group__item-info">
                <h3 className="group__name">{group.name}</h3>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default GroupStudent;
