import React, { Component } from 'react';
import { View, Image, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  img: {
  	flex: 1,
    alignSelf: 'stretch',
    width: undefined,
    height: undefined
  }
});

export default class ProfileScreen extends Component {
	static navigationOptions = ({ navigation }) => ({
	    title: `Profile of ${navigation.state.params.profile.name}`,
	});

	render() {
		const { profile } = this.props.navigation.state.params;
		
		return (
			<Image 
				source={{ uri: profile.image_url}} 
				style={styles.img} />
		);
	}
}