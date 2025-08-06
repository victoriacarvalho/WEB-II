import { useEffect, useState } from "react";
import api from "../../services/api";

interface SaleInterface {
  id: number;
  userId: number;
  saleDate: string;
  paymentStatus: string;
}

const ListSales = () => {
  const [sales, setSales] = useState<SaleInterface[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    api("/api/sales")
      .then((response) => {
        if (Array.isArray(response)) {
          setSales(response);
        } else {
          setError("A resposta da API de vendas não é uma lista válida.");
        }
      })
      .catch((err) => {
        console.error(err);
        setError("Falha ao carregar as vendas.");
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) return <div>A carregar vendas...</div>;
  if (error) return <div className="error-message">{error}</div>;

  return (
    <div className="list-container">
      {sales.length > 0 ? (
        sales.map((sale) => (
          <div key={sale.id} className="list-item">
            <p>
              <strong>ID da Venda:</strong> {sale.id}
            </p>
            <p>
              <strong>ID do Utilizador:</strong> {sale.userId}
            </p>
            <p>
              <strong>Data da Venda:</strong>{" "}
              {new Date(sale.saleDate).toLocaleString()}
            </p>
            <p>
              <strong>Status:</strong> {sale.paymentStatus}
            </p>
          </div>
        ))
      ) : (
        <p>Nenhuma venda encontrada.</p>
      )}
    </div>
  );
};

export default ListSales;
