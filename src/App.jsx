import { useEffect } from "react";

function App() {
  useEffect(() => {
    // Create script element for Landbot
    const script = document.createElement("script");
    script.src = "https://cdn.landbot.io/landbot-3/landbot-3.0.0.js";
    script.async = true;

    script.onload = () => {
      // Initialize the floating Landbot widget
      new window.Landbot.Livechat({
        configUrl:
          "https://storage.googleapis.com/landbot.online/v3/H-3090419-7C0STPO35ZX7D4KW/index.json",
      });
    };

    document.body.appendChild(script);
  }, []);

  return (
    <div>
      <h1>Welcome to Lead Capture App</h1>
      <p>Collect leads via form, Calendly, or chatbot!</p>
    </div>
  );
}

export default App;




