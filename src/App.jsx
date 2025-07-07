import emailjs from "@emailjs/browser";
import { useState } from "react";
import { supabase } from "./supabase";

export default function App() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    inquiry: "",
  });

  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { data, error } = await supabase
      .from("leads")
      .insert([formData]);

    if (error) {
      console.error(error);
      alert("Error submitting form.");
    } else {
      setSuccess(true);
      setFormData({ name: "", email: "", phone: "", inquiry: "" });
    }
  };

  return (
    <div style={{ maxWidth: "500px", margin: "50px auto", padding: "20px", border: "1px solid #ddd", borderRadius: "8px" }}>
      <h2>Lead Capture Form</h2>
      {success && <p style={{ color: "green" }}>Lead submitted successfully!</p>}
      <form onSubmit={handleSubmit}>
        <label>Name</label>
        <input type="text" name="name" value={formData.name} onChange={handleChange} required />
        <br /><br />
        <label>Email</label>
        <input type="email" name="email" value={formData.email} onChange={handleChange} required />
        <br /><br />
        <label>Phone</label>
        <input type="text" name="phone" value={formData.phone} onChange={handleChange} required />
        <br /><br />
        <label>Inquiry</label>
        <textarea name="inquiry" value={formData.inquiry} onChange={handleChange} required></textarea>
        <br /><br />
        <button type="submit">Submit</button>
      </form>

      {/* Appointment Booking Section */}
      <h2>Book an Appointment</h2>
      <iframe
        src="https://calendly.com/katungu1"
        width="100%"
        height="600"
        frameBorder="0"
        title="Booking"
      />
    </div>
  );
}



