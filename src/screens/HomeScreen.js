import React from 'react';
import {
	ActivityIndicator,
	FlatList,
	RefreshControl,
	SafeAreaView,
	StyleSheet,
	TouchableWithoutFeedback,
	View
} from 'react-native';
import { connect } from 'react-redux';
import { fetchProducts } from '../actions';
import { ListItem, Text } from '../components';

class HomeScreen extends React.Component {

	state = {
		loading: false,
		loadingMore: false,
		sortingOptions: [
			{ title: 'Size', value: 'size' },
			{ title: 'Price', value: 'price' },
			{ title: 'Id', value: 'id' },
		],
		selectedSorting: 'size',
	};

	componentDidMount() {
		this.handleRefresh()
	}

	handleRefresh = async () => {
		this.setState({ loading: true })
		await this.props.fetchProducts(this.state.selectedSorting, true);
		this.setState({ loading: false })
	}

	sortingHeaderItems = (item) => (
		<TouchableWithoutFeedback
			key={item.title}
			onPress={() => this.changeSorting(item)}
		>
			<View style={{
				...styles.sortingHeaderView,
				backgroundColor: this.state.selectedSorting == item.value ? 'gray' : 'transparent'
			}}>
				<Text style={{
					...styles.sortingHeaderItemText,
					color: this.state.selectedSorting == item.value ? 'white' : 'black'
				}}>
					{item.title}
				</Text>
			</View>
		</TouchableWithoutFeedback>
	)

	async changeSorting(item) {
		await this.setState({ selectedSorting: item.value, loading: true, loadingMore: false });
		await this.props.fetchProducts(item.value, true)
		this.setState({ loading: false })
	}

	renderItem = ({ item }) => {
		return <ListItem item={item} />;
	};

	getMoreData = async () => {
		if (!this.props.noMoreProducts) {
			await this.setState({ loadingMore: true })
			await this.props.fetchProducts(this.state.selectedSorting)
			this.setState({ loadingMore: false })
		}
	}

	renderFooter = () => {
		if (this.props.noMoreProducts) {
			return (
				<View style={styles.footerViewStyle}>
					<Text>~ end of catalogue ~</Text>
				</View>
			)
		} else if (this.state.loadingMore) {
			return (
				<View style={styles.footerViewStyle}>
					<ActivityIndicator />
				</View>
			)
		}
		return null;
	}


	render() {
		const { sortingOptions, loading } = this.state;
		return (
			<SafeAreaView style={styles.container}>
				<View style={styles.sortingHeader}>
					{sortingOptions.map(this.sortingHeaderItems)}
				</View>
				<FlatList
					data={this.props.list}
					numColumns={2}
					renderItem={this.renderItem}
					keyExtractor={post => String(post.id)}
					initialNumToRender={40}
					maxToRenderPerBatch={40}
					onEndReachedThreshold={0.5}
					onEndReached={this.getMoreData}
					showsVerticalScrollIndicator={false}
					ListFooterComponent={this.renderFooter}
					refreshControl={
						<RefreshControl
							refreshing={loading}
							onRefresh={this._handleRefresh}
						/>
					}
				/>
			</SafeAreaView>
		);
	}
}

const mapStateToProps = state => {
	return {
		list: state.lists.productList,
		noMoreProducts: state.lists.noMoreProducts,
	};
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	sortingHeader: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		margin: 10
	},
	sortingHeaderView: {
		borderWidth: 1,
		borderColor: 'gray',
		borderRadius: 5,
		minWidth: 100,
		alignItems: 'center'
	},
	sortingHeaderItemText: {
		fontSize: 20,
	},
	footerViewStyle: {
		alignItems: 'center'
	},
})

export default connect(mapStateToProps, { fetchProducts })(HomeScreen);
