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
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

type RootStackParamList = {
  Login: undefined;
  Home: undefined;
  Cadastro: undefined;
  Sobre: undefined;
};

type CadastroNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Cadastro'>;

export default function CadastroScreen() {
  const navigation = useNavigation<CadastroNavigationProp>();

  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  const handleCadastro = useCallback(async () => {
    if (!nome.trim() || !email.trim() || !senha.trim()) {
      Alert.alert('Atenção', 'Preencha todos os campos.');
      return;
    }

    try {
      // Cria um objeto com os dados da conta
      const novaConta = {
        nome: nome.trim(),
        email: email.trim().toLowerCase(),
        senha, // em um app real, jamais salve a senha pura – aqui é apenas simulação
      };

      // Recupera contas já salvas (array) ou inicializa um novo array
      const contasSalvas = await AsyncStorage.getItem('contas');
      const contas = contasSalvas ? JSON.parse(contasSalvas) : [];

      // Verifica se o e-mail já foi cadastrado
      const existe = contas.some((c: any) => c.email === novaConta.email);
      if (existe) {
        Alert.alert('E-mail já cadastrado', 'Tente fazer login ou use outro e-mail.');
        return;
      }

      // Adiciona a nova conta ao array e salva no AsyncStorage
      contas.push(novaConta);
      await AsyncStorage.setItem('contas', JSON.stringify(contas));

      Alert.alert('Sucesso', 'Conta criada com sucesso! Faça login para continuar.');
      navigation.navigate('Login');
    } catch (erro) {
      Alert.alert('Erro', 'Não foi possível salvar os dados. Tente novamente.');
      console.error('Erro ao salvar no AsyncStorage:', erro);
    }
  }, [nome, email, senha, navigation]);

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Crie sua conta</Text>
      <Text style={styles.subtitulo}>Faça parte da nossa confeitaria</Text>

      <TextInput
        style={styles.input}
        placeholder="Nome completo"
        placeholderTextColor="#b58d7a"
        value={nome}
        onChangeText={setNome}
      />

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

      <TouchableOpacity style={styles.botao} onPress={handleCadastro} activeOpacity={0.8}>
        <Text style={styles.textoBotao}>Cadastrar</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Text style={styles.link}>Já tem conta? Fazer login</Text>
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
  titulo: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#D97A6E',
    marginBottom: 4,
  },
  subtitulo: {
    fontSize: 16,
    color: '#A67B6B',
    marginBottom: 32,
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