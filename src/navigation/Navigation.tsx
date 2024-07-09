import {View, Text} from 'react-native';
import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import ArticleScreen from '../screens/details/ArticleScreen';
import {HomeScreen} from '../screens/HomeScreen';
import {Article} from '../core/entities/article.entity';

export type RootStackParams = {
  Home: undefined;
  Article: {article: Article};
};

const Stack = createStackNavigator<RootStackParams>();
export const Navigation = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Article" component={ArticleScreen} />
    </Stack.Navigator>
  );
};
