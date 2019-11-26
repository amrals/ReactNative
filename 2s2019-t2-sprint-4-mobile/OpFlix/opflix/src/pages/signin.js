import React, {Component} from 'react';

import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  AsyncStorage,
  Image,
  StyleSheet,
} from 'react-native';

class SignIn extends Component {
  static navigationOptions = {
    header: null,
  };

  // constructor
  // state
  constructor() {
    super();
    this.state = {
      email: 'erik@email.com',
      senha: '123456',
    };
  }


  componentDidMount() {
    this._verificacao()
  }

  _verificacao = async () => {
      if(await AsyncStorage.getItem('@opflix:token') != null){
          this.props.navigation.navigate('MainNavigator')
      }
  }

  // enviar para a api
  _realizarLogin = async () => {
    // console.warn(this.state.email + ' - ' + this.state.senha);
    fetch('http://192.168.4.26:5000/api/login', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: this.state.email,
        senha: this.state.senha,
      }),
    })
      .then(resposta => resposta.json())
      .then(data => this._irParaHome(data.token))
      .catch(erro => console.warn('deu ruim' + erro));
  };

  _irParaHome = async tokenRecebido => {
    if (tokenRecebido != null) {
      try {
        // salvar essa informacao no asyncstorage
        await AsyncStorage.setItem('@opflix:token', tokenRecebido);
        // redirecionar
        this.props.navigation.navigate('MainNavigator');
      } catch (error) {}
    }
  };

  render() {
    return (
      <View style={styles.superView}>
        <Image source={require('../img/logo.png')} style={styles.imagemLogo}/>
        <View>
            <TextInput
            placeholder="email"
            onChangeText={email => this.setState({email})}
            value={this.state.email}
            style={styles.textInputs}
            />
            <TextInput
            placeholder="senha"
            //   secureTextEntry={true}
            onChangeText={senha => this.setState({senha})}
            value={this.state.senha}
            style={styles.textInputs}
            />
            <TouchableOpacity onPress={this._realizarLogin} style={styles.touchableOpacity}>
                <Text style={styles.botaoLogin}>Login</Text>
            </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
    superView:{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: '#2A3A3B',
        height: '100%'
    },
    imagemLogo:{
        marginBottom: 60,
    },
    textInputs:{
        fontSize: 20,
        borderColor: '#EB4A5F',
        borderWidth: 2,
        borderRadius: 15,
        margin: 10,
        backgroundColor: 'white',
        width: 300,
        textAlign: "center",
    },
    botaoLogin:{
        fontSize: 30,
        fontWeight: 'bold',
        color: 'white',
        backgroundColor: '#EB4A5F',
        borderRadius: 15,
        textAlign: "center",
        width: 200,
        alignSelf: "center",
    },
    touchableOpacity:{
        fontWeight: 'bold',
        color: 'white',
        backgroundColor: '#EB4A5F',
        borderRadius: 15,
        textAlign: "center",
        marginTop: 60,
        width: 200,
        alignSelf: "center",
    }
});
export default SignIn;