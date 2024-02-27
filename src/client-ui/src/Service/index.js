import fetch from "cross-fetch";

let API_BASE;
if (process.env.NODE_ENV === "production") {
  API_BASE = process.env.REACT_APP_API_BASE_URL;
} else if (process.env.useProxy || true) {
  API_BASE = "/api";
} else {
  const BASE_URL = process.env.REACT_APP_API_BASE_URL || "http://localhost";
  const PORT = process.env.REACT_APP_API_PORT || "4000";
  API_BASE = `${BASE_URL}:${PORT}`;
}

const fetchEmployees = () => {
  return fetch(`${API_BASE}/employees`, {
    method: "GET",
    mode: "cors",
  })
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("Failed to fetch employees");
      }
    })
    .then(data => {
      return data?.employees ?? [];
    })
    .catch(error => {
      console.error("Error fetching employees:", error);
      return null;
    });
};

const addEmployee = (employee) => {
  return fetch(`${API_BASE}/employee`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(employee),
  })
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("Failed to add employee");
      }
    })
    .catch(error => {
      console.error("Error adding employee:", error);
      throw new Error("Failed to add employee");
    });
};

const updateEmployee = (employee) => {
  return fetch(`${API_BASE}/employee/${employee.id}`, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(employee),
  })
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("Failed to update employee");
      }
    })
    .catch(error => {
      console.error("Error updating employee:", error);
      throw new Error("Failed to update employee");
    });
};

const deleteEmployee = (employeeId) => {
  return fetch(`${API_BASE}/employee/${employeeId}`, {
    method: "DELETE",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  })
    .then(response => {
      if (response.ok) {
        return true;
      } else {
        throw new Error("Failed to delete employee");
      }
    })
    .catch(error => {
      console.error("Error deleting employee:", error);
      throw new Error("Failed to delete employee");
    });
};

export const crudServices = {
  fetchEmployees,
  addEmployee,
  updateEmployee,
  deleteEmployee,
};
