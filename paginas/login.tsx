import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { CommonActions, useNavigation } from '@react-navigation/native';

type RootStackParamList = {
  Login: undefined;
  Home: undefined;
  Cadastro: undefined;
  Sobre: undefined;
};

type LoginNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Login'>;

type Props = {
  onLogin: () => void;
};

export default function Logintela({ onLogin }: Props) {
  const navigation = useNavigation<LoginNavigationProp>();

  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  const handleLogin = useCallback(async () => {
    if (!email.trim() || !senha.trim()) {
      Alert.alert('Atenção', 'Preencha todos os campos para entrar.');
      return;
    }

    try {
      // 1) Busca as contas salvas no AsyncStorage
      const contasSalvas = await AsyncStorage.getItem('contas');
      const contas = contasSalvas ? JSON.parse(contasSalvas) : [];

      const emailDigitado = email.trim().toLowerCase();
      const contaEncontrada = contas.find(
        (c: any) => c.email === emailDigitado && c.senha === senha
      );

      if (contaEncontrada) {
        onLogin();
        return;
      }

      // 2) Fallback:fixa do admilson
      if (emailDigitado === 'admin@docearte.com' && senha === '123456') {
        onLogin();
        return;
      }

      // 3) Nada funcionou
      Alert.alert('Erro', 'E-mail ou senha inválidos.');
    } catch (erro) {
      Alert.alert('Erro', 'Não foi possível verificar as credenciais.');
      console.error('Erro no AsyncStorage:', erro);
    }
  }, [email, senha, onLogin]);

  const irParaCadastro = useCallback(() => {
    navigation.navigate('Cadastro');
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Text style={styles.logo}>🍩 Doce Arte</Text>
      <Text style={styles.slogan}>O sabor que abraça</Text>

      <TextInput
        style={styles.input}
        placeholder="E-mail"
        placeholderTextColor="#b58d7a"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <TextInput
        style={styles.input}
        placeholder="Senha"
        placeholderTextColor="#b58d7a"
        secureTextEntry
        value={senha}
        onChangeText={setSenha}
      />

      <TouchableOpacity style={styles.botao} onPress={handleLogin} activeOpacity={0.8}>
        <Text style={styles.textoBotao}>Entrar</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={irParaCadastro}>
        <Text style={styles.link}>Não tem conta? Cadastre-se</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF5F0',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  logo: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#D97A6E',
    marginBottom: 4,
  },
  slogan: {
    fontSize: 14,
    color: '#B5838D',
    marginBottom: 40,
  },
  input: {
    width: '100%',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#F0D9D0',
    color: '#4A3B32',
  },
  botao: {
    width: '100%',
    backgroundColor: '#E5989B',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    marginTop: 8,
    marginBottom: 16,
  },
  textoBotao: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
  },
  link: {
    color: '#B5838D',
    fontSize: 14,
    marginTop: 8,
  },
});