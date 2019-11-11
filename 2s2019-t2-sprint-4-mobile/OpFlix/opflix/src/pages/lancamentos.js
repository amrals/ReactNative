import React, {Component} from 'react';
import {Text, View, Image, StyleSheet, AsyncStorage} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';

class Main extends Component {
  // apresentar a lista de eventos

  constructor() {
    super();
    this.state = {
      eventos: [],
    };
  }

  componentDidMount() {
    this._carregarEventos();
  }

  _carregarEventos = async () => {
    await fetch('http://192.168.4.26:5000/api/midias', {
        headers:{
            "Accept": "application/json",
            "Authorization": "Bearer " + await AsyncStorage.getItem("@opflix:token")
        },
    })
      .then(resposta => resposta.json())
      .then(data => this.setState({eventos: data}))
      .catch(erro => console.warn(erro));
  };

  render() {
    return (
        <View style={styles.tudo}>
            <Text style={styles.h1}>Aqui estão os Lançamentos</Text>
            <FlatList
              style={styles.flatList}
              data={this.state.eventos}
              keyExtractor={item => item.idMidia}
              renderItem={({item}) => (
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
    tudo:{
        backgroundColor: '#2A3A3B',
    },
    h1:{
        color: "white",
        fontSize: 30,
        textAlign: "center",
        margin: 10,
        marginTop: 20,
    },
    flatList:{
        marginBottom: 70,
    },
    lista:{
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
    nome:{
        fontSize: 25,
        textAlign: "center",
        margin: 10,
    },
    duracao:{
        fontSize: 20,
        textAlign: "center",
        margin: 5,
    }
});

export default Main;