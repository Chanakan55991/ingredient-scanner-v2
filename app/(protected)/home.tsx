import { SignedIn, useAuth, useUser } from "@clerk/clerk-expo";
import { Image } from "expo-image";
import { router, useRootNavigationState, useSegments } from "expo-router";
import { Search } from "lucide-react-native";
import { useEffect, useState } from "react";
import {
  Button,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import DB from "../utils/db";
import { Link } from "@react-navigation/native";

export default function Home() {
  const { signOut } = useAuth();
  const { user } = useUser();
  const [menus, setMenus] = useState([]);
  let db: DB;

  useEffect(() => {
    if (!user) return;
    db = new DB(user.id, user.unsafeMetadata.encryptionKey as string);
    fetchMenus();
  }, [user]);

  const fetchMenus = () => {
    try {
      const { rows } = db.execute("SELECT * FROM all_menus");
      if (rows) setMenus(rows._array);
    } catch (e) {
      db.init();
      fetchMenus();
    }
  };

  return (
    <SignedIn>
      <SafeAreaView>
        <View className="flex items-center justify-center p-4">
          <View className="relative flex flex-row items-center">
            <TouchableOpacity className="absolute left-2 z-10">
              <Search className="text-opacity-65" color="gray" />
            </TouchableOpacity>

            <TextInput
              className="w-full rounded-xl bg-orange-200 px-10 py-2"
              placeholder="Search"
              returnKeyType="search"
            ></TextInput>
          </View>
        </View>

        <View className="relative m-4 mt-0 flex h-48 items-center justify-between rounded-2xl bg-yellow-500 ">
          <Image
            source="https://i2.wp.com/seonkyounglongest.com/wp-content/uploads/2021/03/Tom-Yum-07-mini.jpg?fit=1000%2C667&ssl=1"
            style={{
              width: "100%",
              height: "100%",
              borderRadius: 16,
            }}
            className="absolute"
          />
          <Text className="absolute bottom-0 self-start p-4 text-3xl text-white">
            Hello, {user?.firstName}
          </Text>
        </View>
        <ScrollView
          className="mt-2 flex h-[80%]"
          contentContainerStyle={{
            alignItems: "center",
            gap: 12,
          }}
        >
          {/* BLOCK EXAMPLE */}

          {menus.map((menu) => (
            <Link to={`/menu/${menu.id}`} key={menu.id} className="w-[90%]">
              <View className="flex h-[8rem] w-[90%] flex-row overflow-hidden overflow-ellipsis">
                <Image
                  source={menu.thumb_url}
                  style={{
                    width: 128,
                    borderRadius: 16,
                  }}
                />
                <View className="overflow-hidden overflow-ellipsis text-wrap pl-4">
                  <Text
                    className="w-[90%] overflow-hidden overflow-ellipsis text-xl font-semibold"
                    numberOfLines={1}
                    ellipsizeMode="tail"
                  >
                    {menu.menu_name}
                  </Text>
                  <Text
                    className="w-[11rem] overflow-hidden overflow-ellipsis text-sm"
                    numberOfLines={5}
                  >
                    {menu.receipe}
                  </Text>
                </View>
              </View>
            </Link>
          ))}

          {/* BLOCK END */}
        </ScrollView>
      </SafeAreaView>
    </SignedIn>
  );
}
