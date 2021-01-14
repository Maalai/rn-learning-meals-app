import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, TouchableNativeFeedback, Platform }  from 'react-native';

const CategoriesGridTile = (props) => {

    const { title, onSelect, color } = props;

    let TouchableComponent = TouchableOpacity;

    if(Platform.OS === 'android' && Platform.Version > 21) {
        TouchableComponent = TouchableNativeFeedback;
    }

    return (
        <View style={styles.categoryGridItem}>
            <TouchableComponent style={{flex: 1}} onPress={onSelect}>
        <View style={{...styles.categoryContainer, ...{backgroundColor: color}}}>
            <Text style={styles.categoryText} numberOfLines={2}>{title}</Text>
        </View>
    </TouchableComponent>
        </View>);

};

const styles = StyleSheet.create({
    categoryGridItem: {
        flex: 1,
        margin: 15,
        height: 100,
        borderRadius: 10,
        overflow: Platform.OS === 'android' && Platform.Version >= 21 ? 'hidden' : 'visible',
        elevation: 5
    },
    categoryContainer: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
        padding: 10,
        borderRadius: 10,
        shadowColor: 'black',
        shadowOpacity: 0.26,
        shadowOffset: {width: 0, height: 2},
        shadowRadius: 10
    },

    categoryText: {
        fontFamily: 'open-sans-bold',
        fontSize: 18,
    }
});

export default CategoriesGridTile;