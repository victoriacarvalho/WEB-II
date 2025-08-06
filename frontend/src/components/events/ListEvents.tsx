interface EventInterface {
  id: number;
  description: string;
  eventDate: string;
  salesStartDate: string;
  salesEndDate: string;
  ticketPrice: number;
}

interface ListEventsProps {
  events: EventInterface[];
  loading: boolean;
  error: string | null;
}

const ListEvents = ({ events, loading, error }: ListEventsProps) => {
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
