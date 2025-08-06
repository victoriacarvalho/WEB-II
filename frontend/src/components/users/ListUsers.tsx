interface UserInterface {
  id: string;
  name: string;
  email: string;
}

interface ListUsersProps {
  users: UserInterface[];
  loading: boolean;
  error: string | null;
}

const ListUsers = ({ users, loading, error }: ListUsersProps) => {
  if (loading) return <div>A carregar utilizadores...</div>;
  if (error) return <div className="error-message">{error}</div>;

  return (
    <div className="list-container">
      {users.length > 0 ? (
        users.map((user) => (
          <div key={user.id} className="list-item">
            <p>
              <strong>ID:</strong> {user.id}
            </p>
            <p>
              <strong>Nome:</strong> {user.name}
            </p>
            <p>
              <strong>Email:</strong> {user.email}
            </p>
          </div>
        ))
      ) : (
        <p>Nenhum utilizador encontrado.</p>
      )}
    </div>
  );
};

export default ListUsers;
