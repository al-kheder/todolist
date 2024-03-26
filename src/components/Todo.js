import React, { useContext, useState } from "react";

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Unstable_Grid2";
import CheckIcon from "@mui/icons-material/Check";
import IconButton from "@mui/material/IconButton";
import ModeEditOutlineOutlinedIcon from "@mui/icons-material/ModeEditOutlineOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import { TodosContext } from "./context/todosContext";
// Dialog
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";

export default function Todo({ todo }) {
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [showUpdateDialog, setShowUpdateDialog] = useState(false);
  const [updatedTodo, setUpdatedTodo] = useState({
    title: todo.title,
    details: todo.details,
  });
  const { todos, setTodos } = useContext(TodosContext);

  /* EVENT HANDLER */
  function handlCheckClick() {
    const updatedTodo = todos.map((t) => {
      if (t.id === todo.id) {
        t.isComplete = !t.isComplete;
      }
      return t;
    });
    setTodos(updatedTodo);
    localStorage.setItem("todos", JSON.stringify(updatedTodo));
  }
  function handleDeleteClick() {
    setShowDeleteDialog(true);
  }
  function hanldeDeleteDialogClose() {
    setShowDeleteDialog(false);
  }
  function handleDeleteConfirm() {
    const updatedTodos = todos.filter((t) => {
      /*    if (t.id === todo.id) {
        return false;
      } else {
        return true;
      } */
      return t.id != todo.id;
    });
    setTodos(updatedTodos);
    localStorage.setItem("todos", JSON.stringify(updatedTodos));
  }
  function handleUpdateClick() {
    setShowUpdateDialog(true);
  }
  function handleUpdateConfirm() {
    const updatedTodos = todos.map((t) => {
      if (t.id === todo.id) {
        return { ...t, title: updatedTodo.title, details: updatedTodo.details };
      } else {
        return t;
      }
    });
    setTodos(updatedTodos);
    localStorage.setItem("todos", JSON.stringify(updatedTodos));
    setShowUpdateDialog(false);
  }

  function hanldeUpdateClose() {
    setShowUpdateDialog(false);
  }
  /* == EVENT HANDLER == */
  return (
    <>
      {/* Update Dialog */}
      <Dialog
        open={showUpdateDialog}
        onClose={hanldeUpdateClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Your Task</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            fullWidth
            label="Edit your Task"
            margin="dense"
            variant="standard"
            value={updatedTodo.title}
            onChange={(e) => {
              setUpdatedTodo({ ...updatedTodo, title: e.target.value });
            }}
          />
          <TextField
            autoFocus
            fullWidth
            label="Details"
            margin="dense"
            variant="standard"
            value={updatedTodo.details}
            onChange={(e) => {
              setUpdatedTodo({ ...updatedTodo, details: e.target.value });
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={hanldeUpdateClose}>Colse</Button>
          <Button onClick={handleUpdateConfirm} autoFocus>
            Update
          </Button>
        </DialogActions>
      </Dialog>
      {/* ==Update Dialog == */}

      {/*  Delet button */}
      <Dialog
        open={showDeleteDialog}
        onClose={hanldeDeleteDialogClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          Are you Sure to Delete this Task?
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            by Deleting this Task, you will not be able to get it back!
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={hanldeDeleteDialogClose}>Colse</Button>
          <Button onClick={handleDeleteConfirm} autoFocus>
            Yes, Delete{" "}
          </Button>
        </DialogActions>
      </Dialog>
      {/*  === Delete button === */}
      <Card
        className="todoCard"
        sx={{
          minWidth: 275,
          background: "#283593",
          color: "white",
          marginTop: "10px",
        }}
      >
        <CardContent>
          <Grid container spacing={2}>
            <Grid xs={8}>
              <Typography
                variant="h4"
                sx={{
                  textAlign: "left",
                  textDecoration: todo.isComplete ? "line-through" : "none",
                }}
              >
                {todo.title}
              </Typography>
              <Typography variant="h6" sx={{ textAlign: "left" }}>
                {todo.details}
              </Typography>
            </Grid>
            {/* action button */}
            <Grid
              xs={4}
              display="flex"
              justifyContent="space-around"
              alignItems="center"
            >
              <IconButton
                className="iconButton"
                style={{
                  color: todo.isComplete ? "white" : "#8bc34a",
                  background: todo.isComplete ? "#8bc34a" : "white",
                  border: "solid 2px #8bc34a ",
                }}
                onClick={handlCheckClick}
              >
                <CheckIcon />
              </IconButton>
              <IconButton
                onClick={handleUpdateClick}
                className="iconButton"
                aria-label="delete"
                style={{
                  color: "#1769aa",
                  background: "white",
                  border: "solid 2px #1769aa ",
                }}
              >
                <ModeEditOutlineOutlinedIcon />
              </IconButton>

              <IconButton
                onClick={handleDeleteClick}
                className="iconButton"
                aria-label="delete"
                style={{
                  color: "#b23c17",
                  background: "white",
                  border: "solid 2px #b23c17 ",
                }}
              >
                <DeleteOutlineOutlinedIcon />
              </IconButton>
            </Grid>
            {/*=== action button ===*/}
          </Grid>
        </CardContent>
      </Card>
    </>
  );
}
