import { useState, FormEvent } from "react";

interface ToDoInfo {
  id: number;
  teksti: string;
}

const App = () => {
  // State to manage new todo input
  const [newSingleTodo, addSingleTodo] = useState<string>("");

  // State to manage the list of todos
  const [TodoList, addTodoList] = useState<ToDoInfo[]>([]);

  // State to manage the current editing todo
  const [editingTodo, setEditingTodo] = useState<ToDoInfo | null>(null);

  // State to manage the text input for editing
  const [editTekst, addEditTekst] = useState<string>("");

  // Add a new todo or update an existing one
  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (editingTodo) {
      // Update existing todo
      const updatedList = TodoList.map((todo) =>
        todo.id === editingTodo.id ? { ...todo, teksti: newSingleTodo } : todo
      );
      addTodoList(updatedList);
      setEditingTodo(null);
    } else {
      // Add a new todo
      const newTodo: ToDoInfo = {
        id: Math.floor(Math.random() * 1000),
        teksti: newSingleTodo,
      };
      addTodoList([...TodoList, newTodo]);
    }

    addSingleTodo(""); // Clear the input field
  }

  // Handle deletion of a todo
  function handleDeleteBtn(id: number) {
    addTodoList(TodoList.filter((todo) => todo.id !== id));
  }

  // Set the todo to be edited
  function handleEditBtn(todo: ToDoInfo) {
    addEditTekst(todo.teksti);
    setEditingTodo(todo); // Set the todo being edited
  }

  // Update the todo list with the new text
  function handleSecondEditButton() {
    if (editingTodo) {
      const updatedList = TodoList.map((todo) =>
        todo.id === editingTodo.id ? { ...todo, teksti: editTekst } : todo
      );
      addTodoList(updatedList);
      setEditingTodo(null);
      addEditTekst(""); // Reset the edit input field
    }
  }

  return (
    <>
      {/* ADD TODO */}
      <div className="container">
        <div>
          <form onSubmit={handleSubmit}>
            <h1 className="display-1 text-center">Add New Todo</h1>
            <input
              value={newSingleTodo}
              onChange={(e) => addSingleTodo(e.target.value)}
              className="form-control"
              placeholder="Enter Todo"
            />
            <br />
            <button type="submit" className="btn btn-primary">
              {editingTodo ? "Update Todo" : "Add"}
            </button>
          </form>
        </div>

        {/* TODO LIST */}
        <h1 className="display-1 text-center">Todo List</h1>
        <table className="table table-info table-striped">
          <thead className="thead-dark">
            <tr>
              <th scope="col">#</th>
              <th scope="col" colSpan={2}>
                Table
              </th>
            </tr>
          </thead>
          <tbody>
            {TodoList.map((todo) => (
              <tr key={todo.id}>
                <th scope="row">{todo.id}</th>
                <td>{todo.teksti}</td>
                <td>
                  <button
                    className="btn btn-primary"
                    onClick={() => handleEditBtn(todo)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-danger"
                    onClick={() => handleDeleteBtn(todo.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* EDIT TODO */}
      {editingTodo && (
        <div className="container">
          <h1 className="display-1 text-center">Edit Todo</h1>
          <form>
            <div className="form-group">
              <label htmlFor="editText">Edit this todo:</label>
              <input
                id="editText"
                value={editTekst}
                onChange={(e) => addEditTekst(e.target.value)}
                className="form-control"
              />
              <br />
            </div>
            <button
              onClick={(e) => {
                e.preventDefault();
                handleSecondEditButton();
              }}
              type="submit"
              className="btn btn-primary"
            >
              Save Changes
            </button>
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => {
                setEditingTodo(null);
                addEditTekst(""); // Clear the edit input field
              }}
            >
              Cancel
            </button>
          </form>
        </div>
      )}
    </>
  );
};

export default App;
