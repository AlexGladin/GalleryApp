import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { StyleSheet } from 'react-native';
import ImageListContainer from '../components/imagelist/ImageListContainer';

import configureStore from '../configureStore';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

const store = configureStore();

export default class HomeScreen extends Component {
	static navigationOptions = {
		title: 'Users list'
	};

	render() {
		const { navigate } = this.props.navigation;
		return (
			<Provider store={store}>
				<ImageListContainer 
					onClick={(name, params) => { navigate(name, params) }} 
					style={styles.container}/>
			</Provider>
		);
	}
}
