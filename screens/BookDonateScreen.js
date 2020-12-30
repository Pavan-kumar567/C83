import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TextInput,KeyboardAvoidingView,Modal,ScrollView,FlatList } from 'react-native';
import db from '../config';
import firebase from 'firebase';
import {ListItem} from 'react-native-elements';
import MyHeader from '../components/MyHeader';


export default class BookDonateScreen extends Component{
    constructor(){
        super()
        this.state = {
            requestedBooksList: []
        }
        this.requestRef = null
    }

    getRequestedBooksList = ()=>{
        this.requestRef = db.collection("requested_books")
        .onSnapshot((snapshot)=>{
            var requestedBooksList = snapshot.docs.map(document=>document.data())
            this.setState({
                requestedBooksList: requestedBooksList
            })
        })
    }
    componentDidMount(){
        this.getRequestedBooksList()
    }
    componentWillUnmount(){
        this.requestRef
    }
    
    keyExtractor = (item,index)=>index.toString()
    
    renderItem = ({item,i})=>{
        return(
            <ListItem
                key = {i}
                title = {item.book_name}
                subTitle = {item.reason_to_request}
                titleStyle = {{color:'#000',fontWeight:'bold'}}
                rightElement = {
                    <TouchableOpacity style = {styles.button}
                        onPress = {()=>{
                            this.props.navigation.navigate("RecieverDetails", {"details":item})
                        }}
                    >
                        <Text style = {{color:'#fff'}}>View</Text>
                    </TouchableOpacity>
                }
                bottomDivider
            />
        )
    }
    render(){
        return(
            <View style = {{flex:1}}>
                <MyHeader title = "Donate Books" navigation = {this.props.navigation}/> 
                <View style = {{flex:1}}>
                    {
                        this.state.requestedBooksList.length === 0 
                        ? (
                            <View style = {styles.subContainer}>
                                <Text style= {{fontSize: 20}}>List Of All Requested Books</Text>
                                </View>
                        ):(
                            <FlatList 
                                keyExtractor = {this.keyExtractor}
                                data = {this.state.requestedBooksList}
                                renderItem = {this.renderItem}
                            />
                        )
                    }
                </View>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    subContainer:{
        flex:1,
        fontSize: 20,
        justifyContent:'center',
        alignItems:'center'
    },
    button:{
        width:300,
        height:50,
        justifyContent:'center',
        alignItems:'center',
        borderRadius:25,
        backgroundColor:'#ff9800',
        shadowColor:'#000',
        shadowOffset:{
        width:0,
        height:8
        }
    }
})

