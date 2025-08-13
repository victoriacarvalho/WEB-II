import { useState, useEffect, useCallback } from "react";
import "./App.css";
import api from "./services/api";

import ListUsers from "./components/users/ListUsers";
import CreateUser from "./components/users/CreateUser";
import CreateEvent from "./components/events/CreateEvent";
import ListSales from "./components/sales/ListSales";
import ListEvents from "./components/events/ListEvents";
import CreateSale from "./components/sales/CreateSale";

interface UserInterface {
  id: string;
  name: string;
  email: string;
}
interface EventInterface {
  id: string;
  description: string;
  eventDate: string;
  salesStartDate: string;
  salesEndDate: string;
  ticketPrice: number;
}
interface SaleInterface {
  id: string;
  userId: string;
  saleDate: string;
  saleStatus: string;
  eventDTO: EventInterface;
}

function App() {
  const [activeTab, setActiveTab] = useState("list-users");
  const [users, setUsers] = useState<UserInterface[]>([]);
  const [events, setEvents] = useState<EventInterface[]>([]);
  const [sales, setSales] = useState<SaleInterface[]>([]);
  const [loading, setLoading] = useState({
    users: true,
    events: true,
    sales: true,
  });
  const [error, setError] = useState({
    users: null,
    events: null,
    sales: null,
  });

  // Funções de busca de dados (fetchUsers, fetchEvents, fetchSales) permanecem iguais
  const fetchUsers = useCallback(async () => {
    setLoading((prev) => ({ ...prev, users: true }));
    try {
      const response = await api("/api/users");
      setUsers(Array.isArray(response) ? response : []);
    } catch (err) {
      console.error("Erro ao carregar utilizadores:", err);
      setError((prev) => ({
        ...prev,
        users: "Falha ao carregar utilizadores.",
      }));
    } finally {
      setLoading((prev) => ({ ...prev, users: false }));
    }
  }, []);

  const fetchEvents = useCallback(async () => {
    setLoading((prev) => ({ ...prev, events: true }));
    try {
      const response = await api("/api/events");
      setEvents(Array.isArray(response) ? response : []);
    } catch (err) {
      console.error("Erro ao carregar eventos:", err);
      setError((prev) => ({ ...prev, events: "Falha ao carregar eventos." }));
    } finally {
      setLoading((prev) => ({ ...prev, events: false }));
    }
  }, []);

  const fetchSales = useCallback(async () => {
    setLoading((prev) => ({ ...prev, sales: true }));
    try {
      const response = await api("/api/sales");
      setSales(Array.isArray(response) ? response : []);
    } catch (err) {
      console.error("Erro ao carregar vendas:", err);
      setError((prev) => ({ ...prev, sales: "Falha ao carregar vendas." }));
    } finally {
      setLoading((prev) => ({ ...prev, sales: false }));
    }
  }, []);

  useEffect(() => {
    fetchUsers();
    fetchEvents();
    fetchSales();
  }, [fetchUsers, fetchEvents, fetchSales]);

  const handleUserCreated = () => {
    fetchUsers();
    setActiveTab("list-users");
  };

  const handleSaleCreated = () => {
    fetchSales();
    setActiveTab("sales");
  };

  const handleEventCreated = () => {
    fetchEvents();
    setActiveTab("list-events");
  };

  const handleStatusChange = async (saleId: string, newStatus: string) => {
    const originalSales = [...sales];
    setSales((currentSales) =>
      currentSales.map((s) =>
        s.id === saleId ? { ...s, saleStatus: newStatus } : s
      )
    );
    try {
      await api(`/api/sales/${saleId}/status`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ saleStatus: newStatus }),
      });
    } catch (err) {
      console.error("Falha ao atualizar o status:", err);
      alert("Falha ao atualizar o status. A alteração será desfeita.");
      setSales(originalSales);
    }
  };

  const renderContent = () => {
    switch (activeTab) {
      case "list-users":
        return (
          <ListUsers
            users={users}
            loading={loading.users}
            error={error.users}
          />
        );
      case "create-user":
        return <CreateUser onUserCreated={handleUserCreated} />;
      case "list-events":
        return (
          <ListEvents
            events={events}
            loading={loading.events}
            error={error.events}
          />
        );
      case "create-event":
        return <CreateEvent onEventCreated={handleEventCreated} />;
      case "sales":
        return (
          <ListSales
            sales={sales}
            loading={loading.sales}
            error={error.sales}
            onStatusChange={handleStatusChange}
          />
        );
      case "create-sale":
        return <CreateSale onSaleCreated={handleSaleCreated} />;
      default:
        return (
          <ListUsers
            users={users}
            loading={loading.users}
            error={error.users}
          />
        );
    }
  };

  return (
    <div className="tabs-container">
      <h1>Sistema de Vendas de Tickets - WEB 2</h1>
      <nav className="tabs-nav">
        <button
          className={`tab-button ${activeTab === "list-users" ? "active" : ""}`}
          onClick={() => setActiveTab("list-users")}>
          Utilizadores
        </button>
        <button
          className={`tab-button ${
            activeTab === "create-user" ? "active" : ""
          }`}
          onClick={() => setActiveTab("create-user")}>
          Cadastrar Utilizador
        </button>
        <button
          className={`tab-button ${
            activeTab === "list-events" ? "active" : ""
          }`}
          onClick={() => setActiveTab("list-events")}>
          Eventos
        </button>
        <button
          className={`tab-button ${
            activeTab === "create-event" ? "active" : ""
          }`}
          onClick={() => setActiveTab("create-event")}>
          Cadastrar Evento
        </button>
        <button
          className={`tab-button ${activeTab === "sales" ? "active" : ""}`}
          onClick={() => setActiveTab("sales")}>
          Vendas
        </button>
        <button
          className={`tab-button ${
            activeTab === "create-sale" ? "active" : ""
          }`}
          onClick={() => setActiveTab("create-sale")}>
          Cadastrar Venda
        </button>
      </nav>
      <main className="tab-content">{renderContent()}</main>
    </div>
  );
}

export default App;
