import React from 'react';
import { View, Text, StyleSheet} from 'react-native';
import { useSelector } from 'react-redux';
import MealList from '../components/MealList';
import {HeaderButtons, Item} from "react-navigation-header-buttons";
import CustomHeaderButton from "../components/HeaderButton";
import DefaultText from '../components/DefaultText';

const FavoritesScreen = (props) => {

    const {navigation} = props;

    const favMeals = useSelector(state => state.meals.favoriteMeals);

    if(favMeals.length === 0 || !favMeals) {
        return <View style={styles.fallBackTextContainer}>
            <DefaultText>No Favorite meals found. Start adding some!!!</DefaultText>
        </View>
    }
    return (
        <MealList displayedMeals={favMeals} navigation={navigation}/>
    );
};

FavoritesScreen.navigationOptions = (navData) => {
    return {
        headerTitle: 'Your Favorites',
        headerLeft: () => (<HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
            <Item title='Menu' iconName='ios-menu' onPress={() => {
                navData.navigation.toggleDrawer();
            }}/>
        </HeaderButtons>)
    }
};

const styles = StyleSheet.create({
    fallBackTextContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }
});

export default FavoritesScreen;
