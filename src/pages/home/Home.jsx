import React from "react";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import PersonIcon from "@mui/icons-material/Person";
import GroupsIcon from "@mui/icons-material/Groups";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import PaymentsIcon from "@mui/icons-material/Payments";
import PersonOffIcon from "@mui/icons-material/PersonOff";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";

import "./home.scss";
import { useGetAdminStatisticsQuery } from "../../context/api/adminApi";
import { formatNumber } from "../../static";
import { NavLink } from "react-router-dom";

const Home = () => {
  const { data } = useGetAdminStatisticsQuery();
  console.log(data);

  const maxIncome =
    data?.monthlyIncomes?.length > 0
      ? Math.max(...data?.monthlyIncomes?.map((item) => item.income))
      : 0;

  const chartData = data?.monthlyIncomes?.map((item) => ({
    ...item,
    percentage: maxIncome > 0 ? Math.round((item.income / maxIncome) * 100) : 0,
  }));

  const cardData = [
    {
      title: "Jami o'quvchilar",
      value: `${data?.totalStudents ? data?.totalStudents : 0}`,
      icon: <CreditCardIcon />,
      change: "+12%",
      changeType: "positive",
      colorClass: "blue",
      link: "/dashboard/students"
    },
    {
      title: "Faol o'quvchilar",
      value: `${data?.activeStudents ? data?.activeStudents : 0}`,
      icon: <PersonIcon />,
      change: "+8%",
      changeType: "positive",
      colorClass: "green",
      link: "/dashboard/students"
    },
    {
      title: "Guruhlar",
      value: `${data?.totalGroups ? data?.totalGroups : 0}`,
      icon: <GroupsIcon />,
      change: "+5%",
      changeType: "positive",
      colorClass: "orange",
      link: "/dashboard/group"
    },
  ];
  const today = new Date();
  const currentYear = today.getFullYear();

  return (
    <>
      <div className="dashboard">
        <div className="dashboard__container">
          {/* Cards Grid */}
          <div className="dashboard__cards">
            {cardData.map((card, index) => (
              <NavLink to={card?.link} key={index} className={`dashboard__card ${card.colorClass}`}>
                <div className="dashboard__card-content">
                  <div className="dashboard__card-header">
                    <div className={`dashboard__card-icon ${card.colorClass}`}>
                      {card.icon}
                    </div>
                    <div
                      className={`dashboard__card-change ${card.changeType}`}
                    >
                      {card.changeType === "positive" ? (
                        <ArrowUpwardIcon />
                      ) : (
                        <ArrowDownwardIcon />
                      )}
                      {card.change}
                    </div>
                  </div>

                  <div className="dashboard__card-info">
                    <h3 className="dashboard__card-title">{card.title}</h3>
                    <p className="dashboard__card-value">
                      {formatNumber(card.value)}
                    </p>
                  </div>
                </div>
              </NavLink>
            ))}
          </div>

          {/* Payment Module */}
          <div className="dashboard__payment-module">
            <div className="dashboard__payment">
              <div className="dashboard__chart-header">
                <div>
                  <h2 className="dashboard__chart-title">
                    12 oylik to'lov statistikasi
                  </h2>
                  <p className="dashboard__chart-subtitle">
                    {currentYear} o'quv yili ma'lumotlari
                  </p>
                </div>
                <div className="dashboard__chart-icon green">
                  <PaymentsIcon />
                </div>
              </div>

              <div className="payment-statistics">
                <div className="payment-chart">
                  <div className="payment-chart-bars">
                    {chartData?.map((data, index) => (
                      <div key={index} className="payment-bar-container">
                        <div
                          className="payment-bar"
                          style={{ height: `${data?.percentage}%` }}
                        >
                          <div className="payment-bar-tooltip">
                            <span className="payment-amount">
                              {formatNumber(data?.income)} so'm
                            </span>
                            <span className="payment-percentage">
                              {data?.percentage}%
                            </span>
                          </div>
                        </div>
                        <span className="payment-month">{data?.month}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Payment Summary Cards */}
              </div>
            </div>
            <div className="payment-summary">
              <div className="payment-summary-card completed">
                <div className="payment-summary-icon">
                  <PaymentsIcon /> {/* O‘quvchilar ikonkasi */}
                </div>
                <div className="payment-summary-info">
                  <h4>Oylik tushum miqdori</h4>
                  <p className="payment-summary-amount">
                    {formatNumber(data?.monthlyRevenue)} so'm
                  </p>
                </div>
              </div>

              <div className="payment-summary-card completed">
                <div className="payment-summary-icon">
                  <PaymentsIcon /> {/* O‘quvchilar ikonkasi */}
                </div>
                <div className="payment-summary-info">
                  <h4>Oylik daromad</h4>
                  <p className="payment-summary-amount">
                    {formatNumber(data?.paidAmountThisMonth)} so'm
                  </p>
                </div>
              </div>

              <div className="payment-summary">
                <div className="payment-summary-card completed">
                  <div className="payment-summary-icon">
                    <TrendingUpIcon />
                  </div>
                  <div className="payment-summary-info">
                    <h4>To'lov qilganlar</h4>
                    <p className="payment-summary-amount">
                      {formatNumber(data?.paidStudents)} nafar
                    </p>
                  </div>
                </div>
              </div>

              <div className="payment-summary-card total">
                <div className="payment-summary-icon">
                  <PersonOffIcon /> {/* Guruhlar ikonkasi */}
                </div>
                <div className="payment-summary-info">
                  <h4>To'lov qilmaganlar</h4>
                  <p className="payment-summary-amount">
                    {formatNumber(data?.unpaidStudents)} nafar
                  </p>
                </div>
              </div>

              <div className="payment-summary-card completed">
                <div className="payment-summary-icon">
                  <PaymentsIcon /> {/* O‘quvchilar ikonkasi */}
                </div>
                <div className="payment-summary-info">
                  <h4>Shu oydagi to'lovlar soni</h4>
                  <p className="payment-summary-amount">
                    {formatNumber(data?.transactionsThisMonth)} ta
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
