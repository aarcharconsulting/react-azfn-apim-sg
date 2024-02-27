import React, { useEffect, useState } from "react";
import { useGlobalDispatch } from "./Contexts/GlobalContext";
import { useCrud } from "./Contexts/CrudContext";
import EmployeeForm from "./Components/EmployeeForm";
import Error from "./Components/Error";
import Header from "./Components/Header";
import TableComponent from "./Components/TableComponent";
import { Paper, TableContainer } from "@mui/material";
import { toast } from "react-toastify";
import { TOAST_CONFIG } from "./Constants";

function App() {
  const [employees, setEmployees] = useState([]);
  const dispatch = useGlobalDispatch();
  const { fetchEmployees, addEmployee, updateEmployee, deleteEmployee } =
    useCrud();

    const populateEmployeeArray = async () => {
    var allEmployees = await fetchEmployees();
    setEmployees(allEmployees);
  };

  const showSuccessMessage = (message) => {
    toast.success(message, TOAST_CONFIG);
  };

  const showErrorMessage = (message) => {
    toast.error(message, TOAST_CONFIG);
  };

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
        showSuccessMessage("Employee Updated successfully");
      } else {
        const newEmployee = await addEmployee(employeeData);
        setEmployees([...employees, newEmployee]);
        showSuccessMessage("Employee added successfully");
      }
      dispatch({ type: "CLOSE_MODAL" });
      populateEmployeeArray();
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
      showErrorMessage(
        employeeData.id ? "Failed to update employee" : "Failed to add employee"
      );
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteEmployee(id);
      populateEmployeeArray();
      showSuccessMessage("Employee deleted successfully");
  
    } catch (error) {
      showErrorMessage("Error deleting employee");
    }
  };

  useEffect(() => {
    populateEmployeeArray();
  }, []);

  return (
    <>
      <Header handleOpen={handleOpen} />
      <TableContainer component={Paper}>
        <TableComponent
          handleEdit={handleOpen}
          handleDelete={handleDelete}
          employees={employees}
        />
      </TableContainer>
    </>
  );
}

export default App;
