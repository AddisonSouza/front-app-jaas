export default class Credenciais {
  static usuarios = [
    {
      email: "admin@jaas.com",
      senha: "admin123",
      nome: "Administrador"
    },
    {
      email: "user@jaas.com", 
      senha: "user123",
      nome: "Usuário"
    },
    {
      email: "teste@jaas.com",
      senha: "teste123", 
      nome: "Teste"
    }
  ];

  /**
   * Valida as credenciais do usuário
   * @param {string} email - Email do usuário
   * @param {string} senha - Senha do usuário
   * @returns {Object} - Resultado da validação
   */
  static validarCredenciais(email, senha) {
    // Buscar usuário pelo email
    const usuario = this.usuarios.find(user => user.email.toLowerCase() === email.toLowerCase());

    // Verificar se usuário existe
    if (!usuario) {
      return {
        sucesso: false,
        erro: "usuarioNaoCadastrado",
        mensagem: "Usuário não cadastrado"
      };
    }

    // Verificar se a senha está correta
    if (usuario.senha !== senha) {
      return {
        sucesso: false,
        erro: "senhaIncorreta", 
        mensagem: "Senha incorreta"
      };
    }

    // Login bem-sucedido
    return {
      sucesso: true,
      usuario: {
        email: usuario.email,
        nome: usuario.nome
      }
    };
  }

  /**
   * Verificar se um email existe na base de dados
   * @param {string} email - Email para verificar
   * @returns {boolean} - Se o email existe
   */
  static emailExiste(email) {
    return this.usuarios.some(user => user.email.toLowerCase() === email.toLowerCase());
  }

  /**
   * Obter lista de emails válidos (para debug)
   * @returns {Array} - Lista de emails válidos
   */
  static obterEmailsValidos() {
    return this.usuarios.map(user => user.email);
  }
}
