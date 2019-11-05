import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import {createBottomTabNavigator} from 'react-navigation-tabs';

import MainScreen from './pages/projetos';
import SignInScreen from './pages/signin';

// criar a navegacao com o login - autenticacao
const AuthStack = createStackNavigator({
  Sign: {screen: SignInScreen},
});

const MainNavigator = createBottomTabNavigator(
  {
    Projetos: {
      screen: MainScreen,
    },
  },
  {
    initialRouteName: 'Projetos',
    tabBarOptions: {
      showIcon: true,
      showLabel: false,
      inactiveBackgroundColor: '#B727FF',
      activeBackgroundColor: '#9900e6',
      style: {
        width: '100%',
        height: 50,
      },
    },
  },
);

export default createAppContainer(
  createSwitchNavigator(
    {
      MainNavigator,
      AuthStack,
    },
    {
      initialRouteName: 'AuthStack',
    },
  ),
);