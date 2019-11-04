import {createBottomNavigator} from 'react-navigation-tabs'

import MainScreen from './pages/main'
import Profile from './pages/profile'
import { createAppContainer } from 'react-navigation';

const MainNavigator = createBottomNavigator({
    Main: {
        screen: MainScreen,
    },
    Profile: {
        screen: Profile,
    },
});

export default createAppContainer(MainNavigator);