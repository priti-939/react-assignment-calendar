import React from "react";
import {
  Box,
  Button,
  IconButton,
  Typography,
  Grid,
  TextField,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useCallback, useEffect, useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import Modal from "@mui/material/Modal";
import CircularProgress from "@mui/material/CircularProgress";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginStatus, logout } from "../store/actions/action";
import "../App.css";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const List = () => {
  const [data, setData] = useState(null);
  const [searchVal, setSearchVal] = useState(null);
  const [hoveredRow, setHoveredRow] = React.useState(null);
  const [addEdit, setAddEdit] = useState(false);
  const [title, setTitle] = useState("");
  const [message, setBody] = useState("");
  const [titleErr, setTitleErr] = useState(null);
  const [bodyErr, setbodyErr] = useState(null);
  const [orderId, setId] = useState("");
  const [loader, setLoader] = useState(false);
  const [edit, setEdit] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onMouseEnterRow = (event) => {
    const id = Number(event.currentTarget.getAttribute("data-id"));

    setHoveredRow(id);
  };

  const onMouseLeaveRow = (event) => {
    setHoveredRow(null);
  };
  useEffect(() => {
    const url = "https://jsonplaceholder.typicode.com/posts";
    const result = fetch(url);
    result
      .then(function (val) {
        return val.json();
      })
      .then((data1) => {
        setData(data1);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleDelete = (id) => {
    fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
      method: "DELETE",
    })
      .then((res) => {
        return res.json();
      })
      .then((data1) => {
        const record = data.filter((item) => item.id !== id);
        setData(record);
      })
      .catch((err) => console.log(err));
  };

  const handleEdit = (id) => {
    setEdit(true);
    fetch(`https://jsonplaceholder.typicode.com/posts/${id}`)
      .then((response) => response.json())
      .then((json) => {
        setTitle(json.title);
        setBody(json.body);
        setId(json.id);
      });
    setAddEdit(true);
  };
  const columns = [
    { field: "id", headerName: "ID", width: 90 },
    {
      field: "title",
      headerName: "Title",
      width: 210,
      editable: true,
    },
    {
      field: "body",
      headerName: "Message",
      width: 600,
      editable: true,
    },
    {
      field: "actions",
      headerName: "Actions",
      width: 100,
      renderCell: (params) => {
        if (hoveredRow === params.id) {
          return (
            <Box
              sx={{
                // backgroundColor: "whitesmoke",
                width: "100%",
                height: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <IconButton onClick={() => handleEdit(params.id)}>
                <EditIcon />
              </IconButton>
              <IconButton onClick={() => handleDelete(params.id)}>
                <DeleteIcon />
              </IconButton>
            </Box>
          );
        } else return null;
      },
    },
  ];

  const handleChangeTitle = (val) => {
    setTitle(val);
    setTitleErr(null);
  };

  const handleChangeBody = (val) => {
    setBody(val);
    setbodyErr(null);
  };

  const handleAddOrder = () => {
    if (title === "" && message === "") {
      setTitleErr("Title is requried");
      setbodyErr("Message is requried");
    }
    if (title === "") {
      setTitleErr("Title is requried");
    } else if (message === "") {
      setbodyErr("Message is requried");
    } else {
      setTitleErr(null);
      setbodyErr(null);
      setLoader(true);
      fetch("https://jsonplaceholder.typicode.com/posts", {
        method: "POST",
        body: JSON.stringify({
          title: title,
          body: message,
          userId: data.length + 1,
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      })
        .then((response) => response.json())
        .then((json) => {
          setLoader(false);
          const res = [...data, json];
          console.log(res);
          setData(res);
          setAddEdit(false);
          setTitle("");
          setBody("");
        });
    }
  };

  const handleEditOrder = () => {
    console.log('edited', orderId)
    setLoader(true);
    fetch(`https://jsonplaceholder.typicode.com/posts/${orderId}`, {
      method: "PUT",
      body: JSON.stringify({
        title: title,
        body: message,
        userId: orderId,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => response.json())
      .then((json) => {
        setLoader(false);
        const available = data.filter((item) => item.id !== orderId);
        const record = [...available, json];
        record.sort(function (a, b) {
          return a.id - b.id;
        });
        setData(record);
        console.log("total", record);
        setAddEdit(false);
        setTitle("");
        setBody("");
        setEdit(false);
      });
  };

  const handleLogout = () => {
    navigate("/");
    dispatch(logout());
    dispatch(loginStatus(false));
  };

  return (
    <>
      <Button
        variant="containted"
        style={{ float: "right" }}
        onClick={handleLogout}
      >
        Logout
      </Button>

      <div>
        {data && data !== null && data.length > 0 && (
          <>
            <div className="tableHead">
              <Typography
                className="typo"
                fontSize={25}
                fontWeight={700}
                mb={0}
              >
                Work Orders
              </Typography>
              <Button
                variant="contained"
                className="addorder"
                onClick={() => setAddEdit(true)}
              >
                Add Orders
              </Button>
            </div>

            <DataGrid
              rows={data}
              columns={columns}
              initialState={{
                pagination: {
                  paginationModel: {
                    pageSize: 10,
                  },
                },
                pinnedColumns: { right: ["actions"] },
              }}
              componentsProps={{
                row: {
                  onMouseEnter: onMouseEnterRow,
                  onMouseLeave: onMouseLeaveRow,
                },
              }}
              sx={{ mt: 0, ml: 5, mr: 5 }}
              pageSizeOptions={[5]}
              checkboxSelection
              disableRowSelectionOnClick
            />
          </>
        )}
      </div>

      <Modal
        open={addEdit}
        onClose={() => setAddEdit(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Add Order
          </Typography>
          <Grid
            container
            rowSpacing={1}
            columnSpacing={{ xs: 1, sm: 2, md: 3 }}
          >
            <Grid item xs={12}>
              <TextField
                label="Title"
                id="outlined-start-adornment"
                sx={{ mt: 1 }}
                fullWidth
                value={title}
                onChange={(e) => handleChangeTitle(e.target.value)}
              />
              {
                <Typography color={"red"} fontSize={12}>
                  {titleErr}
                </Typography>
              }
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Message"
                id="outlined-start-adornment"
                sx={{ mt: 1 }}
                fullWidth
                value={message}
                onChange={(e) => handleChangeBody(e.target.value)}
              />
              {
                <Typography color={"red"} fontSize={12}>
                  {bodyErr}
                </Typography>
              }
            </Grid>
            {!edit ? (
              <Button
                style={{ margin: "10px 25px" }}
                variant="contained"
                onClick={handleAddOrder}
              >
                {loader && (
                  <CircularProgress
                    size={22}
                    sx={{
                      position: "absolute",
                      top: "50%",
                      left: "50%",
                      marginTop: "-12px",
                      marginLeft: "-12px",
                      color:'white'
                    }}
                  />
                )}
                Add
              </Button>
            ) : (
              <Button
                style={{ margin: "10px 25px" }}
                variant="contained"
                onClick={handleEditOrder}
              >
                {loader && (
                  <CircularProgress
                    size={22}
                    sx={{
                      position: "absolute",
                      top: "50%",
                      left: "50%",
                      marginTop: "-12px",
                      marginLeft: "-12px",
                      color:'white'
                    }}
                  />
                )}
                Edit
              </Button>
            )}
          </Grid>
        </Box>
      </Modal>
    </>
  );
};

export default List;
