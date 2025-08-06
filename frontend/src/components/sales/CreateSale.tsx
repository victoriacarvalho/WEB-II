import { useState } from "react";
import api from "../../services/api";

interface UserInterface {
  id: string;
  name: string;
}
interface EventInterface {
  id: number;
  description: string;
}

interface CreateSaleProps {
  users: UserInterface[];
  events: EventInterface[];
  onSaleCreated: () => void;
}

const CreateSale = ({ users, events, onSaleCreated }: CreateSaleProps) => {
  const [selectedUserId, setSelectedUserId] = useState("");
  const [selectedEventId, setSelectedEventId] = useState("");
  const [paymentStatus, setPaymentStatus] = useState("PENDENTE");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

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
      paymentStatus: paymentStatus,
      eventIds: [parseInt(selectedEventId, 10)],
    };

    try {
      await api("/api/sales", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      setSuccessMessage("Venda cadastrada com sucesso!");
      onSaleCreated();
      setSelectedUserId("");
      setSelectedEventId("");
      setPaymentStatus("PENDENTE");
    } catch (err) {
      setError("Erro ao cadastrar a venda.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

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
                {user.name}
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
        <div className="form-group">
          <label htmlFor="status-select">Status do Pagamento:</label>
          <select
            id="status-select"
            value={paymentStatus}
            onChange={(e) => setPaymentStatus(e.target.value)}
            required>
            <option value="PENDENTE">Pendente</option>
            <option value="PAGO">Pago</option>
            <option value="CANCELADO">Cancelado</option>
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
