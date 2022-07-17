import React, { Component } from 'react';
import { View, Text, ImageBackground, TouchableOpacity } from 'react-native';

class FotoItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
        this.onLongPress = this.onLongPress.bind(this)
        this.handlePress = this.handlePress.bind(this)
    }

    onLongPress() {
        console.log("TEST")
        console.log(this.props.item.res)
        this.props.navigation.navigate("bigPhoto", {
            uri: this.props.uri,
            id: this.props.id,
            refresh: this.props.refresh,
            res: this.props.res
        })
    }

    handlePress() {
        this.props.func(this.props.id)
    }

    render() {
        return (
            <TouchableOpacity
                onLongPress={this.onLongPress}
                onPress={this.handlePress}>
                <ImageBackground
                    style={this.props.selected ? {
                        width: this.props.width / this.props.numColumns,
                        height: this.props.height / 6,
                        zIndex: 5,
                        opacity: 50,
                        opacity: 0.5,
                        justifyContent: 'center',
                        alignItems: 'center',
                    } : {
                            width: this.props.width / this.props.numColumns,
                            height: this.props.height / 6,
                            zIndex: 5,
                            opacity: 50,
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}
                    source={{ uri: this.props.uri }}
                >
                    {this.props.selected ? <Text style={{ fontSize: 100, color: "rgb(255,45,85)" }}>+</Text> : <View></View>}
                    <Text style={{ fontSize: 15, position: "absolute", bottom: 0, right: 0 }}>{this.props.id}</Text>
                </ImageBackground>
            </TouchableOpacity >
        );
    }
}

export default FotoItem;
