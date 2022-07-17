import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Text, TouchableOpacity } from 'react-native';


class MyButton extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        return (
            <TouchableOpacity style={{ flex: 1, justifyContent: "center", backgroundColor: "white" }} onPress={this.props.onPress}>
                <Text style={{ fontSize: this.props.size, textAlign: "center", fontWeight: "bold" }}> {this.props.text} </Text>
            </TouchableOpacity>
        );
    }
}
MyButton.propTypes = {
    onPress: PropTypes.func.isRequired,
    text: PropTypes.string.isRequired,
    size: PropTypes.number.isRequired,
};


export default MyButton;
