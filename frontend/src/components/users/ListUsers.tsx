import { useEffect, useState } from "react";
import api from "../../services/api";

interface UserInterface {
  id: string;
  name: string;
  email: string;
}

const ListUsers = () => {
  const [users, setUsers] = useState<UserInterface[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    api("/api/users")
      .then((response) => {
        if (Array.isArray(response)) {
          setUsers(response);
        } else {
          setError("A resposta da API de utilizadores não é uma lista válida.");
        }
      })
      .catch((err) => {
        console.error(err);
        setError("Falha ao carregar os utilizadores.");
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) return <div>A carregar utilizadores...</div>;
  if (error) return <div className="error-message">{error}</div>;

  return (
    <div className="list-container">
      {users.length > 0 ? (
        users.map((user) => (
          <div key={user.id} className="list-item">
            <p>
              <strong>ID:</strong> {user.id}
            </p>
            <p>
              <strong>Nome:</strong> {user.name}
            </p>
            <p>
              <strong>Email:</strong> {user.email}
            </p>
          </div>
        ))
      ) : (
        <p>Nenhum utilizador encontrado.</p>
      )}
    </div>
  );
};

export default ListUsers;
