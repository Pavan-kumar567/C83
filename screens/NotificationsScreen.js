import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TextInput,KeyboardAvoidingView,Modal,ScrollView,FlatList } from 'react-native';
import db from '../config';
import firebase from 'firebase';
import {ListItem, Icon} from 'react-native-elements';
import MyHeader from '../components/MyHeader';

export default class NotificationsScreen extends Component{
    static navigationOptions = {header:null}
    constructor(props){
        super(props)
        this.state = {
            userId:firebase.auth().currentUser.email,
            allNotifications:[]
        }
        this.notificationRef = null
    }

    getNotifications = ()=>{
        this.notificationRef = db.collection("all_notifications").where("notification_status", '==', "unread")
        .where("targeted_user_id",'==', this.state.userId)
        .onSnapshot((snapshot)=>{
            var allNotifications = []
            snapshot.docs.map((doc)=>{
                var notification = doc.data()
                notification["doc_id"]=doc.id
                allNotifications.push(notification)
            })
            this.setState({
                allNotifications:allNotifications
            })
        })
    }
    componentDidMount(){
        this.getNotifications()
    }
    componentWillUnmount(){
        this.notificationRef
    }
    
    keyExtractor = (item,index)=>index.toString()
    
    renderItem = ({item,i})=>{
        return(
            <ListItem
                key = {i}
                title = {item.book_name}
                subtitle = {item.message}
                leftElement = {<Icon name = "book" type = "font-awsome " color = "#696969"/>}
                titleStyle = {{color:'#000',fontWeight:'bold'}}
                bottomDivider
            />
        )
    }
    render(){
        return(
            <View style = {{flex:1}}>
                <MyHeader title = "Notifications" navigation = {this.props.navigation}/> 
                <View style = {{flex:1}}>
                    {
                        this.state.allNotifications.length === 0 
                        ? (
                            <View style = {styles.subContainer}>
                                <Text style= {{fontSize: 20}}>You Have No Notifications</Text>
                                </View>
                        ):(
                            <FlatList 
                                keyExtractor = {this.keyExtractor}
                                data = {this.state.allNotifications}
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

