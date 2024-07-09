import {
  View,
  Text,
  ScrollView,
  Pressable,
  Image,
  StyleSheet,
} from 'react-native';
import React from 'react';
import {scale} from '../../utils/horizontalScale';
import {useNavigation} from '@react-navigation/native';
import {StackScreenProps} from '@react-navigation/stack';
import {RootStackParams} from '../../navigation/Navigation';
import ArrowBackIcon from '../../assets/icons/Arrow';

interface ArticleScreenProps
  extends StackScreenProps<RootStackParams, 'Article'> {}

const ArticleScreen = ({route}: ArticleScreenProps) => {
  const navigation = useNavigation();
  const {article} = route.params;

  return (
    <ScrollView contentContainerStyle={styles.scrollViewContainer}>
      <View style={styles.contentContainer}>
        <View style={styles.imageContainer}>
          <Image source={{uri: article.urlToImage}} style={styles.image} />
          <Pressable
            onPress={() => navigation.goBack()}
            style={styles.backButton}>
            <View style={{padding: scale(8)}}>
              <ArrowBackIcon width="22" height="22" fill="black" />
            </View>
          </Pressable>
        </View>
        <View style={{padding: scale(16)}}>
          <View>
            <Text style={styles.category}>{article.source.name}</Text>
            <Text style={styles.title}>{article.title}</Text>
            <Text style={styles.content}>{article.content}</Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default ArticleScreen;

const styles = StyleSheet.create({
  scrollViewContainer: {
    flexGrow: 1,
    justifyContent: 'space-between',
  },
  contentContainer: {
    flex: 1,
  },
  imageContainer: {
    position: 'relative',
  },
  image: {
    width: '100%',
    height: 250,
    resizeMode: 'cover',
  },
  backButton: {
    position: 'absolute',
    top: 0,
    left: 0,
    backgroundColor: 'white',
    padding: 7,
  },
  category: {
    fontSize: scale(12),
    color: '#202020',
    textTransform: 'uppercase',
    fontWeight: 'bold',
    marginBottom: scale(8),
  },
  title: {
    fontSize: scale(18),
    marginBottom: scale(16),
    color: '#1A1A1A',
    fontFamily: 'MerriweatherBlack',
  },
  content: {
    fontSize: scale(14),
    marginBottom: scale(16),
    color: '#3D3D3D',
    lineHeight: scale(22),
    fontFamily: 'LibreFranklinMedium',
    textAlign: 'justify',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: scale(6),
    paddingBottom: scale(30),
  },
});
