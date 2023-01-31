import React, { useEffect } from "react";

const RippleButton = ({ title }) => {
  useEffect(() => {
    handleMouse();
  }, []);
  const handleMouse = () => {
    const btn = document.querySelector(".btn");

    btn?.addEventListener("mouseover", (event) => {
      const x = event.pageX - btn.offsetLeft;
      const y = event.pageY - btn.offsetTop;

      btn.style.setProperty("--xPos", x + "px");
      btn.style.setProperty("--yPos", y + "px");
    });

    btn?.addEventListener("mouseout", (event) => {
      const x = event.pageX - btn.offsetLeft;
      const y = event.pageY - btn.offsetTop;

      btn.style.setProperty("--xPos", x + "px");
      btn.style.setProperty("--yPos", y + "px");
    });
  };

  return (
    <div className="box">
      <a href="#" className="btn">
        <span>{title}</span>
      </a>
    </div>
  );
};

export default RippleButton;
