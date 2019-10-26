import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import HomeScreen from '../screens/HomeScreen';

const mainStackNavigator = createStackNavigator({
  HomeScreen: {
    screen: HomeScreen,
    navigationOptions: ({ navigation }) => ({
      title: 'Dashboard',
    }),
  },
  
},{
  //config
});

export default Nav = createAppContainer(mainStackNavigator);

