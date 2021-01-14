import React from 'react';
import {View, StyleSheet} from 'react-native';
import { useSelector } from 'react-redux';
import { CATEGORIES } from '../data/categories-mock-data';
import MealList from '../components/MealList';
import DefaultText from '../components/DefaultText';

const CategoriesMealsScreen = (props) => {

    const {navigation} = props;

    const availableMeals = useSelector(state => state.meals.filteredMeals);

    const categoryId = navigation.getParam('categoryId');

    const displayedMeals = availableMeals.filter(meal => meal.categoryIds.indexOf(categoryId) >= 0);

    if(displayedMeals.length === 0) {
        return (<View style={styles.fallbackTextContainer}>
            <DefaultText>No meals available!!!</DefaultText>
        </View>)
    }

    return (
        <MealList displayedMeals={displayedMeals} navigation={navigation} />
    );
};


CategoriesMealsScreen.navigationOptions = (navigationData) => {
    const categoryId = navigationData.navigation.getParam('categoryId');
    const selectedCategory = CATEGORIES.find(category => category.id === categoryId);
    return {
        headerTitle: selectedCategory.title,
    }
}

const styles = StyleSheet.create({
    fallbackTextContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})

export default CategoriesMealsScreen;
