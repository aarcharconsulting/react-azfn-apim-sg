const BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost';
const PORT = process.env.REACT_APP_API_PORT || '4000';

const HOST = `${BASE_URL}:${PORT}`;

const fetchEmployees = async () => {
  const response = await fetch(`${HOST}/employees`, { method: 'GET', mode: 'cors' });

  if (response.ok) {
    const data = await response.json();
    return data;
  } else {
    return null;
  }
};

const addEmployee = async (employee) => {
  const response = await fetch(`${HOST}/employees`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(employee),
  });

  if (response.ok) {
    return await response.json();
  } else {
    throw new Error('Failed to add employee');
  }
};

const updateEmployee = async (employee) => {
  const response = await fetch(`${HOST}/employees/${employee.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(employee),
  });

  if (response.ok) {
    return await response.json();
  } else {
    throw new Error('Failed to update employee');
  }
};

const deleteEmployee = async (employeeId) => {
  const response = await fetch(`${HOST}/employees/${employeeId}`, {
    method: 'DELETE',
  });

  if (response.ok) {
    return true;
  } else {
    throw new Error('Failed to delete employee');
  }
};

export const crudServices = {
  fetchEmployees,
  addEmployee,
  updateEmployee,
  deleteEmployee,
};
