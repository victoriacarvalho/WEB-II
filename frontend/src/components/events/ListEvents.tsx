import { useEffect, useState } from "react";
import api from "../../services/api";

// Interface para definir a estrutura de um objeto de evento
interface EventInterface {
  id: number;
  description: string;
  eventDate: string;
  salesStartDate: string;
  salesEndDate: string;
  ticketPrice: number;
}

const ListEvents = () => {
  const [events, setEvents] = useState<EventInterface[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    // O gateway encaminhará /api/events para o sales-service
    api("/api/events")
      .then((response) => {
        if (Array.isArray(response)) {
          setEvents(response);
        } else {
          setError("A resposta da API de eventos não é uma lista válida.");
        }
      })
      .catch((err) => {
        console.error(err);
        setError("Falha ao carregar os eventos.");
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) return <div>A carregar eventos...</div>;
  if (error) return <div className="error-message">{error}</div>;

  return (
    <div className="list-container">
      {events.length > 0 ? (
        events.map((event) => (
          <div key={event.id} className="list-item">
            <p>
              <strong>Evento:</strong> {event.description}
            </p>
            <p>
              <strong>Data:</strong>{" "}
              {new Date(event.eventDate).toLocaleString()}
            </p>
            <p>
              <strong>Preço do Ingresso:</strong> R${" "}
              {event.ticketPrice.toFixed(2)}
            </p>
            <p>
              <strong>Vendas:</strong>{" "}
              {new Date(event.salesStartDate).toLocaleDateString()} -{" "}
              {new Date(event.salesEndDate).toLocaleDateString()}
            </p>
          </div>
        ))
      ) : (
        <p>Nenhum evento encontrado.</p>
      )}
    </div>
  );
};

export default ListEvents;
