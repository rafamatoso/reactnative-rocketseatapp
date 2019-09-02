import React, {Component} from 'react';
import {View, Text, FlatList, TouchableOpacity, StyleSheet} from 'react-native';
import api from '../services/api';

export default class Main extends Component {
  // Variável que fará a personalização dos elementos do react-navigation
  static navigationOptions = {
    title: 'RocketSeatApp',
    headerStyle: {
      backgroundColor: '#512da8',
    },
    headerTintColor: '#FFF',
  };

  /* Uma variável, objeto, que armazenará tudo que pode ser modificado na aplicação.
  O React ouve toda mudança de estado (state), e sempre que isso ocorre, o método
  render() é executado */
  state = {
    productInfo: {},
    docs: [],
    page: 1,
  };

  // esse método é disparado automaticamente assim que o componente é mostrado em tela
  componentDidMount() {
    this.loadProducts();
  }

  /* o Arrow Function é usado para que a função tenha acesso a alguns elementos (como o this)
  que só um elemento natural do React teria (escopo), como no método componentDidMount().
  O Arrow Function nunca cria um novo escopo de função, e sim, herda um escopo acima dele,
  já existente */
  loadProducts = async (page = 1) => {
    /* Como uma url base já foi definida, o response se encarregará apenas do complemento da url
    no caso: "/products" */
    /* O products receberá um parâmetro que será responsável pela página atual */
    const response = await api.get(`/products?page=${page}`);
    // Desestruturação dos dados recebidos de response.data, torna o código menos verboso
    const {docs, ...productInfo} = response.data;
    // fará a modificação no estado (contará o tamanho de docs)
    this.setState({docs: [...this.state.docs, ...docs], productInfo, page});

    //console.log(docs); // Verifica se a Api está sendo consumida pela aplicação
  };

  // Função encarregada de carregar novos elementos na tela
  loadMore = () => {
    const {page, productInfo} = this.state;

    if (page === productInfo.pages) return;

    const pageNumber = page + 1;

    this.loadProducts(pageNumber);
  };

  // Usaremos a desestruturação nos parametros para receber o item
  renderItem = ({item}) => (
    <View style={styles.productContainer}>
      {/*Renderiza o texto de acordo com a chamada*/}
      <Text style={styles.productTitle}>{item.title}</Text>
      <Text style={styles.productDescription}>{item.description}</Text>
      {/*Renderiza um elemento que ao ser tocado, terá uma leve opacidade */}
      <TouchableOpacity
        style={styles.productButton}
        onPress={() => {
          this.props.navigation.navigate('Product', {product: item});
        }}>
        <Text style={styles.productButtonText}>Acessar</Text>
      </TouchableOpacity>
    </View>
  );

  render() {
    return (
      <View style={styles.container}>
        {/* FlatList é usado por trabalhar melhor com listas (incluir itens, remover e etc) */}
        <FlatList
          // Estiliza o conteúdo da FlatList, e não a FlatList em si
          contentContainerStyle={styles.list}
          // data recebe os dados do array docs
          data={this.state.docs}
          // pra cada item da lista é necessário identificar e retornar um valor único (com no map())
          keyExtractor={item => item._id}
          // função que renderizará cada item dentro da lista (será usada de forma separada, numa outra função)
          renderItem={this.renderItem}
          // Esta função será disparada quando o usuário chegar no fim da lista
          onEndReached={this.loadMore}
          // A função define qual o percentual até o fim da lista para carregar novos elementos na tela
          onEndReachedThreshold={0.1}
        />
      </View>
    );
  }
}

// variável que funcionará como interface de estilização dos elementos renderizados
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e8eaf6',
  },

  list: {
    padding: 20,
  },

  productContainer: {
    backgroundColor: '#FFF',
    borderWidth: 1,
    borderColor: '#DDD',
    borderRadius: 5,
    padding: 20,
    marginBottom: 20,
  },

  productTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },

  productDescription: {
    fontSize: 16,
    color: '#999',
    marginTop: 5,
    lineHeight: 24,
  },

  productButton: {
    height: 30,
    borderRadius: 5,
    borderWidth: 2,
    borderColor: '#512da8',
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },

  productButtonText: {
    fontSize: 16,
    color: '#512da8',
    fontWeight: 'bold',
  },
});
