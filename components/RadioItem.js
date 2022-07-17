import React, { Component } from 'react';
import { View, Text, Dimensions, TouchableOpacity } from 'react-native';

class RadioItem extends Component {
    constructor(props) {
        super(props);
    }

    onPress = () => {
        this.props.func(this.props.id)
    }

    render() {
        return (
            <View style={{ flexDirection: "row" }}>
                <TouchableOpacity style={{
                    borderRadius: Math.round(Dimensions.get('window').width + Dimensions.get('window').height) / 2,
                    width: Dimensions.get('window').width / 12,
                    height: Dimensions.get('window').width / 12,
                    backgroundColor: 'rgba(255,255,255,0.1)',
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderColor: "rgb(255,45,85)",
                    borderWidth: 1,
                    marginLeft: 6,
                    marginTop: 5
                }}
                    onPress={this.onPress}
                >
                    {this.props.selected ? <View style={{
                        borderRadius: Math.round(Dimensions.get('window').width + Dimensions.get('window').height) / 2,
                        width: Dimensions.get('window').width / 16,
                        height: Dimensions.get('window').width / 16,
                        backgroundColor: 'rgb(255,45,85)',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }} /> : <View></View>}

                </TouchableOpacity>
                <Text style={{ fontSize: 15, marginLeft: 10, marginTop: 7, color: "white" }}>{this.props.label}</Text>
            </View>
        );
    }
}

export default RadioItem;
