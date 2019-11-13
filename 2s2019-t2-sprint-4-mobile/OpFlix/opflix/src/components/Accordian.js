import React, { Component } from 'react';
import { View, TouchableOpacity, Text, StyleSheet, ScrollView, SafeAreaView } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";

export default class Accordian extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data: props.data,
            expanded: false,
        }
    }

    render() {

        return (
            <SafeAreaView>
                <View style={styles.tudo}>
                    <View style={styles.tudo2}>
                        <TouchableOpacity style={styles.row} onPress={() => this.toggleExpand()}>
                            <Text style={[styles.title, styles.font]}>{this.props.title}</Text>
                        </TouchableOpacity>
                        <View style={styles.parentHr} />
                        {
                            this.state.expanded &&
                            <View style={styles.child}>
                                <Text style={styles.crianca}>{this.props.data}</Text>
                            </View>
                        }
                    </View>
                </View>
            </SafeAreaView>
        )
    }

    toggleExpand = () => {
        this.setState({ expanded: !this.state.expanded })
    }

}

const styles = StyleSheet.create({
    tudo: {
        backgroundColor: '#2A3A3B',
    },
    tudo2: {
        marginBottom: 20,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#EB4A5F',
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        height: 70,
        paddingLeft: 50,
        marginTop: 10,
        alignItems: 'center',
        backgroundColor: 'white',
        borderColor: '#EB4A5F',
        borderWidth: 2,
        borderRadius: 10,
        width: '100%',
    },
    parentHr: {
        height: 0,
        color: 'black',
        width: '100%'
    },
    child: {
        backgroundColor: '#D3D3D3',
        padding: 16,
        width: '100%',
    },
    crianca: {
        fontSize: 17,
    }

});