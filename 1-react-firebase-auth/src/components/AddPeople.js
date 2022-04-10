import React, { useState } from "react";
import { getDatabase, ref, push, set } from "firebase/database";

export const PersonForm = () => {
  const [formData, setFormData] = useState({ name: "", email: "" });
  const [message, setMessage] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  const handleChange = (name, value) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    if (!formData.name || !formData.email) {
      setMessage("Please enter both name and email.");
      return false;
    }
    return true;
  };

  const savePersonToDatabase = async () => {
    const db = getDatabase();
    const peopleRef = ref(db, "people");
    const newPersonRef = push(peopleRef);

    await set(newPersonRef, {
      ...formData,
      createdAt: Date.now(),
    });
  };

  const handleSavePerson = async () => {
    if (!validateForm()) return;

    setIsSaving(true);
    setMessage("");

    try {
      await savePersonToDatabase();
      setMessage("Person data saved successfully!");
      setFormData({ name: "", email: "" });
    } catch (error) {
      console.error("Error saving person data:", error);
      setMessage(`Error saving data: ${error.message}`);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div>
      <h2>Add New Person</h2>
      <FormInput
        id="name"
        name="name"
        label="Name"
        value={formData.name}
        onChange={handleChange}
        disabled={isSaving}
      />
      <FormInput
        id="email"
        name="email"
        label="Email"
        type="email"
        value={formData.email}
        onChange={handleChange}
        disabled={isSaving}
      />
      <button onClick={handleSavePerson} disabled={isSaving}>
        {isSaving ? "Saving..." : "Save Person"}
      </button>
      {message && (
        <p style={{ color: message.startsWith("Error") ? "red" : "green" }}>
          {message}
        </p>
      )}
    </div>
  );
};

function FormInput({ name, label, type = "text", value, onChange, disabled }) {
  return (
    <div>
      <label htmlFor={name}>{label}:</label>
      <input
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={(e) => {
          const { name, value } = e.target;
          onChange(name, value);
        }}
        disabled={disabled}
      />
    </div>
  );
}
