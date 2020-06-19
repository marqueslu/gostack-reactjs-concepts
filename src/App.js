import React, { useState, useEffect } from "react";
import api from './services/api';

import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    api.get('/repositories').then(response => {
      setRepositories(response.data);
    })
  }, []);

  async function handleAddRepository() {
    await api.post('/repositories', {
      title: `Teste ${Date.now()}`,
      techs: ["React", "Node"]
    }).then(response => {

      const repository = response.data;

      setRepositories([...repositories, repository]);
    })
  }

  async function handleRemoveRepository(id) {
    await api.delete(`/repositories/${id}`).then(response => {
      if (response.status === 204) {
        const repositoriesListUpdated = repositories.filter(repository => repository.id !== id);

        setRepositories([...repositoriesListUpdated]);
      }
    });
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(repository => (
          <li key={repository.id}>
            {repository.title}
            <button onClick={() => handleRemoveRepository(repository.id)}>
              Remover
            </button>
          </li>
        ))}
      </ul>
      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
