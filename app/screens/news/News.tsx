import React, { FC, useState, useEffect } from "react";
import { gStyles } from "../../../style";
import {
  FlatList,
  Text,
  RefreshControl,
  View,
  ActivityIndicator,
} from "react-native";
import { NewsSection } from "./NewsSection";
import { INews } from "./news.types";

export const News: FC = () => {
  const [page, setPage] = useState(0);
  const [news, setNews] = useState<INews[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (page <= 0) fetchNews(page); // API has only 20 news :(
  }, [page]);

  const fetchNews = async (skip: number): Promise<void> => {
    try {
      const response = await fetch(
        `https://api.coinstats.app/public/v1/news/trending?${skip}=0&limit=20`
      );
      const json = await response.json();
      setNews([...news, ...json.news]);
    } catch (error) {
      console.error(error);
      alert("Error: Failed to fetch");
    } finally {
      setIsLoading(false);
    }
  };
  const loadItems = () => {
    setPage((prev) => prev + 1);
  };

  return isLoading ? (
    <Text>Loading...</Text>
  ) : (
    <View style={gStyles.container}>
      <FlatList
        refreshControl={
          <RefreshControl
            refreshing={isLoading}
            onRefresh={() => fetchNews(0)}
          />
        }
        data={news}
        keyExtractor={(item) => item.id + Math.random()}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <Text style={gStyles.mainText}>The latest news</Text>
        }
        ListFooterComponent={
          <View>
            <ActivityIndicator size="large" />
          </View>
        }
        ListFooterComponentStyle={{ marginVertical: 16, alignItems: "center" }}
        onEndReached={loadItems}
        onEndReachedThreshold={0.1}
        renderItem={({ item }) => (
          <NewsSection
            id={item.id}
            title={item.title}
            imgURL={item.imgURL}
            source={item.source}
          />
        )}
      />
    </View>
  );
};
