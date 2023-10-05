const loginUser = async (formData) => {
  try {
    const response = await fetch('http://localhost:9009/usuarios/gestion/login/paciente', {
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
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    if (response.ok) {
      const userData = await response.json();

      localStorage.setItem('userType', userType);
      localStorage.setItem(storageKey, JSON.stringify(userData));

      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.error(`Error al iniciar sesión como ${userType}:`, error);
    return false;
  }
};

const UserService = {
  loginUser: async (formData) => {
    const url = 'http://localhost:9009/usuarios/gestion/login/paciente';
    const storageKey = 'userData';
    return await login(url, formData, 'paciente', storageKey);
  },

  loginAdmin: async (formData) => {
    const url = 'http://localhost:9009/usuarios/gestion/login/admin';
    const storageKey = 'adminData';
    return await login(url, formData, 'admin', storageKey);
  },

  loginDoctor: async (formData) => {
    const url = 'http://localhost:9009/usuarios/gestion/login/medico';
    const storageKey = 'medicoData';
    return await login(url, formData, 'medico', storageKey);
  },
};

export default UserService;
