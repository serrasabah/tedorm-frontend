import React from "react";
import "./Maps.css";

const Maps = () => {
  return (
    <div className="map-container">
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3060.2507519902783!2d32.76432131207919!3d39.91340437140629!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14d34881c5941733%3A0xac8f1799c27c9b42!2sTed%20%C3%9Cniversitesi%20%C3%87ankaya%20Belediyesi%20%C3%96%C4%9Frenci%20Yurdu!5e0!3m2!1str!2str!4v1685370924695!5m2!1str!2str"
        title="Google Harita"
        className="map-iframe"
      ></iframe>
    </div>
  );
};

export default Maps;