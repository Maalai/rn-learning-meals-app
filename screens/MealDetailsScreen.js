import React, {useCallback, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import { StyleSheet, View, Text, ScrollView, Image }  from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import CustomHeaderButton from '../components/HeaderButton';
import DefaultText from "../components/DefaultText";
import {toggleFavorite} from '../store/actions/meals';

const ListItem = props => {
    return (
        <View style={styles.listItem}>
            <DefaultText>{props.children}</DefaultText>
        </View>
    )
}

const MealDetailsScreen = (props) => {

    const { navigation } = props;

    const mealId = navigation.getParam('mealId');
    const currentMealIsFavorite = useSelector(state => state.meals.favoriteMeals.some(meal => meal.id === mealId));

    const availableMeals = useSelector(state => state.meals.meals);

    const selectedMeal = availableMeals.find(meal => meal.id === mealId);

    const dispatch = useDispatch();

    const toggleFavHandler = useCallback(() => {
        dispatch(toggleFavorite(mealId));
    },[dispatch, mealId]);


     useEffect(() => {
        navigation.setParams({toggleFav: toggleFavHandler});
    }, [toggleFavHandler]);

     useEffect(() => {
         navigation.setParams({isFav: currentMealIsFavorite});
     }, [currentMealIsFavorite]);


    return (
        <ScrollView>
            <Image source={{uri: selectedMeal.imageUrl}} style={styles.image}/>
            <View style={styles.details}>
                <DefaultText>{selectedMeal.duration}m</DefaultText>
                <DefaultText>{selectedMeal.complexity.toUpperCase()}</DefaultText>
                <DefaultText>{selectedMeal.affordability.toUpperCase()}</DefaultText>
            </View>
            <Text style={styles.title}>Ingredients</Text>
            {selectedMeal.ingredients.map(ingredient => <ListItem key={ingredient}>{ingredient}</ListItem>)}
            <Text style={styles.title}>Steps</Text>
            {selectedMeal.steps.map(step => <ListItem key={step}>{step}</ListItem>)}
        </ScrollView>
    );
};

MealDetailsScreen.navigationOptions = (navigationData) => {
    const selectedMealTitle = navigationData.navigation.getParam('mealTitle');
    const toggleFav = navigationData.navigation.getParam('toggleFav');
    const isFav = navigationData.navigation.getParam('isFav');
    return {
        headerTitle: selectedMealTitle,
        headerRight: () =>  (<HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
                <Item title='Favorite' iconName={isFav ? 'ios-star' : 'ios-star-outline'} onPress={toggleFav} />
            </HeaderButtons>)
    };
}


const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    image: {
        width: '100%',
        height: 200
    },
    details: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        margin: 15
    },
    title: {
        fontFamily: 'open-sans-bold',
        textAlign: 'center'
    },
    listItem: {
        marginVertical: 10,
        marginHorizontal: 20,
        borderColor: '#ccc',
        borderWidth: 1,
        padding: 10
    }
});

export default MealDetailsScreen;
