import { useState, useEffect } from "react";
import api from "../../services/api";

interface UserInterface {
  id: string; // O ID do utilizador é um UUID (string)
  name: string;
  email: string;
}

interface EventInterface {
  id: string; // O ID do evento também é um UUID (string)
  description: string;
}

interface CreateSaleProps {
  onSaleCreated: () => void;
}

const CreateSale = ({ onSaleCreated }: CreateSaleProps) => {
  // Estados para guardar os dados dos dropdowns
  const [users, setUsers] = useState<UserInterface[]>([]);
  const [events, setEvents] = useState<EventInterface[]>([]);

  // Estados para os valores selecionados no formulário
  const [selectedUserId, setSelectedUserId] = useState("");
  const [selectedEventId, setSelectedEventId] = useState("");

  const [loading, setLoading] = useState(true); // Inicia a carregar os dados
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // Efeito para carregar utilizadores e eventos quando o componente monta
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        const usersResponse = await api("/api/users");
        const eventsResponse = await api("/api/events");
        setUsers(Array.isArray(usersResponse) ? usersResponse : []);
        setEvents(Array.isArray(eventsResponse) ? eventsResponse : []);
      } catch (err) {
        console.error("Falha ao carregar dados para o formulário:", err);
        setError("Não foi possível carregar os utilizadores e eventos.");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleCreateSale = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedUserId || !selectedEventId) {
      setError("Por favor, selecione um utilizador e um evento.");
      return;
    }
    setLoading(true);
    setError(null);
    setSuccessMessage(null);

    const data = {
      userId: selectedUserId,
      eventId: selectedEventId,
    };

    try {
      await api("/api/sales", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      setSuccessMessage("Venda cadastrada com sucesso!");

      setTimeout(() => {
        onSaleCreated();
        setSelectedUserId("");
        setSelectedEventId("");
      }, 1500);
    } catch (err) {
      setError("Erro ao cadastrar a venda. Verifique o console para detalhes.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading && (users.length === 0 || events.length === 0)) {
    return <div>A carregar dados do formulário...</div>;
  }

  return (
    <div className="form-container">
      <h2>Cadastrar Nova Venda</h2>
      {error && <p className="error-message">{error}</p>}
      {successMessage && <p className="success-message">{successMessage}</p>}
      <form onSubmit={handleCreateSale}>
        <div className="form-group">
          <label htmlFor="user-select">Utilizador:</label>
          <select
            id="user-select"
            value={selectedUserId}
            onChange={(e) => setSelectedUserId(e.target.value)}
            required>
            <option value="" disabled>
              Selecione um utilizador
            </option>
            {users.map((user) => (
              <option key={user.id} value={user.id}>
                {user.name} ({user.email})
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="event-select">Evento:</label>
          <select
            id="event-select"
            value={selectedEventId}
            onChange={(e) => setSelectedEventId(e.target.value)}
            required>
            <option value="" disabled>
              Selecione um evento
            </option>
            {events.map((event) => (
              <option key={event.id} value={event.id}>
                {event.description}
              </option>
            ))}
          </select>
        </div>
        <button type="submit" className="form-button" disabled={loading}>
          {loading ? "A Cadastrar..." : "Cadastrar Venda"}
        </button>
      </form>
    </div>
  );
};

export default CreateSale;
