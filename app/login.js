import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import RegexValidation from '../utils/RegexValidator';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const router = useRouter();

  const validateCredentials = (emailText, passwordText) => {
    if (!emailText) {
      setEmailError('Email é obrigatório');
      return false;
    }
    if (!RegexValidation.emailValidator.test(emailText)) {
      setEmailError('Digite um email válido');
      return false;
    }

    if (!passwordText) {
      setPasswordError('Senha é obrigatória');
      return false;
    }

    setEmailError('');
    setPasswordError('');
    return true;
  };

  const handleEmailChange = (text) => {
    setEmail(text);
    // Limpar erro assim que o usuário começar a digitar
    if (emailError) {
      setEmailError('');
    }
  };

  const handlePasswordChange = (text) => {
    setPassword(text);
    // Limpar erro assim que o usuário começar a digitar
    if (passwordError) {
      setPasswordError('');
    }
  };

  const handleLogin = () => {
    // Validar email antes de fazer login
    if (!validateCredentials(email)) {
      return;
    }

    router.push('/home');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Monitoramento Jaas</Text>
      <TextInput
        style={[styles.input, emailError ? styles.inputError : null]}
        placeholder="E-mail"
        value={email}
        onChangeText={handleEmailChange}
        autoCapitalize="none"
        keyboardType="email-address"
      />
      {emailError ? <Text style={styles.errorText}>{emailError}</Text> : null}
      <TextInput
        style={[styles.input, passwordError ? styles.inputError : null]}
        placeholder="Senha"
        value={password}
        onChangeText={handlePasswordChange}
        secureTextEntry
      />
      {passwordError ? <Text style={styles.errorText}>{passwordError}</Text> : null}
      <TouchableOpacity 
        style={[styles.button]} 
        onPress={handleLogin}
      >
        <Text style={styles.buttonText}>Entrar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 16,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 32,
  },
  input: {
    width: '100%',
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 16,
    marginBottom: 8,
    fontSize: 16,
  },
  inputError: {
    borderColor: '#ff4444',
    borderWidth: 2,
  },
  errorText: {
    color: '#ff4444',
    fontSize: 14,
    marginBottom: 16,
    width: '100%',
    textAlign: 'left',
  },
  button: {
    width: '100%',
    height: 50,
    backgroundColor: '#007bff',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 16,
  },
  buttonDisabled: {
    backgroundColor: '#ccc',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
