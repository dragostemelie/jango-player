import React from "react";
import {
  ActivityIndicator,
  GestureResponderEvent,
  StyleSheet,
  TouchableNativeFeedback,
  View,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import AppText from "./Text";
import { colors } from "config/styles";

interface ISongCard {
  loading: boolean;
  onPress?: (event: GestureResponderEvent) => void;
}

export default function LoadMore({ loading, onPress }: ISongCard) {
  return (
    <TouchableNativeFeedback onPress={onPress}>
      <View style={[styles.container]}>
        <View style={styles.contextWrapper}>
          {loading && (
            <ActivityIndicator size="large" color={colors.distinctYellow} />
          )}
          {!loading && (
            <>
              <View style={styles.image}>
                <MaterialCommunityIcons
                  name="playlist-plus"
                  color={colors.secondary}
                  size={36}
                />
              </View>
              <View style={styles.textWrapper}>
                <AppText>Load more</AppText>
              </View>
            </>
          )}
        </View>
      </View>
    </TouchableNativeFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    borderBottomWidth: 1,
    borderColor: colors.selectedGrey,
    flexDirection: "row",
    height: 90,
    paddingHorizontal: 20,
    width: "100%",
  },
  contextWrapper: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
  },
  image: {
    alignItems: "center",
    borderRadius: 30,
    height: 60,
    justifyContent: "center",
    overflow: "hidden",
    width: 60,
  },
  textWrapper: {
    justifyContent: "center",
  },
});
