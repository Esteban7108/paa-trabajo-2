import { useState, useEffect } from "react";
import axios from "axios";

const API_URL = "/api";

function App() {
  const [animal, setAnimal] = useState("");
  const [lista, setLista] = useState([]);


  useEffect(() => {
    axios.get(`${API_URL}/animales`)
      .then(res => {
        setLista(res.data.animales);
      })
      .catch(err => {
        console.error("Error cargando animales:", err);
      });
  }, []);

  const agregarAnimal = async () => {
    if (animal.trim() === "") return;

    try {
      await axios.post(`${API_URL}/animales`, {
        nombre: animal
      });

      setAnimal("");


      const res = await axios.get(`${API_URL}/animales`);
      setLista(res.data.animales);

    } catch (err) {
      console.error("Error agregando animal:", err);
    }
  };

  const manejarTecla = (e) => {
    if (e.key === "Enter") {
      agregarAnimal();
    }
  };

  return (
    <div className="container-fluid min-vh-100 pt-4 px-4 bg-light">

      <h2 className="text-center mb-4">¡Bienvenido!</h2>

      <div className="mb-4 bg-secondary rounded-3 p-4">
        <div className="row align-items-center">

          <div className="col-3">
            <label className="form-label mb-0 text-white">
              Ingresa un nombre de un animal:
            </label>
          </div>

          <div className="col-6">
            <input
              type="text"
              className="form-control"
              placeholder="Escribe algo..."
              value={animal}
              onChange={(e) => setAnimal(e.target.value)}
              onKeyDown={manejarTecla}
            />
          </div>

          <div className="col-3 d-flex justify-content-center">
            <button
              className="btn btn-primary"
              onClick={agregarAnimal}
            >
              Agregar
            </button>
          </div>

        </div>
      </div>

      <div className="mt-4 bg-white rounded-3 p-4 shadow-sm">
        <h3 className="mb-3">Lista de animales:</h3>

        <table className="table table-striped">
          <thead>
            <tr>
              <th>Animal</th>
            </tr>
          </thead>

          <tbody>
            {lista.map((item) => (
              <tr key={item.id}>
                <td>{item.nombre}</td>
              </tr>
            ))}
          </tbody>

        </table>
      </div>
    </div>
  );
}

export default App;