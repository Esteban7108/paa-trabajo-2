import { useState } from "react";

function App() {

  const [animal, setAnimal] = useState("");

  const [lista, setLista] = useState([]);

  const agregarAnimal = () => {
    if (animal.trim() === "") return;

    const nuevoAnimal = {
      id: 0,
      nombre: animal,
      hora: 0
    };

    setLista([...lista, nuevoAnimal]);
    setAnimal("");
  };

  // Detectar tecla Enter
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
              <th>ID</th>
              <th>Animal</th>
              <th>Hora</th>
            </tr>
          </thead>

          <tbody>
            {lista.map((item, index) => (
              <tr key={index}>
                <td>{item.id}</td>
                <td>{item.nombre}</td>
                <td>{item.hora}</td>
              </tr>
            ))}
          </tbody>

        </table>
      </div>

    </div>
  );
}

export default App;