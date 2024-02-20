import { SignedIn, useUser } from "@clerk/clerk-expo";
import { Text, View } from "react-native";
import { Image } from "expo-image";
import { Star } from "lucide-react-native";
import db from "../utils/db";
import { useEffect, useState } from "react";
import { useRootNavigationState, useRouter } from "expo-router";
import DB from "../utils/db";

export default function History() {
  const { user } = useUser();
  const [history, setHistory] = useState([]);

  let db: DB;

  useEffect(() => {
    if (user) db = new DB(user.id, user.unsafeMetadata.encryptionKey as string);
    fetchHistory();
  }, []);

  const fetchHistory = () => {
    try {
      const { rows } = db.execute(
        "SELECT * FROM history LEFT JOIN all_menus ON history.menu_id = all_menus.id;",
      );
      if (rows) setHistory(rows._array);
    } catch (e) {
      db.init();
      fetchHistory();
    }
  };

  return (
    <SignedIn>
      <View className="flex items-center pt-14">
        <Text className="text-2xl">History</Text>
        <View className="mt-14 flex h-[80%] items-center gap-6">
          {history.map((row) => (
            <View className="flex h-[8rem] w-[80%] flex-row" key={row.id}>
              <Image
                source={row.thumb_url}
                style={{
                  width: 128,
                  borderRadius: 16,
                }}
              />
              <View className="flex flex-row justify-center overflow-hidden">
                <View className="flex justify-center overflow-hidden overflow-ellipsis text-wrap pl-4">
                  <Text className="text-xl font-semibold">{row.menu_name}</Text>
                  <Text
                    className="w-[9rem] overflow-hidden overflow-ellipsis text-sm"
                    numberOfLines={5}
                  >
                    {row.receipe}
                  </Text>
                </View>
                <Star
                  color={row.favorite ? "orange" : "black"}
                  fill={row.favorite ? "orange" : "white"}
                />
              </View>
            </View>
          ))}
        </View>
      </View>
    </SignedIn>
  );
}
