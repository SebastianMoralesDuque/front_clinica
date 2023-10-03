const loginUser = async (formData) => {
  try {
    const response = await fetch('http://localhost:9009/usuarios/gestion/login/medpac', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });
    if (response.ok) {
      const userData = await response.json();

      // Almacenar datos en el localStorage para el tipo "paciente"
      localStorage.setItem('userType', 'paciente');
      localStorage.setItem('userData', JSON.stringify(userData));

      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.error('Error al iniciar sesión:', error);
    return false;
  }
};

const loginAdmin = async (formData) => {
  try {
    const response = await fetch('http://localhost:9009/usuarios/gestion/login/admin', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    if (response.ok) {
      const userData = await response.json();

      // Almacenar datos en el localStorage para el tipo "paciente"
      localStorage.setItem('userType', 'admin');
      localStorage.setItem('userData', JSON.stringify(userData));

      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.error('Error al iniciar sesión como administrador:', error);
    return false;
  }
};

const loginDoctor = async (formData) => {
  try {
    const response = await fetch('http://localhost:9009/usuarios/gestion/login/medico', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    if (response.ok) {
      const medicoData = await response.json();

      // Almacenar datos en el localStorage para el tipo "médico"
      localStorage.setItem('medicoType', 'medico');
      localStorage.setItem('medicoData', JSON.stringify(medicoData));

      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.error('Error al iniciar sesión como médico:', error);
    return false;
  }
};

const UserService = {
  loginUser,
  loginAdmin,
  loginDoctor,
};

export default UserService;
