import React from 'react';
import { StyleSheet, View, Text, FlatList, TouchableOpacity }  from 'react-native';
import { HeaderButtons, Item} from 'react-navigation-header-buttons';
import CustomHeaderButton from '../components/HeaderButton';
import { CATEGORIES } from '../data/categories-mock-data';
import CategoriesGridTile from '../components/CategoriesGridTile';


const CategoriesScreen = (props) => {

    const { navigation } = props;

    const onCategorySelectHandler = (itemData) => {
        navigation.navigate({routeName: 'CategoryMeals', params: {
                categoryId: itemData.item.id
            }});
    }

    const renderCategoriesGridItem = (itemData) => {
        return (
            <CategoriesGridTile title={itemData.item.title} onSelect={onCategorySelectHandler.bind(this, itemData)}
            color={itemData.item.color}/>);
    }

    return (
        <FlatList data={CATEGORIES}
                  numColumns={2}
                  renderItem={renderCategoriesGridItem}
        keyExtractor={(item, index) => item.id}/>
    );
};

CategoriesScreen.navigationOptions = (navData) => {
    return {
    headerTitle: 'Meal Categories',
    headerLeft: () => (<HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
        <Item title='Menu' iconName='ios-menu' onPress={() => {
            navData.navigation.toggleDrawer();
        }}/>
    </HeaderButtons>)
}
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
});

export default CategoriesScreen;
