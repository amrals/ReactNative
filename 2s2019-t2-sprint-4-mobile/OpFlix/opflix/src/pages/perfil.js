import React,{Component} from 'react';
import { Text, View, Image, StyleSheet, AsyncStorage, TouchableOpacity, Picker, ScrollView, SafeAreaView } from 'react-native';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import Icon from 'react-native-vector-icons/FontAwesome';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import JwtDecode from 'jwt-decode';

class Perfil extends Component {
    static navigationOptions = {
        // header: null,
        tabBarIcon: ({  }) => (
            <Text><FontAwesomeIcon icon={faUser} color={'white'}/></Text>
        )
    };

    constructor() {
        super();
        this.state = {
            nome: '',
            email: '',
        };
    }

    componentDidMount() {
        this._buscarNoStorage();
      }

    _buscarNoStorage = async() => {
       this.setState({nome: JwtDecode(await AsyncStorage.getItem('@opflix:token')).Nome});
       this.setState({email: JwtDecode(await AsyncStorage.getItem('@opflix:token')).Email});
    }

    _delogar = async() => {
        AsyncStorage.clear();
        this.props.navigation.navigate('AuthStack');
    }

  
    render() {
      return (
        <View style={styles.superView}>
            <View>
                <Text style={styles.titulo}>Perfil</Text>
            </View>
            <View style={styles.infos}>
                  <Text style={styles.textos}>{this.state.nome}</Text>
                  <Text style={styles.textos}>{this.state.email}</Text>
            </View>
            <TouchableOpacity style={styles.btn} onPress={this._delogar}>
                <Text style={styles.textobtn}>Sair da Conta</Text>
            </TouchableOpacity>
        </View>
      );
    }
  }
  
  const styles = StyleSheet.create({
      titulo:{
          fontSize: 40,
          textAlign: "center",
          fontWeight: "bold",
          marginTop: 50,
      },
      textos:{
          fontSize: 25,
          textAlign: "center",
          
      },
      infos:{
        marginTop: 100,
      },
      btn:{
        backgroundColor: '#EB4A5F',
        width: '38%',
        textAlign: "center",
        alignItems: "center",
        borderRadius: 10,
        borderStyle: "solid",
        borderWidth: 2,
        marginTop: 200,
        height: 40,
        marginLeft: '32%',
        borderColor: '#2A3A3B'
      },
      textobtn:{
          fontSize: 24,
          textAlign: "center",
          color: 'white'
      }
  });

  export default Perfil;
