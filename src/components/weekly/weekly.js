import { Text } from "react-native-paper"
import { useEffect, useState } from "react"
import { View, Pressable } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import Graph from "../common/graph/graph";

const Weekly = ({ policeReport, totalRoom }) => {
  const [showDatePicker, setShowDatePicker] = useState(false); 
  const [anotherShowDatePicker, setAnotherShowDatePicker] = useState(false); 

  // ✅ Set initial state as null so it shows placeholder text
  const [selectedDate, setSelectedDate] = useState(null);
  const [anotherSelectedDate, setAnotherSelectedDate] = useState(null);  

  const [weekMonthReportArray, setWeekMonthReportArray] = useState([]);

  const handleDateChange = (event, date) => {
    setShowDatePicker(false);
    if (date) setSelectedDate(date);
  };

  const anotherHandleDateChange = (event, date) => {
    setAnotherShowDatePicker(false);
    if (date) setAnotherSelectedDate(date);
  };

  const currentDate = selectedDate ? selectedDate.toLocaleDateString("en-GB") : null;
  const anotherCurrentDate = anotherSelectedDate ? anotherSelectedDate.toLocaleDateString("en-GB") : null;

  const parseToTimestamp = (str) => {
    if (!str) return 0;
    const [day, month, year] = str.split("/").map(Number);
    return new Date(year, month - 1, day).getTime();
  };

  useEffect(() => {
    if (policeReport?.length > 0 && currentDate && anotherCurrentDate) {
      const start = Math.min(parseToTimestamp(currentDate), parseToTimestamp(anotherCurrentDate));
      const end = Math.max(parseToTimestamp(currentDate), parseToTimestamp(anotherCurrentDate));

      const filtered = policeReport?.filter((police) => {
        const checkIn = parseToTimestamp(police.checkInDate);
        return checkIn >= start && checkIn <= end;
      });

      setWeekMonthReportArray(filtered);
    } else {
      setWeekMonthReportArray([]);
    }
  }, [currentDate, anotherCurrentDate, policeReport]);

  const start = parseToTimestamp(currentDate);
  const end = parseToTimestamp(anotherCurrentDate);
  const diffInDays = Math.abs((end - start) / (1000 * 60 * 60 * 24)) || 0;

  const finalTotalRoom = totalRoom * diffInDays;
  const occupiedRooms = weekMonthReportArray.length;
  const availableRooms = Math.max(finalTotalRoom - occupiedRooms, 0);

  const occupiedPercentage =
    finalTotalRoom > 0 ? ((occupiedRooms / finalTotalRoom) * 100).toFixed(2) : "0.00";
  const availablePercentage =
    finalTotalRoom > 0 ? ((availableRooms / finalTotalRoom) * 100).toFixed(2) : "0.00";

  return (
    <>
      <View style={{ flexDirection: "row", justifyContent: 'space-between',marginTop:20 }}>
        {/* ✅ START DATE */}
        <View>
          <Pressable
            onPress={() => setShowDatePicker(true)}
            style={{
              borderWidth: 1,
              borderColor: "#ccc",
              borderRadius: 8,
              padding: 12,
              margin: 12,
              backgroundColor: "#f9f9f9",
              width: '90%',
            }}
          >
            <Text style={{ fontSize: 16, color: "#333" }}>
              {selectedDate
                ? selectedDate.toLocaleDateString("en-GB")
                : "Select Start Date"}
            </Text>
          </Pressable>

          {showDatePicker && (
            <DateTimePicker
              value={selectedDate || new Date()}
              mode="date"
              onChange={handleDateChange}
            />
          )}
        </View>

        {/* ✅ END DATE */}
        <View>
          <Pressable
            onPress={() => setAnotherShowDatePicker(true)}
            style={{
              borderWidth: 1,
              borderColor: "#ccc",
              borderRadius: 8,
              padding: 12,
              margin: 12,
              backgroundColor: "#f9f9f9",
              width: '90%',
              
            }}
          >
            <Text style={{ fontSize: 16, color: "#333" }}>
              {anotherSelectedDate
                ? anotherSelectedDate.toLocaleDateString("en-GB")
                : "Select End Date"}
            </Text>
          </Pressable>

          {anotherShowDatePicker && (
            <DateTimePicker
              value={anotherSelectedDate || new Date()}
              mode="date"
              onChange={anotherHandleDateChange}
            />
          )}
        </View>
      </View>

      <Graph
        occupied={occupiedRooms}
        available={availableRooms}
        totalRoom={totalRoom}
        finalTotalRoom={finalTotalRoom}
        occupiedPercentage={occupiedPercentage}
        availablePercentage={availablePercentage}
      />
    </>
  );
};

export default Weekly;
