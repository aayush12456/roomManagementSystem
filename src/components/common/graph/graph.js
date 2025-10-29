import React from "react";
import { View, Text } from "react-native";
import { PieChart } from "react-native-gifted-charts";

const Graph = ({ occupied, available,finalTotalRoom, totalRoom,occupiedPercentage,availablePercentage }) => {
  console.log('availa',available)
  const chartData = [
    ...(occupied > 0 ? [{ value: occupied, color: "#FF6B6B" }] : []),
    ...(available > 0 ? [{ value: available, color: "#4ECDC4" }] : []),
  ];
  const safeChartData = chartData.length > 0 ? chartData : [{ value: 1, color: "#4ECDC4" }];

  // Center coordinates
  const center = { x: 100, y: 100 };
  const radius = 80;

  // Total for angle calculation
  const total = occupied + available;

  // Angles
  const occupiedAngle = (occupied / total) * 360;
  const availableAngle = (available / total) * 360;

  const occupiedMid = occupiedAngle / 2;
  const availableMid = occupiedAngle + availableAngle / 2;

  const toRad = (deg) => (deg * Math.PI) / 180;

  const occupiedX = center.x + radius * Math.cos(toRad(occupiedMid - 90));
  const occupiedY = center.y + radius * Math.sin(toRad(occupiedMid - 90));

  const availableX = center.x + radius * Math.cos(toRad(availableMid - 90));
  const availableY = center.y + radius * Math.sin(toRad(availableMid - 90));

  return (
    <View style={{ alignItems: "center", marginTop: 20 }}>
      <View style={{ width: 200, height: 200 }}>
        {/* Donut Chart with non-zero values only */}
        <PieChart
          data={safeChartData}
          donut
          radius={100}
          innerRadius={60}
          showText={false}
          focusOnPress={false}
        />

        {/* 🔴 Occupied number inside arc if > 0 */}
        {occupied > 0 && (
          <View
            style={{
              position: "absolute",
              top: occupiedY - 10,
              left: occupiedX - 20,
              alignItems: "center",
            }}
          >
            <Text style={{ color: "white", fontWeight: "bold", fontSize: 12 }}>
              {occupiedPercentage}%
            </Text>
          </View>
        )}

        {/* 🟢 Available number inside arc if > 0 */}
        {available > 0 && available < finalTotalRoom && (
          <View
            style={{
              position: "absolute",
              top: availableY - 4,
              left: availableX - 10,
              alignItems: "center",
            }}
          >
            <Text style={{ color: "white", fontWeight: "bold", fontSize: 12 }}>
              {availablePercentage}%
            </Text>
          </View>
        )}

        {/* ⚪ TotalRoom at center */}
        <View
          style={{
            position: "absolute",
            top: center.y - 27,
            left: center.x - 35,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Text>Total Room</Text>
          <Text style={{ fontSize: 20, fontWeight: "bold", color: "#333" }}>
            {totalRoom}
          </Text>
        </View>
      </View>

      {/* ✅ Legend always visible */}
      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          marginTop: 16,
        }}
      >
        <View style={{ flexDirection: "row", alignItems: "center", marginRight: 16 }}>
          <View
            style={{
              width: 12,
              height: 12,
              backgroundColor: "#FF6B6B",
              marginRight: 6,
            }}
          />
          <Text>Occupied</Text>
        </View>

        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <View
            style={{
              width: 12,
              height: 12,
              backgroundColor: "#4ECDC4",
              marginRight: 6,
            }}
          />
          <Text>Available</Text>
        </View>
      </View>
    </View>
  );
};

export default Graph;
