import React, { Component } from 'react'
import { createStackNavigator, createAppContainer } from 'react-navigation'
import HomeScreen from './Home'

// Home:{
//     screen: HomeScreen
// },

const AppNavigator = createStackNavigator(
    {
        Home: HomeScreen
    },
    {
        initialRouteName: 'Home',
        defaultNavigationOptions:{
            headerStyle: {
                backgroundColor: "#2f9eda"
            },
        headerTintColor: '#FFF'
        }
})

export default createAppContainer(AppNavigator)