import React, { Component } from 'react';
import { StackNavigator } from 'react-navigation';

import HomeScreen from './screens/HomeScreen';
import ProfileScreen from './screens/ProfileScreen';

const App = StackNavigator({
	Home: { screen: HomeScreen },
	Profile: { screen: ProfileScreen }
});

export default App;
