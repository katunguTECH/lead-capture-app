import { useEffect } from "react";

export default function LandbotChat() {
  useEffect(() => {
    // Load Landbot script
    const script = document.createElement("script");
    script.src = "https://static.landbot.io/landbot-widget/landbot-widget-1.0.0.js";
    script.async = true;
    script.onload = () => {
      new window.LandbotPopup({
        configUrl: "https://storage.googleapis.com/landbot.online/v3/H-3090419-7C0STPO35ZX7D4KW/index.json"
      });
    };
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return null; // no visible JSX, just loads the widget
}
