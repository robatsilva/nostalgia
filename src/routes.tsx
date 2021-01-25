import React from 'react';
import { Text } from 'react-native';
import { createAppContainer } from 'react-navigation';

import {createStackNavigator} from 'react-navigation-stack';

import logo from './assets/instagram.png';

import FeedComponent from './pages/feed/index';
const Routes = createAppContainer(
    createStackNavigator({
        FeedComponent
    }, {
        defaultNavigationOptions: {
            headerTitle: () => <Text>Nostalgia</Text>,
            headerStyle: {
                backgroundColor: '#f5f5f5'
            },
            headerTitleStyle: {
                fontSize: 20
            }
        },
    })
)

export default Routes;