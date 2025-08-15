// src/components/LeadCaptureSection.jsx
import React, { useState } from "react";

export default function LeadCaptureSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    inquiry: ""
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Send data to Firebase or email service
    console.log("Form submitted:", formData);
    setSubmitted(true);
  };

  return (
    <div style={{ padding: "2rem", maxWidth: "800px", margin: "0 auto" }}>
      {/* Lead Capture Form */}
      <h2 style={{ marginBottom: "1rem" }}>Lead Capture Form</h2>
      {!submitted ? (
        <form
          onSubmit={handleSubmit}
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "1rem",
            background: "#f9f9f9",
            padding: "1rem",
            borderRadius: "8px",
            boxShadow: "0 2px 8px rgba(0,0,0,0.1)"
          }}
        >
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleChange}
            required
            style={{ padding: "0.5rem" }}
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
            style={{ padding: "0.5rem" }}
          />
          <input
            type="tel"
            name="phone"
            placeholder="Phone"
            value={formData.phone}
            onChange={handleChange}
            required
            style={{ padding: "0.5rem" }}
          />
          <textarea
            name="inquiry"
            placeholder="Inquiry"
            rows="4"
            value={formData.inquiry}
            onChange={handleChange}
            style={{ padding: "0.5rem" }}
          ></textarea>
          <button
            type="submit"
            style={{
              background: "#007BFF",
              color: "#fff",
              padding: "0.5rem",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer"
            }}
          >
            Submit
          </button>
        </form>
      ) : (
        <p style={{ color: "green", fontWeight: "bold" }}>
          ✅ Thank you! We will contact you shortly.
        </p>
      )}

      {/* Calendly Widget */}
      <h2 style={{ marginTop: "2rem", marginBottom: "1rem" }}>
        Book an Appointment
      </h2>
      <div style={{ minHeight: "700px" }}>
        <iframe
          src="https://calendly.com/katungu1/30min?embed_domain=lead-capture-app-mauve.vercel.app"
          width="100%"
          height="700"
          frameBorder="0"
        ></iframe>
      </div>
    </div>
  );
}
