import "./secHeader.scss";
const SecHeader = ({ children, title }) => {
  return (
    <div className="sec-header">
      <div className="sec-header-top">
        <h2 className="sec-header-title">{title}</h2>
        {children}
      </div>
    </div>
  );
};

export default SecHeader;
