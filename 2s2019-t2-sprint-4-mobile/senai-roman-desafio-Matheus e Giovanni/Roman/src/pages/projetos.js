import React, { Component } from 'react';
import { Text, View, Image, StyleSheet } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';

class Main extends Component {
  // apresentar a lista de eventos

  constructor() {
    super();
    this.state = {
      projetos: [],
    };
  }

  componentDidMount() {
    this._carregarEventos();
  }

  _carregarEventos = async () => {
    await fetch('http://192.168.4.26:5000/api/projetos')
      .then(resposta => resposta.json())
      .then(data => this.setState({ projetos: data }))
      .catch(erro => console.warn(erro));
  };

  render() {
    return (
      <View>
        <View>
          <Text>oi</Text>
        </View>
        <FlatList
          data={this.state.projetos}
          keyExtractor={item => item.idProjeto}
          renderItem={({ item }) => (
            <View>
              <Text>{item.nome}</Text>
              <Text>{item.idTema}</Text>
            </View>
          )}
        />
      </View>
    );
  }
}

export default Main;