import React from 'react';
import { CATEGORIES, MEALS } from '../data/categories-mock-data';
import MealList from '../components/MealList';

const CategoriesMealsScreen = (props) => {

    const {navigation} = props;

    const categoryId = navigation.getParam('categoryId');

    const displayedMeals = MEALS.filter(meal => meal.categoryIds.indexOf(categoryId) >= 0);

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

export default CategoriesMealsScreen;
