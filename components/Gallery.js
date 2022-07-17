import React, { Component } from 'react';
import { View, Text, FlatList } from 'react-native';
import MyButton from './MyButton';
import { Dimensions } from 'react-native';
import * as Permissions from "expo-permissions";
import * as MediaLibrary from "expo-media-library";
import { ToastAndroid } from 'react-native';
import CircleButton from './CircleButton';
import FotoItem from './FotoItem';

class Gallery extends Component {
    constructor(props) {
        super(props);
        this.state = {
            viewType: "grid",
            numColumns: 3,
            photos: [],
            refresh: 1,
        };
        this.changeViewType = this.changeViewType.bind(this)
        this.openCamera = this.openCamera.bind(this)
        this.removePhotos = this.removePhotos.bind(this)
        this.width = Dimensions.get("window").width
        this.height = Dimensions.get("window").height
        this.refresh = this.refresh.bind(this)
        this.onPhotoPress = this.onPhotoPress.bind(this)
    }

    async componentDidMount() {
        let { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
        if (status !== 'granted') {
            alert('brak uprawnień do czytania image-ów z galerii')
        }
        else {
            let obj = await MediaLibrary.getAssetsAsync({
                first: 100,           // ilość pobranych assetów
                mediaType: 'photo', 
                album:"-2075821635"   // typ pobieranych danych, photo jest domyślne
            })

            let photoArr = []
            obj.assets.forEach((photo) => {
                photoArr.push({ uri: photo.uri, id: photo.id, selected: false, res: photo.height + "x" + photo.width })
            })

            this.setState({
                photos: photoArr,
            })
        }

    }

    changeViewType() {
        if (this.state.viewType == "grid") {
            this.setState({
                viewType: "list",
                numColumns: 1,
            })
        }
        else {
            this.setState({
                viewType: "grid",
                numColumns: 3,
            })
        }

    }

    openCamera() {
        this.props.navigation.navigate("camera", {
            data: "JSM", refresh: this.refresh
        })
    }

    async removePhotos() {
        let photos = []
        this.state.photos.forEach((photo) => {
            if (photo.selected) {
                photos.push(photo.id)
            }
        })
        await MediaLibrary.deleteAssetsAsync(photos);
        this.refresh()
    }

    onPhotoPress(photoId) {
        let photos = this.state.photos;
        photos.forEach((photo) => {
            if (photo.id == photoId) {
                photo.selected = !photo.selected;
            }
        })

        this.setState({
            photos: photos
        })
    }

    async refresh() {
        let { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
        if (status !== 'granted') {
            alert('brak uprawnień do czytania image-ów z galerii')
        }
        else {
            let obj = await MediaLibrary.getAssetsAsync({
                first: 100,           // ilość pobranych assetów
                mediaType: 'photo',
                album:"-2075821635"     // typ pobieranych danych, photo jest domyślne
            })

            let photoArr = []
            obj.assets.forEach((photo) => {
                photoArr.push({ uri: photo.uri, id: photo.id, selected: false,res: photo.height + "x" + photo.width })
            })

            this.setState({
                photos: photoArr,
            })
        }
    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                <View style={{ flex: 1, flexDirection: "row", backgroundColor: "purple" }}>
                    <MyButton text="GRID / LIST" size={20} onPress={this.changeViewType} />
                    <MyButton text="OPEN CAMERA" size={20} onPress={this.openCamera} />
                    <MyButton text="REMOVE SELECTED" size={20} onPress={this.removePhotos} />
                </View>
                <View style={{ flex: 10, backgroundColor: "white" }}>
                    <FlatList
                        numColumns={this.state.numColumns}
                        key={this.state.numColumns}
                        data={this.state.photos}
                        renderItem={({ item }) => <FotoItem item={item} res={item.res} refresh={this.refresh} func={this.onPhotoPress} key={item.id} selected={item.selected} id={item.id} uri={item.uri} height={this.height} width={this.width} numColumns={this.state.numColumns} navigation={this.props.navigation} />}
                    />
                </View>
            </View>
        );
    }
}

export default Gallery;
