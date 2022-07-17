import PropTypes from 'prop-types';
import React, { Component } from 'react'
import { StyleSheet, Button, View, SafeAreaView, Text, Alert, TextInput, TouchableOpacity, Dimensions } from 'react-native'
class CircleButton extends Component {

    constructor(props) {
        super(props)
    }


    render() {

        return (
            <TouchableOpacity style={{
                borderRadius: Math.round(Dimensions.get('window').width + Dimensions.get('window').height) / 2,
                width: Dimensions.get('window').width * this.props.size,
                height: Dimensions.get('window').width * this.props.size,
                backgroundColor: 'rgba(255,255,255,0.1)',
                justifyContent: 'center',
                alignItems: 'center'
            }}
                onPress={this.props.func}
            >
                <Text style={{ fontSize: 15, marginLeft: 3 }}> {this.props.icon}  </Text>
            </TouchableOpacity>
        )
    }


}

const styles = StyleSheet.create({
    main: {
        borderWidth: 1,
        borderColor: 'rgba(0,0,0,0.2)',
        alignItems: 'center',
        width: 30,
        height: 30,
        backgroundColor: '#fff',
        borderRadius: 50,
    }
});

export default CircleButton