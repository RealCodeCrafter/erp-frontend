import React from "react";
import "./deleteModule.scss";

const DeleteModule = ({ bg = "rgba(0,0,0,0.5)", width = "400px", close, onConfirm }) => {
  return (
    <div onClick={() =>close(false)} className="delete-module" style={{ background: bg }}>
      <div className="delete-module__content" style={{ width }}>
        <h3 className="delete-module__title">O‘chirib yuborilsinmi?</h3>
        <div className="delete-module__buttons">
          <button className="yes" onClick={onConfirm}>Ha</button>
          <button className="no" onClick={() =>close(false)}>Yo‘q</button>
        </div>
      </div>
    </div>
  );
};

export default DeleteModule;
