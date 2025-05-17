import { View, ViewProps, Image } from "react-native";
import { styles } from "./styles";

type Props = ViewProps;

export function Card({ ...rest }: Props) {
  return (
    <View style={styles.card} {...rest}>
      <Image
        style={{ width: 150, height: 50 }}
        source={require("@assets/images/libris.png")}
        resizeMode="contain"
      />
    </View>
  );
}
