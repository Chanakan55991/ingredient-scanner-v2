import { Canvas, Circle } from "@shopify/react-native-skia";
import { Platform } from "expo-modules-core";
import { StyleSheet } from "nativewind";
import * as fs from "expo-file-system";
import { Buffer } from "react-native-buffer";
import {
  Camera,
  useCameraDevice,
  useCameraPermission,
} from "react-native-vision-camera";
import { TouchableOpacity, View } from "react-native";
import { useRef } from "react";
import axios from "axios";
import { ingredients } from "../state/state";
import { useSetAtom } from "jotai";
import { router } from "expo-router";

export default () => {
  const { hasPermission, requestPermission } = useCameraPermission();
  const camera = useRef<Camera>(null);
  const setIngredients = useSetAtom(ingredients);

  const fontFamily = Platform.select({ ios: "Helvetica", default: "serif" });
  const fontStyle = {
    fontFamily,
    fontSize: 14,
    fontStyle: "italic",
    fontWeight: "bold",
  };

  if (!hasPermission) requestPermission();

  const device = useCameraDevice("back");
  if (device == null) return;

  const takePhoto = async () => {
    const image = await camera.current?.takePhoto();
    if (!image) return;
    const formData = new FormData();
    const file = await fs.readAsStringAsync("file://" + image.path, {
      encoding: fs.EncodingType.Base64,
    });

    try {
      const result = await axios.post("https://ctsbe.chanakancloud.net/scan", {
        file: file,
      });
      const ingredient = result.data.ingredient_name;
      setIngredients((exingredients) => {
        return Array.from(
          new Set([
            ...exingredients,
            ingredient.toLowerCase().replaceAll("\n", ""),
          ]),
        );
      });
      router.push("/scanned");
    } catch (ex) {
      console.log(ex);
    }
  };

  return (
    <>
      <Camera
        style={StyleSheet.absoluteFill}
        device={device}
        isActive={true}
        photo={true}
        ref={camera}
      />
      <TouchableOpacity
        className="absolute bottom-4 items-center justify-center self-center rounded-full border-2 border-solid border-white p-1"
        onPress={takePhoto}
      >
        <View className="rounded-full border-2 border-solid border-white bg-white p-8"></View>
      </TouchableOpacity>
    </>
  );
};
