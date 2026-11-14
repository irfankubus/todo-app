import { useState } from "react";

// Tek bir görev satırı: tamamlama, GÜNCELLEME (Update) ve SİLME (Delete)
export default function TodoItem({ todo, onToggle, onUpdate, onDelete }) {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(todo.text);

  const save = () => {
    if (draft.trim()) onUpdate(todo.id, draft.trim());
    else setDraft(todo.text);
    setEditing(false);
  };

  const cancel = () => {
    setDraft(todo.text);
    setEditing(false);
  };

  return (
    <li className="list-group-item todo-item d-flex align-items-center gap-2">
      <input
        type="checkbox"
        className="form-check-input mt-0"
        checked={todo.done}
        onChange={() => onToggle(todo.id)}
        aria-label="Tamamlandı olarak işaretle"
      />

      {editing ? (
        <>
          <input
            autoFocus
            className="form-control form-control-sm"
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") save();
              if (e.key === "Escape") cancel();
            }}
            aria-label="Görevi düzenle"
          />
          <button className="btn btn-sm btn-success" onClick={save} title="Kaydet">
            <i className="bi bi-check-lg"></i>
          </button>
          <button className="btn btn-sm btn-outline-secondary" onClick={cancel} title="Vazgeç">
            <i className="bi bi-x-lg"></i>
          </button>
        </>
      ) : (
        <>
          <span className={`flex-grow-1 todo-text ${todo.done ? "done" : ""}`}>
            {todo.text}
          </span>
          <div className="actions d-flex gap-1">
            <button
              className="btn btn-sm btn-outline-primary"
              onClick={() => setEditing(true)}
              title="Düzenle"
            >
              <i className="bi bi-pencil"></i>
            </button>
            <button
              className="btn btn-sm btn-outline-danger"
              onClick={() => onDelete(todo.id)}
              title="Sil"
            >
              <i className="bi bi-trash"></i>
            </button>
          </div>
        </>
      )}
    </li>
  );
}
