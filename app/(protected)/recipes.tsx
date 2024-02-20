import { useAtomValue } from "jotai";
import { ingredients } from "../state/state";
import DB from "../utils/db";
import { useEffect, useState } from "react";
import { useUser } from "@clerk/clerk-expo";
import { Text } from "react-native";

export default function Recipes() {
  const scannedIngredients = useAtomValue(ingredients);
  const { user } = useUser();

  const [recipes, setRecipes] = useState([]);
  const [db, setDB] = useState({} as DB);

  const fetchAllReceipes = () => {
    const { rows } = db.execute("SELECT * FROM all_menus");
    const ifHaveAny = rows._array.filter((receipe) => {
      console.log(scannedIngredients);
      return JSON.parse(receipe.ingredients_list.replaceAll("'", '"')).some(
        (ingredient) => scannedIngredients.includes(ingredient),
      );
    });
    setRecipes(ifHaveAny);
  };

  useEffect(() => {
    if (!db || !db.execute) return;
    console.log("we got db");
    fetchAllReceipes();
  }, [db]);

  useEffect(() => {
    if (!user) return;
    setDB(new DB(user.id, user.unsafeMetadata.encryptionKey as string));
  }, [user, scannedIngredients]);

  return (
    <>
      {recipes.map((recipe, idx) => (
        <Text key={idx}>{recipe.menu_name}</Text>
      ))}
    </>
  );
}
