import React, { useState, useEffect } from "react";
import {
  ArrowLeft,
  Phone,
  MapPin,
  Users,
  Calendar,
  BookOpen,
  GraduationCap,
  CreditCard,
  GroupIcon,
} from "lucide-react";
import "./studentDetail.scss";
import { useGetStudentByIdQuery } from "../../context/api/studentApi";
import { useParams } from "react-router-dom";
import {
  useAddStudentToGroupMutation,
  useGetGroupsAllQuery,
} from "../../context/api/groupApi";
import toast from "react-hot-toast";
import Module from "../../components/Module/Module";
import { formatNumber } from "../../static";

const StudentDetail = () => {
  const { id } = useParams();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const { data, refetch } = useGetStudentByIdQuery(id);
  const { data: AllGroups } = useGetGroupsAllQuery();

  const [cardsVisible, setCardsVisible] = useState(false);
  const [groupId, setGroupId] = useState("");
  const [studentId, setStudentId] = useState("");
  const [addGroup, setAddGroup] = useState(false);
  const [addStudentToGroup, { isLoading, isSuccess, isError }] =
    useAddStudentToGroupMutation();

  useEffect(() => {
    setTimeout(() => setCardsVisible(true), 300);
  }, []);

  const getTotalPaid = () => {
    return data?.payments
      ?.filter(
        (payment) =>
          payment?.accepted === true || payment?.adminStatus === "accepted"
      )
      .reduce((total, payment) => total + (Number(payment?.amount) || 0), 0)
      .toLocaleString();
  };

  const getNextPaymentDate = () => {
    const today = new Date();
    const currentMonth = today.getMonth();
    const currentYear = today.getFullYear();

    let nextMonth = currentMonth + 1;
    let nextYear = currentYear;

    if (nextMonth > 11) {
      nextMonth = 0;
      nextYear = nextYear + 1;
    }

    const nextPaymentDate = new Date(nextYear, nextMonth, 10);

    const year = nextPaymentDate.getFullYear();
    const month = String(nextPaymentDate.getMonth() + 1).padStart(2, "0");
    const day = String(nextPaymentDate.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
  };

  const getTotalAmount = () => {
    return data?.payments
      ?.reduce((total, payment) => total + (Number(payment?.amount) || 0), 0)
      .toLocaleString();
  };

  const getPendingAmount = () => {
    return data?.payments
      ?.filter(
        (payment) => payment?.adminStatus === "pending" || !payment?.accepted
      )
      .reduce((total, payment) => total + (Number(payment?.amount) || 0), 0)
      .toLocaleString();
  };

  const getStatusBadge = (status) => {
    const statusConfig = {
      paid: { class: "status-paid", text: "To'langan" },
      pending: { class: "status-pending", text: "Kutilmoqda" },
      overdue: { class: "status-overdue", text: "Kechikkan" },
    };
    return statusConfig[status] || statusConfig.pending;
  };

  const handleGoBack = () => {
    window.history.back();
  };

  const handleSubmitAdd = async (e) => {
    e.preventDefault();
    try {
      await addStudentToGroup({ groupId, studentId: data?.id }).unwrap();
      toast.success("Student guruhga muvaffaqiyatli qo‘shildi ✅");
      setAddGroup(false);
      setGroupId("");
      refetch();
    } catch (error) {
      console.error("Xato:", error);
      toast.error("Studentni qo‘shishda xato ❌");
    }
  };

  const closeModal = () => {
    setAddGroup(false);
  };

  return (
    <div className="student-profile">
      <div className="profile-layout">
        <div className="profile-card floating-animation">
          <div className="profile-header">
            <div className="avatar">{data?.lastName?.charAt(0)}</div>
            <div className="student-name">
              {data?.lastName} {data?.firstName}
            </div>
            <div className="student-id">ID: #{data?.id}</div>
          </div>

          <div className="contact-info">
            <div className="contact-item">
              <Phone className="contact-icon" size={20} />
              <div>
                <div className="contact-label">Telefon</div>
                <div className="contact-value">{data?.phone}</div>
              </div>
            </div>

            <div className="contact-item">
              <MapPin className="contact-icon" size={20} />
              <div>
                <div className="contact-label">Manzil</div>
                <div className="contact-value">{data?.address}</div>
              </div>
            </div>

            <div className="contact-item">
              <Users className="contact-icon" size={20} />
              <div>
                <div className="contact-label">Ota/Ona</div>
                <div className="contact-value">{data?.parentPhone}</div>
              </div>
            </div>
          </div>
        </div>

        <div className="details-section">
          <div className="section-title">
            <BookOpen size={24} />
            Ta'lim Ma'lumotlari
          </div>

          <div className="info-grid">
            <div
              className={`info-card ${cardsVisible ? "visible" : ""}`}
              style={{ animationDelay: "0.1s" }}
            >
              <div className="info-card-box">
                <div className="info-label">Kurs</div>
                <div className="info-value">
                  {data?.groups?.map((el, index) => (
                    <p key={index}>{el?.course?.name}</p>
                  ))}
                </div>
              </div>
              <GraduationCap className="info-icon" size={24} />
            </div>

            <div
              className={`info-card ${cardsVisible ? "visible" : ""}`}
              style={{ animationDelay: "0.2s" }}
            >
              <div className="info-card-box">
                <div className="info-label">Guruh</div>
                <div className="info-value">
                  {data?.groups?.map((el, index) => (
                    <div className="info-value-cards" key={index}>
                      <p className="info-value-text">{el?.name}</p>
                      <p className="info-value-text">
                        {formatNumber(el?.price)} som
                      </p>
                    </div>
                  ))}
                  <button
                    className="info-card-info"
                    onClick={() => setAddGroup(true)}
                  >
                    <GroupIcon size={24} />
                    <p>Guruhga biriktirish</p>
                  </button>
                </div>
              </div>
              <div>
                <Users className="info-icon" size={24} />
              </div>
            </div>

          </div>

          <div className="section-title" style={{ marginTop: "2rem" }}>
            <CreditCard size={24} />
            To'lovlar Tarixi
          </div>

          <div className="payment-stats">
            <div className="stat-card total-paid">
              <div className="stat-icon">💰</div>
              <div className="stat-info">
                <div className="stat-label">Jami to'langan</div>
                <div className="stat-value">{getTotalPaid()} so'm</div>
              </div>
            </div>

            <div className="stat-card next-payment">
              <div className="stat-icon">📅</div>
              <div className="stat-info">
                <div className="stat-label">Keyingi to'lov</div>
                <div className="stat-value">{getNextPaymentDate()}</div>
              </div>
            </div>
          </div>

          <div className="payments-table-wrapper">
            <div className="payments-table-container desktop-only">
              <table className="payments-table">
                <thead>
                  <tr>
                    <th>Sana</th>
                    <th>Summa</th>
                    <th>Holat</th>
                    <th>Izoh</th>
                  </tr>
                </thead>
                <tbody>
                  {data?.payments?.map((payment) => {
                    return (
                      <tr key={payment?.id}>
                        <td>{payment?.createdAt?.split("T")[0]}</td>
                        <td className="amount">
                          {Number(payment?.amount).toLocaleString()} so'm
                        </td>
                        <td>
                          <span
                            className={`status-badge ${payment?.adminStatus}`}
                          >
                            {payment?.adminStatus === "accepted"
                              ? "To'langan"
                              : "Kutilmoqda"}
                          </span>
                        </td>
                        <td>Oylik to'lov</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            <div className="payments-mobile-cards mobile-only">
              {data?.payments?.map((payment) => (
                <div key={payment?.id} className="payment-card">
                  <div className="payment-card-header">
                    <div className="payment-date-wrapper">
                      <span className="payment-date-label">Sana</span>
                      <span className="payment-date">
                        {payment?.createdAt?.split("T")[0]}
                      </span>
                    </div>
                    <div className="payment-amount-wrapper">
                      <span className="payment-amount">
                        {Number(payment?.amount).toLocaleString()} so'm
                      </span>
                    </div>
                  </div>

                  <div className="payment-card-body">
                    <div className="payment-info-row">
                      <span className="payment-info-label">Holat</span>
                      <span className={`status-badge ${payment?.adminStatus}`}>
                        {payment?.adminStatus === "accepted"
                          ? "To'langan"
                          : "Kutilmoqda"}
                      </span>
                    </div>

                    <div className="payment-info-row">
                      <span className="payment-info-label">Izoh</span>
                      <span className="payment-info-value">Oylik to'lov</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        {addGroup && (
          <Module bg="#aaa4" close={closeModal}>
            <form
              onSubmit={handleSubmitAdd}
              style={{ margin: "20px" }}
              className="studnet-add-group"
            >
              <div style={{ marginBottom: "15px" }}>
                <label>Guruhni tanlang:</label>
                <select
                  value={groupId}
                  onChange={(e) => setGroupId(e.target.value)}
                  required
                >
                  <option value="">Guruhni tanlang</option>
                  {AllGroups?.groups?.map((el) => (
                    <option key={el.id} value={el.id}>
                      {el.name}
                    </option>
                  ))}
                </select>
              </div>

              <input type="hidden" value={data?.id} />

              <button type="submit" disabled={isLoading}>
                {isLoading ? "Qo‘shilmoqda..." : "Guruhga qo‘shish"}
              </button>
            </form>
          </Module>
        )}
      </div>
    </div>
  );
};

export default StudentDetail;
