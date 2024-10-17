import { useState } from "react";

interface ToDoInfo {
  id: number;
  teksti: string;
}

const App = () => {
  //konstantat
  //per me kriju 1 single todo
  const [newSingleTodo, addSingleTodo] = useState<string>("");
  //per me kriju nji list me todo qe i japin nja ka nja
  const [TodoList, addTodoList] = useState<ToDoInfo[]>([]);
  //per me marr id edhe tekstin prej edit butonit
  const [updatedTodo, addUpdatedTodo] = useState<ToDoInfo[]>([]);
  //destrukturim prej updatedTodo me marr veq tekstin string
  const [editTekst, addEditTekst] = useState("");
  //per me marr ndryshimin e tekstit
  const [tekstiMasEditit, setTeksti] = useState<string>("");
  // function handleAddBtn() {
  //   addTodoList((TempTodo) => {
  //     return [...TempTodo];
  //   });
  // }

  //e thirrt ne <form> qe kur bohet submit e merr todo prej inputit edhe e dergon ne konstanten e krijuar per list
  function handleSubmit(e: any) {
    e.preventDefault();

    const tempToDo: ToDoInfo = {
      //nji temporary konstant veq per me e kriju nji todo prej interface, ka menyr ma tshkurt!!
      id: Math.floor(Math.random() * 99),
      teksti: newSingleTodo,
    };

    addTodoList([...TodoList, tempToDo]); //per me fut nlist
    addSingleTodo(""); //fshin tekstin
  }

  ///per delete button, me .filter per me i qit kejt perveq todo qe pershtatet me id
  function handleDeleteBtn(id: number) {
    addTodoList((allTodos) => {
      return allTodos.filter((todo) => todo.id !== id);
    });
  }
  function handleSecondEditButton() {}

  function handleTekstiPrejValue(tesktiRi: string) {
    addEditTekst(tesktiRi);
    console.log(editTekst);
  }

  ///per edit button
  function handleEditBtn(todo: ToDoInfo) {
    addUpdatedTodo([todo]);
    addEditTekst(todo.teksti);
  }

  console.log(TodoList);

  return (
    <>
      {/* ADD  */}

      <div className="container ">
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
              add
            </button>
          </form>
        </div>

        {/* TODO LIST */}

        <h1 className="display-1 text-center">Todo List</h1>

        <table className="table table-info table-striped ">
          <thead className="thead-dark">
            <tr>
              <th scope="col">#</th>
              <th scope="col" colSpan={2}>
                Table
              </th>
            </tr>
          </thead>
          <tbody>
            {TodoList.map((singleTodo) => (
              <tr key={singleTodo.id}>
                <th scope="row">{singleTodo.id}</th>
                <td>{singleTodo.teksti}</td>
                <td>
                  <button
                    className="btn btn-primary "
                    onClick={() => handleEditBtn(singleTodo)}
                  >
                    edit
                  </button>
                  <button
                    className="btn btn-danger"
                    onClick={() => handleDeleteBtn(singleTodo.id)}
                  >
                    delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/*EDIT  */}
      <div>
        <div className="container">
          <h1 className="display-1 text-center">Edit Todo</h1>
          <form>
            <div className="form-group">
              <label htmlFor="">edit this todooo</label>
              <input
                value={editTekst}
                onChange={(e) => {
                  e.preventDefault;
                  handleTekstiPrejValue(e.target.value);
                }}
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
              Edit
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default App;
