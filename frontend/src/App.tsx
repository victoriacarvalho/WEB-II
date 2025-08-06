import { useState } from "react";
import "./App.css";
import ListUsers from "./components/users/ListUsers";
import CreateEvent from "./components/events/CreateEvent";
import ListSales from "./components/sales/ListSales";
import ListEvents from "./components/events/ListEvents"; // 1. Importe o novo componente

function App() {
  // 2. Adicione 'list-events' e ajuste o estado inicial
  const [activeTab, setActiveTab] = useState("users");

  const renderContent = () => {
    switch (activeTab) {
      case "users":
        return <ListUsers />;
      // 3. Adicione o case para a nova aba
      case "list-events":
        return <ListEvents />;
      case "create-event":
        return <CreateEvent />;
      case "sales":
        return <ListSales />;
      default:
        return <ListUsers />;
    }
  };

  return (
    <div className="tabs-container">
      <h1>Sistema de Vendas de Tickets</h1>
      <nav className="tabs-nav">
        <button
          className={`tab-button ${activeTab === "users" ? "active" : ""}`}
          onClick={() => setActiveTab("users")}>
          Utilizadores
        </button>
        {/* 4. Adicione o botão para a nova aba */}
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
      </nav>
      <main className="tab-content">{renderContent()}</main>
    </div>
  );
}

export default App;
