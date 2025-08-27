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
    const usuario = this.usuarios.find(user => user.email.toLowerCase() === email.toLowerCase());

    if (!usuario) {
      return {
        sucesso: false,
        erro: "usuarioNaoCadastrado",
        mensagem: "Usuário não cadastrado"
      };
    }

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

  /**
   * Cadastrar novo usuário
   * @param {string} email - Email do usuário
   * @param {string} senha - Senha do usuário
   * @param {string} nome - Nome do usuário (opcional)
   * @returns {Object} - Resultado do cadastro
   */
  static cadastrarUsuario(email, senha, nome = "Usuário") {
    if (this.emailExiste(email)) {
      return {
        sucesso: false,
        erro: "emailJaExiste",
        mensagem: "Este email já está cadastrado"
      };
    }

    const novoUsuario = {
      email: email.toLowerCase(),
      senha: senha,
      nome: nome
    };

    this.usuarios.push(novoUsuario);

    return {
      sucesso: true,
      usuario: {
        email: novoUsuario.email,
        nome: novoUsuario.nome
      },
      mensagem: "Usuário cadastrado com sucesso!"
    };
  }
}
