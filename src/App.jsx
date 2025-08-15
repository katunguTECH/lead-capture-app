import LeadCaptureSection from "./components/LeadCaptureSection";
import ChatWidget from "./components/ChatWidget"; // ✅ Import the chat widget

export default function Home() {
  return (
    <div>
      {/* Lead capture form + Calendly */}
      <LeadCaptureSection />

      {/* Floating chat widget */}
      <ChatWidget />
    </div>
  );
}






