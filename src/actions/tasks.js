export const GET_TASKS = "GET_TASKS";
export const NEW_TASK = "NEW_TASK";
export const CHECK_TASK = "CHECK_TASK";
export const MODIFY_TASK = "MODIFY_TASK";
export const DELETE_TASK = "DELETE_TASK";

export const CHANGE_ACTIVE_TASK = "CHANGE_ACTIVE_TASK";


export const getTasks = () => dispatch => {
  try {
    if (!localStorage.getItem('token')) {
      dispatch({ type: GET_TASKS });
    } else {
      
    }
  } catch (err) {
    console.log(err);
  }
}

export const addNewTask = (data, setError) => dispatch => {
  try {
    if (!data.name || !data.est) {
      setError("Please enter the task name and est")
    }

    if (!localStorage.getItem('token')) {
      // const newTask = Object.assign({}, { ...data, id: nanoid() })

      dispatch({ type: NEW_TASK, data });
    } else {

    }
  } catch (err) {
    setError(err.message);
    console.error(err);
  }
}

export const checkTask = (id, setError) => dispatch => {
  try {
    if (!id) {
      setError("invalid id!");
    }

    if (!localStorage.getItem('token')) {
      dispatch({ type: CHECK_TASK, data: id });
    } else {

    }

  } catch (error) {
    setError(error.message);
    console.error(error);
  }
};

export const deleteTask = (id, setError) => dispatch => {
  try {
    if (!id) {
      setError("invalid task");
    }

    if (!localStorage.getItem('token')) {
      dispatch({ type: DELETE_TASK, data: id });
    } else {

    }
  } catch (error) {
    setError(error.message);
    console.error(error);
  }
};

export const modifyTask = (data, setError) => dispatch => {
  try {
    if (!data.name || !data.est) {
      setError("Please enter the task name and est")
    }

    if (!localStorage.getItem('token')) {
      dispatch({ type: MODIFY_TASK, data: data });
    } else {

    }
  } catch (error) {
    setError(error.message);
    console.error(error);
  }
}