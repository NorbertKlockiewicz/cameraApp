import React, { Component } from 'react';
import { View, Text, ImageBackground } from 'react-native';
import * as MediaLibrary from "expo-media-library";
import MyButton from './MyButton'
import * as Sharing from 'expo-sharing';


class BigPhoto extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
        this.deletePhoto = this.deletePhoto.bind(this)
        this.sharePhoto = this.sharePhoto.bind(this)
    }

    async deletePhoto() {
        let photo = []
        photo.push(this.props.route.params.id)
        await MediaLibrary.deleteAssetsAsync(photo);
        this.props.route.params.refresh()
        this.props.navigation.goBack();
    }

    async sharePhoto() {
        if (!(await Sharing.isAvailableAsync())) {

            return;
        }

        await Sharing.shareAsync(this.props.route.params.uri);
    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                <View style={{ flex: 3 }}>
                    <ImageBackground
                        resizeMode={'cover'}
                        style={{
                            width: "100%", height: "100%"
                        }}
                        source={{ uri: this.props.route.params.uri }}
                    >
                        <Text style={{ fontSize: 40, position: "absolute", bottom: 0, right: 0, color: "white", textShadowColor: "black" }}>{this.props.route.params.res}</Text>
                    </ImageBackground>

                </View>
                <View style={{ flex: 1, flexDirection: "row" }}>
                    <MyButton text="SHARE" size={20} onPress={this.sharePhoto} />
                    <MyButton text="DELETE" size={20} onPress={this.deletePhoto} />
                </View>
            </View>
        );
    }
}

export default BigPhoto;
