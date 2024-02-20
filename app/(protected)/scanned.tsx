import { useAtomValue } from "jotai";
import { Button, Text, TouchableOpacity, View } from "react-native";
import { ingredients } from "../state/state";
import { ArrowRight, Plus } from "lucide-react-native";
import { router } from "expo-router";

export default function Scanned() {
  const scannedIngredients = useAtomValue(ingredients);
  return (
    <>
      <View className="flex justify-center">
        {scannedIngredients.map((ingredient, index) => (
          <Text key={index} className="p-4">
            {ingredient}
          </Text>
        ))}
      </View>
      <TouchableOpacity
        title="Add More Ingredient"
        className="absolute bottom-6 left-6 rounded-full bg-orange-400 p-4"
        onPress={() => {
          router.navigate("/scan");
        }}
      >
        <Plus className="h-4 w-4" color="black" />
      </TouchableOpacity>
      <TouchableOpacity
        title="Next"
        className="absolute bottom-6 right-6 rounded-full bg-orange-400 p-4"
        onPress={() => {
          router.navigate("/recipes");
        }}
      >
        <ArrowRight className="h-4 w-4" color="black" />
      </TouchableOpacity>
    </>
  );
}
