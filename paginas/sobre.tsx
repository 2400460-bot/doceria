import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

type RootStackParamList = {
  Login: undefined;
  Home: undefined;
  Cadastro: undefined;
  Sobre: undefined;
};

type SobreNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Sobre'>;

export default function SobreScreen() {
  const navigation = useNavigation<SobreNavigationProp>();

  return (
    <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
      {/* Cabeçalho */}
      <Text style={styles.logo}>Doce Arte</Text>
      <Text style={styles.slogan}>O sabor que abraça desde 2012</Text>

      {/* Nossa História */}
      <View style={styles.box}>
        <Text style={styles.boxTitulo}>Nossa História</Text>
        <Text style={styles.boxTexto}>
          A Doce Arte nasceu em 2012, na cozinha da Dona Helena, uma confeiteira apaixonada que transformava
          aniversários de família em verdadeiras festas. O que começou com encomendas de brigadeiros para vizinhos
          logo se tornou uma confeitaria artesanal de referência no bairro.{'\n\n'}
          Hoje, nossa equipe conta com 12 profissionais, entre confeiteiros, padeiros e atendentes, todos
          dedicados a criar doces que aquecem o coração.
        </Text>
      </View>

      {/* Nossos Valores */}
      <View style={styles.box}>
        <Text style={styles.boxTitulo}>Nossos Valores</Text>
        <View style={styles.valoresCol}>
          <View style={styles.valorItem}>
            <Text style={styles.valorTitulo}>Ingredientes Reais</Text>
            <Text style={styles.valorDesc}>Manteiga, chocolate belga, frutas frescas. Nada de essências artificiais.</Text>
          </View>
          <View style={styles.valorItem}>
            <Text style={styles.valorTitulo}>Feito à Mão</Text>
            <Text style={styles.valorDesc}>Cada doce é preparado artesanalmente, com técnicas tradicionais e muito carinho.</Text>
          </View>
          <View style={styles.valorItem}>
            <Text style={styles.valorTitulo}>Sustentabilidade</Text>
            <Text style={styles.valorDesc}>Embalagens biodegradáveis e parceria com produtores locais.</Text>
          </View>
        </View>
      </View>

      {/* Contato */}
      <View style={styles.box}>
        <Text style={styles.boxTitulo}>Fale Conosco</Text>
        <View style={styles.contatoItem}>
          <Text style={styles.contatoLabel}>WhatsApp / Telefone</Text>
          <Text style={styles.contatoValor}>(11) 99876-5432</Text>
        </View>
        <View style={styles.contatoItem}>
          <Text style={styles.contatoLabel}>E-mail</Text>
          <Text style={styles.contatoValor}>contato@docearte.com.br</Text>
        </View>
        <View style={styles.contatoItem}>
          <Text style={styles.contatoLabel}>Endereço</Text>
          <Text style={styles.contatoValor}>Rua das Rosas, 456 – Vila Mariana{'\n'}São Paulo/SP – CEP: 04000-000</Text>
        </View>
        <View style={styles.contatoItem}>
          <Text style={styles.contatoLabel}>Horário de Funcionamento</Text>
          <Text style={styles.contatoValor}>
            Terça a Sexta: 9h às 19h{'\n'}
            Sábado: 9h às 17h{'\n'}
            Domingo: 9h às 13h{'\n'}
            Segunda: Fechado
          </Text>
        </View>
      </View>

      {/* Redes Sociais */}
      <View style={styles.box}>
        <Text style={styles.boxTitulo}>Siga a Doce Arte</Text>
        <View style={styles.socialRow}>
          <View style={styles.socialBadge}><Text style={styles.socialText}>Instagram: @docearte</Text></View>
          <View style={styles.socialBadge}><Text style={styles.socialText}>Facebook: /docearteconfeitaria</Text></View>
        </View>
      </View>

      {/* Botão Voltar */}
      <TouchableOpacity
        style={styles.botaoVoltar}
        onPress={() => navigation.goBack()}
        activeOpacity={0.8}
      >
        <Text style={styles.textoVoltar}>Voltar para o Cardápio</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFF5F0',
    paddingHorizontal: 20,
    paddingTop: 50,
    paddingBottom: 30,
  },
  logo: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#D97A6E',
    textAlign: 'center',
    marginBottom: 4,
  },
  slogan: {
    fontSize: 14,
    color: '#B5838D',
    textAlign: 'center',
    marginBottom: 28,
  },
  box: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 18,
    marginBottom: 16,
    borderWidth: 0.5,
    borderColor: '#F2D5C4',
    shadowColor: '#D97A6E',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  boxTitulo: {
    fontSize: 18,
    fontWeight: '700',
    color: '#D97A6E',
    marginBottom: 12,
  },
  boxTexto: {
    fontSize: 14,
    color: '#4A3B32',
    lineHeight: 22,
  },
  valoresCol: {
    gap: 14,
  },
  valorItem: {
    marginBottom: 8,
  },
  valorTitulo: {
    fontSize: 15,
    fontWeight: '600',
    color: '#4A3B32',
    marginBottom: 2,
  },
  valorDesc: {
    fontSize: 12,
    color: '#8D6E63',
    lineHeight: 17,
  },
  contatoItem: {
    marginBottom: 14,
  },
  contatoLabel: {
    fontSize: 13,
    color: '#B5838D',
    fontWeight: '600',
    marginBottom: 2,
  },
  contatoValor: {
    fontSize: 14,
    color: '#4A3B32',
    lineHeight: 20,
  },
  socialRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  socialBadge: {
    backgroundColor: '#FFF0EC',
    borderRadius: 20,
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderWidth: 0.5,
    borderColor: '#F2D5C4',
  },
  socialText: {
    fontSize: 13,
    color: '#B5838D',
    fontWeight: '500',
  },
  botaoVoltar: {
    alignSelf: 'center',
    backgroundColor: '#E5989B',
    borderRadius: 14,
    paddingVertical: 14,
    paddingHorizontal: 32,
    marginTop: 8,
  },
  textoVoltar: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});