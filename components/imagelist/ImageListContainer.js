import React, { Component } from 'react';
import { 
	StyleSheet, 
	Text, 
	ListView, 
	View, 
	Image, 
	ToastAndroid,
	Alert,
	ActivityIndicator,
	TouchableHighlight } from 'react-native';
import { connect } from 'react-redux';

import { fetchData } from '../../actions';

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	loaderContainer: {
		flex: 1,
        flexDirection: 'row',
        justifyContent: 'center'
	},
	activityIndicator: {
		flex: 1,
		justifyContent: 'center'
	},
	header: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		backgroundColor: '#0288D1',
		alignItems: 'center'
	},
	navigateBtn: {
		color: 'white',
		fontWeight: 'bold',
		margin: 5
	},
	headerTitle: {
		fontSize: 22,
		fontWeight: 'bold',
		textAlign: 'center',
		color: 'white'
	},
	userContainer: {
		margin: 5,
		borderWidth: 1,
		borderColor: '#BDBDBD',
		alignItems: 'center',
	},
	photo: {
		alignSelf: 'center',
		width: 120,
		height: 120,
	    borderRadius: 60,
	    margin: 3
	},
});

class ImageListContainer extends Component {
	constructor(props) {
		super();

		list = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
		this.state = {
			dataSource: list.cloneWithRows([]),
			onClick: props.onClick
		};
	}

    loadPrevPage = () => {
    	if (this.props.store.appData.currentPage > 2)
    		this.props.loadItems(--this.props.store.appData.currentPage);
    	else
    		ToastAndroid.show('Previous page unavailable', ToastAndroid.LONG);
    }

    loadNextPage = () => {
    	if (this.props.store.appData.currentPage < this.props.store.appData.totalPages)
    		this.props.loadItems(this.props.store.appData.currentPage++);
    	else
    		ToastAndroid.show('Next page unavailable', ToastAndroid.LONG);
    }

	componentWillMount() {
		this.loadNextPage();
	}

	render() {
		if (this.props.store.appData.error) {
			Alert.alert('Error', 'Network request failed');
			return <Text 
					style={{textAlign: 'center', fontSize: 22}}>
					Error
					</Text>
		} else {
			if (this.props.store.appData.isFetching || !this.props.store.appData.dataFetched) 
				return this.renderLoadingView();

			return this.renderListView();
		}
	}

	renderLoadingView() {
		return (
			<View style={styles.loaderContainer}>
				<ActivityIndicator 
					animating={!this.state.loaded}
					style={styles.activityIndicator}
					size="large"
				/>		
			</View>
		);
	}

	renderListView() {
		console.log('renderListView');
		this.state.dataSource=this.state.dataSource.cloneWithRows(this.props.store.appData.data);

		return(
			<View style={styles.container}>
				<View style={styles.header}>
					<TouchableHighlight onPress={this.loadPrevPage}>
						<Text style={styles.navigateBtn}>Prev</Text>
					</TouchableHighlight>
					<Text style={styles.headerTitle}>Page: {this.props.store.appData.currentPage-1}</Text>
					<TouchableHighlight onPress={this.loadNextPage}>
						<Text style={styles.navigateBtn}>Next</Text>
					</TouchableHighlight>
				</View>

				<ListView 
					dataSource={this.state.dataSource}
					renderRow={this.renderRow}
					onEndReachedThreshold={10}
					onEndReached={this.loadNextPage}
				/>
			</View>
		);
	}

	renderRow = (props) => (
		<TouchableHighlight 
			style={styles.userContainer}
			onPress={() => this.onRowSelected(props)}
			underlayColor='lightgray'>
			<View style={{alignItems: 'center'}}>
				<Image 
					source={{ uri: props.image_url}}
					style={styles.photo}
				/>
				<Text>{props.name}</Text>
			</View>
		</TouchableHighlight>
	);

	onRowSelected = (props) => {
		this.state.onClick('Profile', { profile: props });
	}

}

export default connect(
	(state) => ({
		store: state
	}),
	(dispatch) => ({
		loadItems: (currentPage) => {
			dispatch(fetchData(currentPage));
		}
	})
)(ImageListContainer);
