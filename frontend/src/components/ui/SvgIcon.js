import React from "react";

const SvgIcon = (props) => {
  switch (props.icon) {
    case "wallet":
      return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className={props.className}>
          <path d="M240 0c4.6 0 9.2 1 13.4 2.9L441.7 82.8c22 9.3 38.4 31 38.3 57.2c-.5 99.2-41.3 280.7-213.6 363.2c-16.7 8-36.1 8-52.8 0C41.3 420.7 .5 239.2 0 140c-.1-26.2 16.3-47.9 38.3-57.2L226.7 2.9C230.8 1 235.4 0 240 0z" />
        </svg>
      );
  }
};

export default SvgIcon;
