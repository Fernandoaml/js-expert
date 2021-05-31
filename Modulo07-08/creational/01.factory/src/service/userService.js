class UserService {
  // Com Injeção de dependência ele vai utilizar o userRepository.
  // Não tem require. Quem for utilizar passa no construtor, não tendo dependência de implementação.
  // Só temos a dependência da abstração desta classe.
  constructor({ userRepository }) {
    this.userRepository = userRepository;
  }

  async find(query) {
    const users = await this.userRepository.find(query);
    return users.map((item) => ({ ...item, name: item.name.toUpperCase() }));
  }
}

module.exports = UserService;
