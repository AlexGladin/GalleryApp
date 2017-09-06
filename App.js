import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import { Provider } from 'react-redux';
import { createStore } from 'redux';

import configureStore from './configureStore';

import ImageListContainer from './components/imagelist/ImageListContainer';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

const store = configureStore();

export default class App extends Component {

	render() {
		return (
			<Provider store={store}>
				<ImageListContainer style={styles.container}/>
			</Provider>
		);
	}
  
}
