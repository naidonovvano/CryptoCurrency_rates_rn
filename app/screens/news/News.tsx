import React from "react";
import {
  Text,
  View,
  FlatList,
  ActivityIndicator,
  RefreshControl,
} from "react-native";
import { useFetchNews } from "./useFetchNews";
import { gStyles } from "../../../style";
import { NewsSection } from "./NewsSection";
import { Loader } from "../../ui/Loader";

export const News = () => {
  const { isLoading, news, loadItems, onRefresh } = useFetchNews();

  return isLoading ? (
    <Loader />
  ) : (
    <View style={gStyles.container}>
      <FlatList
        refreshControl={
          <RefreshControl refreshing={isLoading} onRefresh={onRefresh} />
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
            imgUrl={item.imgUrl}
            source={item.source}
          />
        )}
      />
    </View>
  );
};
