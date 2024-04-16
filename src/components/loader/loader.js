export default `
body {
  display: block;
}

#splash-screen {
    visibility: visible;
    opacity: 1;
    display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  background-color: #ffffec;
  height: 100%;
  overflow: hidden;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 2000;
  
  }
  
  #splash-screen.hidden {
    /* display: none !important; */
    -webkit-transition: all 0.5s ease-in-out;
    -moz-transition: all 0.5s ease-in-out;
    -ms-transition: all 0.5s ease-in-out;
    transition: all 0.5s ease-in-out, opacity 0.5s ease-in-out;
    visibility: hidden;
    opacity: 0;
  }
  
  #splash-screen #__next {
    visibility: hidden;
    opacity: 0;
    max-height: 100vh;
    overflow: hidden;
  }
  
  #splash-screen.hidden #__next {
    visibility: visible;
    opacity: 1;
    max-height: unset;
    overflow: unset;
  }
  
  @keyframes loading-text {
    from {
      background-position: right bottom;
    }
  
    to {
      background-position: left bottom;
    }
  }
  
  
  @keyframes move-top-left {
    25% {
      top: 50%;
      left: 0;
      transform: translate(-30%, -50%);
  
    }
  
    50% {
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
  
    75% {
      top: 0;
      left: 0;
      transform: translate(0, 0);
    }
  
  }
  
  @keyframes move-top-right {
    25% {
      top: 0;
      right: 50%;
      transform: translate(50%, -30%);
    }
  
    50% {
      top: 50%;
      right: 50%;
      transform: translate(50%, -50%);
    }
  
    75% {
      top: 0;
      right: 0;
      transform: translate(0, 0);
    }
  }
  
  @keyframes move-bottom-right {
    25% {
      bottom: 50%;
      right: 0;
      transform: translate(30%, 50%);
    }
  
    50% {
      bottom: 50%;
      right: 50%;
      transform: translate(50%, 50%);
    }
  
    75% {
      bottom: 0;
      right: 0;
      transform: translate(0, 0);
    }
  }
  
  @keyframes move-bottom-left {
    25% {
      bottom: 0;
      left: 50%;
      transform: translate(-50%, 30%);
    }
  
    50% {
      bottom: 50%;
      left: 50%;
      transform: translate(-50%, 50%);
    }
  
    75% {
      bottom: 0;
      left: 0;
      transform: translate(0, 0);
    }
  }
  
  @keyframes led-text {
    0% {
      color: #e94b83;
    }
  
    25% {
      color: #FBFE66;
    }
  
    50% {
      color: #B361F3;
    }
  
    75% {
      color: #6461F3;
    }
  
    100% {
      color: #77AAF8;
    }
  }
  
  
  /* Extra small devices (phones, 600px and down) */
  @media only screen and (max-width: 600px) {
    .loading-text p {
      font-size: 56px;
      line-height: 56px;
  
    }
  }
  
  /* Small devices (portrait tablets and large phones, 600px and up) */
  @media only screen and (min-width: 600px) {
    .loading-text p {
      font-size: 56px;
      line-height: 56px;
  
    }
  }
  
  /* Medium devices (landscape tablets, 768px and up) */
  @media only screen and (min-width: 768px) {
    .loading-text p {
      font-size: 56px;
      line-height: 56px;
  
    }
  }
  
  /* Large devices (laptops/desktops, 992px and up) */
  @media only screen and (min-width: 992px) {
    .loading-text p {
      font-size: 150px;
      line-height: 150px;
  
    }
  }
  
  /* Extra large devices (large laptops and desktops, 1200px and up) */
  @media only screen and (min-width: 1200px) {
    .loading-text p {
      font-size: 240px;
      line-height: 240px;
  
    }
  }`
