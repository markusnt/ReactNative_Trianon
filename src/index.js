import React, { Component } from 'react'
import AppNavigator from './Routes'
import "./config/StatusBarConfig"
import { createAppContainer } from 'react-navigation'
import { Provider } from 'react-redux'
import store from './store'

const AppContainer = createAppContainer(AppNavigator)

export default class App extends Component {
    render() {
        return (
            <Provider store={store}>
                <AppContainer />
            </Provider>
        )
    }
}