import { useState } from "react";
import useLocalStorage from "../hooks/useLocalStorage.js";
import TodoForm from "../components/TodoForm.jsx";
import TodoList from "../components/TodoList.jsx";

const FILTERS = [
  { key: "all", label: "Tümü" },
  { key: "active", label: "Devam Eden" },
  { key: "done", label: "Tamamlanan" },
];

const SAMPLE = [
  { id: 1, text: "React ile TODO uygulaması yap", done: true },
  { id: 2, text: "Projeyi GitHub'a yükle", done: false },
  { id: 3, text: "Netlify'da yayınla", done: false },
];

export default function Home() {
  const [todos, setTodos] = useLocalStorage("todos", SAMPLE);
  const [filter, setFilter] = useState("all");

  // Ekleme
  const addTodo = (text) =>
    setTodos((prev) => [...prev, { id: Date.now(), text, done: false }]);

  // Güncelleme: metin
  const updateTodo = (id, text) =>
    setTodos((prev) => prev.map((t) => (t.id === id ? { ...t, text } : t)));

  // Güncelleme: tamamlandı / tamamlanmadı
  const toggleTodo = (id) =>
    setTodos((prev) => prev.map((t) => (t.id === id ? { ...t, done: !t.done } : t)));

  // Silme
  const deleteTodo = (id) => setTodos((prev) => prev.filter((t) => t.id !== id));

  const clearDone = () => setTodos((prev) => prev.filter((t) => !t.done));

  const visible = todos.filter((t) =>
    filter === "all" ? true : filter === "done" ? t.done : !t.done
  );
  const remaining = todos.filter((t) => !t.done).length;
  const doneCount = todos.length - remaining;

  return (
    <div className="container py-5" style={{ maxWidth: 640 }}>
      <div className="card todo-card">
        <div className="card-body p-4">
          <h1 className="h3 mb-1">
            <i className="bi bi-check2-square text-primary me-2"></i>Görev Listem
          </h1>
          <p className="text-muted small mb-4">
            {remaining} görev kaldı · {doneCount} tamamlandı
          </p>

          <TodoForm onAdd={addTodo} />

          <div className="btn-group btn-group-sm w-100 mb-3" role="group" aria-label="Filtre">
            {FILTERS.map((f) => (
              <button
                key={f.key}
                type="button"
                className={`btn ${filter === f.key ? "btn-primary" : "btn-outline-primary"}`}
                onClick={() => setFilter(f.key)}
              >
                {f.label}
              </button>
            ))}
          </div>

          <TodoList
            todos={visible}
            onToggle={toggleTodo}
            onUpdate={updateTodo}
            onDelete={deleteTodo}
          />

          {doneCount > 0 && (
            <div className="text-end mt-3">
              <button className="btn btn-sm btn-link text-danger" onClick={clearDone}>
                Tamamlananları temizle
              </button>
            </div>
          )}
        </div>
      </div>
      <p className="text-center text-muted small mt-3">
        Veriler tarayıcınızın LocalStorage alanında saklanır.
      </p>
    </div>
  );
}
