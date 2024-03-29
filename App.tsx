import { useState, useEffect } from "react";
import {
  ActivityIndicator,
  FlatList,
  Platform,
  SafeAreaView,
  StatusBar,
  View,
} from "react-native";

import Appbar from "./src/components/Appbar";
import Divider from "./src/components/Divider";
import StockCard from "./src/components/StockCard";
import { Paragraph } from "./src/components/Typography";

import { UserHoldings } from "./src/types/data.types";

import Style from "./src/styles/screens/app.styles";
import Bottombar from "./src/components/Bottombar";

export default function App() {
  const [userHoldings, setUserHoldings] = useState<UserHoldings>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  const androidSafeAreaPadding = Platform.OS === "android" && {
    paddingTop: StatusBar.currentHeight,
  };

  async function fetchData() {
    setIsLoading(true);
    setError(false);
    try {
      const networkData = await fetch(
        "http://run.mocky.io/v3/bde7230e-bc91-43bc-901d-c79d008bddc8"
      );
      const jsonData = await networkData?.json();
      setUserHoldings(jsonData?.userHolding);
    } catch (err) {
      setError(true);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  if (isLoading) {
    return (
      <SafeAreaView
        style={[Style.container, Style.noData, androidSafeAreaPadding]}
      >
        <ActivityIndicator />
      </SafeAreaView>
    );
  }

  if (error) {
    return (
      <SafeAreaView
        style={[Style.container, Style.noData, androidSafeAreaPadding]}
      >
        <Paragraph>Something went wrong!</Paragraph>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={[Style.container, androidSafeAreaPadding]}>
      <Appbar />
      <View style={Style.stocksListWrapper}>
        <FlatList
          data={userHoldings}
          renderItem={({ item }) => {
            return <StockCard stock={item} />;
          }}
          keyExtractor={(item) => item?.symbol}
          showsVerticalScrollIndicator={false}
          ItemSeparatorComponent={() => <Divider />}
        />
      </View>
      <Bottombar userHoldings={userHoldings} />
    </SafeAreaView>
  );
}
