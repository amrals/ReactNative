import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import {createBottomTabNavigator} from 'react-navigation-tabs';

import MainScreen from './pages/lancamentos';
import SignInScreen from './pages/signin';
import ProfileScreen from './pages/perfil';
import Verificacao from './pages/verificacao';

import Icon from 'react-native-vector-icons/FontAwesome';


// criar a navegacao com o login - autenticacao
const AuthStack = createStackNavigator({
  Sign: {screen: SignInScreen},
});

const VerificacaoStack = createStackNavigator({
  Verificacao: {screen: Verificacao},
});

const MainNavigator = createBottomTabNavigator(
  {
    Main: {
      screen: MainScreen,
    },
    Profile: {
      screen: ProfileScreen,
    },
  },
  {
    initialRouteName: 'Main',
    tabBarOptions: {
      showIcon: true,
      showLabel: false,
      inactiveBackgroundColor: '#2A3A3B',
      activeBackgroundColor: '#EB4A5F',
      style: {
        height: 50,
        color: 'white',
      },
    },
  },
);

export default createAppContainer(
  createSwitchNavigator(
    {
      MainNavigator,
      AuthStack,
      VerificacaoStack
    },
    {
      initialRouteName: 'VerificacaoStack',
    },
  ),
);