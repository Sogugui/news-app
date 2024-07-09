import {
  View,
  Text,
  Image,
  StyleSheet,
  Pressable,
  Animated,
  Dimensions,
} from 'react-native';
import React, {useRef, useState, useEffect} from 'react';
import {scale} from '../utils/horizontalScale';
import {Article} from '../core/entities/article.entity';
import useNews from '../hooks/useNews';
import {hoursAgo} from '../utils/helpers';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {RootStackParams} from '../navigation/Navigation';

const screenWidth = Dimensions.get('window').width;
export const HomeScreen = () => {
  const {articles} = useNews();
  const navigation = useNavigation<NavigationProp<RootStackParams>>();
  const scrollY = useRef(new Animated.Value(0)).current;
  const [headerVisible, setHeaderVisible] = useState(true);

  const onPress = (article: Article) => {
    navigation.navigate('Article', {article});
  };

  const keyExtractor = React.useCallback(
    (item: Article) => item.url.toString(),
    [],
  );

  const renderItem = ({item, index}: {item: Article; index: number}) => {
    const isFirstArticle = index === 0;
    const articleStyle = isFirstArticle
      ? styles.firstArticleContainer
      : styles.articleContainer;
    const imageStyle = isFirstArticle ? styles.firstArticleImage : styles.image;

    return (
      <View
        key={keyExtractor(item)}
        style={{
          paddingHorizontal: scale(16),
        }}>
        <View style={articleStyle}>
          {isFirstArticle && (
            <Image source={{uri: item.urlToImage}} style={imageStyle} />
          )}
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
            }}>
            <Text style={styles.time}>{hoursAgo(item.publishedAt)}</Text>
            <Pressable
              onPress={() => onPress(item)}
              style={({pressed}) => ({
                opacity: pressed ? 0.5 : 1,
              })}>
              <Text style={styles.title}>{item.title}</Text>
            </Pressable>
          </View>
          {!isFirstArticle && (
            <Image source={{uri: item.urlToImage}} style={imageStyle} />
          )}
        </View>
      </View>
    );
  };

  useEffect(() => {
    scrollY.addListener(({value}) => {
      if (value > 30 && headerVisible) {
        setHeaderVisible(false);
      } else if (value <= 30 && !headerVisible) {
        setHeaderVisible(true);
      }
    });

    return () => {
      scrollY.removeAllListeners();
    };
  }, [headerVisible]);

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        {headerVisible ? (
          <Text style={styles.header}>Front page</Text>
        ) : (
          <View style={styles.headerScrolled}>
            <Image
              source={require('../assets/icons/hamburger_menu.png')}
              style={styles.headerMenu}
            />
            <Image
              source={require('../assets/images/icon.png')}
              style={styles.headerLogo}
            />
          </View>
        )}
      </View>
      <Animated.FlatList
        data={articles}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        onScroll={Animated.event(
          [{nativeEvent: {contentOffset: {y: scrollY}}}],
          {useNativeDriver: false},
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  headerContainer: {
    backgroundColor: '#f8f8f8',
    paddingVertical: scale(10),
    shadowColor: 'black',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.9,
    shadowRadius: 3.84,
    elevation: 6,
  },
  header: {
    fontSize: scale(16),
    textAlign: 'center',
    fontFamily: 'MerriweatherBlack',
    color: '#222222',
  },
  headerScrolled: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: scale(8),
    paddingHorizontal: scale(16),
    width: screenWidth * 0.3,
  },
  headerText: {
    fontSize: scale(18),
    fontFamily: 'MerriweatherBlack',
    color: '#222222',
    marginRight: scale(10),
  },
  headerMenu: {
    width: scale(20),
    height: scale(20),
  },
  headerLogo: {
    width: scale(20),
    height: scale(35),
  },
  articleContainer: {
    flexDirection: 'row',
    gap: scale(5),
    borderBottomColor: '#dddddd',
    borderBottomWidth: 1,
  },
  firstArticleContainer: {
    borderBottomColor: '#dddddd',
    borderBottomWidth: 1,
  },
  firstArticleImage: {
    width: '100%',
    height: scale(250),
    alignSelf: 'center',
    marginTop: scale(16),
  },
  image: {
    width: scale(60),
    height: scale(60),
    marginVertical: scale(16),
  },
  time: {
    fontSize: scale(13),
    color: '#888888',
    marginTop: scale(4),
    fontFamily: 'MerriweatherBold',
  },
  title: {
    fontSize: scale(13),
    fontFamily: 'LibreFranklinMedium',
    color: '#222222',
    marginTop: scale(4),
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: scale(12),
  },
});
