export default class RegexValidation {
  static emailValidator = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  
  static passwordValidator = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  
  /**
   * Valida a força da senha
   * @param {string} password - Senha para validar
   * @returns {Object} - Resultado da validação com detalhes
   */
  static validatePasswordStrength(password) {
    const errors = [];
    
    if (password.length < 8) {
      errors.push("Mínimo 8 caracteres");
    }
    
    if (!/[a-z]/.test(password)) {
      errors.push("Pelo menos 1 letra minúscula");
    }
    
    if (!/[A-Z]/.test(password)) {
      errors.push("Pelo menos 1 letra maiúscula");
    }
    
    if (!/\d/.test(password)) {
      errors.push("Pelo menos 1 número");
    }
    
    if (!/[@$!%*?&]/.test(password)) {
      errors.push("Pelo menos 1 caractere especial (@$!%*?&)");
    }
    
    return {
      isValid: errors.length === 0,
      errors: errors
    };
  }
}