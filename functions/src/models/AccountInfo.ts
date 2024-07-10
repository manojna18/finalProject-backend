import { ObjectId } from "mongodb";

interface BodyType {
  height: number;
  weight: number;
  age: number;
  sex: string;
}

export interface Recipe {
  id: number;
  title: string;
  image: string;
  imageType: string;
}

export default interface AccountInfo {
  _id?: ObjectId;
  userId: string;
  bodyType: BodyType;
  totalDailyCalories: number;
  totalDailyProtein: number;
  totalDailyCarbs: number;
  totalDailyFats: number;
  favorites: Recipe[];
  calorieGoal: number;
  meals: Recipe[];
  // addMacros(
  //   calories: number,
  //   protein: number,
  //   carbs: number,
  //   fats: number
  // ): void;
}
