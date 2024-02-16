import { Canvas, Circle } from "@shopify/react-native-skia";
import { StyleSheet } from "nativewind";
import { useTensorflowModel } from "react-native-fast-tflite";
import { useSharedValue } from "react-native-reanimated";
import {
  Camera,
  useCameraDevice,
  useCameraPermission,
  useFrameProcessor,
} from "react-native-vision-camera";
import { useResizePlugin } from "vision-camera-resize-plugin";

export default () => {
  const { hasPermission, requestPermission } = useCameraPermission();

  if (!hasPermission) requestPermission();

  const objectDetection = useTensorflowModel(
    require("../../assets/model_unquant.tflite"),
  );
  const model =
    objectDetection.state === "loaded" ? objectDetection.model : null;

  const { resize } = useResizePlugin();

  const frameProcessor = useFrameProcessor(
    (frame) => {
      "worklet";
      if (model == null) return;

      const data = resize(frame, {
        scale: { width: 320, height: 320 },
        pixelFormat: "rgb",
        dataType: "float32",
      });

      const input = new Uint8Array(data);
      const outputs = model.runSync([input]);

      const detected_objects = outputs[0];
      console.log(detected_objects);
    },
    [model],
  );

  const device = useCameraDevice("back");
  if (device == null) return;

  return (
    <>
      <Camera
        style={StyleSheet.absoluteFill}
        device={device}
        isActive={true}
        pixelFormat="yuv"
        frameProcessor={frameProcessor}
      />
      <Canvas style={{ width: 256, height: 256 }}>
        <Circle cx={50} cy={50} r={50} color="blue" />
      </Canvas>
    </>
  );
};
