import { LinkingOptions } from "@react-navigation/native";
import * as Linking from "expo-linking";

const linking: LinkingOptions<any> = {
  prefixes: [Linking.createURL("/"), "delice://"],
  config: {
    screens: {
      Tracking: "track/:code",
      Order: "order/:id",
      PaystackCallback: "paystack/callback",
    },
  },
};

export default linking;
