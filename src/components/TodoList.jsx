import TodoItem from "./TodoItem.jsx";

// LİSTELEME (Read): görevleri listeler
export default function TodoList({ todos, onToggle, onUpdate, onDelete }) {
  if (todos.length === 0) {
    return (
      <div className="text-center text-muted py-4">
        <i className="bi bi-inbox fs-1 d-block mb-2"></i>
        Gösterilecek görev yok.
      </div>
    );
  }

  return (
    <ul className="list-group list-group-flush">
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onToggle={onToggle}
          onUpdate={onUpdate}
          onDelete={onDelete}
        />
      ))}
    </ul>
  );
}
