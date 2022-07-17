import React, { Component } from 'react';
import { View, Text } from 'react-native';

class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                <Text style={{ textAlign: "center", color: "white", fontSize: 40, fontWeight: "bold" }}>Camera App</Text>
                <Text style={{ textAlign: "center", color: "white", fontSize: 20 }}>show gallery pictures</Text>
                <Text style={{ textAlign: "center", color: "white", fontSize: 20 }}>take picture from camera</Text>
                <Text style={{ textAlign: "center", color: "white", fontSize: 20 }}>save photo to device</Text>
                <Text style={{ textAlign: "center", color: "white", fontSize: 20 }}>delete photo from device</Text>
                <Text style={{ textAlign: "center", color: "white", fontSize: 20 }}>share photo</Text>
            </View>
        );
    }
}

export default Header;
