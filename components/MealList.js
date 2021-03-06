import React from 'react';
import {useSelector} from 'react-redux';
import {StyleSheet, View, Text, TouchableOpacity, TouchableNativeFeedback, Platform, FlatList} from 'react-native';
import MealItem from "./MealItem";

const MealList = (props) => {

    const { displayedMeals, navigation } = props;
    const favoriteMeals = useSelector(state => state.meals.favoriteMeals);


    const renderMealItem = (itemData) => {
        const isFavorite = favoriteMeals.some(meal => meal.id === itemData.item.id);
        return (
            <MealItem title={itemData.item.title}
                      duration={itemData.item.duration}
                      complexity={itemData.item.complexity}
                      affordability={itemData.item.affordability}
                      image={itemData.item.imageUrl}
                      onSelectMeal={() => {
                          navigation.navigate({routeName: 'MealDetails', params: {
                                  mealId: itemData.item.id,
                                  mealTitle: itemData.item.title,
                                  isFav: isFavorite
                              }})
                      }}
            />
        )
    };

    return(
        <View style={styles.screen}>
            <FlatList data={displayedMeals} keyExtranctor={(item, index) => item.id} renderItem={renderMealItem} style={{width: '100%'}}/>
        </View>
    );

};


const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        margin: 20
    }
});

export default MealList;