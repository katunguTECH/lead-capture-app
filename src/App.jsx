import { useEffect } from "react";

function App() {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://cdn.landbot.io/landbot-3/landbot-3.0.0.js";
    script.async = true;
    script.onload = () => {
      new window.Landbot.Livechat({
        configUrl: "https://storage.googleapis.com/landbot.online/v3/H-3090419-7C0STPO35ZX7D4KW/index.json",
      });
    };
    document.body.appendChild(script);
  }, []);

  return (
    <div>
      <h1>Welcome to Lead Capture App</h1>
    </div>
  );
}

export default App;




