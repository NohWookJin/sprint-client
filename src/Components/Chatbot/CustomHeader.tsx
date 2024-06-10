const CustomHeader = () => (
  <div style={headerStyle}>
    <img
      fetchpriority="high"
      src="/assets/level1.webp"
      alt="Chatbot Logo"
      style={imageStyle}
    />
    <h1 style={titleStyle}>SPRINT 챗봇</h1>
  </div>
);

const headerStyle = {
  display: "flex",
  alignItems: "center",
  backgroundColor: "#007BFF",
  padding: "10px",
  color: "white",
};

const imageStyle = {
  width: "40px",
  height: "40px",
  marginRight: "10px",
};

const titleStyle = {
  margin: 0,
};

export default CustomHeader;
