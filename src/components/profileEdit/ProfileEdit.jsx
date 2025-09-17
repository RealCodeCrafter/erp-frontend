import React, { useEffect, useState } from "react";
import "./profileEdit.scss";
import { useUpdateAdminMutation } from "../../context/api/adminApi";

const ProfileEdit = ({ data, close }) => {
  const [profileEdit, setProfileEdit] = useState(data);
  const [updateAdmin, { data: editData, isSuccess }] = useUpdateAdminMutation();

  const handleProfileEdit = (e) => {
    e.preventDefault();
    let updateCustomerData = {
      fname: profileEdit.fname,
      lname: profileEdit.lname,
      phone_primary: profileEdit.phone_primary,
      username: profileEdit.username,
      password: profileEdit.password,
    };
    updateAdmin({ id: profileEdit._id, body: updateCustomerData });
  };

  useEffect(() => {
    if (isSuccess) {
      close(false);
    }
  }, [isSuccess]);

  return (
    <div className="profile__edit">
      <form onSubmit={handleProfileEdit} className="profile__edit__form">
        <label>
          Ism
          <input
            value={profileEdit?.fname}
            onChange={(e) =>
              setProfileEdit((prev) => ({ ...prev, fname: e.target.value }))
            }
            placeholder="Ism"
            type="text"
          />
        </label>
        <label>
          Familiya
          <input
            value={profileEdit?.lname}
            onChange={(e) =>
              setProfileEdit((prev) => ({ ...prev, lname: e.target.value }))
            }
            placeholder="Familiya"
            type="text"
          />
        </label>
        <label>
          Telefon Raqam
          <input
            value={profileEdit?.phone_primary}
            onChange={(e) =>
              setProfileEdit((prev) => ({
                ...prev,
                phone_primary: e.target.value,
              }))
            }
            placeholder="Telefon Raqam"
            type="text"
          />
        </label>
        <label>
          foydalanuvchi nomi
          <input
            value={profileEdit?.username}
            onChange={(e) =>
              setProfileEdit((prev) => ({ ...prev, username: e.target.value }))
            }
            placeholder="foydalanuvchi nomi"
            type="text"
          />
        </label>
        <label>
          parol
          <input
            value={profileEdit?.password}
            onChange={(e) =>
              setProfileEdit((prev) => ({ ...prev, password: e.target.value }))
            }
            placeholder="parol"
            type="password"
          />
        </label>
        <button type="submit">Yaratish</button>
      </form>
    </div>
  );
};

export default ProfileEdit;
