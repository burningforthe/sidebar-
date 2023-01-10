import React, { Component } from 'react';
import { Text, View,Button } from 'react-native';
import {connect} from 'react-redux';
import {increaseBookAction,decreaseBookAction} from './src/index/index';

class FirstScreen extends Component {
	render() {
		return (
			<View style={{justifyContent:'center',alignItems:'center'}}>
				<View style={{marginVertical:50}}>
				<Text> Number Of Book = {this.props.numberOfBooks} </Text>
				<Button title="Increase Book" onPress={()=>{this.props.increaseBook(5)}}/>
				</View>
				<View style={{marginVertical:50}}>
				<Button title="Decrease Book" onPress={()=>{this.props.decreaseBook(-1)}}/>
				</View>
			</View>
		)
	}
}

const mapStateToProps=(state)=>{
	return{
		numberOfBook:state.numberOfBook
	}
}

const mapDispatchToProps=(dispatch)=>{
		return{
			increaseBook:(parameter)=>{dispatch(increaseBookAction(parameter))},
			decreaseBook:()=>{dispatch(decreaseBookAction())}
		}
}

export default connect(mapStateToProps,mapDispatchToProps)(FirstScreen);
