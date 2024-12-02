import React, { useEffect } from "react";

const Mess = () => {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://app.tudongchat.com/js/chatbox.js";
    script.async = true;
  
    script.onload = () => {
      if (window.TuDongChat) {
        const tudong_chatbox = new window.TuDongChat("G_AuH6POBVP0ZQCFSdOx6");
        tudong_chatbox.reset?.();
        tudong_chatbox.initial();
      }
    };
    document.body.appendChild(script);
  
    return () => {
      document.body.removeChild(script);
    };
  }, []);

}

export default Mess;
