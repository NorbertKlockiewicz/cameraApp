import React, { Component } from 'react';
import { View, Text, ScrollView } from 'react-native';
import RadioGroup from './RadioGroup';

class Settings extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
        this.settings = [["WHITE BALANCE", "auto", "cloudy", "fluorescent", "incandescent", "shadow", "sunny"], ["FLASH MODE", "auto", "off", "on", "torch"], ["CAMERA RATIO", "4:3", "16:9"], ["PICTURE SIZES", "160x120", "320x240", "640x480", "800x600", "1024x768", "1280x960", "1600x1200", "2048x1536", "2592x1944"]]
        this.generateGroups = this.generateGroups.bind(this)
    }

    generateGroups() {
        let children = []
        Object.keys(this.props.settings).forEach((key) => {
            children.push(<RadioGroup key={key} title={key} settings={this.props.settings[key]} change={this.props.change} />)
        })
        return children;
    }

    render() {
        return (
            <ScrollView>
                <View >
                    <Text style={{ color: "white", fontSize: 20 }}> Settings </Text>
                    {this.generateGroups()}
                </View>
            </ScrollView>
        );
    }
}

export default Settings;
