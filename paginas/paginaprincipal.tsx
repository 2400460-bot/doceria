import React, { useState, useRef, useCallback, useMemo } from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  StyleSheet,
  Animated,
  LayoutAnimation,
  Platform,
  UIManager,
} from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';

if (Platform.OS === 'android') {
  UIManager.setLayoutAnimationEnabledExperimental?.(true);
}

type Props = {
  onLogout?: () => void;
};

type RootStackParamList = {
  Login: undefined;
  Home: undefined;
  Cadastro: undefined;
  Sobre: undefined;
};

type HomeNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Home'>;

const doces = [

    {
    id: '1',
    nome: 'Brigadeiro Gourmet',
    descricao: 'Chocolate belga, granulado crocante',
    descricaoLonga: 'O brigadeiro que conquistou o Brasil ganha versão premium com chocolate belga 70% e granulado crocante. Cremoso, intenso e irresistível.',
    preco: 'R$ 4,50',
    imagem: require('./comidas/brigadeiro.jpg'),
    favorito: true,
    categoria: 'Doce',
    destaque: true,
    origem: 'Brasil',
    peso: '25g (unidade)',
    tempoPreparo: '30 min',
    avaliacao: 4.9,
    ingredientes: [
      'Chocolate belga 70%',
      'Leite condensado',
      'Manteiga',
      'Granulado crocante',
      'Creme de leite',
    ],
  },
  {
    id: '2',
    nome: 'Torta de Limão',
    descricao: 'Massa amanteigada, limão siciliano',
    descricaoLonga: 'Torta clássica de limão siciliano com massa amanteigada que derrete na boca. O recheio aveludado e a cobertura de merengue tostado fazem dessa sobremesa uma experiência cítrica e doce na medida certa.',
    preco: 'R$ 12,90',
    imagem: require('./comidas/torta-limao.png'),
    favorito: false,
    categoria: 'Torta',
    destaque: false,
    origem: 'França',
    peso: '120g (fatia)',
    tempoPreparo: '1h 20min',
    avaliacao: 4.7,
    ingredientes: [
      'Limão siciliano',
      'Farinha de trigo',
      'Manteiga',
      'Açúcar',
      'Ovos',
      'Leite condensado',
      'Creme de leite',
    ],
  },
  {
    id: '3',
    nome: 'Macaron Framboesa',
    descricao: 'Casquinha crocante, recheio aveludado',
    descricaoLonga: 'Delicado macaron francês com casquinha fina e recheio de framboesa e chocolate branco. Uma explosão de sabor e textura a cada mordida.',
    preco: 'R$ 8,00',
    imagem: require('./comidas/macaron.jpg'),
    favorito: false,
    categoria: 'Doce',
    destaque: false,
    origem: 'França',
    peso: '30g (unidade)',
    tempoPreparo: '45 min',
    avaliacao: 4.8,
    ingredientes: [
      'Farinha de amêndoa',
      'Açúcar de confeiteiro',
      'Clara de ovo',
      'Framboesa',
      'Chocolate branco',
      'Corante natural',
    ],
  },
  {
    id: '4',
    nome: 'Bolo de Cenoura',
    descricao: 'Massa fofinha com cobertura de chocolate',
    descricaoLonga: 'Bolo de cenoura com massa úmida e cobertura generosa de chocolate. Uma receita tradicional que agrada a todos os paladares.',
    preco: 'R$ 9,90',
    imagem: require('./comidas/bolo-cenoura.jpg'),
    favorito: false,
    categoria: 'Bolo',
    destaque: false,
    origem: 'Brasil',
    peso: '150g (fatia)',
    tempoPreparo: '50 min',
    avaliacao: 4.6,
    ingredientes: [
      'Cenoura',
      'Farinha de trigo',
      'Açúcar',
      'Ovos',
      'Óleo',
      'Chocolate em pó 50%',
      'Manteiga',
      'Leite',
    ],
  },
  {
    id: '5',
    nome: 'Cupcake de Baunilha',
    descricao: 'Massa leve com cobertura de buttercream',
    descricaoLonga: 'Cupcake de baunilha super macio com cobertura de buttercream cremoso. Ideal para festas ou para adoçar o dia.',
    preco: 'R$ 6,50',
    imagem: require('./comidas/Cupcake.png'),
    favorito: true,
    categoria: 'Bolo',
    destaque: false,
    origem: 'EUA',
    peso: '80g (unidade)',
    tempoPreparo: '40 min',
    avaliacao: 4.5,
    ingredientes: [
      'Farinha de trigo',
      'Açúcar',
      'Manteiga sem sal',
      'Ovos',
      'Leite',
      'Essência de baunilha',
      'Fermento',
      'Açúcar de confeiteiro',
    ],
  },
  {
    id: '6',
    nome: 'Cookie de Chocolate',
    descricao: 'Crocante por fora, macio por dentro',
    descricaoLonga: 'Cookie estilo americano com gotas de chocolate belga. Crocante nas bordas e macio no centro, perfeito com um café.',
    preco: 'R$ 5,00',
    imagem: require('./comidas/cookie.jpg'),
    favorito: false,
    categoria: 'Doce',
    destaque: false,
    origem: 'EUA',
    peso: '50g (unidade)',
    tempoPreparo: '25 min',
    avaliacao: 4.4,
    ingredientes: [
      'Farinha de trigo',
      'Manteiga',
      'Açúcar mascavo',
      'Açúcar cristal',
      'Ovos',
      'Gotas de chocolate belga',
      'Essência de baunilha',
      'Fermento',
    ],
  },
  {
    id: '7',
    nome: 'Brownie de Chocolate',
    descricao: 'Úmido, intenso e com casquinha crocante',
    descricaoLonga: 'Brownie com chocolate 60%, nozes picadas e sal marinho. A combinação perfeita de doce e salgado com textura densa e borda crocante.',
    preco: 'R$ 7,90',
    imagem: require('./comidas/Brownie.png'),
    favorito: false,
    categoria: 'Bolo',
    destaque: true,
    origem: 'EUA',
    peso: '100g (porção)',
    tempoPreparo: '35 min',
    avaliacao: 4.9,
    ingredientes: [
      'Chocolate meio amargo 60%',
      'Manteiga',
      'Açúcar',
      'Ovos',
      'Farinha de trigo',
      'Cacau em pó',
      'Nozes picadas',
      'Sal marinho',
    ],
  },
  {
    id: '8',
    nome: 'Torta de Maçã',
    descricao: 'Massa crocante, maçãs caramelizadas e canela',
    descricaoLonga: 'Torta de maçã com massa amanteigada e recheio caramelizado com toque de canela. Acompanha uma bola de sorvete de creme.',
    preco: 'R$ 11,50',
    imagem: require('./comidas/torta-maca.png'),
    favorito: true,
    categoria: 'Torta',
    destaque: false,
    origem: 'EUA',
    peso: '130g (fatia)',
    tempoPreparo: '1h 10min',
    avaliacao: 4.6,
    ingredientes: [
      'Maçã verde',
      'Farinha de trigo',
      'Manteiga gelada',
      'Açúcar mascavo',
      'Canela em pó',
      'Suco de limão',
      'Amido de milho',
      'Ovo para pincelar',
    ],
  },
  {
    id: '9',
    nome: 'Palha Italiana',
    descricao: 'Brigadeiro com biscoito, o clássico de festa',
    descricaoLonga: 'Palha italiana tradicional, com brigadeiro cremoso e biscoito Maizena crocante. Simples e deliciosa, como nos aniversários de infância.',
    preco: 'R$ 3,50',
    imagem: require('./comidas/palha.png'),
    favorito: false,
    categoria: 'Doce',
    destaque: false,
    origem: 'Brasil',
    peso: '40g (unidade)',
    tempoPreparo: '20 min',
    avaliacao: 4.3,
    ingredientes: [
      'Leite condensado',
      'Chocolate em pó',
      'Manteiga',
      'Biscoito Maizena',
      'Granulado para cobertura',
    ],
  },
  {
    id: '10',
    nome: 'Pudim de Leite',
    descricao: 'Liso, cremoso e com calda de caramelo',
    descricaoLonga: 'Pudim de leite condensado com textura lisinha e calda de caramelo caseira. Uma sobremesa clássica que nunca sai de moda.',
    preco: 'R$ 8,50',
    imagem: require('./comidas/pudim.jpg'),
    favorito: false,
    categoria: 'Sobremesa',
    destaque: false,
    origem: 'Brasil',
    peso: '120g (porção)',
    tempoPreparo: '1h (mais geladeira)',
    avaliacao: 4.8,
    ingredientes: [
      'Leite condensado',
      'Leite integral',
      'Ovos',
      'Açúcar (para a calda)',
      'Água quente',
      'Essência de baunilha',
    ],
  },
  {
    id: '11',
    nome: 'Quindim',
    descricao: 'Coco macio e brilho dourado irresistível',
    descricaoLonga: 'Quindim de coco com gemas, açúcar e manteiga, assado lentamente para ficar macio e com aquela casquinha dourada brilhante.',
    preco: 'R$ 4,00',
    imagem: require('./comidas/quindim.jpg'),
    favorito: false,
    categoria: 'Doce',
    destaque: false,
    origem: 'Brasil',
    peso: '35g (unidade)',
    tempoPreparo: '50 min',
    avaliacao: 4.5,
    ingredientes: [
      'Coco ralado fresco',
      'Açúcar',
      'Gemas de ovo',
      'Manteiga',
      'Leite de coco',
      'Manteiga para untar',
    ],
  },
  {
    id: '12',
    nome: 'Bolo Red Velvet',
    descricao: 'Massa aveludada com cream cheese',
    descricaoLonga: 'Bolo Red Velvet com massa de cor vermelha vibrante e cobertura de cream cheese. Sofisticado e apaixonante.',
    preco: 'R$ 13,90',
    imagem: require('./comidas/red-velvet.png'),
    favorito: true,
    categoria: 'Bolo',
    destaque: true,
    origem: 'EUA',
    peso: '140g (fatia)',
    tempoPreparo: '1h 30min',
    avaliacao: 4.9,
    ingredientes: [
      'Farinha de trigo',
      'Açúcar',
      'Ovos',
      'Manteiga',
      'Leite talhado (buttermilk)',
      'Corante vermelho natural',
      'Cacau em pó',
      'Cream cheese',
      'Açúcar de confeiteiro',
    ],
  },
  {
    id: '13',
    nome: 'Éclair de Chocolate',
    descricao: 'Massa choux com recheio e cobertura',
    descricaoLonga: 'Éclair francês com massa leve, recheio de creme de chocolate e cobertura brilhante. Uma obra de arte da confeitaria.',
    preco: 'R$ 9,00',
    imagem: require('./comidas/eclair.jpg'),
    favorito: false,
    categoria: 'Doce',
    destaque: false,
    origem: 'França',
    peso: '65g (unidade)',
    tempoPreparo: '1h',
    avaliacao: 4.7,
    ingredientes: [
      'Farinha de trigo',
      'Manteiga',
      'Ovos',
      'Água',
      'Chocolate meio amargo',
      'Creme de leite fresco',
      'Açúcar',
      'Baunilha',
    ],
  },
    {
    id: '14',
    nome: 'Coxinha de Frango',
    descricao: 'Massa crocante, recheio cremoso de frango',
    descricaoLonga: 'A coxinha perfeita: massa fina e crocante por fora, recheio generoso de frango desfiado temperado com especiarias. Frita na hora.',
    preco: 'R$ 6,00',
    imagem: require('./comidas/coxinha.png'), 
    favorito: false,
    categoria: 'Salgado',
    destaque: true,
    origem: 'Brasil',
    peso: '60g (unidade)',
    tempoPreparo: '40 min',
    avaliacao: 4.8,
    ingredientes: [
      'Farinha de trigo',
      'Caldo de galinha',
      'Frango desfiado',
      'Cebola',
      'Alho',
      'Salsinha',
      'Óleo para fritar',
    ],
  },
  {
    id: '15',
    nome: 'Empada de Palmito',
    descricao: 'Massa amanteigada, recheio de palmito',
    descricaoLonga: 'Empada de massa podre que derrete na boca, recheada com palmito fresco, azeitonas e um toque de tomate. Assada até dourar.',
    preco: 'R$ 7,50',
    imagem: require('./comidas/empada.png'), // coloque uma imagem de empada
    favorito: false,
    categoria: 'Salgado',
    destaque: false,
    origem: 'Brasil',
    peso: '50g (unidade)',
    tempoPreparo: '50 min',
    avaliacao: 4.6,
    ingredientes: [
      'Farinha de trigo',
      'Manteiga',
      'Palmito',
      'Azeitona',
      'Tomate',
      'Cebola',
      'Ovo para pincelar',
    ],
  },
  {
    id: '16',
    nome: 'Pão de Queijo',
    descricao: 'Casquinha crocante, interior macio e queijo',
    descricaoLonga: 'Pão de queijo mineiro tradicional, com polvilho azedo e queijo meia cura. Crocante por fora, elástico e queijudo por dentro.',
    preco: 'R$ 3,00',
    imagem: require('./comidas/pao-queijo.png'), // coloque uma imagem de pão de queijo
    favorito: true,
    categoria: 'Salgado',
    destaque: false,
    origem: 'Brasil',
    peso: '30g (unidade)',
    tempoPreparo: '25 min',
    avaliacao: 4.9,
    ingredientes: [
      'Polvilho azedo',
      'Queijo meia cura',
      'Leite',
      'Óleo',
      'Ovos',
      'Sal',
    ],
  },
];

const categorias = [
  { nome: 'Favoritos', emoji: '❤️' },
  { nome: 'Doces',     emoji: '🍬' },
  { nome: 'Bolos',     emoji: '🎂' },
  { nome: 'Salgados',  emoji: '🥐' },
];

export default function Principal({ onLogout }: Props) {
  const navigation = useNavigation<HomeNavigationProp>();

  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [favoritos, setFavoritos] = useState<{ [key: string]: boolean }>(
    Object.fromEntries(doces.map((d) => [d.id, d.favorito]))
  );
  const [categoriaAtiva, setCategoriaAtiva] = useState(0);
  const [toastVisible, setToastVisible] = useState(false);
  const toastOpacity = useRef(new Animated.Value(0)).current;

  const showToast = useCallback(() => {
    setToastVisible(true);
    Animated.sequence([
      Animated.timing(toastOpacity, { toValue: 1, duration: 300, useNativeDriver: true }),
      Animated.delay(3000),
      Animated.timing(toastOpacity, { toValue: 0, duration: 400, useNativeDriver: true }),
    ]).start(() => setToastVisible(false));
  }, [toastOpacity]);

  const irParaLogin = useCallback(() => {
    onLogout?.();
  }, [onLogout]);

  const toggleExpand = useCallback((id: string) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setExpandedId((prev) => (prev === id ? null : id));
  }, []);

  const toggleFavorito = useCallback((id: string) => {
    setFavoritos((prev) => ({ ...prev, [id]: !prev[id] }));
  }, []);

  const filteredDoces = useMemo(() => {
    switch (categoriaAtiva) {
      case 0: return doces.filter(d => favoritos[d.id]);
      case 1: return doces.filter(d => d.categoria !== 'Salgado');
      case 2: return doces.filter(d => d.categoria === 'Bolo');
      case 3: return doces.filter(d => d.categoria === 'Salgado');
      default: return doces;
    }
  }, [categoriaAtiva, favoritos]);

  type ItemType = typeof doces[0] | { id: '__header__' } | { id: '__footer__' };

  const dadosComHeaderFooter: ItemType[] = [
    { id: '__header__' },
    ...filteredDoces,
    { id: '__footer__' },
  ];

  const renderItemUnificado = useCallback(({ item }: { item: ItemType }) => {
    if (item.id === '__header__') {
      return (
        <View>
          <View style={styles.header}>
            <View>
              <Text style={styles.logo}>Doce Arte</Text>
              <Text style={styles.slogan}>O sabor que abraça</Text>
            </View>
            <TouchableOpacity style={styles.botaoSobre} onPress={() => navigation.navigate('Sobre')}>
              <Text style={styles.sobreLink}>Sobre nós</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.categoriasRow}>
            {categorias.map((cat, index) => (
              <TouchableOpacity
                key={index}
                style={[styles.categoriaItem, index < categorias.length - 1 && { marginRight: 16 }]}
                onPress={() => setCategoriaAtiva(index)}
              >
                <View style={[styles.categoriaIcone, categoriaAtiva === index && styles.categoriaIconeAtivo]}>
                  <Text style={styles.categoriaEmoji}>{cat.emoji}</Text>
                </View>
                <Text style={[styles.categoriaLabel, categoriaAtiva === index && styles.categoriaLabelAtiva]}>
                  {cat.nome}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          <Text style={styles.tituloSecao}>CARDÁPIO</Text>
        </View>
      );
    }

    if (item.id === '__footer__') {
      return (
        <TouchableOpacity style={styles.botaoSair} onPress={irParaLogin}>
          <Text style={styles.textoSair}>Sair da conta</Text>
        </TouchableOpacity>
      );
    }

    const doce = item as typeof doces[0];
    const isExpanded = expandedId === doce.id;
    return (
      <View style={styles.card}>
        <View style={styles.cardMain}>
          <Image source={doce.imagem} style={styles.imagemDoce} />
          <View style={styles.info}>
            <View style={styles.nomeFavorito}>
              <Text style={styles.nomeDoce} numberOfLines={1}>{doce.nome}</Text>
              <TouchableOpacity onPress={() => toggleFavorito(doce.id)}>
                <Text style={styles.favoritoIcon}>{favoritos[doce.id] ? '❤️' : '🤍'}</Text>
              </TouchableOpacity>
            </View>
            <Text style={styles.descricao}>{doce.descricao}</Text>
            <View style={styles.metaContainer}>
              <Text style={styles.categoriaBadge}>{doce.categoria}</Text>
              <Text style={styles.peso}>{doce.peso}</Text>
              {doce.destaque && <Text style={styles.destaqueBadge}>⭐ Destaque</Text>}
            </View>
            <View style={styles.precoBotao}>
              <Text style={styles.preco}>{doce.preco}</Text>
              <TouchableOpacity style={styles.botaoAdd} onPress={showToast}>
                <Text style={styles.textoAdd}>+</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <TouchableOpacity style={styles.expandBar} onPress={() => toggleExpand(doce.id)} activeOpacity={0.7}>
          <Text style={styles.expandLabel}>🌿 Ver ingredientes</Text>
          <Text style={[styles.expandArrow, isExpanded && styles.expandArrowOpen]}>›</Text>
        </TouchableOpacity>

        {isExpanded && (
          <View style={styles.ingredientesContainer}>
            <View style={styles.ingredientesWrap}>
              {doce.ingredientes.map((ing, idx) => (
                <View key={idx} style={styles.ingTag}>
                  <Text style={styles.ingText}>{ing}</Text>
                </View>
              ))}
            </View>
            <Text style={styles.descricaoLonga}>{doce.descricaoLonga}</Text>
          </View>
        )}
      </View>
    );
  }, [expandedId, favoritos, categoriaAtiva, showToast, toggleExpand, toggleFavorito, irParaLogin, navigation]);

  return (
    <View style={styles.container}>
      <FlatList
        data={dadosComHeaderFooter}
        keyExtractor={(item) => item.id}
        renderItem={renderItemUnificado}
        contentContainerStyle={styles.listaContent}
        showsVerticalScrollIndicator={false}
      />

      {toastVisible && (
        <Animated.View style={[styles.toast, { opacity: toastOpacity }]}>
          <Text style={styles.toastEmoji}>🕐</Text>
          <Text style={styles.toastTexto}>
            Todos os atendentes estão ocupados no momento. Seu pedido será atendido em breve!
          </Text>
        </Animated.View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFF5F0' },
  header: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    marginTop: 50, paddingHorizontal: 20, paddingBottom: 20,
    borderBottomWidth: 1, borderBottomColor: '#F2D5C4',
  },
  logo: { fontSize: 26, fontWeight: 'bold', color: '#D97A6E' },
  slogan: { fontSize: 12, color: '#B5838D', marginTop: 2 },
  botaoSobre: {
    backgroundColor: '#FFF0EC', paddingHorizontal: 16, paddingVertical: 8,
    borderRadius: 20, borderWidth: 1, borderColor: '#F2D5C4',
  },
  sobreLink: { fontSize: 13, color: '#B5838D', fontWeight: '500' },
  categoriasRow: {
    flexDirection: 'row', justifyContent: 'center', alignItems: 'center',
    paddingHorizontal: 20, paddingTop: 20, paddingBottom: 8,
  },
  categoriaItem: { alignItems: 'center', justifyContent: 'center' },
  categoriaIcone: {
    width: 52, height: 52, borderRadius: 26, backgroundColor: '#FFF0EC',
    borderWidth: 1, borderColor: '#F2D5C4', alignItems: 'center', justifyContent: 'center',
    marginBottom: 6,
  },
  categoriaIconeAtivo: { backgroundColor: '#E5989B', borderColor: '#D97A6E' },
  categoriaEmoji: { fontSize: 24 },
  categoriaLabel: { fontSize: 11, color: '#B5838D' },
  categoriaLabelAtiva: { color: '#D97A6E', fontWeight: '600' },
  tituloSecao: {
    fontSize: 20, fontWeight: '700', color: '#4A3B32',
    marginBottom: 12, marginTop: 16, paddingHorizontal: 20,
  },
  listaContent: { paddingBottom: 30 },
  card: {
    backgroundColor: '#FFFFFF', borderRadius: 20, overflow: 'hidden',
    borderWidth: 0.5, borderColor: '#F2D5C4', elevation: 3,
    shadowColor: '#D97A6E', shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08, shadowRadius: 4, marginHorizontal: 20, marginBottom: 14,
  },
  cardMain: { flexDirection: 'row', alignItems: 'center', padding: 14 },
  imagemDoce: {
    width: 76, height: 76, borderRadius: 14, backgroundColor: '#FCE4E4', marginRight: 12,
  },
  info: { flex: 1 },
  nomeFavorito: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4,
  },
  nomeDoce: { fontSize: 16, fontWeight: '700', color: '#4A3B32', flex: 1, marginRight: 8 },
  favoritoIcon: { fontSize: 17 },
  descricao: { fontSize: 12, color: '#8D6E63', marginBottom: 6, lineHeight: 17 },
  metaContainer: { flexDirection: 'row', alignItems: 'center', flexWrap: 'wrap', marginBottom: 6, gap: 6 },
  categoriaBadge: {
    fontSize: 10, fontWeight: '600', color: '#D97A6E', backgroundColor: '#FFF0EC',
    borderRadius: 12, paddingHorizontal: 8, paddingVertical: 2, overflow: 'hidden',
  },
  peso: { fontSize: 11, color: '#8D6E63' },
  destaqueBadge: {
    fontSize: 10, fontWeight: '600', color: '#D97A6E', backgroundColor: '#FFF0EC',
    borderRadius: 12, paddingHorizontal: 8, paddingVertical: 2, overflow: 'hidden',
  },
  precoBotao: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  preco: { fontSize: 17, fontWeight: '800', color: '#D97A6E' },
  botaoAdd: {
    backgroundColor: '#E5989B', width: 30, height: 30, borderRadius: 15,
    alignItems: 'center', justifyContent: 'center',
  },
  textoAdd: { color: '#FFFFFF', fontSize: 20, fontWeight: '600', lineHeight: 22 },
  expandBar: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    paddingHorizontal: 14, paddingVertical: 10, borderTopWidth: 0.5,
    borderTopColor: '#F2D5C4', backgroundColor: '#FFFAF9',
  },
  expandLabel: { fontSize: 12, color: '#B5838D', fontWeight: '500' },
  expandArrow: { fontSize: 20, color: '#B5838D', lineHeight: 22, transform: [{ rotate: '90deg' }] },
  expandArrowOpen: { transform: [{ rotate: '-90deg' }] },
  ingredientesContainer: {
    borderTopWidth: 0.5, borderTopColor: '#F2D5C4', paddingHorizontal: 14,
    paddingTop: 12, paddingBottom: 14, backgroundColor: '#FFFAF9',
  },
  ingredientesWrap: { flexDirection: 'row', flexWrap: 'wrap', marginBottom: 10 },
  ingTag: {
    backgroundColor: '#FFF0EC', borderWidth: 0.5, borderColor: '#F2D5C4',
    borderRadius: 20, paddingHorizontal: 10, paddingVertical: 4, marginRight: 6, marginBottom: 6,
  },
  ingText: { fontSize: 11, color: '#8D6E63', fontWeight: '500' },
  descricaoLonga: { fontSize: 11, color: '#8D6E63', lineHeight: 16, fontStyle: 'italic' },
  botaoSair: {
    backgroundColor: '#F0D9D0', borderRadius: 14, padding: 14, alignItems: 'center',
    marginHorizontal: 20, marginTop: 8, marginBottom: 10,
  },
  textoSair: { color: '#4A3B32', fontSize: 14, fontWeight: '600' },
  toast: {
    position: 'absolute', bottom: 90, left: 20, right: 20, backgroundColor: '#4A3B32',
    borderRadius: 16, paddingHorizontal: 18, paddingVertical: 14, flexDirection: 'row',
    alignItems: 'center', elevation: 8,
  },
  toastEmoji: { fontSize: 20, marginRight: 10 },
  toastTexto: { flex: 1, fontSize: 13, color: '#FFF0EC', lineHeight: 18, fontWeight: '500' },
});