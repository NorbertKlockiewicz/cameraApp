import React, { Component } from 'react';
import { View, Text, Dimensions, TouchableOpacity } from 'react-native';
import RadioItem from './RadioItem'

class RadioGroup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selected: "",
        }
        this.generateItems = this.generateItems.bind(this)
        this.handlePress = this.handlePress.bind(this)
    }

    generateItems() {
        let children = []
        if (this.props.settings.length > 0 && this.props.settings.length != undefined) {
            this.props.settings.forEach((setting, index) => {
                if (index == this.state.selected) {
                    children.push(<RadioItem key={index} id={index} label={setting} selected={true} func={this.handlePress} />)
                }
                else {
                    children.push(<RadioItem key={index} id={index} label={setting} selected={false} func={this.handlePress} />)
                }
            })
        }
        else {
            Object.keys(this.props.settings).sort().forEach((key, index) => {
                if (index == this.state.selected) {
                    children.push(<RadioItem key={index} id={index} label={key} selected={true} func={this.handlePress} />)
                }
                else
                    children.push(<RadioItem key={index} id={index} label={key} selected={false} func={this.handlePress} />)
            })
        }
        return children;
    }

    handlePress(id) {
        this.setState({
            selected: id,
        })
        if (this.props.settings.length > 0 && this.props.settings.length != undefined) {
            this.props.settings.forEach((setting, index) => {
               if(index==id){
                    this.props.change(this.props.settings[index], this.props.title)
               }
            })
        }
        else{
            Object.keys(this.props.settings).sort().forEach((key, index) => {
                if(index==id){
                    this.props.change(this.props.settings[key], this.props.title)
               }
            })
        }

    }
      
    render() {
        return (
            <View>
                <View
                    style={{
                        marginTop: 10,
                        borderBottomColor: 'white',
                        borderBottomWidth: 1,
                    }}
                />
                <Text style={{ color: "white", fontSize: 15, textAlign: "right" }}> {this.props.title} </Text>
                {this.generateItems()}
            </View>
        );
    }
}

export default RadioGroup;
