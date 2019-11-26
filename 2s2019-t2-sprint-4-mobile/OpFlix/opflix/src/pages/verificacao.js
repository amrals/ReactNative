import React,{Component} from 'react';
import { Text, View, Image, StyleSheet, AsyncStorage, TouchableOpacity, Picker, ScrollView, SafeAreaView } from 'react-native';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import Icon from 'react-native-vector-icons/FontAwesome';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import JwtDecode from 'jwt-decode';

class Verificacao extends Component {
    static navigationOptions = {
        header: null
    };

    constructor() {
        super();
        this.state = {
        };
    }

    

    componentDidMount() {
        this._verificacao()
        console.disableYellowBox = true;
    }

    _verificacao = async () => {
        if(await AsyncStorage.getItem('@opflix:token') != null){
            this.props.navigation.navigate('MainNavigator')
        }else{
            this.props.navigation.navigate('AuthStack')
        }
    }
  
    render() {
      return (
        <View style={styles.superView}>
            <View>
                <Image source={require('../img/logo.png')} style={styles.imagemLogo}/>
            </View>
        </View>
      );
    }
  }
  
  const styles = StyleSheet.create({
    superView:{
        backgroundColor:'#2A3A3B',
        height: '100%',
    },
    imagemLogo:{
        alignSelf: "center",
        alignItems: "center",
        marginTop: 270,
    },
  });

  export default Verificacao;
