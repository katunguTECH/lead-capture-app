// Messages rendering section
<div
  style={{
    flex: 1,
    padding: "10px",
    overflowY: "auto",
    background: "#f5f5f5"
  }}
>
  {/* Show welcome message first */}
  {welcomeMessage && (
    <div
      style={{
        marginBottom: "8px",
        display: "flex",
        justifyContent: "flex-start"
      }}
    >
      <div
        style={{
          background: "#e0e0e0",
          color: "#000",
          padding: "8px 12px",
          borderRadius: "15px",
          maxWidth: "80%"
        }}
      >
        {welcomeMessage}
      </div>
    </div>
  )}

  {/* Then show messages from Firestore */}
  {messages.map((msg) => (
    <div
      key={msg.id}
      style={{
        marginBottom: "8px",
        display: "flex",
        justifyContent: msg.sender === "user" ? "flex-end" : "flex-start"
      }}
    >
      <div
        style={{
          background:
            msg.sender === "user" ? themeColor : "#e0e0e0",
          color: msg.sender === "user" ? "#fff" : "#000",
          padding: "8px 12px",
          borderRadius: "15px",
          maxWidth: "80%"
        }}
      >
        {msg.text}
      </div>
    </div>
  ))}
</div>
