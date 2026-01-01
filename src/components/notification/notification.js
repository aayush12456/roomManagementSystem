import { Text } from "react-native-paper";
import { View, ScrollView, Image } from "react-native";

const Notification = ({ message,hotelId }) => {
    const timeAgo = (createdAt) => {
        const now = new Date();
        const past = new Date(createdAt);
        const diffMs = now - past;
      
        const minutes = Math.floor(diffMs / (1000 * 60));
        if (minutes < 1) return "just now";
        if (minutes < 60) return `${minutes} min `;
      
        const hours = Math.floor(minutes / 60);
        if (hours < 24) return `${hours} hour${hours > 1 ? "s" : ""}`;
      
        const days = Math.floor(hours / 24);
        return `${days} day${days > 1 ? "s" : ""}`;
      };

      const irregulars = {
        one: "First",
        two: "Second",
        three: "Third",
        five: "Fifth",
        eight: "Eighth",
        nine: "Ninth",
        twelve: "Twelfth",
        ground: "Ground",
      };
      
      const convertFloorName = (title) => {
        if (!title) return "";
      
        // remove "floor" word & trim spaces
        const wordPart = title
          .replace(/floor/i, "")
          .trim()
          .toLowerCase();
      
        const ordinal =
          irregulars[wordPart] ||
          wordPart.charAt(0).toUpperCase() + wordPart.slice(1) + "th";
      
        return `${ordinal} Floor`;
      };
      
      
  return (
    <ScrollView>
      <View style={{ padding: 12 ,paddingTop:20}}>
      {message?.map((item) =>
          item.hotelId == hotelId ? (
            <View
              key={item._id}   // 👈 KEY HERE ONLY
              style={{
                flexDirection: "row",
                alignItems: "center",
                gap: 12,
                marginBottom: 14,
              }}
            >
              <Image
                source={{ uri: item.imgUrl }}
                resizeMode="cover"
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 20,
                  backgroundColor: "#eee",
                }}
              />

              <Text style={{ fontSize: 14, flex: 1 }}>
                <Text style={{ fontWeight: "bold" }}>{item.name}</Text> has{" "}
                {item.message}{" "}
                {item.roomNo ? (
                  <Text style={{ fontWeight: "bold" }}>
                    {item.message == "deleted a room"
                      ? item.roomNo
                      : `R-${item.roomNo}`}
                  </Text>
                ) : null}
                {item.floorName ? (
                  <Text style={{ fontWeight: "bold" }}>
                    {convertFloorName(item.floorName)}
                  </Text>
                ) : null}
                {item.personName ? (
                  <Text style={{ fontWeight: "bold" }}>
                    {item.personName}
                  </Text>
                ) : null}
              </Text>

              <Text style={{ fontSize: 12, color: "#888" }}>
                {timeAgo(item.createdAt)}
              </Text>
            </View>
          ) : null
        )}
      </View>
    </ScrollView>
  );
};

export default Notification;
