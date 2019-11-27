import React, { Component } from 'react';
import { Text, View, Image, StyleSheet, AsyncStorage, TouchableOpacity, Picker, ScrollView, SafeAreaView, ActivityIndicator } from 'react-native';
import {StatusBar} from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import Accordian from '../components/Accordian';

// import Icon from 'react-native-vector-icons/FontAwesome';

import Icon from 'react-native-vector-icons/FontAwesome5';

import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faVideo } from '@fortawesome/free-solid-svg-icons';

class Main extends Component {
  // apresentar a lista de eventos

  static navigationOptions = {
    // header: null,
    tabBarIcon: ({ }) => (
      <Text><FontAwesomeIcon icon={faVideo} color={'white'} width={20}/></Text>
    )
  };

  constructor() {
    super();
    this.state = {
      eventos: [],
      categoriaEscolhida: null,
      menu: [],
      loading: true,
      categorias: [],
    };
  }

  componentDidMount() {
    this._carregarCategorias();
    this._carregarEventos();
  }

  _carregarCategorias = async () => {
    await fetch('http://192.168.4.26:5000/api/categorias', {
        headers: {
            "Accept": "application/json",
            "Authorization": "Bearer " + await AsyncStorage.getItem("@opflix:token")
        }
    })
        .then(resposta => resposta.json())
        .then(data => this.setState({ categorias: data }))
        .catch(erro => console.warn(erro));
};

  _carregarEventos = async () => {
    await fetch('http://192.168.4.26:5000/api/midias', {
      headers: {
        "Accept": "application/json",
        "Authorization": "Bearer " + await AsyncStorage.getItem("@opflix:token")
      },
    })
      .then(resposta => resposta.json())
      .then(data => this.setState({ loading: false , eventos: data }))
      .catch(erro => console.warn(erro));
  };

  _filtrar = async (itemValue) => {
    // pego o valor da categoria e manda para a api
    // para filtrar por categoria
    await fetch('http://192.168.4.26:5000/api/midias/FiltrarPorCategoria/' + itemValue, {
      headers: {
        "Accept": "application/json",
        "Authorization": "Bearer " + await AsyncStorage.getItem("@opflix:token")
      },
    })
      .then(resposta => resposta.json())
      .then(data => this.setState({ loading: false , eventos: data }))
      .catch(erro => console.warn(erro));
  }

  renderAccordians = () => {
    const items = [];
    for (item of this.state.eventos) {
      items.push(
        <Accordian
          title={item.nome}
          data={item.sinopse}
          data2={item.duracao}
          data3={item.dataLancamento}
        />
      );
    }
    return items;
  }

  render() {
    return (
      <View style={styles.tudo}>
        <StatusBar
          barStyle = "light-content"
          // dark-content, light-content and default
          hidden = {false}
          //To hide statusBar
          backgroundColor = "#2A3A3B"
          //Background color of statusBar only works for Android
          translucent = {false}
          //allowing light, but not detailed shapes
          networkActivityIndicatorVisible = {true}
        />
        <Text style={styles.h1}>Aqui estão os Lançamentos</Text>
        {/* <Text>{this.state.categoria}</Text> */}
        <View style={{borderRadius: 10, width: '55%', backgroundColor: '#EB4A5F', alignSelf: "center", marginBottom: 10}}>
          <Picker style={{color: 'white'}}
              selectedValue={this.state.categoriaEscolhida} 
              onValueChange={(itemValue, itemIndex) => { 
                  this.setState({ categoriaEscolhida: itemValue })
                  this._filtrar(itemValue)}}>
              <Picker.item label="Filtrar" value="" selectedValue style={styles.filtrar}/>
              {this.state.categorias.map(e => {
                  return (<Picker.item label={e.nome} value={e.idCategoria}/>
                  )
              })}
          </Picker>
        </View>
        {this.state.loading ? <ActivityIndicator style={styles.container} size="large" color="#EB4A5F"/> :
        <View style={styles.container}>
          <SafeAreaView>
            <ScrollView>
              {this.renderAccordians()}
            </ScrollView>
          </SafeAreaView>
        </View>
        }
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
    marginBottom: 20,
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
  picker: {
    color: 'white',
    backgroundColor: '#EB4A5F',
    width: '90%',
    borderRadius: 10,
    alignSelf: "center",
  },
  container: {
    backgroundColor: '#2A3A3B',
    height: '78%',
  },
  
});

export default Main;