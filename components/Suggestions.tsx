import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
} from "react-native";

interface SuggestionsProps {
  suggestions: string[];
  onSelect: (city: string) => void;
}

const Suggestions: React.FC<SuggestionsProps> = ({ suggestions, onSelect }) => {
  return (
    <View style={styles.container} className="w-full ">
      <FlatList
        data={suggestions}
        keyExtractor={(item, index) => `${item}-${index}`}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => onSelect(item)}
            style={styles.suggestionItem}
          >
            <Text style={styles.suggestionText}>{item}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    borderRadius: 10,
    marginTop: 5,
    maxHeight: 150,
  },
  suggestionItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  suggestionText: {
    fontSize: 16,
    color: "#333",
  },
});

export default Suggestions;
