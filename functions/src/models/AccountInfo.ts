import { ObjectId } from "mongodb";

interface BodyType {
  height: number;
  weight: number;
  heightSmallerUnit: number;
  age: number;
  sex: string;
  isImperial: boolean;
}

export interface Recipe {
  id: number;
  title: string;
  image: string;
  imageType: string;
}

export interface Day {
  date: string;
  recipes: Recipe[];
  totalDailyCalories?: number;
  totalDailyProtein?: number;
  totalDailyCarbs?: number;
  totalDailyFats?: number;
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
  meals: Day[];
  // addMacros(
  //   calories: number,
  //   protein: number,
  //   carbs: number,
  //   fats: number
  // ): void;
}
