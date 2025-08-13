import { useState, useEffect } from "react";
import api from "../../services/api";

interface CreateUserProps {
  onUserCreated: () => void;
}

interface CreditCardNetwork {
  id: string;
  name: string;
}

const CreateUser = ({ onUserCreated }: CreateUserProps) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [city, setCity] = useState("");
  const [creditCardNumber, setCreditCardNumber] = useState("");
  const [creditCardNetworkId, setCreditCardNetworkId] = useState("");

  const [networks, setNetworks] = useState<CreditCardNetwork[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  useEffect(() => {
    // Carrega as redes de cartão de crédito disponíveis
    const fetchNetworks = async () => {
      try {
        const response = await api("/api/ccn");
        if (Array.isArray(response)) {
          setNetworks(response);
        }
      } catch (err) {
        console.error("Failed to fetch credit card networks:", err);
        setError("Não foi possível carregar as redes de cartão de crédito.");
      }
    };
    fetchNetworks();
  }, []);

  const handleCreateUser = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccessMessage(null);

    const data = {
      name,
      email,
      password,
      city,
      creditCardNumber,
      creditCardNetworkId,
    };

    try {
      await api("/api/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      setSuccessMessage("Utilizador cadastrado com sucesso!");
      setTimeout(() => {
        onUserCreated();
      }, 1500);
    } catch (err) {
      setError(
        "Erro ao cadastrar utilizador. Verifique os dados e tente novamente."
      );
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="form-container">
      <h2>Cadastrar Novo Utilizador</h2>
      {error && <p className="error-message">{error}</p>}
      {successMessage && <p className="success-message">{successMessage}</p>}
      <form onSubmit={handleCreateUser}>
        <div className="form-group">
          <label htmlFor="name">Nome:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="city">Cidade:</label>
          <input
            type="text"
            id="city"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="creditCardNumber">Número do Cartão de Crédito:</label>
          <input
            type="text"
            id="creditCardNumber"
            value={creditCardNumber}
            onChange={(e) => setCreditCardNumber(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="creditCardNetwork">Rede do Cartão:</label>
          <select
            id="creditCardNetwork"
            value={creditCardNetworkId}
            onChange={(e) => setCreditCardNetworkId(e.target.value)}>
            <option value="" disabled>
              Selecione uma rede
            </option>
            {networks.map((network) => (
              <option key={network.id} value={network.id}>
                {network.name}
              </option>
            ))}
          </select>
        </div>
        <button type="submit" className="form-button" disabled={loading}>
          {loading ? "A Cadastrar..." : "Cadastrar Utilizador"}
        </button>
      </form>
    </div>
  );
};

export default CreateUser;
