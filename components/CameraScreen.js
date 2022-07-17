import React, { Component } from 'react';
import { View, Animated, Text, BackHandler, ToastAndroid, StyleSheet, Dimensions } from 'react-native';
import * as Permissions from "expo-permissions";
import { Camera } from 'expo-camera';
import CircleButton from './CircleButton'
import * as MediaLibrary from "expo-media-library";
import Settings from './Settings';


class CameraScreen extends Component {
    constructor(props) {
        super(props);
        super(props);
        this.state = {
            hasCameraPermission: null,         // przydzielone uprawnienia do używania kamery
            type: Camera.Constants.Type.back,
            pos: new Animated.Value((Dimensions.get("window").width * 2) + 50),
            whiteBalance: "",
            flashMode: "",
            cameraRatio: '16:9',
            pictureSize: "",
            settings: {
                ratios: ['16:9', '4:3'],
                whiteBalance: [],
                flashMode: [],
                pictureSizes: [],
            }
        };

        this.takePhoto = this.takePhoto.bind(this)
        this.changeCamera = this.changeCamera.bind(this)
        this.handleBackPress = this.handleBackPress.bind(this)
        this.toggle = this.toggle.bind(this)
        this.isHidden = true
    }

    handleBackPress(ev) {

        // this.props.navigation.navigate("gallery")
    }

    async componentDidMount() {
        let { status } = await Permissions.askAsync(Permissions.CAMERA);
        this.setState({ hasCameraPermission: status == 'granted' });

        BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);
    }


    componentWillUnmount() {
        this.props.route.params.refresh()
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackPress);
    }

    async takePhoto() {
        if (this.camera) {
            let foto = await this.camera.takePictureAsync();
            let asset = await MediaLibrary.createAssetAsync(foto.uri); // domyslnie zapisuje w folderze DCIM
            ToastAndroid.showWithGravity(
                "Zdjęcie zrobione",
                ToastAndroid.SHORT,
                ToastAndroid.CENTER
            );
        }

    }

    getSizes = async () => {
        if (this.camera) {
            const sizes = await this.camera.getAvailablePictureSizesAsync(this.state.cameraRatio)
            return sizes;
        }
    };

    cameraLoaded = async () => {
        const sizes = await this.getSizes()
        let settings = {
            ratios: ['16:9', '4:3'],
            whiteBalance: Camera.Constants.WhiteBalance,
            flashMode: Camera.Constants.FlashMode,
            pictureSizes: sizes,
        }
        this.setState({
            settings: settings,
            whiteBalance: this.state.settings.whiteBalance["auto"],
            flashMode: this.state.settings.flashMode["auto"],
            cameraRatio: this.state.settings.ratios[0],
            pictureSize: this.state.settings.pictureSizes[0],
        })
    }

    changeCamera() {
        this.setState({
            type: this.state.type === Camera.Constants.Type.back
                ? Camera.Constants.Type.front
                : Camera.Constants.Type.back,
        });
    }

    toggle() {
        let toPos;
        if (this.isHidden) toPos = 0; else toPos = Dimensions.get("window").width * 2 + 50

        //animacja

        Animated.spring(
            this.state.pos,
            {
                toValue: toPos,
                velocity: 0.1,
                tension: 0,
                friction: 10,
                useNativeDriver: true,
            }
        ).start();

        this.isHidden = !this.isHidden;
    }

    
    changeSetting = async (settingName, groupName) => {
        switch (groupName) {
            case "ratios":
                const sizes = await this.getSizes()
                let settings = {
                    ratios: ['16:9', '4:3'],
                    whiteBalance: Camera.Constants.WhiteBalance,
                    flashMode: Camera.Constants.FlashMode,
                    pictureSizes: sizes,
                }
                this.setState({
                    cameraRatio: settingName,
                    settings:settings
                },()=>{
                    console.log(this.state.cameraRatio)
                })
                break;
            case "flashMode":
                this.setState({
                    flashMode: settingName
                },()=>{
                    console.log(this.state.flashMode)
                })
                break;
            case "whiteBalance":
                this.setState({
                    whiteBalance: settingName
                },()=>{
                    console.log(this.state.whiteBalance)
                })
                break;
            case "pictureSizes":
                this.setState({
                    pictureSize: settingName
                },()=>{
                    console.log(this.state.pictureSize)
                })
                break;
        }
    }


    render() {
        const { hasCameraPermission } = this.state; // podstawienie zmiennej ze state
        if (hasCameraPermission == null) {
            return <View />;
        } else if (hasCameraPermission == false) {
            return <Text>brak dostępu do kamery</Text>;
        } else {
            return (
                <View style={{ flex: 1, flexDirection: "column-reverse" }}>
                    <Camera
                        ref={ref => {
                            this.camera = ref; // Uwaga: referencja do kamery używana później
                        }}
                        onCameraReady={()=>this.cameraLoaded()}
                        ratio={this.state.cameraRatio}
                        flashMode={this.state.flashMode}
                        whiteBalance={this.state.whiteBalance}
                        pictureSize={this.state.pictureSize}
                        style={{ flex: 1 }}
                        type={this.state.type}>
                        <Animated.View
                            style={[
                                styles.animatedView,
                                {
                                    transform: [
                                        { translateY: this.state.pos }
                                    ]
                                }]} >
                            <Settings settings={this.state.settings} change={this.changeSetting}/>

                        </Animated.View>
                        <View style={{ flex: 6 }}></View>
                        <View style={{ flex: 1, flexDirection: "row", alignItems: "center" }}>
                            <View style={{ flex: 2 }}></View>
                            <CircleButton size={0.1} icon="🔄" func={this.changeCamera} style={{ flex: 2 }} />
                            <View style={{ flex: 1 }}></View>

                            <CircleButton size={0.15} icon="📷" func={this.takePhoto} style={{ flex: 2 }} />
                            <View style={{ flex: 1 }}></View>

                            <CircleButton size={0.1} icon="⚙️" func={this.toggle} style={{ flex: 2 }} />
                            <View style={{ flex: 2 }}></View>

                        </View>
                    </Camera>
                </View>
            );
        }
    }
}

var styles = StyleSheet.create({

    animatedView: {
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: "rgba(52, 52, 52, 0.8)",
        height: Dimensions.get("window").height - 80,
        width: Dimensions.get("window").width / 2
    }
});

export default CameraScreen;
