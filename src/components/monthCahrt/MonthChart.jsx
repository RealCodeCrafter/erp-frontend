import * as React from "react";
import { BarChart } from "@mui/x-charts/BarChart";
import { dataset, valueFormatter } from "../../static/index";

export default function MonthChart() {
  const [tickPlacement, setTickPlacement] = React.useState("middle");
  const [tickLabelPlacement, setTickLabelPlacement] = React.useState("middle");

  return (
    <div
      style={{
        width: "100%",
        padding: "20px",
        background: "#fff",
        borderRadius: "10px",
        boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
      }}
    >
      <h2
        style={{ textAlign: "center", marginBottom: "20px", color: "#1976d2" }}
      >
        Oylik daromadlar
      </h2>

      <BarChart
        dataset={dataset}
        xAxis={[
          {
            dataKey: "month",
            scaleType: "band",
            tickPlacement,
            tickLabelPlacement,
          },
        ]}
        series={[
          {
            dataKey: "seoul",
            label: "Daromad",
            valueFormatter,
            color: "#4254FB",
            barGapRatio: 3, // ⬅️ Ustunlar orasini kattaroq qilish
            barCategoryGapRatio: 0.1, // ⬅️ Har bir ustun kengligini ham boshqaradi
          },
        ]}
        yAxis={[
          {
            width: 80,
          },
        ]}
        height={500}
        margin={{ left: 100 }}
      />
    </div>
  );
}
