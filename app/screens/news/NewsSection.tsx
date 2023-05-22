import React, { FC } from "react";
import { Text, View, Image } from "react-native";
import { gStyles } from "../../../style";
import { INewsProps } from "./news.types";

export const NewsSection: FC<INewsProps> = ({ title, imgURL, source }) => {
  return (
    <View style={gStyles.container}>
      <View style={gStyles.newsSection}>
        <View style={gStyles.newsImage}>
          <Image
            style={{ height: "100%", width: "100%", borderRadius: 30 }}
            source={{ uri: imgURL }}
          />
        </View>
        <View style={gStyles.newsInfo}>
          <Text style={gStyles.newsText}>{title}</Text>
          <Text style={gStyles.newsSource}>{source}</Text>
        </View>
      </View>
    </View>
  );
};
