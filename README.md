# NewsApp Documentation
## Overview
NewsApp is a React Native application developed exclusively for the Android environment. It displays a list of news articles fetched from the NewsAPI. The front page shows a list of news articles with the first article featuring a full-width image and subsequent articles displaying a square image on the right-hand side. Users can click on an article to navigate to a detailed page displaying the full description of the article.

## Tech Stack 
- React Native: For building the mobile application.
- TypeScript: For type safety.
- NewsAPI: For fetching news articles.
- NewsAPI Key from API Key from [https://newsapi.org](https://newsapi.org/) 

[Learn more about NewsAPI](https://newsapi.org/docs)

## Installation
1.Clone the repository:
```bash
git clone https://github.com/your-username/news-app.git
cd news-app
```
2.Install the dependencies:
```bash
npm install
# or
yarn install
```
3.Run the application:
```bash
npm run android
```
## Features
- Home Screen: Displays a list of news articles with different layouts for the first article and subsequent articles.
- Article Details: Navigates to a screen showing the full description of the selected article.

## Components 
### HomeScreen
The *HomeScreen* component fetches and displays the list of news articles. The first article has a full-width image, while the rest have a smaller image on the right-hand side. The fetch operation is performed through a custom hook called useNews.

**State**
- articles: An array of news articles fetched from the NewsAPI.
- isLoading: A boolean indicating if the articles are being loaded.

**Methods**
- useNews: A custom hook that fetches news articles.
- onPress: A function that navigates to the Article screen when an article is clicked.
- renderItem: A function that renders each article in the list.

## ArticleScreen
The *ArticleScreen* component displays the full description of the selected article.

**Props**
- route: Contains the article passed from the HomeScreen

## Demo






https://github.com/Sogugui/news-app/assets/101732872/4c9d31ac-2408-4d6b-94d1-863d1dfb389d

