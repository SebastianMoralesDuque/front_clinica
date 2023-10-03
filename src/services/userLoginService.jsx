const loginUser = async (formData) => {
    const response = await fetch('http://localhost:9009/usuarios/gestion/login/medpac', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });
  
    return response.ok;
  };
  
  const loginAdmin = async (formData) => {
    const response = await fetch('http://localhost:9009/usuarios/gestion/login/admin', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });
  
    return response.ok;
  };
  
  const UserService = {
    loginUser,
    loginAdmin,
  };
  
  export default UserService;
  