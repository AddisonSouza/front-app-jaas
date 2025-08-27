import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import { useRouter } from "expo-router";
import RegexValidation from "../utils/RegexValidator";
import Credenciais from "../utils/Credenciais";

export default function CadastroScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [nome, setNome] = useState("");
  
  // Estados para controlar visibilidade das senhas
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [nomeError, setNomeError] = useState("");
  const [cadastroError, setCadastroError] = useState("");
  const [cadastroSucesso, setCadastroSucesso] = useState("");
  
  const router = useRouter();

  const validateFields = () => {
    let isValid = true;

    setEmailError("");
    setPasswordError("");
    setConfirmPasswordError("");
    setNomeError("");
    setCadastroError("");

    if (!nome.trim()) {
      setNomeError("Nome é obrigatório");
      isValid = false;
    }

    if (!email) {
      setEmailError("Email é obrigatório");
      isValid = false;
    } else if (!RegexValidation.emailValidator.test(email)) {
      setEmailError("Digite um email válido");
      isValid = false;
    }

    if (!password) {
      setPasswordError("Senha é obrigatória");
      isValid = false;
    } else {
      const passwordValidation = RegexValidation.validatePasswordStrength(password);
      if (!passwordValidation.isValid) {
        setPasswordError(passwordValidation.errors.join(", "));
        isValid = false;
      }
    }

    if (!confirmPassword) {
      setConfirmPasswordError("Confirmação de senha é obrigatória");
      isValid = false;
    } else if (password !== confirmPassword) {
      setConfirmPasswordError("As senhas não coincidem");
      isValid = false;
    }

    return isValid;
  };

  const handleEmailChange = (text) => {
    setEmail(text);
    if (emailError) setEmailError("");
    if (cadastroError) setCadastroError("");
    if (cadastroSucesso) setCadastroSucesso("");
  };

  const handlePasswordChange = (text) => {
    setPassword(text);
    if (passwordError) setPasswordError("");
    if (confirmPasswordError && confirmPassword && text === confirmPassword) {
      setConfirmPasswordError("");
    }
  };

  const handleConfirmPasswordChange = (text) => {
    setConfirmPassword(text);
    if (confirmPasswordError) setConfirmPasswordError("");
    if (password && text === password) {
      setConfirmPasswordError("");
    }
  };

  const handleNomeChange = (text) => {
    setNome(text);
    if (nomeError) setNomeError("");
  };

  const handleCadastro = () => {
    setCadastroSucesso("");
    
    if (!validateFields()) {
      return;
    }

    const resultado = Credenciais.cadastrarUsuario(email, password, nome);

    if (!resultado.sucesso) {
      setCadastroError(resultado.mensagem);
      return;
    }

    setCadastroSucesso(resultado.mensagem);
    
    setTimeout(() => {
      setEmail("");
      setPassword("");
      setConfirmPassword("");
      setNome("");
      setCadastroSucesso("");
      
      router.push("/login");
    }, 2000);
  };

  const irParaLogin = () => {
    router.push("/login");
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Criar Conta</Text>
      <Text style={styles.subtitle}>Preencha os dados para se cadastrar</Text>

      {cadastroSucesso ? (
        <View style={styles.successContainer}>
          <Text style={styles.successText}>✅ {cadastroSucesso}</Text>
        </View>
      ) : null}

      {cadastroError ? (
        <View style={styles.errorContainer}>
          <Text style={styles.errorContainerText}>⚠️ {cadastroError}</Text>
        </View>
      ) : null}

      <TextInput
        style={[styles.input, nomeError ? styles.inputError : null]}
        placeholder="Nome completo"
        value={nome}
        onChangeText={handleNomeChange}
        autoCapitalize="words"
      />
      {nomeError ? <Text style={styles.errorText}>{nomeError}</Text> : null}

      <TextInput
        style={[styles.input, emailError ? styles.inputError : null]}
        placeholder="E-mail"
        value={email}
        onChangeText={handleEmailChange}
        autoCapitalize="none"
        keyboardType="email-address"
      />
      {emailError ? <Text style={styles.errorText}>{emailError}</Text> : null}

      {/* Campo Senha */}
      <View style={styles.passwordContainer}>
        <TextInput
          style={[styles.passwordInput, passwordError ? styles.inputError : null]}
          placeholder="Senha"
          value={password}
          onChangeText={handlePasswordChange}
          secureTextEntry={!showPassword}
        />
        <TouchableOpacity 
          style={styles.eyeButton} 
          onPress={() => setShowPassword(!showPassword)}
        >
          <Text style={styles.eyeText}>{showPassword ? "Ocultar" : "Mostrar"}</Text>
        </TouchableOpacity>
      </View>
      {passwordError ? <Text style={styles.errorText}>{passwordError}</Text> : null}

      {/* Campo Confirmar Senha */}
      <View style={styles.passwordContainer}>
        <TextInput
          style={[styles.passwordInput, confirmPasswordError ? styles.inputError : null]}
          placeholder="Confirmar senha"
          value={confirmPassword}
          onChangeText={handleConfirmPasswordChange}
          secureTextEntry={!showConfirmPassword}
        />
        <TouchableOpacity 
          style={styles.eyeButton} 
          onPress={() => setShowConfirmPassword(!showConfirmPassword)}
        >
          <Text style={styles.eyeText}>{showConfirmPassword ? "Ocultar" : "Mostrar"}</Text>
        </TouchableOpacity>
      </View>
      {confirmPasswordError ? <Text style={styles.errorText}>{confirmPasswordError}</Text> : null}

      <TouchableOpacity style={styles.button} onPress={handleCadastro}>
        <Text style={styles.buttonText}>Cadastrar</Text>
      </TouchableOpacity>

      <View style={styles.loginLinkContainer}>
        <Text style={styles.loginLinkText}>Já tem uma conta? </Text>
        <TouchableOpacity onPress={irParaLogin}>
          <Text style={styles.loginLink}>Fazer login</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 16,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 8,
    color: "#333",
  },
  subtitle: {
    fontSize: 16,
    color: "#666",
    marginBottom: 32,
    textAlign: "center",
  },
  successContainer: {
    width: "100%",
    backgroundColor: "#e8f5e8",
    borderColor: "#4caf50",
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
  },
  successText: {
    color: "#2e7d32",
    fontSize: 16,
    fontWeight: "500",
    textAlign: "center",
  },
  errorContainer: {
    width: "100%",
    backgroundColor: "#ffebee",
    borderColor: "#f44336",
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
  },
  errorContainerText: {
    color: "#c62828",
    fontSize: 16,
    fontWeight: "500",
    textAlign: "center",
  },
  input: {
    width: "100%",
    height: 50,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 16,
    marginBottom: 8,
    fontSize: 16,
    backgroundColor: "#fff",
  },
  passwordContainer: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
    position: "relative",
  },
  passwordInput: {
    flex: 1,
    height: 50,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingRight: 50,
    fontSize: 16,
    backgroundColor: "#fff",
  },
  eyeButton: {
    position: "absolute",
    right: 15,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    width: 50,
  },
  eyeText: {
    fontSize: 12,
    color: "#007bff",
    fontWeight: "500",
  },
  inputError: {
    borderColor: "#ff4444",
    borderWidth: 2,
  },
  errorText: {
    color: "#ff4444",
    fontSize: 14,
    marginBottom: 16,
    width: "100%",
    textAlign: "left",
  },
  button: {
    width: "100%",
    height: 50,
    backgroundColor: "#007bff",
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 16,
    marginBottom: 24,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  loginLinkContainer: {
    flexDirection: "row",
    marginBottom: 24,
  },
  loginLinkText: {
    fontSize: 16,
    color: "#666",
  },
  loginLink: {
    fontSize: 16,
    color: "#007bff",
    fontWeight: "bold",
  },
  passwordRequirements: {
    width: "100%",
    backgroundColor: "#f5f5f5",
    borderRadius: 8,
    padding: 16,
    marginTop: 8,
  },
  requirementsTitle: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 8,
  },
  requirementText: {
    fontSize: 12,
    color: "#666",
    marginBottom: 4,
  },
});
