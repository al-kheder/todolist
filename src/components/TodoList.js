import * as React from "react";
import Divider from "@mui/material/Divider";
import Container from "@mui/material/Container";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Unstable_Grid2";
//components
import Todo from "./Todo";

//OTHERS
import { TodosContext } from "./context/todosContext";
import { useState, useContext, useEffect, useMemo } from "react";
import { v4 as uuidv4 } from "uuid";

export default function TodoList() {
  const { todos, setTodos } = useContext(TodosContext);
  const [titleInput, setTitleInpu] = useState("");
  const [displayedTodosType, setDisplayedTodosType] = useState("all");

  //filteration arrays
  const completedTodos = useMemo(() => {
    console.log("calling from completed todos");
    return todos.filter((t) => {
      return t.isComplete;
    });
  }, [todos]);

  const notCompletedTodos = useMemo(() => {
    return todos.filter((t) => {
      return !t.isComplete;
    });
  }, [todos]);

  let todosToBeRendered = todos;
  if (displayedTodosType === "completed") {
    todosToBeRendered = completedTodos;
  } else if (displayedTodosType === "non-completed") {
    todosToBeRendered = notCompletedTodos;
  } else {
    todosToBeRendered = todos;
  }
  const todosCart = todosToBeRendered.map((task) => {
    return <Todo key={task.id} todo={task} />;
  });

  useEffect(() => {
    const storageTodos = JSON.parse(localStorage.getItem("todos")) ?? [];
    setTodos(storageTodos);
  }, []);
  function changeDisplyedType(e) {
    setDisplayedTodosType(e.target.value);
  }
  function handleAddTask() {
    const newTodo = {
      id: uuidv4(),
      title: titleInput,
      details: "",
      isComplete: false,
    };
    const updatedTodos = [...todos, newTodo];
    setTodos(updatedTodos);
    localStorage.setItem("todos", JSON.stringify(updatedTodos));
    setTitleInpu("");
  }

  return (
    <React.Fragment>
      <Container maxWidth="sm">
        <Card
          sx={{ minWidth: 275 }}
          style={{ maxHeight: "80vh", overflow: "scroll" }}
        >
          <CardContent>
            <Typography variant="h4" component="div">
              My Tasks
            </Typography>
            <Divider />
            {/* FILTER BUTTONS */}
            <ToggleButtonGroup
              style={{ margin: "10px" }}
              color="primary"
              exclusive
              aria-label="Platform"
              value={displayedTodosType}
              onChange={changeDisplyedType}
            >
              <ToggleButton value="all">ALL</ToggleButton>
              <ToggleButton value="non-completed">TODO</ToggleButton>
              <ToggleButton value="completed">DONE</ToggleButton>
            </ToggleButtonGroup>
            {/* === FILTER BUTTONS  === */}
            {/* all to do  */}

            {todosCart}

            {/*== all to do == */}
            {/* INPUT + ADD BUTTON */}
            <Grid container spacing={1} style={{ marginTop: "20px" }}>
              <Grid
                xs={8}
                display="flex"
                justifyContent="space-around"
                alignItems="center"
              >
                <TextField
                  fullWidth
                  size="small"
                  id="outlined-basic"
                  label="Type New Task"
                  variant="outlined"
                  value={titleInput}
                  onChange={(event) => {
                    setTitleInpu(event.target.value);
                  }}
                />
              </Grid>
              <Grid
                xs={4}
                display="flex"
                justifyContent="space-around"
                alignItems="center"
              >
                <Button
                  variant="contained"
                  style={{ width: "100%", height: "100%" }}
                  onClick={handleAddTask}
                  disabled={titleInput.length > 0 ? false : true}
                >
                  Add Task
                </Button>
              </Grid>
            </Grid>
            {/* == INPUT + ADD BUTTON == */}
          </CardContent>
        </Card>
      </Container>
    </React.Fragment>
  );
}
