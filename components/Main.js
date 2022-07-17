import React, { Component } from 'react';
import { View, Text } from 'react-native';
import MyButton from './MyButton'

class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
        this.handlePress = this.handlePress.bind(this)
    }

    handlePress() {
        this.props.navigation.navigate("gallery")
    }


    render() {
        return (
            <View style={{ flex: 1 }}>
                <MyButton text="Start" size={40} onPress={this.handlePress} />
            </View>
        );
    }
}

export default Main;
