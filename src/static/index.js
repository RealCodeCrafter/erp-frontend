export const CUSTOM = [
  {
    _id: "66956638741364ee4fc2673d",
    fname: "Samandar",
    lname: "Nuriddinov",
    phone_primary: "+998993252398",
    address: "Namangan, Uzbekistan",
    ball: 112,
  },
  {
    _id: "6694ddb02cfec74d4d06c242",
    fname: "Iskandar",
    lname: "Nuriddinov",
    phone_primary: "+998993250928",
    address: "Namangan, Uzbekistan",
    ball: 98,
  },
  {
    _id: "6695663e741364ee4fc2673f",
    fname: "Akmal",
    lname: "Nuriddinov",
    phone_primary: "+998993251232",
    address: "Namangan, Uzbekistan",
    ball: 85,
  },
  {
    _id: "6694f79323fa93e1bde11879",
    fname: "Azamjon",
    lname: "Akmalov",
    phone_primary: "+998993253747",
    address: "Namangan, Uzbekistan.",
    ball: 74,
  },
  {
    _id: "6694de122cfec74d4d06c244",
    fname: "Iskandar",
    lname: "Nuriddinov",
    phone_primary: "+998123456789",
    address: "Namangan, Uzbekistan",
    ball: 71,
  },
];

export const dataset = [
  {
    london: 59,
    paris: 57,
    newYork: 86,
    seoul: 21,
    month: "Jan",
  },
  {
    london: 50,
    paris: 52,
    newYork: 78,
    seoul: 28,
    month: "Feb",
  },
  {
    london: 47,
    paris: 53,
    newYork: 106,
    seoul: 41,
    month: "Mar",
  },
  {
    london: 54,
    paris: 56,
    newYork: 92,
    seoul: 73,
    month: "Apr",
  },
  {
    london: 57,
    paris: 69,
    newYork: 92,
    seoul: 99,
    month: "May",
  },
  {
    london: 60,
    paris: 63,
    newYork: 103,
    seoul: 144,
    month: "June",
  },
  {
    london: 59,
    paris: 60,
    newYork: 105,
    seoul: 319,
    month: "July",
  },
  {
    london: 65,
    paris: 60,
    newYork: 106,
    seoul: 249,
    month: "Aug",
  },
  {
    london: 51,
    paris: 51,
    newYork: 95,
    seoul: 131,
    month: "Sept",
  },
  {
    london: 60,
    paris: 65,
    newYork: 97,
    seoul: 55,
    month: "Oct",
  },
  {
    london: 67,
    paris: 64,
    newYork: 76,
    seoul: 48,
    month: "Nov",
  },
  {
    london: 61,
    paris: 70,
    newYork: 103,
    seoul: 25,
    month: "Dec",
  },
];

export function valueFormatter(value) {
  return `${value}mm`;
}

export function formatNumber(num) {
  if (!num) return "0";
  return Number(num)
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, " ");
}
