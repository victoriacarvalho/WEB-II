import { useState } from "react";
import api from "../../services/api";

interface CreateEventProps {
  onEventCreated: () => void;
}

const CreateEvent = ({ onEventCreated }: CreateEventProps) => {
  // ... (o resto do código do formulário permanece igual, mas com a nova prop)
  const [description, setDescription] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [salesStartDate, setSalesStartDate] = useState("");
  const [salesEndDate, setSalesEndDate] = useState("");
  const [ticketPrice, setTicketPrice] = useState("");
  const [eventTypeId, setEventTypeId] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const handleCreateEvent = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccessMessage(null);

    const data = {
      description,
      eventDate: `${eventDate}:00`,
      salesStartDate: `${salesStartDate}:00`,
      salesEndDate: `${salesEndDate}:00`,
      ticketPrice: parseFloat(ticketPrice),
      eventTypeId: parseInt(eventTypeId, 10),
    };

    try {
      await api("/api/events", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      setSuccessMessage("Evento cadastrado com sucesso!");
      onEventCreated(); // Avisa o App.tsx

      // Limpar formulário
      setDescription("");
      setEventDate("");
      setSalesStartDate("");
      setSalesEndDate("");
      setTicketPrice("");
      setEventTypeId("");
    } catch (err) {
      setError("Erro ao cadastrar evento.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // O JSX do formulário continua o mesmo
  return (
    <div className="form-container">
      <h2>Cadastrar Novo Evento</h2>
      {error && <p className="error-message">{error}</p>}
      {successMessage && <p className="success-message">{successMessage}</p>}
      <form onSubmit={handleCreateEvent}>
        {/* ... todos os form-groups ... */}
        <div className="form-group">
          <label htmlFor="description">Descrição do Evento:</label>
          <input
            type="text"
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="eventDate">Data e Hora do Evento:</label>
          <input
            type="datetime-local"
            id="eventDate"
            value={eventDate}
            onChange={(e) => setEventDate(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="salesStartDate">Início das Vendas:</label>
          <input
            type="datetime-local"
            id="salesStartDate"
            value={salesStartDate}
            onChange={(e) => setSalesStartDate(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="salesEndDate">Fim das Vendas:</label>
          <input
            type="datetime-local"
            id="salesEndDate"
            value={salesEndDate}
            onChange={(e) => setSalesEndDate(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="ticketPrice">Preço do Ingresso:</label>
          <input
            type="number"
            id="ticketPrice"
            value={ticketPrice}
            onChange={(e) => setTicketPrice(e.target.value)}
            placeholder="Ex: 50.00"
            step="0.01"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="eventTypeId">ID do Tipo de Evento:</label>
          <input
            type="number"
            id="eventTypeId"
            value={eventTypeId}
            onChange={(e) => setEventTypeId(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="form-button" disabled={loading}>
          {loading ? "A Cadastrar..." : "Cadastrar Evento"}
        </button>
      </form>
    </div>
  );
};

export default CreateEvent;
