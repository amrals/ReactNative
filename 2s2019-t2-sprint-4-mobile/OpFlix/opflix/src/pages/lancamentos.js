import React, { Component } from 'react';
import { Text, View, Image, StyleSheet, AsyncStorage, TouchableOpacity, Picker } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';

class Main extends Component {
  // apresentar a lista de eventos

  constructor() {
    super();
    this.state = {
      eventos: [],
      categoria: null,
    };
  }

  componentDidMount() {
    this._carregarEventos();
  }

  _carregarEventos = async () => {
    await fetch('http://192.168.4.26:5000/api/midias', {
      headers: {
        "Accept": "application/json",
        "Authorization": "Bearer " + await AsyncStorage.getItem("@opflix:token")
      },
    })
      .then(resposta => resposta.json())
      .then(data => this.setState({ eventos: data }))
      .catch(erro => console.warn(erro));
  };

  _filtrar = async(categoria) => {
    this.setState({ categoria: categoria })
    // pego o valor da categoria e manda para a api
    // para filtrar por categoria
    await fetch('http://192.168.4.26:5000/api/midias/FiltrarPorCategoria/' + categoria, {
      headers: {
        "Accept": "application/json",
        "Authorization": "Bearer " + await AsyncStorage.getItem("@opflix:token")
      },
    })
      .then(resposta => resposta.json())
      .then(data => this.setState({ eventos: data }))
      .catch(erro => console.warn(erro));
  }

  render() {
    return (
      <View style={styles.tudo}>
        <Text style={styles.h1}>Aqui estão os Lançamentos</Text>
        {/* <Text>{this.state.categoria}</Text> */}
        <Picker selectedValue={this.state.categoria} onValueChange={this._filtrar} style={styles.picker}>
          <Picker.Item label="Selecionar categoria" value={'0'}/>
          <Picker.Item label="Ação" value={5} />
          <Picker.Item label="Ficção Científica" value={7} />
          <Picker.Item label="Drama" value={13} />
        </Picker>
        <FlatList
          style={styles.flatList}
          data={this.state.eventos}
          keyExtractor={item => item.idMidia}
          renderItem={({ item }) => (
            <View style={styles.lista}>
              <Text style={styles.nome}>{item.nome}</Text>
              <Text style={styles.duracao}>{item.duracao}</Text>
            </View>
          )}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  tudo: {
    backgroundColor: '#2A3A3B',
    height: '100%',
  },
  h1: {
    color: "white",
    fontSize: 30,
    textAlign: "center",
    margin: 10,
    marginTop: 20,
  },
  flatList: {
    marginBottom: 10,
  },
  lista: {
    borderColor: '#EB4A5F',
    borderWidth: 2,
    borderRadius: 10,
    textAlign: "center",
    alignSelf: "center",
    width: '65%',
    margin: 10,
    backgroundColor: 'white',
    marginTop: 30,
  },
  nome: {
    fontSize: 25,
    textAlign: "center",
    margin: 10,
  },
  duracao: {
    fontSize: 20,
    textAlign: "center",
    margin: 5,
  },
  touchableOpacity: {
    fontWeight: 'bold',
    color: 'white',
    backgroundColor: '#EB4A5F',
    borderRadius: 15,
    textAlign: "center",
    marginTop: 10,
    width: 200,
    alignSelf: "center",
    marginBottom: 10,
  },
  botaoLogin: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    backgroundColor: '#EB4A5F',
    borderRadius: 15,
    textAlign: "center",
    width: 200,
    alignSelf: "center",
    marginBottom: 10,
  },
  picker:{
    color: 'white',
  }
});

export default Main;