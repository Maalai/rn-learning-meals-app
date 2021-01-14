import React from 'react';
import {Platform, Text} from "react-native";
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createAppContainer } from 'react-navigation';
import { Ionicons } from '@expo/vector-icons';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';
import { createDrawerNavigator } from 'react-navigation-drawer';
import CategoriesScreen from '../screens/CategoriesScreen';
import CategoriesMealsScreen from '../screens/CategoriesMealsScreen';
import MealDetailsScreen from '../screens/MealDetailsScreen';
import Colors from "../constants/Colors";
import FavoritesScreen from '../screens/FavoritesScreen';
import FiltersScreen from "../screens/FiltersScreen";

const defaultNavOptions = {
    headerStyle: {
        backgroundColor: Platform.OS === 'android' ? Colors.primaryColor : 'white'
    },
    headerTintColor: Platform.OS === 'android' ? 'white' : Colors.primaryColor,
    headerTitleStyle: {
        fontFamily: 'open-sans-bold'
    },
    headerBackTitleStyle: {
        fontFamily: 'open-sans'
    }
};

const MealsNavigator = createStackNavigator({
    Categories: CategoriesScreen,
    CategoryMeals: {
        screen: CategoriesMealsScreen,
    },
    MealDetails: MealDetailsScreen
}, {
    defaultNavigationOptions: defaultNavOptions
});

const FavoritesNavigator = createStackNavigator({
    Favorites: FavoritesScreen,
    MealDetails: MealDetailsScreen
}, {
    defaultNavigationOptions: defaultNavOptions
});

const tabScreenConfig = {
    Meals: {
        screen: MealsNavigator,
        navigationOptions: {
            tabBarIcon: (tabInfo) => {
                return (<Ionicons name='ios-restaurant' size={25} color={tabInfo.tintColor}/>);
            },
            tabBarColor: Colors.primaryColor,
            tabBarLabel: Platform.OS === 'android' ? <Text style={{fontFamily: 'open-sans-bold'}}>Meals</Text> : 'Meals'
        }
    },
    Favorites: {screen: FavoritesNavigator,
        navigationOptions: {
            tabBarIcon: (tabInfo) => {
                return (<Ionicons name='ios-star' size={25} color={tabInfo.tintColor}/>);
            },
            tabBarColor: Colors.accentColor,
            tabBarLabel: Platform.OS === 'android' ? <Text style={{fontFamily: 'open-sans-bold'}}>Meals</Text> : 'Favorites'
        }}
};

const MealsFavTabNavigator = Platform.OS === 'android' ? createMaterialBottomTabNavigator(
    tabScreenConfig, {
        activeTintColor: 'white',
        shifting: true,
        barStyle: {
            backgroundColor: Colors.primaryColor
        }
})
    : createBottomTabNavigator(tabScreenConfig,
    {
        tabBarOptions: {
            labelStyle: {
                fontFamily: 'open-sans'
            },
            activeTintColor: Colors.accentColor
        }
});


const FiltersNavigator = createStackNavigator({
    Filters: FiltersScreen
}, {
    defaultNavigationOptions: defaultNavOptions
})


const MainNavigator = createDrawerNavigator({
    MealsFavorites: { screen: MealsFavTabNavigator
    , navigationOptions: {
        drawerLabel: 'Meals'
        }},
    Filters: FiltersNavigator
}, {
    contentOptions: {
        activeTintColor: Colors.accentColor,
        labelStyle: {
            fontFamily: 'open-sans-bold'
        }
    }
});


export default createAppContainer(MainNavigator);

