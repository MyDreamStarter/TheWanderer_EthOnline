import React from 'react';

const StyledWalletConnectButton = () => {
  const containerStyle = {
    backgroundImage:
      "linear-gradient(15.46deg, rgb(74, 37, 225) 26.3%, rgb(123, 90, 255) 86.4%)",
    boxShadow: "rgba(96, 60, 255, 0.48) 0px 21px 27px -10px",
    padding: "10px",
    borderRadius: "30px",
    display: "inline-block",
  };

  return (
    <div style={containerStyle}>
      <w3m-connect-button />
    </div>
  );
};

export default StyledWalletConnectButton;