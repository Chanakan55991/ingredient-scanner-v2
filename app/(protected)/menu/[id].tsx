import { Text } from "react-native";
import { useLocalSearchParams } from "expo-router";
import DB from "../../utils/db";
import { useEffect, useState } from "react";
import { useUser } from "@clerk/clerk-expo";

export default () => {
  const { id } = useLocalSearchParams();
  const { user } = useUser();
  let db: DB;
  const [receipe, setReceipe] = useState({});

  const fetchReceipe = async () => {
    const { rows } = db.execute("SELECT * FROM all_menus WHERE id = ?", [id]);

    setReceipe(rows._array[0]);
  };

  const setHistory = () => {
    if (!user || !db.execute) return;
    db.execute("INSERT INTO history (menu_id) VALUES (?)", [id]); // check if it's already in history
  }; // use specifically for history

  useEffect(() => {
    if (!user) return;
    db = new DB(user.id, user?.unsafeMetadata.encryptionKey);
    setHistory();
    fetchReceipe();
  }, [user]);

  return <Text>{receipe.menu_name}</Text>;
};
