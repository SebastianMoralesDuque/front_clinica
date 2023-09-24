import React, { useState } from 'react';

const App = () => {
  const [image, setImage] = useState("");
  const [url, setUrl] = useState("");

  // Función para cargar la imagen en Cloudinary
  const uploadImage = () => {
    const data = new FormData();
    data.append("file", image);
    data.append("upload_preset", "ml_default");
    data.append("cloud_name", "dkm9g0zpt"); // Cambia a tu cloud_name
    data.append("api_key", "654495213436479"); // Cambia a tu api_key
    data.append("api_secret", "PIJO3ukm6rEsZFGjOIK7gcVDV-g"); // Cambia a tu api_secret

    fetch("https://api.cloudinary.com/v1_1/dkm9g0zpt/image/upload", {
      method: "post",
      body: data
    })
      .then(resp => resp.json())
      .then(data => {
        setUrl(data.url);
      })
      .catch(err => console.log(err));
  };
  console.log(url);

  return (
    <div>
      <div>
        <input type="file" onChange={(e) => setImage(e.target.files[0])}></input>
        <button onClick={uploadImage}>Upload</button>
      </div>
      <div>
        <h1>La imagen cargada se mostrará aquí</h1>
        <img src={url} alt="Imagen cargada" />
      </div>
    </div>
  );
};

export default App;
