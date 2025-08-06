interface SaleInterface {
  id: number;
  userId: number;
  saleDate: string;
  paymentStatus: string;
}

interface ListSalesProps {
  sales: SaleInterface[];
  loading: boolean;
  error: string | null;
  onStatusChange: (saleId: number, newStatus: string) => void;
}

const ListSales = ({
  sales,
  loading,
  error,
  onStatusChange,
}: ListSalesProps) => {
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
              <strong>Data:</strong> {new Date(sale.saleDate).toLocaleString()}
            </p>
            <div className="form-group">
              <label htmlFor={`status-select-${sale.id}`}>
                <strong>Status:</strong>
              </label>
              <select
                id={`status-select-${sale.id}`}
                value={sale.paymentStatus}
                onChange={(e) => onStatusChange(sale.id, e.target.value)}>
                <option value="PENDENTE">Pendente</option>
                <option value="PAGO">Pago</option>
                <option value="CANCELADO">Cancelado</option>
              </select>
            </div>
          </div>
        ))
      ) : (
        <p>Nenhuma venda encontrada.</p>
      )}
    </div>
  );
};

export default ListSales;
