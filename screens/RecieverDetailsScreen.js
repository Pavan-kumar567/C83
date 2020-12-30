import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TextInput,KeyboardAvoidingView,Modal,ScrollView,FlatList } from 'react-native';
import db from '../config';
import firebase from 'firebase';
import {ListItem, Icon,Header, Card} from 'react-native-elements';
import MyHeader from '../components/MyHeader';

export default class RecieverDetailsScreen extends Component{
    constructor(props){
        super(props);
        this.state = {
            userId: firebase.auth().currentUser.email,
            recieverId: this.props.navigation.getParam('details')["user_id"],
            requestId: this.props.navigation.getParam('details')["request_id"],
            bookName: this.props.navigation.getParam('details')["book_name"],
            reason_for_requesting: this.props.navigation.getParam('details')["reason_to_request"],
            recieverName: '',
            recieverContact: '',
            recieverAddress: '',
            recieverRequestDocId: ''
        }
    }
    getReciverDetails(){
        db.collection('users').where('email_id', '==', this.state.recieverId).get()
        .then(snapShot =>{
            snapShot.forEach(doc =>{
                this.setState({
                    recieverName: doc.data().first_name,
                    recieverContact: doc.data().contact,
                    recieverAddress: doc.data().address
                })
            })
        })
        db.collection('requested_books').where('request_id', '==', this.state.requestId).get()
        .then(snapShot =>{
            snapShot.forEach(doc =>{
                this.setState({
                    recieverRequestDocId: doc.id
                })
            })
        })

    }
    getUserDetails = (userId)=>{
        db.collection('users').where('email_id', '==', userId).get()
        .then(snapShot =>{
            snapShot.forEach(doc =>{
                this.setState({
                userName: doc.data().first_name + " " + doc.data().last_name
                })
            })
        })
    }
    updateBookStatus = ()=>{
        db.collection('all_donations').add({
            book_name: this.state.bookName,
            request_id: this.state.requestId,
            requested_by: this.state.recieverName,
            donor_id: this.state.userId,
            request_status: "Donor Interested"
        })
    }
    addNotification = ()=>{
        var message = this.state.userName + "Have Shown Intrest In Donating Book"
        db.collection("all_notifications").add({
            "targeted_user_id": this.state.recieverId,
            "donor_id": this.state.userId,
            "request_id": this.state.requestId,
            "book_name": this.state.bookName,
            "date": firebase.firestore.FieldValue.serverTimestamp(),
            "notification_status": "unread",
            "message": message
        })
    }
    componentDidMount(){
        this.getReciverDetails();
        this.getUserDetails(this.state.userId);
    }
    render(){
        return(
            <View style = {styles.container}>
                <View style = {{flex:0.1}}>
                <Header 
                leftComponent = {<Icon name = 'arrow-left' type='font-awesome' color ='#696969' onPress = {()=>this.props.navigation.goBack()}/>}
                centerComponent = {{text: "Donate Books",style:{color:'#90a5a9',fontSize:20,fontWeight:"bold"}}}
                backgroundColor = "#eaf8fe"
        />

                </View>
                <View style = {{flex:0.3}}>
                    <Card title = {"Book Information"} titleStyle = {{fontSize:20}}>
                        <Card >
                            <Text style = {{fontWeight:'bold'}}>Name:{this.state.bookName}</Text>
                        </Card>
                        <Card >
                            <Text style = {{fontWeight:'bold'}}>Reason:{this.state.reason_for_request}</Text>
                        </Card>
                    </Card>
                </View>
                <View style = {{flex:0.3}}>
                    <Card title = {"Reciever Information"} titleStyle = {{fontSize:20}}>
                        <Card >
                            <Text style = {{fontWeight:'bold'}}>Name:{this.state.recieverName}</Text>
                        </Card>
                        <Card >
                            <Text style = {{fontWeight:'bold'}}>Contact:{this.state.recieverContact}</Text>
                        </Card>
                        <Card >
                            <Text style = {{fontWeight:'bold'}}>Address:{this.state.recieverAddress}</Text>
                        </Card>
                    </Card>
                </View>
                <View style = {styles.buttonContainer}>
                    {
                        this.state.recieverId !== this.state.userId
                        ?(
                            <TouchableOpacity style = {styles.Button}
                                onPress = {()=>{
                                    this.updateBookStatus()
                                    this.props.navigation.navigate('MyDonations')
                                    this.addNotification()
                                }}
                            >
                                <Text>I Want To Donate</Text>
                            </TouchableOpacity>
                        ):null
                    }
                </View>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    container:{
        flex:1
    },
    buttonContainer:{
        flex:0.3,
        justifyContent: 'center',
        alignItems: 'center'
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
        },
        shadowOpacity:0.30,
        shadowRadius:10.32,
        elevation:16
    },
})