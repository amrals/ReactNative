import React,{Component} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';

import {FlatList} from 'react-native-gesture-handler';


class App extends Component {

  constructor() {
    super();
    this.state = {
      medicos: [{Nome: 'Cléber',DataNascimento: '25/12/2019', Crm: 'AAAAA'}],
    };
  }

  componentDidMount() {
    this._carregarEventos();
  }

  _carregarEventos = async () => {
    await fetch('http://192.168.4.26:5000/api/medicos')
      .then(resposta => resposta.json())
      // .then(data => this.setState({medicos: data}))
      .catch(erro => console.warn(erro));
  };

  render() {
    return (
      <View>
        <Text>Oi</Text>
        <FlatList
        data={this.state.medicos}
        keyExtractor={item => item.IdMedico}
        renderItem={({item}) => (
          <View>
            <Text>{item.Nome}</Text>
            <Text>{item.DataNascimento}</Text>
            <Text>{item.Crm}</Text>
          </View>
        )}
      />
      </View>
    );
  }
};



export default App;
