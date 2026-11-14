import { useState } from "react";

// EKLEME (Create): yeni görev formu
export default function TodoForm({ onAdd }) {
  const [text, setText] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    onAdd(text.trim());
    setText("");
  };

  return (
    <form onSubmit={handleSubmit} className="input-group mb-3">
      <input
        type="text"
        className="form-control"
        placeholder="Yeni görev ekle..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        aria-label="Yeni görev"
      />
      <button className="btn btn-primary" type="submit" disabled={!text.trim()}>
        <i className="bi bi-plus-lg me-1"></i>Ekle
      </button>
    </form>
  );
}
