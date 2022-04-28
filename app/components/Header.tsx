import React from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import {
  View,
  StyleSheet,
  GestureResponderEvent,
  TouchableOpacity,
} from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";

import { colors } from "config/styles";
import { selectFavorites } from "store/store";
import { useAppDispatch, useAppSelector } from "store/hooks";
import AppText from "./Text";
import { RootStackParamList } from "navigation/PlaylistNavigation";
import { setFavorites } from "store/playerSlice";

interface IHeader {
  onBackPress?: (event: GestureResponderEvent) => void;
  subtitle?: string;
  title: string;
}

type NavigationProp = NativeStackNavigationProp<RootStackParamList, "Playlist">;

export default function Header({ onBackPress, subtitle, title }: IHeader) {
  const favorites = useAppSelector(selectFavorites);
  const navigation = useNavigation<NavigationProp>();
  const dispatch = useAppDispatch();

  const handleGoToFavorites = () => {
    dispatch(setFavorites());
    navigation.navigate("Playlist");
  };

  return (
    <View style={styles.container}>
      {subtitle && (
        <TouchableOpacity onPress={onBackPress}>
          <View style={styles.iconWrapper}>
            <MaterialCommunityIcons
              name="chevron-left"
              size={32}
              color={colors.primary}
            />
          </View>
        </TouchableOpacity>
      )}
      <View style={styles.textWrapper}>
        <AppText style={styles.title}>{title}</AppText>
        {subtitle && <AppText style={styles.subtitle}>{subtitle}</AppText>}
      </View>
      {!subtitle && favorites.length !== 0 && (
        <TouchableOpacity onPress={handleGoToFavorites}>
          <View style={styles.favWrapper}>
            <MaterialCommunityIcons
              name="heart"
              size={16}
              color={colors.distinctYellow}
            />
            <AppText style={styles.favText}>Favorites</AppText>
          </View>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    backgroundColor: colors.activeBlack,
    borderColor: colors.selectedGrey,
    borderBottomWidth: 1,
    flexDirection: "row",
    height: 70,
    paddingLeft: 20,
    paddingRight: 10,
    width: "100%",
  },
  favText: {
    color: colors.distinctYellow,
    marginLeft: 8,
  },
  favWrapper: {
    alignItems: "center",
    backgroundColor: colors.selectedGrey,
    borderRadius: 6,
    flexDirection: "row",
    marginRight: 12,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  iconWrapper: {
    justifyContent: "center",
  },
  subtitle: {
    color: colors.distinctYellow,
    paddingLeft: 10,
  },
  textWrapper: {
    flex: 1,
    paddingHorizontal: 8,
  },
  title: {
    fontSize: 20,
    paddingLeft: 10,
  },
});
