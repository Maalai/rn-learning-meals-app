import React, { useState, useEffect, useCallback } from 'react';
import { StyleSheet, View, Text, Switch, Platform }  from 'react-native';
import { useDispatch } from 'react-redux';
import {HeaderButtons, Item} from "react-navigation-header-buttons";
import CustomHeaderButton from "../components/HeaderButton";
import Colors from '../constants/Colors';
import { setFilters } from '../store/actions/meals';

const FilterSwitch = (props) => {
    const {label, filterState, onChange} = props;
    return (<View style={styles.filterContainer}>
        <Text>{label}</Text>
        <Switch value={filterState} onValueChange={onChange} trackColor={{true: Colors.primaryColor}} thumbColor={Platform.OS === 'android' ? Colors.primaryColor: ''}/>
    </View>);
}

const FiltersScreen = (props) => {

    const {navigation} = props;

    const [isGlutenFree, setIsGlutenFree] = useState(false);
    const [isLactoseFree, setIsLactoseFree] = useState(false);
    const [isVegan, setIsVegan] = useState(false);
    const [isVegetarian, setIsVegetarian] = useState(false);

    const dispatch = useDispatch();

    const saveFilter = useCallback(() => {
        const appliedFilters = {
            glutenFree: isGlutenFree,
            lactoseFree: isLactoseFree,
            vegetarian: isVegetarian,
            vegan: isVegan
        };
        dispatch(setFilters(appliedFilters));
    }, [isGlutenFree, isLactoseFree, isVegan, isVegetarian, dispatch]);

    useEffect(() => {
        navigation.setParams({save: saveFilter});
    }, [saveFilter])

    return (
        <View style={styles.screen}>
            <Text style={styles.title}>Available Filters / Restrictions</Text>
            <FilterSwitch label='Gluten-Free' filterState={isGlutenFree} onChange={newValue => setIsGlutenFree(newValue)} />
            <FilterSwitch label='Lactose-Free' filterState={isLactoseFree} onChange={newValue => setIsLactoseFree(newValue)} />
            <FilterSwitch label='Vegan' filterState={isVegan} onChange={newValue => setIsVegan(newValue)} />
            <FilterSwitch label='Vegetarian' filterState={isVegetarian} onChange={newValue => setIsVegetarian(newValue)} />
        </View>
    );
};


FiltersScreen.navigationOptions = (navData) => {
    return {
        headerTitle: 'Filter Meals',
        headerLeft: () => (<HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
            <Item title='Menu' iconName='ios-menu' onPress={() => {
                navData.navigation.toggleDrawer();
            }}/>
        </HeaderButtons>),
        headerRight: () => (<HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
            <Item title='Save' iconName='ios-save' onPress={() => {
                navData.navigation.getParam('save')();
            }}/>
        </HeaderButtons>)
    }
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        alignItems: 'center'
    },
    title: {
        fontFamily: 'open-sans-bold',
        fontSize: 22,
        margin: 20,
        textAlign: 'center'
    },
    filterContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignContent: 'center',
        width: '80%',
        marginVertical: 15
    }
});

export default FiltersScreen;
