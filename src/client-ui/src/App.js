
import React, { useEffect, useState } from "react";

import { useGlobalDispatch } from "./Contexts/GlobalContext";

import { useCrud } from "./Contexts/CrudContext";

import EmployeeForm from "./Components/EmployeeForm";
import Error from "./Components/Error";
import Header from "./Components/Header";
import TableComponent from "./Components/TableComponent";
import { Paper, TableContainer } from "@mui/material";

function App() {
  const [employees, setEmployees] = useState([]);
  const dispatch = useGlobalDispatch();
  const { fetchEmployees, addEmployee, updateEmployee, deleteEmployee } =
    useCrud();

  const [error, serError] = useState("asdasd");

  const handleOpen = (employee = null) => {
    dispatch({
      type: "OPEN_MODAL",
      payload: {
        title: employee ? "Edit Employee" : "Add New Employee",
        content: <EmployeeForm employee={employee} onSave={handleSave} />,
      },
    });
  };

  const handleSave = async (employeeData) => {
    try {
      if (employeeData.id) {
        await updateEmployee(employeeData);
      } else {
        const newEmployee = await addEmployee(employeeData);
        setEmployees([...employees, newEmployee]);
      }
      dispatch({ type: "CLOSE_MODAL" });
    } catch (error) {
      dispatch({
        type: "OPEN_MODAL",
        payload: {
          title: employeeData.id ? "Edit Employee" : "Add New Employee",
          content: (
            <EmployeeForm
              employee={employeeData}
              onSave={handleSave}
              serverError={error.message}
            />
          ),
        },
      });
    }
  };

  const handleDelete = async (id) => {
    await deleteEmployee(id);
    try {
    } catch (error) {
      serError(error);
    }
  };

  useEffect(() => {
    const a = async () => {
      var b = await fetchEmployees();
      setEmployees(b);
    };
    a();
  });

  return (
    <>
      <Header handleOpen={handleOpen} />
      <Error error={error} />
      <TableContainer component={Paper}>
        <TableComponent handleEdit={handleOpen} handleDelete={handleDelete} employees={employees}/>
      </TableContainer>
    </>
  );
}

export default App;
