#Ordem para definição/criação dos elementos no projeto

1.Definir a entidade do domínio (domain)
1.1.Refatorar/definir as relações com a noca entidade domínio
2.Definir as regras de negócio - use case
3.Refatorar/Definir a entidade da infraestrutura (model) - JPA
4.Definir o repositorio (interface) para a entidade JPA
5.Definir, se necessário, os métodos no repositório
6.Definir o serviço - Estabelecer os DTOs de entrada e saída - Definir os conversores: model -> entity; entity -> dto, ...
7.Definir o controller/endpoints - ultiliza o serviço para enviar requisições (DTOs) e receber respostas (DTOs).
8.Definir e escrever testes unitários/integração
