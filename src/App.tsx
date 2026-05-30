import { useState, useEffect, useMemo } from "react";

// ─── PRESS BUTTON ─────────────────────────────────────────────────────────────
// Gives every button a tactile "physical press" feel:
// scales down + loses shadow on mousedown, snaps back on release.
const pressBtnBase = {
  transition: "transform 0.08s ease, box-shadow 0.08s ease, filter 0.08s ease",
  userSelect: "none",
  WebkitTapHighlightColor: "transparent",
};

function PressBtn({ onClick, style = {}, disabled = false, children, ...rest }) {
  const [pressed, setPressed] = useState(false);

  const pressedStyle = pressed && !disabled ? {
    transform: "scale(0.95) translateY(2px)",
    boxShadow: "0 1px 2px rgba(0,0,0,0.10)",
    filter: "brightness(0.93)",
  } : {
    transform: "scale(1) translateY(0px)",
    boxShadow: "0 3px 6px rgba(0,0,0,0.10)",
    filter: "brightness(1)",
  };

  return (
    <button
      {...rest}
      disabled={disabled}
      onClick={onClick}
      onMouseDown={() => setPressed(true)}
      onMouseUp={() => setPressed(false)}
      onMouseLeave={() => setPressed(false)}
      onTouchStart={() => setPressed(true)}
      onTouchEnd={() => { setPressed(false); }}
      style={{ ...pressBtnBase, ...style, ...pressedStyle, cursor: disabled ? "not-allowed" : "pointer", opacity: disabled ? 0.4 : 1 }}
    >
      {children}
    </button>
  );
}

// ─── FOOD DATABASE ───────────────────────────────────────────────────────────
const FOOD_DB = [
{ id: 1, name: "Grilled chicken", carbs: 0, protein: 31, fat: 4, satFat: 1, fiber: 0, sugar: 0, gi: 0, category: "protein" },
{ id: 2, name: "Fried chicken", carbs: 8, protein: 25, fat: 15, satFat: 4, fiber: 0, sugar: 0, gi: 50, category: "protein" },
{ id: 3, name: "Ground beef", carbs: 0, protein: 26, fat: 20, satFat: 8, fiber: 0, sugar: 0, gi: 0, category: "protein" },
{ id: 4, name: "Steak", carbs: 0, protein: 27, fat: 19, satFat: 7, fiber: 0, sugar: 0, gi: 0, category: "protein" },
{ id: 5, name: "Turkey", carbs: 0, protein: 29, fat: 2, satFat: 1, fiber: 0, sugar: 0, gi: 0, category: "protein" },
{ id: 6, name: "Bacon", carbs: 1, protein: 12, fat: 37, satFat: 12, fiber: 0, sugar: 0, gi: 0, category: "protein" },
{ id: 7, name: "Sausage", carbs: 2, protein: 16, fat: 27, satFat: 9, fiber: 0, sugar: 0, gi: 0, category: "protein" },
{ id: 8, name: "Eggs", carbs: 1, protein: 13, fat: 10, satFat: 3, fiber: 0, sugar: 1, gi: 0, category: "protein" },
{ id: 9, name: "Scrambled eggs", carbs: 2, protein: 13, fat: 11, satFat: 4, fiber: 0, sugar: 1, gi: 0, category: "protein" },
{ id: 10, name: "Salmon", carbs: 0, protein: 25, fat: 13, satFat: 3, fiber: 0, sugar: 0, gi: 0, category: "protein" },
{ id: 11, name: "Tuna", carbs: 0, protein: 26, fat: 1, satFat: 0, fiber: 0, sugar: 0, gi: 0, category: "protein" },
{ id: 12, name: "Shrimp", carbs: 1, protein: 24, fat: 1, satFat: 0, fiber: 0, sugar: 0, gi: 0, category: "protein" },
{ id: 13, name: "Tofu", carbs: 2, protein: 8, fat: 5, satFat: 1, fiber: 1, sugar: 0, gi: 15, category: "protein" },
{ id: 14, name: "Greek yogurt", carbs: 4, protein: 10, fat: 0, satFat: 0, fiber: 0, sugar: 4, gi: 35, category: "protein" },
{ id: 15, name: "Cheddar cheese", carbs: 1, protein: 7, fat: 9, satFat: 6, fiber: 0, sugar: 0, gi: 0, category: "protein" },
{ id: 16, name: "White rice", carbs: 45, protein: 4, fat: 0, satFat: 0, fiber: 1, sugar: 0, gi: 72, category: "carb" },
{ id: 17, name: "Brown rice", carbs: 45, protein: 5, fat: 2, satFat: 0, fiber: 4, sugar: 0, gi: 65, category: "carb" },
{ id: 18, name: "Pasta", carbs: 43, protein: 8, fat: 1, satFat: 0, fiber: 2, sugar: 1, gi: 50, category: "carb" },
{ id: 19, name: "White bread", carbs: 49, protein: 9, fat: 3, satFat: 1, fiber: 2, sugar: 5, gi: 75, category: "carb" },
{ id: 20, name: "Whole wheat bread", carbs: 41, protein: 13, fat: 4, satFat: 1, fiber: 7, sugar: 6, gi: 65, category: "carb" },
{ id: 21, name: "Bagel", carbs: 48, protein: 10, fat: 1, satFat: 0, fiber: 2, sugar: 6, gi: 72, category: "carb" },
{ id: 22, name: "Oatmeal", carbs: 27, protein: 5, fat: 3, satFat: 1, fiber: 4, sugar: 1, gi: 55, category: "carb" },
{ id: 23, name: "Cereal", carbs: 30, protein: 2, fat: 1, satFat: 0, fiber: 2, sugar: 10, gi: 70, category: "carb" },
{ id: 24, name: "Potato", carbs: 37, protein: 4, fat: 0, satFat: 0, fiber: 4, sugar: 2, gi: 85, category: "carb" },
{ id: 25, name: "Mashed potatoes", carbs: 35, protein: 4, fat: 4, satFat: 2, fiber: 3, sugar: 2, gi: 80, category: "carb" },
{ id: 26, name: "French fries", carbs: 41, protein: 3, fat: 15, satFat: 3, fiber: 3, sugar: 0, gi: 75, category: "carb" },
{ id: 27, name: "Apple", carbs: 25, protein: 0, fat: 0, satFat: 0, fiber: 4, sugar: 19, gi: 40, category: "fruit" },
{ id: 28, name: "Banana", carbs: 27, protein: 1, fat: 0, satFat: 0, fiber: 3, sugar: 14, gi: 60, category: "fruit" },
{ id: 29, name: "Orange", carbs: 15, protein: 1, fat: 0, satFat: 0, fiber: 3, sugar: 12, gi: 40, category: "fruit" },
{ id: 30, name: "Strawberries", carbs: 8, protein: 1, fat: 0, satFat: 0, fiber: 2, sugar: 5, gi: 40, category: "fruit" },
{ id: 31, name: "Blueberries", carbs: 14, protein: 1, fat: 0, satFat: 0, fiber: 2, sugar: 10, gi: 53, category: "fruit" },
{ id: 32, name: "Grapes", carbs: 27, protein: 1, fat: 0, satFat: 0, fiber: 1, sugar: 23, gi: 59, category: "fruit" },
{ id: 33, name: "Broccoli", carbs: 6, protein: 3, fat: 0, satFat: 0, fiber: 2, sugar: 1, gi: 10, category: "vegetable" },
{ id: 34, name: "Spinach", carbs: 4, protein: 3, fat: 0, satFat: 0, fiber: 2, sugar: 0, gi: 10, category: "vegetable" },
{ id: 35, name: "Carrots", carbs: 10, protein: 1, fat: 0, satFat: 0, fiber: 3, sugar: 5, gi: 35, category: "vegetable" },
{ id: 36, name: "Green beans", carbs: 7, protein: 2, fat: 0, satFat: 0, fiber: 3, sugar: 2, gi: 30, category: "vegetable" },
{ id: 37, name: "Salad", carbs: 5, protein: 1, fat: 0, satFat: 0, fiber: 2, sugar: 2, gi: 10, category: "vegetable" },
{ id: 38, name: "Black beans", carbs: 40, protein: 15, fat: 1, satFat: 0, fiber: 15, sugar: 1, gi: 30, category: "mixed" },
{ id: 39, name: "Lentils", carbs: 40, protein: 18, fat: 1, satFat: 0, fiber: 16, sugar: 2, gi: 32, category: "mixed" },
{ id: 40, name: "Avocado", carbs: 12, protein: 2, fat: 15, satFat: 2, fiber: 10, sugar: 1, gi: 15, category: "mixed" },
{ id: 41, name: "Olive oil", carbs: 0, protein: 0, fat: 14, satFat: 2, fiber: 0, sugar: 0, gi: 0, category: "mixed" },
{ id: 42, name: "Cheese", carbs: 1, protein: 7, fat: 9, satFat: 6, fiber: 0, sugar: 1, gi: 0, category: "protein" },
{ id: 43, name: "Hamburger", carbs: 30, protein: 17, fat: 15, satFat: 5, fiber: 2, sugar: 6, gi: 65, category: "mixed", locked: true },
{ id: 44, name: "Cheeseburger", carbs: 31, protein: 19, fat: 17, satFat: 7, fiber: 2, sugar: 6, gi: 65, category: "mixed", locked: true },
{ id: 45, name: "Pizza", carbs: 36, protein: 12, fat: 10, satFat: 5, fiber: 2, sugar: 4, gi: 70, category: "mixed", locked: true },
{ id: 46, name: "Chicken sandwich", carbs: 35, protein: 20, fat: 10, satFat: 2, fiber: 2, sugar: 4, gi: 65, category: "mixed" },
{ id: 47, name: "Taco", carbs: 20, protein: 10, fat: 8, satFat: 3, fiber: 3, sugar: 2, gi: 60, category: "mixed" },
{ id: 48, name: "Burrito", carbs: 50, protein: 20, fat: 15, satFat: 5, fiber: 5, sugar: 3, gi: 65, category: "mixed", locked: true },
{ id: 49, name: "Chips", carbs: 15, protein: 2, fat: 10, satFat: 1, fiber: 1, sugar: 0, gi: 75, category: "starch" },
{ id: 50, name: "Protein shake", carbs: 5, protein: 25, fat: 2, satFat: 1, fiber: 1, sugar: 2, gi: 30, category: "protein" },
{ id: 51, name: "Beans", carbs: 20, protein: 8, fat: 1, satFat: 0, fiber: 8, sugar: 1, gi: 33, category: "vegetable" },
{ id: 52, name: "Soda", carbs: 39, protein: 0, fat: 0, satFat: 0, fiber: 0, sugar: 39, gi: 63, category: "drink" },
{ id: 53, name: "Orange juice", carbs: 26, protein: 2, fat: 0, satFat: 0, fiber: 0, sugar: 21, gi: 50, category: "drink" },
{ id: 54, name: "Milk", carbs: 12, protein: 8, fat: 5, satFat: 3, fiber: 0, sugar: 12, gi: 30, category: "drink" },
{ id: 55, name: "Coffee", carbs: 0, protein: 0, fat: 0, satFat: 0, fiber: 0, sugar: 0, gi: 0, category: "drink" },
{ id: 56, name: "Ketchup", carbs: 5, protein: 0, fat: 0, satFat: 0, fiber: 0, sugar: 4, gi: 55, category: "condiment" },
{ id: 57, name: "Mayonnaise", carbs: 0, protein: 0, fat: 10, satFat: 2, fiber: 0, sugar: 0, gi: 0, category: "condiment" },
{ id: 58, name: "Mustard", carbs: 1, protein: 0, fat: 0, satFat: 0, fiber: 0, sugar: 0, gi: 35, category: "condiment" },
{ id: 59, name: "BBQ sauce", carbs: 8, protein: 0, fat: 0, satFat: 0, fiber: 0, sugar: 7, gi: 65, category: "condiment" },
{ id: 60, name: "Ranch dressing", carbs: 2, protein: 0, fat: 14, satFat: 2, fiber: 0, sugar: 1, gi: 30, category: "condiment" },
{ id: 61, name: "Italian dressing", carbs: 3, protein: 0, fat: 12, satFat: 2, fiber: 0, sugar: 2, gi: 30, category: "condiment" },
{ id: 62, name: "Turkey bacon", carbs: 1, protein: 6, fat: 3, satFat: 1, fiber: 0, sugar: 0, gi: 0, category: "protein" },
{ id: 63, name: "Pork chop", carbs: 0, protein: 26, fat: 14, satFat: 5, fiber: 0, sugar: 0, gi: 0, category: "protein" },
{ id: 64, name: "Ham", carbs: 1, protein: 18, fat: 5, satFat: 2, fiber: 0, sugar: 1, gi: 0, category: "protein" },
{ id: 65, name: "Chicken nuggets", carbs: 15, protein: 14, fat: 18, satFat: 4, fiber: 1, sugar: 0, gi: 55, category: "mixed" },
{ id: 66, name: "Fish", carbs: 0, protein: 24, fat: 5, satFat: 1, fiber: 0, sugar: 0, gi: 0, category: "protein" },
{ id: 67, name: "Fried fish", carbs: 12, protein: 22, fat: 14, satFat: 3, fiber: 1, sugar: 0, gi: 55, category: "mixed" },
{ id: 68, name: "Sweet potato", carbs: 27, protein: 2, fat: 0, satFat: 0, fiber: 4, sugar: 6, gi: 60, category: "carb" },
{ id: 69, name: "Baked potato", carbs: 37, protein: 4, fat: 0, satFat: 0, fiber: 4, sugar: 2, gi: 85, category: "carb" },
{ id: 70, name: "Macaroni and cheese", carbs: 47, protein: 13, fat: 18, satFat: 8, fiber: 2, sugar: 5, gi: 65, category: "mixed" },
{ id: 71, name: "Pancakes", carbs: 45, protein: 8, fat: 8, satFat: 2, fiber: 2, sugar: 10, gi: 67, category: "carb" },
{ id: 72, name: "Waffles", carbs: 40, protein: 7, fat: 10, satFat: 3, fiber: 2, sugar: 8, gi: 70, category: "carb" },
{ id: 73, name: "Tortilla", carbs: 24, protein: 4, fat: 3, satFat: 1, fiber: 2, sugar: 1, gi: 52, category: "carb" },
{ id: 74, name: "Corn tortilla", carbs: 22, protein: 3, fat: 2, satFat: 0, fiber: 3, sugar: 1, gi: 46, category: "carb" },
{ id: 75, name: "Crackers", carbs: 20, protein: 3, fat: 5, satFat: 1, fiber: 1, sugar: 2, gi: 70, category: "carb" },
{ id: 76, name: "Pretzels", carbs: 23, protein: 3, fat: 1, satFat: 0, fiber: 1, sugar: 1, gi: 83, category: "carb" },
{ id: 77, name: "Granola bar", carbs: 24, protein: 3, fat: 6, satFat: 2, fiber: 2, sugar: 10, gi: 65, category: "mixed" },
{ id: 78, name: "Peanut butter", carbs: 6, protein: 8, fat: 16, satFat: 3, fiber: 2, sugar: 3, gi: 14, category: "mixed" },
{ id: 79, name: "Almonds", carbs: 6, protein: 6, fat: 14, satFat: 1, fiber: 4, sugar: 1, gi: 15, category: "mixed" },
{ id: 80, name: "Walnuts", carbs: 4, protein: 4, fat: 18, satFat: 2, fiber: 2, sugar: 1, gi: 15, category: "mixed" },
{ id: 81, name: "Cashews", carbs: 9, protein: 5, fat: 12, satFat: 2, fiber: 1, sugar: 2, gi: 25, category: "mixed" },
{ id: 82, name: "Peanuts", carbs: 6, protein: 7, fat: 14, satFat: 2, fiber: 2, sugar: 1, gi: 14, category: "mixed" },
{ id: 83, name: "Cottage cheese", carbs: 6, protein: 14, fat: 2, satFat: 1, fiber: 0, sugar: 5, gi: 30, category: "protein" },
{ id: 84, name: "String cheese", carbs: 1, protein: 7, fat: 6, satFat: 4, fiber: 0, sugar: 0, gi: 0, category: "protein" },
{ id: 85, name: "Plain yogurt", carbs: 12, protein: 9, fat: 4, satFat: 3, fiber: 0, sugar: 12, gi: 35, category: "protein" },
{ id: 86, name: "Sweetened yogurt", carbs: 28, protein: 8, fat: 3, satFat: 2, fiber: 0, sugar: 22, gi: 55, category: "mixed" },
{ id: 87, name: "Cauliflower", carbs: 5, protein: 2, fat: 0, satFat: 0, fiber: 2, sugar: 2, gi: 10, category: "vegetable" },
{ id: 88, name: "Asparagus", carbs: 4, protein: 2, fat: 0, satFat: 0, fiber: 2, sugar: 2, gi: 15, category: "vegetable" },
{ id: 89, name: "Zucchini", carbs: 4, protein: 1, fat: 0, satFat: 0, fiber: 1, sugar: 2, gi: 15, category: "vegetable" },
{ id: 90, name: "Bell peppers", carbs: 6, protein: 1, fat: 0, satFat: 0, fiber: 2, sugar: 4, gi: 15, category: "vegetable" },
{ id: 91, name: "Onions", carbs: 11, protein: 1, fat: 0, satFat: 0, fiber: 2, sugar: 5, gi: 15, category: "vegetable" },
{ id: 92, name: "Tomatoes", carbs: 5, protein: 1, fat: 0, satFat: 0, fiber: 1, sugar: 3, gi: 15, category: "vegetable" },
{ id: 93, name: "Cucumber", carbs: 4, protein: 1, fat: 0, satFat: 0, fiber: 1, sugar: 2, gi: 15, category: "vegetable" },
{ id: 94, name: "Mushrooms", carbs: 3, protein: 3, fat: 0, satFat: 0, fiber: 1, sugar: 1, gi: 10, category: "vegetable" },
{ id: 95, name: "Corn", carbs: 31, protein: 5, fat: 2, satFat: 0, fiber: 4, sugar: 6, gi: 55, category: "carb" },
{ id: 96, name: "Peas", carbs: 21, protein: 8, fat: 1, satFat: 0, fiber: 7, sugar: 8, gi: 50, category: "vegetable" },
{ id: 97, name: "Watermelon", carbs: 12, protein: 1, fat: 0, satFat: 0, fiber: 1, sugar: 10, gi: 76, category: "fruit" },
{ id: 98, name: "Pineapple", carbs: 22, protein: 1, fat: 0, satFat: 0, fiber: 2, sugar: 16, gi: 66, category: "fruit" },
{ id: 99, name: "Mango", carbs: 25, protein: 1, fat: 0, satFat: 0, fiber: 3, sugar: 23, gi: 51, category: "fruit" },
{ id: 100, name: "Peach", carbs: 15, protein: 1, fat: 0, satFat: 0, fiber: 2, sugar: 13, gi: 42, category: "fruit" },
{ id: 101, name: "Pear", carbs: 27, protein: 1, fat: 0, satFat: 0, fiber: 6, sugar: 17, gi: 38, category: "fruit" },
{ id: 102, name: "Raisins", carbs: 34, protein: 1, fat: 0, satFat: 0, fiber: 2, sugar: 29, gi: 64, category: "fruit" },
{ id: 103, name: "Honey", carbs: 17, protein: 0, fat: 0, satFat: 0, fiber: 0, sugar: 17, gi: 60, category: "sugary" },
{ id: 104, name: "Maple syrup", carbs: 13, protein: 0, fat: 0, satFat: 0, fiber: 0, sugar: 12, gi: 54, category: "sugary" },
{ id: 105, name: "Donut", carbs: 31, protein: 4, fat: 11, satFat: 4, fiber: 1, sugar: 15, gi: 76, category: "sugary" },
{ id: 106, name: "Cookie", carbs: 22, protein: 2, fat: 8, satFat: 3, fiber: 1, sugar: 12, gi: 70, category: "sugary" },
{ id: 107, name: "Brownie", carbs: 35, protein: 4, fat: 14, satFat: 5, fiber: 2, sugar: 25, gi: 65, category: "sugary" },
{ id: 108, name: "Chicken wrap", carbs: 35, protein: 25, fat: 10, satFat: 3, fiber: 3, sugar: 3, gi: 60, category: "mixed" },
{ id: 109, name: "Turkey sandwich", carbs: 40, protein: 20, fat: 8, satFat: 2, fiber: 4, sugar: 5, gi: 65, category: "mixed" },
{ id: 110, name: "Ham sandwich", carbs: 40, protein: 18, fat: 9, satFat: 3, fiber: 3, sugar: 5, gi: 65, category: "mixed" },
{ id: 111, name: "BLT sandwich", carbs: 38, protein: 16, fat: 18, satFat: 6, fiber: 3, sugar: 4, gi: 65, category: "mixed" },
{ id: 112, name: "Grilled chicken salad", carbs: 10, protein: 30, fat: 10, satFat: 2, fiber: 4, sugar: 4, gi: 25, category: "mixed" },
{ id: 113, name: "Caesar salad", carbs: 12, protein: 10, fat: 20, satFat: 4, fiber: 3, sugar: 2, gi: 30, category: "mixed" },
{ id: 114, name: "Chef salad", carbs: 10, protein: 25, fat: 15, satFat: 5, fiber: 3, sugar: 3, gi: 30, category: "mixed" },
{ id: 115, name: "Spaghetti with sauce", carbs: 50, protein: 12, fat: 6, satFat: 1, fiber: 3, sugar: 6, gi: 55, category: "mixed" },
{ id: 116, name: "Spaghetti with meat sauce", carbs: 50, protein: 20, fat: 12, satFat: 4, fiber: 3, sugar: 6, gi: 55, category: "mixed" },
{ id: 117, name: "Lasagna", carbs: 45, protein: 20, fat: 18, satFat: 8, fiber: 3, sugar: 6, gi: 60, category: "mixed" },
{ id: 118, name: "Chicken burrito bowl", carbs: 55, protein: 30, fat: 12, satFat: 3, fiber: 6, sugar: 4, gi: 60, category: "mixed", locked: true },
{ id: 119, name: "Beef burrito bowl", carbs: 55, protein: 28, fat: 18, satFat: 6, fiber: 6, sugar: 4, gi: 60, category: "mixed", locked: true },
{ id: 120, name: "Rice and beans", carbs: 60, protein: 12, fat: 3, satFat: 1, fiber: 7, sugar: 2, gi: 60, category: "mixed" },
{ id: 121, name: "Chicken wings", carbs: 3, protein: 20, fat: 18, satFat: 5, fiber: 0, sugar: 1, gi: 20, category: "protein" },
{ id: 122, name: "Buffalo wings", carbs: 5, protein: 20, fat: 20, satFat: 6, fiber: 0, sugar: 1, gi: 25, category: "mixed" },
{ id: 123, name: "Hot dog", carbs: 30, protein: 10, fat: 18, satFat: 7, fiber: 2, sugar: 5, gi: 65, category: "mixed" },
{ id: 124, name: "Corn dog", carbs: 32, protein: 9, fat: 15, satFat: 4, fiber: 1, sugar: 6, gi: 70, category: "mixed" },
{ id: 125, name: "Chicken tenders", carbs: 20, protein: 20, fat: 15, satFat: 3, fiber: 1, sugar: 1, gi: 55, category: "mixed" },
{ id: 126, name: "Chicken nuggets with sauce", carbs: 25, protein: 15, fat: 18, satFat: 4, fiber: 1, sugar: 6, gi: 60, category: "mixed" },
{ id: 127, name: "Honey mustard", carbs: 8, protein: 0, fat: 3, satFat: 0, fiber: 0, sugar: 7, gi: 60, category: "condiment" },
{ id: 128, name: "Sweet chili sauce", carbs: 10, protein: 0, fat: 0, satFat: 0, fiber: 0, sugar: 9, gi: 70, category: "condiment" },
{ id: 129, name: "Soy sauce", carbs: 1, protein: 1, fat: 0, satFat: 0, fiber: 0, sugar: 0, gi: 20, category: "condiment" },
{ id: 130, name: "Teriyaki sauce", carbs: 8, protein: 1, fat: 0, satFat: 0, fiber: 0, sugar: 7, gi: 65, category: "condiment" },
{ id: 131, name: "Alfredo sauce", carbs: 3, protein: 2, fat: 20, satFat: 12, fiber: 0, sugar: 1, gi: 20, category: "condiment" },
{ id: 132, name: "Marinara sauce", carbs: 10, protein: 2, fat: 2, satFat: 0, fiber: 2, sugar: 6, gi: 50, category: "condiment" },
{ id: 133, name: "Potato chips", carbs: 15, protein: 2, fat: 10, satFat: 1, fiber: 1, sugar: 1, gi: 75, category: "carb" },
{ id: 134, name: "Tortilla chips", carbs: 19, protein: 2, fat: 7, satFat: 1, fiber: 2, sugar: 1, gi: 70, category: "carb" },
{ id: 135, name: "Popcorn", carbs: 19, protein: 3, fat: 4, satFat: 1, fiber: 3, sugar: 1, gi: 65, category: "carb" },
{ id: 136, name: "Trail mix", carbs: 25, protein: 6, fat: 12, satFat: 3, fiber: 3, sugar: 12, gi: 55, category: "mixed" },
{ id: 137, name: "Egg sandwich", carbs: 30, protein: 15, fat: 10, satFat: 4, fiber: 2, sugar: 4, gi: 65, category: "mixed" },
{ id: 138, name: "Breakfast burrito", carbs: 35, protein: 18, fat: 15, satFat: 5, fiber: 3, sugar: 3, gi: 60, category: "mixed", locked: true },
{ id: 139, name: "Bagel with cream cheese", carbs: 50, protein: 12, fat: 12, satFat: 6, fiber: 2, sugar: 6, gi: 70, category: "mixed" },
{ id: 140, name: "French toast", carbs: 45, protein: 10, fat: 12, satFat: 4, fiber: 2, sugar: 12, gi: 70, category: "mixed" },
{ id: 141, name: "Diet soda", carbs: 0, protein: 0, fat: 0, satFat: 0, fiber: 0, sugar: 0, gi: 0, category: "drink" },
{ id: 142, name: "Sports drink", carbs: 21, protein: 0, fat: 0, satFat: 0, fiber: 0, sugar: 21, gi: 78, category: "drink" },
{ id: 143, name: "Sweet tea", carbs: 25, protein: 0, fat: 0, satFat: 0, fiber: 0, sugar: 25, gi: 60, category: "drink" },
{ id: 144, name: "Iced coffee sweetened", carbs: 20, protein: 2, fat: 2, satFat: 1, fiber: 0, sugar: 18, gi: 55, category: "drink" },
{ id: 145, name: "Smoothie", carbs: 35, protein: 5, fat: 2, satFat: 1, fiber: 3, sugar: 25, gi: 60, category: "drink" },
{ id: 146, name: "Guacamole", carbs: 8, protein: 2, fat: 14, satFat: 2, fiber: 6, sugar: 1, gi: 15, category: "mixed" },
{ id: 147, name: "Rice cake", carbs: 35, protein: 3, fat: 1, satFat: 0, fiber: 1, sugar: 0, gi: 82, category: "carb" },
{ id: 148, name: "Granola", carbs: 45, protein: 6, fat: 15, satFat: 3, fiber: 5, sugar: 15, gi: 65, category: "mixed" },
{ id: 149, name: "Ice cream", carbs: 30, protein: 5, fat: 15, satFat: 9, fiber: 1, sugar: 28, gi: 60, category: "sugary" },
{ id: 150, name: "Milkshake", carbs: 45, protein: 8, fat: 18, satFat: 11, fiber: 1, sugar: 40, gi: 65, category: "sugary" },
{ id: 151, name: "Chocolate bar", carbs: 30, protein: 3, fat: 13, satFat: 8, fiber: 2, sugar: 24, gi: 55, category: "sugary" },
{ id: 152, name: "Candy", carbs: 26, protein: 0, fat: 0, satFat: 0, fiber: 0, sugar: 26, gi: 80, category: "sugary" },
{ id: 153, name: "Peanut butter sandwich", carbs: 40, protein: 14, fat: 18, satFat: 4, fiber: 4, sugar: 10, gi: 65, category: "mixed" },
{ id: 154, name: "Grilled cheese", carbs: 35, protein: 12, fat: 15, satFat: 8, fiber: 2, sugar: 4, gi: 65, category: "mixed" },
{ id: 155, name: "Chicken and rice", carbs: 45, protein: 30, fat: 5, satFat: 1, fiber: 2, sugar: 1, gi: 65, category: "mixed" },
{ id: 156, name: "Steak and potatoes", carbs: 35, protein: 30, fat: 20, satFat: 8, fiber: 4, sugar: 2, gi: 75, category: "mixed" },
{ id: 157, name: "Rice and chicken bowl", carbs: 50, protein: 28, fat: 6, satFat: 2, fiber: 2, sugar: 2, gi: 65, category: "mixed", locked: true },
{ id: 158, name: "Chicken pasta", carbs: 45, protein: 25, fat: 8, satFat: 3, fiber: 3, sugar: 3, gi: 55, category: "mixed", locked: true },
{ id: 159, name: "Protein bar", carbs: 25, protein: 20, fat: 7, satFat: 3, fiber: 5, sugar: 10, gi: 50, category: "mixed" },
{ id: 160, name: "Energy bar", carbs: 35, protein: 5, fat: 8, satFat: 3, fiber: 3, sugar: 20, gi: 65, category: "mixed" },
{ id: 161, name: "Egg omelet", carbs: 3, protein: 14, fat: 11, satFat: 4, fiber: 0, sugar: 1, gi: 0, category: "protein" },
{ id: 162, name: "Vegetable omelet", carbs: 6, protein: 14, fat: 11, satFat: 4, fiber: 2, sugar: 2, gi: 15, category: "protein" },
{ id: 163, name: "Chicken Caesar wrap", carbs: 38, protein: 25, fat: 15, satFat: 4, fiber: 3, sugar: 3, gi: 60, category: "mixed" },
{ id: 164, name: "Beef taco", carbs: 22, protein: 12, fat: 10, satFat: 4, fiber: 3, sugar: 2, gi: 60, category: "mixed" },
{ id: 165, name: "Rice bowl", carbs: 50, protein: 8, fat: 3, satFat: 1, fiber: 2, sugar: 1, gi: 65, category: "carb", locked: true },
{ id: 166, name: "Veggie bowl", carbs: 30, protein: 6, fat: 5, satFat: 1, fiber: 6, sugar: 5, gi: 50, category: "mixed", locked: true },
{ id: 167, name: "Chicken fried rice", carbs: 55, protein: 20, fat: 12, satFat: 2, fiber: 3, sugar: 3, gi: 68, category: "mixed" },
{ id: 168, name: "Beef fried rice", carbs: 55, protein: 18, fat: 15, satFat: 5, fiber: 3, sugar: 3, gi: 68, category: "mixed" },
{ id: 169, name: "Shrimp fried rice", carbs: 55, protein: 18, fat: 10, satFat: 2, fiber: 3, sugar: 3, gi: 68, category: "mixed" },
{ id: 170, name: "Lo mein", carbs: 60, protein: 12, fat: 10, satFat: 2, fiber: 3, sugar: 5, gi: 65, category: "mixed" },
{ id: 171, name: "Chicken lo mein", carbs: 60, protein: 20, fat: 10, satFat: 2, fiber: 3, sugar: 5, gi: 65, category: "mixed" },
{ id: 172, name: "Orange chicken", carbs: 40, protein: 20, fat: 18, satFat: 4, fiber: 2, sugar: 20, gi: 70, category: "mixed" },
{ id: 173, name: "General tso chicken", carbs: 45, protein: 20, fat: 18, satFat: 4, fiber: 2, sugar: 18, gi: 72, category: "mixed" },
{ id: 174, name: "Fried shrimp", carbs: 15, protein: 20, fat: 12, satFat: 2, fiber: 1, sugar: 1, gi: 55, category: "mixed" },
{ id: 175, name: "Chicken quesadilla", carbs: 40, protein: 22, fat: 18, satFat: 8, fiber: 3, sugar: 3, gi: 60, category: "mixed" },
{ id: 176, name: "Cheese quesadilla", carbs: 35, protein: 12, fat: 18, satFat: 9, fiber: 2, sugar: 3, gi: 60, category: "mixed" },
{ id: 177, name: "Nachos", carbs: 45, protein: 12, fat: 20, satFat: 7, fiber: 4, sugar: 3, gi: 65, category: "mixed" },
{ id: 178, name: "Chicken fajitas", carbs: 30, protein: 25, fat: 12, satFat: 3, fiber: 4, sugar: 4, gi: 55, category: "mixed" },
{ id: 179, name: "Beef fajitas", carbs: 30, protein: 24, fat: 18, satFat: 6, fiber: 4, sugar: 4, gi: 55, category: "mixed" },
{ id: 180, name: "Steak burrito", carbs: 55, protein: 28, fat: 18, satFat: 6, fiber: 6, sugar: 3, gi: 65, category: "mixed", locked: true },
{ id: 181, name: "Chicken alfredo", carbs: 50, protein: 25, fat: 20, satFat: 10, fiber: 3, sugar: 3, gi: 55, category: "mixed", locked: true },
{ id: 182, name: "Shrimp alfredo", carbs: 50, protein: 22, fat: 20, satFat: 10, fiber: 3, sugar: 3, gi: 55, category: "mixed", locked: true },
{ id: 183, name: "Garlic bread", carbs: 40, protein: 6, fat: 10, satFat: 3, fiber: 2, sugar: 3, gi: 75, category: "carb" },
{ id: 184, name: "Chicken soup", carbs: 10, protein: 12, fat: 6, satFat: 2, fiber: 1, sugar: 2, gi: 40, category: "mixed" },
{ id: 185, name: "Vegetable soup", carbs: 15, protein: 5, fat: 3, satFat: 1, fiber: 4, sugar: 4, gi: 45, category: "mixed" },
{ id: 186, name: "Chili", carbs: 30, protein: 18, fat: 10, satFat: 4, fiber: 8, sugar: 6, gi: 50, category: "mixed" },
{ id: 187, name: "Thousand island dressing", carbs: 5, protein: 0, fat: 14, satFat: 2, fiber: 0, sugar: 4, gi: 35, category: "condiment" },
{ id: 188, name: "Blue cheese dressing", carbs: 2, protein: 1, fat: 15, satFat: 3, fiber: 0, sugar: 1, gi: 20, category: "condiment" },
{ id: 189, name: "Vinaigrette", carbs: 3, protein: 0, fat: 12, satFat: 2, fiber: 0, sugar: 2, gi: 30, category: "condiment" },
{ id: 190, name: "Cheese crackers", carbs: 22, protein: 3, fat: 9, satFat: 2, fiber: 1, sugar: 3, gi: 70, category: "carb" },
{ id: 191, name: "Snack mix", carbs: 25, protein: 5, fat: 12, satFat: 2, fiber: 2, sugar: 6, gi: 65, category: "mixed" },
{ id: 192, name: "Apple juice", carbs: 28, protein: 0, fat: 0, satFat: 0, fiber: 0, sugar: 24, gi: 44, category: "drink" },
{ id: 193, name: "Grape juice", carbs: 36, protein: 1, fat: 0, satFat: 0, fiber: 0, sugar: 34, gi: 59, category: "drink" },
{ id: 194, name: "Latte", carbs: 12, protein: 8, fat: 5, satFat: 3, fiber: 0, sugar: 12, gi: 30, category: "drink" },
{ id: 195, name: "Sweetened latte", carbs: 25, protein: 8, fat: 6, satFat: 4, fiber: 0, sugar: 22, gi: 50, category: "drink" },
{ id: 196, name: "Milk chocolate", carbs: 26, protein: 3, fat: 13, satFat: 8, fiber: 2, sugar: 24, gi: 55, category: "sugary" },
{ id: 197, name: "Dark chocolate", carbs: 20, protein: 3, fat: 12, satFat: 7, fiber: 3, sugar: 12, gi: 40, category: "sugary" },
{ id: 198, name: "Cupcake", carbs: 35, protein: 3, fat: 12, satFat: 4, fiber: 1, sugar: 28, gi: 70, category: "sugary" },
{ id: 199, name: "Cake", carbs: 40, protein: 4, fat: 15, satFat: 5, fiber: 1, sugar: 30, gi: 70, category: "sugary" },
{ id: 200, name: "Frozen yogurt", carbs: 30, protein: 5, fat: 4, satFat: 3, fiber: 1, sugar: 25, gi: 60, category: "sugary" },
{ id: 201, name: "PB&J sandwich", carbs: 45, protein: 14, fat: 16, satFat: 3, fiber: 4, sugar: 18, gi: 65, category: "mixed" },
{ id: 202, name: "Grilled chicken bowl", carbs: 40, protein: 30, fat: 8, satFat: 2, fiber: 3, sugar: 3, gi: 60, category: "mixed", locked: true },
{ id: 203, name: "Steak bowl", carbs: 40, protein: 28, fat: 18, satFat: 6, fiber: 3, sugar: 3, gi: 60, category: "mixed", locked: true },
{ id: 204, name: "Veggie wrap", carbs: 35, protein: 8, fat: 10, satFat: 2, fiber: 5, sugar: 5, gi: 55, category: "mixed" },
{ id: 205, name: "Chicken parmesan", carbs: 45, protein: 28, fat: 18, satFat: 7, fiber: 3, sugar: 4, gi: 60, category: "mixed" },
{ id: 206, name: "Chicken pot pie", carbs: 35, protein: 15, fat: 20, satFat: 7, fiber: 3, sugar: 4, gi: 65, category: "mixed" },
{ id: 207, name: "Beef stew", carbs: 20, protein: 20, fat: 10, satFat: 4, fiber: 3, sugar: 3, gi: 50, category: "mixed" },
{ id: 208, name: "Turkey chili", carbs: 28, protein: 20, fat: 8, satFat: 2, fiber: 7, sugar: 5, gi: 50, category: "mixed" },
{ id: 209, name: "Chicken noodle soup", carbs: 15, protein: 10, fat: 5, satFat: 1, fiber: 1, sugar: 2, gi: 45, category: "mixed" },
{ id: 210, name: "Egg salad sandwich", carbs: 30, protein: 14, fat: 18, satFat: 5, fiber: 2, sugar: 4, gi: 65, category: "mixed" },
{ id: 211, name: "Tuna salad sandwich", carbs: 30, protein: 20, fat: 15, satFat: 3, fiber: 2, sugar: 4, gi: 65, category: "mixed" },
{ id: 212, name: "Chicken salad sandwich", carbs: 30, protein: 22, fat: 15, satFat: 3, fiber: 2, sugar: 4, gi: 65, category: "mixed" },
{ id: 213, name: "Ham and cheese sandwich", carbs: 35, protein: 20, fat: 15, satFat: 6, fiber: 2, sugar: 5, gi: 65, category: "mixed" },
{ id: 214, name: "Sub sandwich", carbs: 50, protein: 25, fat: 15, satFat: 5, fiber: 3, sugar: 6, gi: 65, category: "mixed", locked: true },
{ id: 215, name: "Turkey sub", carbs: 50, protein: 28, fat: 10, satFat: 3, fiber: 4, sugar: 7, gi: 65, category: "mixed", locked: true },
{ id: 216, name: "Ham sub", carbs: 50, protein: 26, fat: 12, satFat: 4, fiber: 4, sugar: 7, gi: 65, category: "mixed", locked: true },
{ id: 217, name: "Italian sub", carbs: 50, protein: 28, fat: 22, satFat: 8, fiber: 4, sugar: 7, gi: 65, category: "mixed", locked: true },
{ id: 218, name: "Club sub", carbs: 50, protein: 32, fat: 18, satFat: 6, fiber: 4, sugar: 7, gi: 65, category: "mixed", locked: true },
{ id: 219, name: "Roast beef sub", carbs: 50, protein: 30, fat: 12, satFat: 4, fiber: 4, sugar: 7, gi: 65, category: "mixed", locked: true },
{ id: 220, name: "Chicken cheesesteak sub", carbs: 55, protein: 35, fat: 18, satFat: 7, fiber: 4, sugar: 8, gi: 65, category: "mixed", locked: true },
{ id: 221, name: "Philly cheesesteak sub", carbs: 55, protein: 34, fat: 24, satFat: 10, fiber: 4, sugar: 8, gi: 65, category: "mixed", locked: true },
{ id: 222, name: "Tuna sub", carbs: 50, protein: 30, fat: 20, satFat: 4, fiber: 4, sugar: 7, gi: 65, category: "mixed", locked: true },
{ id: 223, name: "Meatball sub", carbs: 60, protein: 28, fat: 24, satFat: 9, fiber: 4, sugar: 10, gi: 68, category: "mixed", locked: true },
{ id: 224, name: "Chicken bacon ranch sub", carbs: 55, protein: 35, fat: 25, satFat: 8, fiber: 4, sugar: 8, gi: 65, category: "mixed", locked: true },
{ id: 225, name: "Veggie sub", carbs: 50, protein: 12, fat: 8, satFat: 2, fiber: 6, sugar: 8, gi: 60, category: "mixed", locked: true },
{ id: 226, name: "Grilled chicken sub", carbs: 50, protein: 35, fat: 10, satFat: 3, fiber: 4, sugar: 7, gi: 65, category: "mixed", locked: true },
{ id: 227, name: "Buffalo chicken sub", carbs: 52, protein: 34, fat: 14, satFat: 4, fiber: 4, sugar: 7, gi: 65, category: "mixed", locked: true },
{ id: 228, name: "Steak and cheese sub", carbs: 55, protein: 34, fat: 24, satFat: 10, fiber: 4, sugar: 8, gi: 65, category: "mixed", locked: true },
{ id: 229, name: "Cold cut sub", carbs: 50, protein: 25, fat: 22, satFat: 8, fiber: 4, sugar: 7, gi: 65, category: "mixed", locked: true },
{ id: 230, name: "Wrap sandwich", carbs: 35, protein: 20, fat: 12, satFat: 4, fiber: 3, sugar: 4, gi: 60, category: "mixed" },
{ id: 231, name: "Chicken stir fry", carbs: 40, protein: 25, fat: 10, satFat: 2, fiber: 4, sugar: 6, gi: 55, category: "mixed", locked: true },
{ id: 232, name: "Beef stir fry", carbs: 40, protein: 24, fat: 15, satFat: 5, fiber: 4, sugar: 6, gi: 55, category: "mixed" },
{ id: 233, name: "Shrimp stir fry", carbs: 40, protein: 22, fat: 8, satFat: 1, fiber: 4, sugar: 6, gi: 55, category: "mixed", locked: true },
{ id: 234, name: "Vegetable stir fry", carbs: 30, protein: 8, fat: 8, satFat: 1, fiber: 6, sugar: 8, gi: 50, category: "mixed" },
{ id: 235, name: "Rice noodles", carbs: 45, protein: 5, fat: 1, satFat: 0, fiber: 1, sugar: 1, gi: 60, category: "carb" },
{ id: 236, name: "Pad thai", carbs: 55, protein: 20, fat: 15, satFat: 3, fiber: 3, sugar: 10, gi: 65, category: "mixed" },
{ id: 237, name: "Chicken curry", carbs: 30, protein: 25, fat: 15, satFat: 7, fiber: 4, sugar: 6, gi: 55, category: "mixed" },
{ id: 238, name: "Beef curry", carbs: 30, protein: 24, fat: 18, satFat: 8, fiber: 4, sugar: 6, gi: 55, category: "mixed" },
{ id: 239, name: "Vegetable curry", carbs: 35, protein: 8, fat: 10, satFat: 5, fiber: 6, sugar: 8, gi: 55, category: "mixed" },
{ id: 240, name: "Naan bread", carbs: 40, protein: 6, fat: 5, satFat: 1, fiber: 2, sugar: 2, gi: 70, category: "carb" },
{ id: 241, name: "Falafel", carbs: 30, protein: 10, fat: 15, satFat: 2, fiber: 5, sugar: 2, gi: 55, category: "mixed" },
{ id: 242, name: "Hummus", carbs: 15, protein: 8, fat: 10, satFat: 1, fiber: 5, sugar: 2, gi: 30, category: "mixed" },
{ id: 243, name: "Pita bread", carbs: 35, protein: 6, fat: 1, satFat: 0, fiber: 2, sugar: 1, gi: 68, category: "carb" },
{ id: 244, name: "Gyro", carbs: 40, protein: 20, fat: 20, satFat: 7, fiber: 3, sugar: 4, gi: 65, category: "mixed" },
{ id: 245, name: "Chicken gyro", carbs: 40, protein: 22, fat: 15, satFat: 4, fiber: 3, sugar: 4, gi: 65, category: "mixed" },
{ id: 246, name: "Beef gyro", carbs: 40, protein: 22, fat: 18, satFat: 7, fiber: 3, sugar: 4, gi: 65, category: "mixed" },
{ id: 247, name: "Protein smoothie", carbs: 25, protein: 20, fat: 5, satFat: 1, fiber: 3, sugar: 15, gi: 50, category: "drink" },
{ id: 248, name: "Green smoothie", carbs: 20, protein: 5, fat: 3, satFat: 0, fiber: 4, sugar: 12, gi: 45, category: "drink" },
{ id: 249, name: "Fruit smoothie", carbs: 35, protein: 4, fat: 2, satFat: 1, fiber: 3, sugar: 25, gi: 55, category: "drink" },
{ id: 250, name: "Eggplant parmesan", carbs: 40, protein: 12, fat: 18, satFat: 7, fiber: 5, sugar: 6, gi: 60, category: "mixed" },
{ id: 251, name: "Baked ziti", carbs: 55, protein: 18, fat: 15, satFat: 7, fiber: 3, sugar: 6, gi: 60, category: "mixed" },
{ id: 252, name: "Lasagna with meat", carbs: 50, protein: 25, fat: 20, satFat: 9, fiber: 3, sugar: 6, gi: 60, category: "mixed", locked: true },
{ id: 253, name: "Ravioli", carbs: 45, protein: 15, fat: 10, satFat: 5, fiber: 2, sugar: 4, gi: 60, category: "mixed" },
{ id: 254, name: "Tortellini", carbs: 45, protein: 15, fat: 12, satFat: 6, fiber: 2, sugar: 4, gi: 60, category: "mixed" },
{ id: 255, name: "Fettuccine alfredo", carbs: 50, protein: 15, fat: 22, satFat: 13, fiber: 2, sugar: 3, gi: 55, category: "mixed", locked: true },
{ id: 256, name: "Chicken marsala", carbs: 20, protein: 30, fat: 12, satFat: 4, fiber: 1, sugar: 5, gi: 45, category: "mixed", locked: true },
{ id: 257, name: "Risotto", carbs: 50, protein: 10, fat: 10, satFat: 5, fiber: 2, sugar: 2, gi: 70, category: "carb", locked: true },
{ id: 258, name: "Garlic knots", carbs: 35, protein: 6, fat: 10, satFat: 3, fiber: 2, sugar: 3, gi: 75, category: "carb" },
{ id: 259, name: "Chicken taco", carbs: 20, protein: 14, fat: 8, satFat: 2, fiber: 3, sugar: 2, gi: 60, category: "mixed" },
{ id: 260, name: "Beef burrito", carbs: 60, protein: 25, fat: 18, satFat: 6, fiber: 6, sugar: 4, gi: 65, category: "mixed", locked: true },
{ id: 261, name: "Chicken burrito", carbs: 60, protein: 28, fat: 12, satFat: 3, fiber: 6, sugar: 4, gi: 65, category: "mixed", locked: true },
{ id: 262, name: "Quesadilla", carbs: 35, protein: 12, fat: 18, satFat: 9, fiber: 2, sugar: 3, gi: 60, category: "mixed" },
{ id: 263, name: "Enchiladas", carbs: 45, protein: 20, fat: 15, satFat: 6, fiber: 4, sugar: 5, gi: 65, category: "mixed" },
{ id: 264, name: "Tamales", carbs: 40, protein: 10, fat: 12, satFat: 4, fiber: 3, sugar: 2, gi: 60, category: "mixed" },
{ id: 265, name: "Refried beans", carbs: 30, protein: 10, fat: 8, satFat: 2, fiber: 7, sugar: 2, gi: 50, category: "mixed" },
{ id: 266, name: "Chips and salsa", carbs: 35, protein: 4, fat: 12, satFat: 2, fiber: 3, sugar: 4, gi: 70, category: "mixed" },
{ id: 267, name: "Queso dip", carbs: 8, protein: 5, fat: 18, satFat: 11, fiber: 0, sugar: 2, gi: 30, category: "condiment" },
{ id: 268, name: "California roll", carbs: 35, protein: 8, fat: 7, satFat: 1, fiber: 2, sugar: 6, gi: 55, category: "mixed" },
{ id: 269, name: "Spicy tuna roll", carbs: 30, protein: 12, fat: 10, satFat: 2, fiber: 1, sugar: 3, gi: 55, category: "mixed" },
{ id: 270, name: "Salmon sushi", carbs: 25, protein: 12, fat: 6, satFat: 1, fiber: 0, sugar: 2, gi: 55, category: "mixed" },
{ id: 271, name: "Shrimp tempura roll", carbs: 40, protein: 10, fat: 14, satFat: 2, fiber: 2, sugar: 5, gi: 65, category: "mixed" },
{ id: 272, name: "Sashimi", carbs: 0, protein: 20, fat: 5, satFat: 1, fiber: 0, sugar: 0, gi: 0, category: "protein" },
{ id: 273, name: "Miso soup", carbs: 5, protein: 5, fat: 2, satFat: 0, fiber: 1, sugar: 2, gi: 30, category: "mixed" },
{ id: 274, name: "Ramen", carbs: 60, protein: 20, fat: 15, satFat: 6, fiber: 3, sugar: 6, gi: 65, category: "mixed" },
{ id: 275, name: "Teriyaki chicken", carbs: 20, protein: 25, fat: 10, satFat: 2, fiber: 1, sugar: 10, gi: 55, category: "mixed" },
{ id: 276, name: "Greek salad", carbs: 10, protein: 6, fat: 12, satFat: 4, fiber: 3, sugar: 4, gi: 30, category: "mixed" },
{ id: 277, name: "Hummus with pita", carbs: 35, protein: 10, fat: 12, satFat: 2, fiber: 5, sugar: 3, gi: 55, category: "mixed", locked: true },
{ id: 278, name: "Falafel wrap", carbs: 45, protein: 12, fat: 15, satFat: 2, fiber: 6, sugar: 3, gi: 60, category: "mixed" },
{ id: 279, name: "Tzatziki sauce", carbs: 3, protein: 2, fat: 5, satFat: 3, fiber: 0, sugar: 2, gi: 20, category: "condiment" },
{ id: 280, name: "Sesame chicken", carbs: 40, protein: 20, fat: 18, satFat: 4, fiber: 2, sugar: 14, gi: 70, category: "mixed" },
{ id: 281, name: "Sweet and sour chicken", carbs: 45, protein: 18, fat: 15, satFat: 3, fiber: 2, sugar: 18, gi: 72, category: "mixed" },
{ id: 282, name: "Kung pao chicken", carbs: 20, protein: 25, fat: 15, satFat: 3, fiber: 3, sugar: 6, gi: 50, category: "mixed" },
{ id: 283, name: "Orange beef", carbs: 35, protein: 20, fat: 18, satFat: 6, fiber: 2, sugar: 16, gi: 70, category: "mixed" },
{ id: 284, name: "Bean burrito", carbs: 55, protein: 15, fat: 10, satFat: 3, fiber: 10, sugar: 3, gi: 60, category: "mixed", locked: true },
{ id: 285, name: "Potato wedges", carbs: 35, protein: 4, fat: 15, satFat: 3, fiber: 4, sugar: 1, gi: 70, category: "carb" },
{ id: 286, name: "Onion rings", carbs: 30, protein: 3, fat: 20, satFat: 4, fiber: 2, sugar: 3, gi: 70, category: "mixed" },
{ id: 287, name: "Chicken and broccoli", carbs: 15, protein: 30, fat: 8, satFat: 2, fiber: 4, sugar: 5, gi: 40, category: "mixed" },
{ id: 288, name: "Beef and broccoli", carbs: 15, protein: 28, fat: 12, satFat: 4, fiber: 4, sugar: 5, gi: 40, category: "mixed" },
{ id: 289, name: "Chow mein", carbs: 55, protein: 12, fat: 10, satFat: 2, fiber: 3, sugar: 5, gi: 65, category: "mixed" },
{ id: 290, name: "Pad see ew", carbs: 60, protein: 15, fat: 12, satFat: 3, fiber: 3, sugar: 6, gi: 65, category: "mixed" },
{ id: 291, name: "Meatloaf", carbs: 15, protein: 25, fat: 18, satFat: 7, fiber: 1, sugar: 6, gi: 55, category: "mixed", locked: true },
// Chick-fil-A
{
  name: "Chick-fil-A Chicken Sandwich",
  carbs: 41, protein: 29, fat: 18, satFat: 3.5, fiber: 1, sugar: 6, gi: 68
},
{
  name: "Chick-fil-A Spicy Chicken Sandwich",
  carbs: 45, protein: 28, fat: 19, satFat: 4, fiber: 1, sugar: 6, gi: 70
},
{
  name: "Chick-fil-A Grilled Chicken Sandwich",
  carbs: 45, protein: 28, fat: 11, satFat: 2.5, fiber: 3, sugar: 11, gi: 60
},
{
  name: "Chick-fil-A 12 Count Nuggets",
  carbs: 16, protein: 40, fat: 17, satFat: 3.5, fiber: 0, sugar: 1, gi: 20
},
{
  name: "Chick-fil-A Cobb Salad",
  carbs: 13, protein: 42, fat: 31, satFat: 8, fiber: 4, sugar: 7, gi: 15
},
{
  name: "Chick-fil-A Market Salad",
  carbs: 24, protein: 28, fat: 13, satFat: 2.5, fiber: 5, sugar: 14, gi: 30
},

// McDonald's
{
  name: "McDonald's Big Mac",
  carbs: 45, protein: 26, fat: 34, satFat: 11, fiber: 3, sugar: 9, gi: 65
},
{
  name: "McDonald's Quarter Pounder with Cheese",
  carbs: 42, protein: 30, fat: 26, satFat: 12, fiber: 2, sugar: 10, gi: 65
},
{
  name: "McDonald's McChicken",
  carbs: 40, protein: 14, fat: 21, satFat: 3.5, fiber: 2, sugar: 5, gi: 68
},
{
  name: "McDonald's Filet-O-Fish",
  carbs: 39, protein: 16, fat: 19, satFat: 4, fiber: 2, sugar: 5, gi: 65
},
{
  name: "McDonald's 10 Piece McNuggets",
  carbs: 26, protein: 24, fat: 24, satFat: 4, fiber: 1, sugar: 0, gi: 30
},
{
  name: "McDonald's Egg McMuffin",
  carbs: 30, protein: 17, fat: 13, satFat: 6, fiber: 2, sugar: 3, gi: 55
},

// Chipotle
{
  name: "Chipotle Chicken Burrito",
  carbs: 115, protein: 48, fat: 24, satFat: 8, fiber: 12, sugar: 4, gi: 58
},
{
  name: "Chipotle Steak Burrito",
  carbs: 112, protein: 50, fat: 23, satFat: 8, fiber: 12, sugar: 4, gi: 58
},
{
  name: "Chipotle Chicken Bowl",
  carbs: 58, protein: 45, fat: 17, satFat: 5, fiber: 12, sugar: 3, gi: 52
},
{
  name: "Chipotle Steak Bowl",
  carbs: 55, protein: 47, fat: 18, satFat: 6, fiber: 12, sugar: 3, gi: 52
},
{
  name: "Chipotle Lifestyle Bowl",
  carbs: 18, protein: 40, fat: 24, satFat: 7, fiber: 10, sugar: 3, gi: 25
},

// Panda Express
{
  name: "Panda Express Orange Chicken",
  carbs: 51, protein: 25, fat: 23, satFat: 4, fiber: 2, sugar: 19, gi: 72
},
{
  name: "Panda Express Beijing Beef",
  carbs: 46, protein: 14, fat: 26, satFat: 5, fiber: 2, sugar: 24, gi: 75
},
{
  name: "Panda Express Kung Pao Chicken",
  carbs: 14, protein: 16, fat: 14, satFat: 2.5, fiber: 2, sugar: 6, gi: 35
},
{
  name: "Panda Express Chow Mein",
  carbs: 51, protein: 10, fat: 20, satFat: 3.5, fiber: 4, sugar: 9, gi: 60
},
{
  name: "Panda Express Fried Rice",
  carbs: 85, protein: 11, fat: 16, satFat: 3, fiber: 3, sugar: 7, gi: 72
},

// Taco Bell
{
  name: "Taco Bell Crunchwrap Supreme",
  carbs: 71, protein: 16, fat: 21, satFat: 6, fiber: 6, sugar: 6, gi: 65
},
{
  name: "Taco Bell Chicken Power Bowl",
  carbs: 50, protein: 27, fat: 18, satFat: 5, fiber: 8, sugar: 3, gi: 45
},
{
  name: "Taco Bell Beef Burrito",
  carbs: 55, protein: 18, fat: 16, satFat: 5, fiber: 6, sugar: 4, gi: 60
},

// Olive Garden
{
  name: "Olive Garden Chicken Alfredo",
  carbs: 95, protein: 45, fat: 58, satFat: 28, fiber: 5, sugar: 8, gi: 58
},
{
  name: "Olive Garden Lasagna",
  carbs: 65, protein: 34, fat: 32, satFat: 14, fiber: 5, sugar: 10, gi: 55
},
{
  name: "Olive Garden Chicken Parmigiana",
  carbs: 54, protein: 42, fat: 26, satFat: 8, fiber: 4, sugar: 8, gi: 60
}

];


// ─── HELPERS ──────────────────────────────────────────────────────────────────
function clamp(v, mn, mx) { return Math.min(Math.max(v, mn), mx); }
function r1(v) { return Math.round(v * 10) / 10; }

function todayStr() {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

function yesterdayStr() {
  const d = new Date();
  d.setDate(d.getDate() - 1);
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

// ─── SCORING ENGINE ───────────────────────────────────────────────────────────
function scoreItems(items, useWholeWheat = false) {
  const t = items.reduce(
    (a, i) => ({
      carbs: a.carbs + i.carbs,
      protein: a.protein + i.protein,
      fat: a.fat + i.fat,
      satFat: a.satFat + (i.satFat || 0),
      fiber: a.fiber + i.fiber,
      sugar: a.sugar + i.sugar,
    }),
    { carbs: 0, protein: 0, fat: 0, satFat: 0, fiber: 0, sugar: 0 }
  );

  const hasSub = items.some((i) => {
    const n = i.name.toLowerCase();
    return n.includes("sub") || n.includes("sandwich");
  });
  if (useWholeWheat && hasSub) {
    t.fiber += 3;
    t.carbs = Math.max(0, t.carbs - 5);
  }

  const totalC = items.reduce((s, i) => s + i.carbs, 0);
  const mealGI = totalC > 0 ? items.reduce((s, i) => s + (i.gi || 0) * i.carbs, 0) / totalC : 0;
  const mealGL = r1((mealGI * totalC) / 100);

  const giW = mealGI > 65 ? 0.75 : 0.5;
  let spike = ((100 - mealGI) / 20) * giW + ((40 - mealGL) / 8) * (1 - giW);
  spike += t.fiber / 8;
  const fatEffect = t.fat / 25;
  spike += mealGI > 65 && t.fiber <= 3 ? Math.min(fatEffect, 0.3) : Math.min(fatEffect, 1.5);
  spike += Math.min(t.protein / 15, 2);
  spike -= t.sugar / 10 - (t.fiber >= 3 ? 0.5 : 0);
  const sugarConc = t.carbs > 0 ? t.sugar / t.carbs : 0;
  if (sugarConc >= 0.6 && t.fiber < 1) spike -= 2;
  if (mealGI <= 5 && mealGL <= 2) spike += 1.5;
  if (t.carbs < 10) spike += 2.5;
  const hasFried = items.some((i) => i.name.toLowerCase().includes("fried") && i.carbs > 5);
  if (hasFried) spike -= 1;
  const vegCount = items.filter((i) => i.category === "vegetable").length;
  if (vegCount > 0) spike += 0.3;
  if (vegCount > 0 && t.fiber >= 3) spike += 0.2;
  spike = clamp(r1(spike), 0, 10);

  const satiety = clamp(r1(((3 * t.protein + 3 * t.fat + 2 * t.fiber) / (t.carbs + 2 * t.sugar + 10)) * 2), 0, 10);
  const fullness = clamp(r1(satiety + t.fiber / 4), 0, 10);
  const energyRaw = t.fiber * 2 + t.protein * 1 - t.carbs * 0.7 - t.sugar * 1.2;
  const energySub = clamp(r1((energyRaw + 18) / 3.2), 0, 10);

  let meal = r1(spike * 0.45 + fullness * 0.35 + energySub * 0.2);
  if (hasFried) meal = r1(meal - 0.5);
  meal = clamp(r1(meal - Math.min(t.satFat / 8, 1.5)), 0, 10);

  const spikeLabel = spike <= 4 ? "Poor" : spike <= 7.5 ? "Moderate" : "Strong";
  const fullnessLabel = fullness <= 4 ? "Short" : fullness <= 7.5 ? "Moderate" : "Long";
  const energyLabel = energyRaw <= 4 ? "Low" : energyRaw <= 7.5 ? "Moderate" : "Stable";

  return { t, mealGI: Math.round(mealGI), mealGL, spike, fullness, energySub, meal, spikeLabel, fullnessLabel, energyLabel };
}

function getEatingOrder(items) {
  const pri = { vegetable: 1, protein: 2, fat: 3, starch: 4, sugary: 5, mixed: 4, carb: 4, fruit: 4, drink: 5, condiment: 5 };
  return [...items].sort((a, b) => (pri[a.category] || 6) - (pri[b.category] || 6));
}

function getImprovements(s, items) {
  const imps = [];
  if (s.t.protein < 20)
    imps.push({ label: "Add protein", detail: "Chicken, eggs, fish, or Greek yogurt", proj: Math.min(10, r1(s.meal + 0.9)) });
  if (s.t.fiber < 5)
    imps.push({ label: "Start with fiber", detail: "Side salad, broccoli, or beans before the main", proj: Math.min(10, r1(s.meal + 0.7)) });
  if (s.spike <= 5 && items.length > 1)
    imps.push({ label: "Eat in the suggested order", detail: "Vegetables → protein → starches last", proj: Math.min(10, r1(s.meal + 0.8)) });
  imps.push({ label: "Walk 15 min after eating", detail: "Light activity helps your body clear glucose", proj: Math.min(10, r1(s.meal + 0.6)) });
  return imps;
}

function buildCoaching(s) {
  const notes = [];
  if (s.spikeLabel === "Poor") notes.push("This meal is more likely to cause a sharper blood sugar rise due to its carb and sugar load.");
  else if (s.spikeLabel === "Moderate") notes.push("This meal has a moderate blood sugar impact — not alarming, but there is room to improve.");
  else notes.push("This meal looks favorable from a blood sugar standpoint.");
  if (s.t.protein < 15) notes.push("Protein is on the lower side, which can affect how long you stay full.");
  if (s.t.fiber < 5) notes.push("Adding fiber — like a salad or beans before the meal — could help slow digestion and reduce the glucose spike.");
  if (s.t.satFat >= 8) notes.push("Saturated fat is elevated here. Leaner proteins or lighter prep methods would improve the overall score.");
  notes.push("A 10–15 minute walk after eating is one of the most effective ways to reduce a blood sugar spike. Even a slow walk helps significantly.");
  if (Math.random() < 0.4) {
    notes.push(
      "Magnesium plays a role in insulin sensitivity, and maintaining healthy levels may support better blood sugar control."
    );
  }
  
  if (Math.random() < 0.35) {
    notes.push(
      "Avoiding late-night eating may help improve overnight glucose regulation and metabolic health."
    );
  }
  
  if (Math.random() < 0.35) {
    notes.push(
      "Some people find intermittent fasting or longer breaks between meals helpful for improving insulin sensitivity."
    );
  }
  
  if (Math.random() < 0.4) {
    notes.push(
      "Light movement after meals — even 10 to 20 minutes of walking — may significantly reduce blood sugar spikes."
    );
  }
  return notes.join(" ");
}

function getDailyLabel(score) {
  if (score >= 7.5) return "Strong";
  if (score >= 5) return "Moderate";
  return "Poor";
}

// ─── BADGE CONFIG ─────────────────────────────────────────────────────────────
function computeStats(savedMeals) {
  const byDay = {};
  savedMeals.forEach((m) => {
    if (!byDay[m.date]) byDay[m.date] = [];
    byDay[m.date].push(m.score);
  });
  const days = Object.keys(byDay);
  const trackedDays = days.length;
  const dayAvgs = days.map((d) => ({ date: d, avg: r1(byDay[d].reduce((a, b) => a + b, 0) / byDay[d].length) }));
  const strongDays = dayAvgs.filter((d) => d.avg >= 7.5).length;
  const sorted = [...dayAvgs].sort((a, b) => a.date.localeCompare(b.date));
  let streak = 0;
  for (let i = sorted.length - 1; i >= 0; i--) {
    if (sorted[i].avg >= 7.5) streak++;
    else break;
  }
  return { strongDays, streak, trackedDays, dayAvgs };
}

function getBadgeDefs(strongDays, streak, trackedDays) {
  return [
    { id: "s1", title: "Starter", sub: "1 strong day", unlocked: strongDays >= 1, count: strongDays, cl: "Strong days" },
    { id: "s3", title: "Building", sub: "3 strong days", unlocked: strongDays >= 3, count: Math.floor(strongDays / 3), cl: "Earned" },
    { id: "s7", title: "Consistent", sub: "7 strong days", unlocked: strongDays >= 7, count: Math.floor(strongDays / 7), cl: "Earned" },
    { id: "s30", title: "Strong Month", sub: "30 strong days", unlocked: strongDays >= 30, count: Math.floor(strongDays / 30), cl: "Earned" },
    { id: "r3", title: "3-Day Streak", sub: "3 strong days in a row", unlocked: streak >= 3, count: streak, cl: "Current streak" },
    { id: "r7", title: "1-Week Streak", sub: "7 strong days in a row", unlocked: streak >= 7, count: streak, cl: "Current streak" },
    { id: "r30", title: "1-Month Streak", sub: "30 strong days in a row", unlocked: streak >= 30, count: streak, cl: "Current streak" },
    { id: "t3", title: "Getting Started", sub: "3 days logged", unlocked: trackedDays >= 3, count: trackedDays, cl: "Days logged" },
    { id: "t7", title: "First Week", sub: "7 days logged", unlocked: trackedDays >= 7, count: trackedDays, cl: "Days logged" },
    { id: "t30", title: "1 Month Logged", sub: "30 days logged", unlocked: trackedDays >= 30, count: trackedDays, cl: "Days logged" },
  ];
}

// ─── STYLES ───────────────────────────────────────────────────────────────────
const S = {
  shell: { fontFamily: "'DM Sans', system-ui, sans-serif", maxWidth: 1180, margin: "0 auto", padding: "1.5rem 1rem", color: "#1a1a1a" },
  card: { background: "#fff", border: "1px solid #e8e8e8", borderRadius: 14, padding: "1.25rem", marginBottom: "1rem", boxShadow: "0 1px 4px rgba(0,0,0,0.04)" },
  cardTitle: { fontSize: 17, fontWeight: 600, color: "#111", marginBottom: 3 },
  cardSub: { fontSize: 13, color: "#777", marginBottom: "1rem" },
  input: { width: "100%", padding: "10px 14px", border: "1px solid #ddd", borderRadius: 10, fontSize: 14, background: "#fafafa", outline: "none", boxSizing: "border-box" },
  btnPrimary: { padding: "10px 20px", background: "#111", color: "#fff", border: "none", borderRadius: 10, fontSize: 14, fontWeight: 600, cursor: "pointer" },
  btnGreen: { padding: "10px 20px", background: "#E1F5EE", color: "#085041", border: "1px solid #5DCAA5", borderRadius: 10, fontSize: 13, fontWeight: 600, cursor: "pointer" },
  btnSec: { padding: "10px 18px", background: "#f4f4f4", color: "#333", border: "1px solid #e0e0e0", borderRadius: 10, fontSize: 13, cursor: "pointer" },
  btnDanger: { padding: "5px 10px", background: "#FEF0F0", color: "#C0392B", border: "1px solid #FBBCBC", borderRadius: 8, fontSize: 12, cursor: "pointer" },
  btnLoad: { padding: "5px 10px", background: "#EBF4FF", color: "#1565C0", border: "1px solid #BBDEFB", borderRadius: 8, fontSize: 12, cursor: "pointer" },
  statGrid: { display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 10, marginBottom: "1rem" },
  statCard: { background: "#f8f8f8", borderRadius: 12, padding: 14, textAlign: "center" },
  statNum: { fontSize: 28, fontWeight: 700, color: "#111" },
  statLbl: { fontSize: 12, color: "#888", marginTop: 2 },
  metricGrid: { display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 8, margin: "1rem 0" },
  twoCol: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: 16,
    alignItems: "start",
  },
  
  leftCol: {
    display: "flex",
    flexDirection: "column",
    gap: 16,
  },
  
  rightCol: {
    display: "flex",
    flexDirection: "column",
    gap: 16,
  },
  metricBox: { background: "#f8f8f8", borderRadius: 10, padding: 10, textAlign: "center" },
  metricLbl: { fontSize: 10, color: "#888", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 4 },
  nutGrid: { display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 8 },
  nutItem: { background: "#f8f8f8", borderRadius: 10, padding: 8, textAlign: "center" },
  nutVal: { fontSize: 15, fontWeight: 600, color: "#111" },
  nutLbl: { fontSize: 10, color: "#aaa", marginTop: 2, textTransform: "uppercase", letterSpacing: "0.04em" },
  orderList: { listStyle: "none", display: "flex", flexDirection: "column", gap: 6 },
  orderItem: { display: "flex", alignItems: "center", gap: 10, padding: "9px 12px", background: "#f8f8f8", borderRadius: 10 },
  orderNum: { width: 24, height: 24, borderRadius: "50%", background: "#111", color: "#fff", fontSize: 11, fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 },
  walkTip: { display: "flex", alignItems: "flex-start", gap: 10, padding: "10px 14px", background: "#E1F5EE", borderRadius: 10, marginTop: 10 },
  impCard: { border: "1px solid #eee", borderRadius: 10, padding: "10px 14px", marginBottom: 8 },
  coaching: { background: "#f4f8ff", borderLeft: "3px solid #4A90D9", borderRadius: "0 10px 10px 0", padding: "12px 14px", fontSize: 14, color: "#333", lineHeight: 1.65 },
  histItem: { display: "flex", alignItems: "center", justifyContent: "space-between", padding: "9px 0", borderBottom: "1px solid #f0f0f0", gap: 8 },
  badgeGrid: { display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 8 },
  badgeCard: (unlocked) => ({ borderRadius: 12, padding: "12px 8px", textAlign: "center", border: `1px solid ${unlocked ? "#5DCAA5" : "#eee"}`, background: unlocked ? "#E1F5EE" : "#f9f9f9", opacity: unlocked ? 1 : 0.6 }),
  searchResult: { display: "flex", alignItems: "center", justifyContent: "space-between", padding: "8px 12px", borderBottom: "1px solid #f4f4f4", cursor: "pointer", fontSize: 13 },
  mealItem: { display: "flex", alignItems: "center", justifyContent: "space-between", padding: "8px 12px", background: "#f8f8f8", borderRadius: 10, marginBottom: 6 },
  emptyBox: { textAlign: "center", padding: "1.5rem", color: "#bbb", fontSize: 14 },
  sectionLbl: { fontSize: 11, fontWeight: 600, color: "#aaa", textTransform: "uppercase", letterSpacing: "0.07em", marginBottom: 8, marginTop: "1rem" },
  btnRow: { display: "flex", gap: 8, flexWrap: "wrap", marginTop: 12 },
  toast: { position: "fixed", top: 18, right: 18, background: "#111", color: "#fff", padding: "10px 18px", borderRadius: 10, fontSize: 13, fontWeight: 600, zIndex: 9999, pointerEvents: "none" },
  dailyBig: { fontSize: 40, fontWeight: 700, textAlign: "center" },
  dailyLbl: { fontSize: 14, color: "#777", textAlign: "center", marginTop: 2 },
  dailyGrid: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginTop: 12 },
  insightBox: { background: "#f8f8f8", borderRadius: 10, padding: "10px 14px", marginTop: 10, fontSize: 13, color: "#555", lineHeight: 1.65 },
};

function Badge({ label }) {
  const good = ["Strong", "Long", "Stable"];
  const bad = ["Poor", "Short", "Low"];
  const color = good.includes(label) ? { bg: "#E1F5EE", txt: "#085041", border: "#5DCAA5" }
    : bad.includes(label) ? { bg: "#FEECEC", txt: "#A32D2D", border: "#F5BBBB" }
    : { bg: "#FFF4E0", txt: "#854F0B", border: "#F5C97A" };
  return (
    <span style={{ background: color.bg, color: color.txt, border: `1px solid ${color.border}`, borderRadius: 8, padding: "2px 10px", fontSize: 12, fontWeight: 600, display: "inline-block" }}>
      {label}
    </span>
  );
}

// ─── 7-DAY SPARKLINE CHART ────────────────────────────────────────────────────
function Sparkline({ data }) {
  // data = array of { date, avg } sorted oldest→newest, up to 7 days
  if (!data || data.length < 2) {
    return (
      <div style={{ textAlign: "center", fontSize: 13, color: "#bbb", padding: "1rem 0" }}>
        Log meals on at least 2 days to see your trend
      </div>
    );
  }
  const W = 320, H = 90, PAD = 14;
  const vals = data.map((d) => d.avg);
  const minV = Math.max(0, Math.min(...vals) - 1);
  const maxV = Math.min(10, Math.max(...vals) + 1);
  const xStep = (W - PAD * 2) / (data.length - 1);
  const toY = (v) => PAD + ((maxV - v) / (maxV - minV)) * (H - PAD * 2);
  const toX = (i) => PAD + i * xStep;
  const points = data.map((d, i) => `${toX(i)},${toY(d.avg)}`).join(" ");
  const fillPoints = `${toX(0)},${H} ${points} ${toX(data.length - 1)},${H}`;
  const scoreColor = (s) => s >= 7.5 ? "#1D9E75" : s >= 5 ? "#EF9F27" : "#E24B4A";
  const lastVal = vals[vals.length - 1];
  const trend = vals.length >= 2 ? lastVal - vals[vals.length - 2] : 0;

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 6 }}>
        <div style={{ fontSize: 12, color: "#aaa" }}>Last {data.length} days</div>
        <div style={{ fontSize: 13, fontWeight: 700, color: scoreColor(lastVal) }}>
          {trend > 0 ? "▲" : trend < 0 ? "▼" : "—"} {Math.abs(r1(trend))} vs prev day
        </div>
      </div>
      <svg width="100%" viewBox={`0 0 ${W} ${H}`} style={{ overflow: "visible" }} aria-hidden="true">
        {/* grid lines */}
        {[5, 7.5].map((v) => (
          <line key={v} x1={PAD} x2={W - PAD} y1={toY(v)} y2={toY(v)}
            stroke={v === 7.5 ? "#1D9E75" : "#f0f0f0"} strokeWidth={v === 7.5 ? 1 : 1}
            strokeDasharray={v === 7.5 ? "4 3" : "none"} opacity={0.5} />
        ))}
        {/* fill area */}
        <polygon points={fillPoints} fill="#4A90D9" opacity="0.08" />
        {/* line */}
        <polyline points={points} fill="none" stroke="#4A90D9" strokeWidth="2.5" strokeLinejoin="round" strokeLinecap="round" />
        {/* dots + labels */}
        {data.map((d, i) => (
          <g key={d.date}>
            <circle cx={toX(i)} cy={toY(d.avg)} r="4" fill={scoreColor(d.avg)} stroke="#fff" strokeWidth="2" />
            <text x={toX(i)} y={H - 2} fontSize="9" textAnchor="middle" fill="#bbb">
              {d.date.slice(5)}
            </text>
            <text x={toX(i)} y={toY(d.avg) - 8} fontSize="9" textAnchor="middle" fill={scoreColor(d.avg)} fontWeight="700">
              {d.avg}
            </text>
          </g>
        ))}
      </svg>
      <div style={{ display: "flex", gap: 12, justifyContent: "center", marginTop: 6, fontSize: 11, color: "#aaa" }}>
        <span><span style={{ color: "#1D9E75", fontWeight: 700 }}>— — </span>Strong threshold (7.5)</span>
      </div>
    </div>
  );
}

function GaugeArc({ score, size = 220, compact = false }) {
  const arc = 283;
  const offset = arc - (score / 10) * arc;
  const color = score >= 7.5 ? "#1D9E75" : score >= 5 ? "#EF9F27" : "#E24B4A";
  const verdict = score >= 7.5 ? "Strong" : score >= 5 ? "Moderate" : "Needs work";

  const width = compact ? 130 : size;
  const height = compact ? 78 : 120;
  const fontSize = compact ? 22 : 32;

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", padding: compact ? "0.25rem 0" : "0.75rem 0 0.25rem" }}>
      <svg width={width} height={height} viewBox="0 0 220 120" style={{ overflow: "visible" }} aria-hidden="true">
        <path d="M 15 110 A 95 95 0 0 1 205 110" fill="none" stroke="#efefef" strokeWidth="14" strokeLinecap="round" />
        <path
          d="M 15 110 A 95 95 0 0 1 205 110"
          fill="none"
          stroke={color}
          strokeWidth="14"
          strokeLinecap="round"
          strokeDasharray={arc}
          strokeDashoffset={offset}
          style={{ transition: "stroke-dashoffset 0.8s ease, stroke 0.4s ease" }}
        />
        <text x="110" y="90" fontSize={fontSize} fontWeight="700" textAnchor="middle" dominantBaseline="middle" fill="#111">
          {score.toFixed(1)}
        </text>
        <text x="110" y="112" fontSize="11" textAnchor="middle" fill="#aaa">
          out of 10
        </text>
      </svg>

      {!compact && (
        <div style={{ fontSize: 14, fontWeight: 600, color, marginTop: -6 }}>
          {score >= 7.5 ? "Strong meal" : score >= 5 ? "Moderate meal" : "Needs improvement"}
        </div>
      )}

      {compact && (
        <div style={{ fontSize: 12, fontWeight: 600, color, marginTop: -10 }}>
          {verdict}
        </div>
      )}
    </div>
  );
}

// ─── MAIN APP ─────────────────────────────────────────────────────────────────
export default function App() {
  const [query, setQuery] = useState("");
  const [mealItems, setMealItems] = useState([]);
  const [useWholeWheat, setUseWholeWheat] = useState(false);
  const [isPremium, setIsPremium] = useState(false);
  const [showPaywall, setShowPaywall] = useState(false);
  const [sessionSaves, setSessionSaves] = useState(0);
  const [toast, setToast] = useState(null);
  const [showAllHistory, setShowAllHistory] = useState(false);
  const [showAllDaily, setShowAllDaily] = useState(false);
  const [lastAnalysis, setLastAnalysis] = useState(null);
  const [lastMealName, setLastMealName] = useState("");
  const [newBadge, setNewBadge] = useState(null);

  const [savedMeals, setSavedMeals] = useState(() => {
    try { const v = localStorage.getItem("mic_meals_v2"); return v ? JSON.parse(v) : []; }
    catch { return []; }
  });

  useEffect(() => {
    try { localStorage.setItem("mic_meals_v2", JSON.stringify(savedMeals)); }
    catch {}
  }, [savedMeals]);

  function showToast(msg) {
    setToast(msg);
    setTimeout(() => setToast(null), 2400);
  }

  const matches = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];
    const words = q.split(" ");
    return FOOD_DB.filter((f) => {
      const name = f.name.toLowerCase();
      const kw = (f.keywords || []);
      return words.every((w) => name.includes(w) || kw.some((k) => k.toLowerCase().includes(w)));
    }).slice(0, 12);
  }, [query]);

  const [analyzedMealItems, setAnalyzedMealItems] = useState([]);

  const analysis = useMemo(() => {
    if (!analyzedMealItems.length) return null;
    return scoreItems(analyzedMealItems, useWholeWheat);
  }, [analyzedMealItems, useWholeWheat]);

  const reportAnalysis = analysis || lastAnalysis;
  const reportName = lastMealName;

  const { strongDays, streak, trackedDays, dayAvgs } = useMemo(() => computeStats(savedMeals), [savedMeals]);
  const badges = getBadgeDefs(strongDays, streak, trackedDays);

  // Badge unlock toast
  useEffect(() => {
    const unlocked = badges.filter((b) => b.unlocked);
    if (unlocked.length) {
      const last = unlocked[unlocked.length - 1];
      if (last.id !== newBadge) {
        setNewBadge(last.id);
        showToast(`🏆 Badge unlocked: ${last.title}`);
      }
    }
  }, [strongDays, streak, trackedDays]);

  const td = todayStr();
  const yd = yesterdayStr();
  const todaysMeals = savedMeals.filter((m) => m.date === td);
  const yesterdaysMeals = savedMeals.filter((m) => m.date === yd);
  const todayAvg = todaysMeals.length ? r1(todaysMeals.reduce((a, m) => a + m.score, 0) / todaysMeals.length) : null;
  const yestAvg = yesterdaysMeals.length ? r1(yesterdaysMeals.reduce((a, m) => a + m.score, 0) / yesterdaysMeals.length) : null;
  const bestToday = todaysMeals.length ? todaysMeals.reduce((b, m) => m.score > b.score ? m : b) : null;
  const worstToday = todaysMeals.length ? todaysMeals.reduce((b, m) => m.score < b.score ? m : b) : null;

  const dailyHistory = useMemo(() => {
    return [...dayAvgs].sort((a, b) => b.date.localeCompare(a.date));
  }, [dayAvgs]);

  function addFood(food) {
    if (food.locked && !isPremium) { setShowPaywall(true); return; }
    setMealItems((prev) => [...prev, food]);
    setQuery("");
  }
  function removeFood(idx) { setMealItems((prev) => prev.filter((_, i) => i !== idx)); }
  function clearMeal() { setMealItems([]); }

  function persistSave(entry) {
    setSavedMeals((prev) => [entry, ...prev]);
    const next = sessionSaves + 1;
    setSessionSaves(next);
    if (!isPremium && next === 2) setShowPaywall(true);
  }

  function saveMeal() {
    if (!mealItems.length || !analysis) return;
    const name = mealItems.map((f) => f.name).join(", ");
    persistSave({ id: Date.now(), name, score: analysis.meal, date: td, items: [...mealItems], type: "meal" });
    setLastAnalysis(analysis);
    setLastMealName(name);
    setMealItems([]);
    showToast("Meal saved!");
  }

  function saveDailySnapshot() {
    const source = analysis || lastAnalysis;
    if (!source) { showToast("Analyze a meal first"); return; }
    const name = mealItems.length ? mealItems.map((f) => f.name).join(", ") : lastMealName;
    persistSave({ id: Date.now(), name: `📅 Snapshot: ${name}`, score: source.meal, date: td, items: mealItems.length ? [...mealItems] : [], type: "snapshot" });
    showToast("Daily snapshot saved!");
  }

  function saveSuggestion(imp) {
    if (!reportAnalysis) return;
    const name = mealItems.length ? mealItems.map((f) => f.name).join(", ") : lastMealName;
    persistSave({ id: Date.now(), name: `💡 ${name} + ${imp.label}`, score: imp.proj, date: td, items: mealItems.length ? [...mealItems] : [], type: "suggestion" });
    showToast(`Suggestion saved: ${imp.label}`);
  }

  function saveAllSuggestions() {
    if (!reportAnalysis) return;
    const imps = getImprovements(reportAnalysis, mealItems.length ? mealItems : []);
    const best = Math.min(10, r1(Math.max(...imps.map((i) => i.proj)) + 0.3));
    const name = mealItems.length ? mealItems.map((f) => f.name).join(", ") : lastMealName;
    persistSave({ id: Date.now(), name: `🌟 ${name} (all improvements)`, score: best, date: td, items: mealItems.length ? [...mealItems] : [], type: "plan" });
    showToast("All suggestions saved as a plan!");
  }

  function loadMeal(meal) {
    if (meal.items && meal.items.length) {
      setMealItems(meal.items);
      window.scrollTo({ top: 0, behavior: "smooth" });
      showToast("Meal loaded — tap Analyze");
    }
  }

  function deleteMeal(id) {
    setSavedMeals((prev) => prev.filter((m) => m.id !== id));
    showToast("Meal deleted");
  }

  function getDailyInsight() {
    if (!todaysMeals.length) return "Save a meal to start getting daily insights.";
    if (todaysMeals.length === 1) return "Log one more meal today to start seeing patterns.";
    if (worstToday && worstToday.score < 5) return `${worstToday.name} had the biggest impact on your score today. Try adding protein or fiber next time.`;
    if (bestToday && bestToday.score >= 7.5) return `${bestToday.name} was your strongest meal today. Keep building meals like this one.`;
    return "Your meals are tracking in a moderate range today. More fiber and protein could push your score higher.";
  }

  // 7-day sparkline data (oldest → newest)
  const sparklineData = useMemo(() => {
    return [...dayAvgs].sort((a, b) => a.date.localeCompare(b.date)).slice(-7);
  }, [dayAvgs]);

  // AI coaching removed for safety. Add AI later through a backend/serverless function, not directly in the browser.

  const scoreColor = (s) => s >= 7.5 ? "#0F6E56" : s >= 5 ? "#854F0B" : "#A32D2D";

  return (
    <div style={S.shell}>
      {toast && <div style={S.toast}>{toast}</div>}

      {/* HERO */}
      <div style={{ marginBottom: "1.5rem" }}>
        <p style={{ fontSize: 11, fontWeight: 600, color: "#4A90D9", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 4 }}>
          Meal Intelligence
        </p>
        <h1 style={{ fontSize: 26, fontWeight: 700, color: "#111", marginBottom: 6 }}>Meal Impact Coach</h1>
        <p style={{ fontSize: 14, color: "#666", lineHeight: 1.6 }}>
          Build a meal, see how it may affect glucose and fullness, and get personalized coaching on the best order to eat it.
        </p>
      </div>

      {/* STATS */}
      <div style={S.statGrid}>
        <div style={S.statCard}><div style={S.statNum}>{strongDays}</div><div style={S.statLbl}>Strong days</div></div>
        <div style={S.statCard}><div style={S.statNum}>{streak}</div><div style={S.statLbl}>Current streak</div></div>
        <div style={S.statCard}><div style={S.statNum}>{trackedDays}</div><div style={S.statLbl}>Days logged</div></div>
      </div>

      {/* BUILD MEAL */}
      <div style={S.card}>
        <div style={S.cardTitle}>Build your meal</div>
        <div style={S.cardSub}>Search foods and add them one by one</div>
        <input style={S.input} value={query} onChange={(e) => setQuery(e.target.value)}
          placeholder="Try: chicken, salad, rice, pizza, avocado, sushi roll..." />
        <label style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13, color: "#666", margin: "8px 0", cursor: "pointer" }}>
          <input type="checkbox" checked={useWholeWheat} onChange={(e) => setUseWholeWheat(e.target.checked)} />
          Use whole wheat bread for subs and sandwiches
        </label>

        {matches.length > 0 && (
          <div style={{ border: "1px solid #eee", borderRadius: 10, overflow: "hidden", marginBottom: 8 }}>
            {matches.map((food) => (
              <div key={food.id} style={S.searchResult} onClick={() => addFood(food)}
                onMouseEnter={(e) => e.currentTarget.style.background = "#f8f8f8"}
                onMouseLeave={(e) => e.currentTarget.style.background = "transparent"}>
                <div>
                  <span style={{ fontWeight: 500, color: "#111" }}>{food.name}</span>
                  {food.locked && !isPremium && <span style={{ marginLeft: 6, color: "#bbb" }}>🔒</span>}
                  <div style={{ fontSize: 11, color: "#aaa" }}>{food.category}</div>
                </div>
                <span style={{ fontSize: 11, fontWeight: 600, color: food.locked && !isPremium ? "#aaa" : "#4A90D9", padding: "3px 10px", background: food.locked && !isPremium ? "#f4f4f4" : "#EBF4FF", borderRadius: 8 }}>
                  {food.locked && !isPremium ? "Unlock" : "Add"}
                </span>
              </div>
            ))}
          </div>
        )}

        <div style={S.sectionLbl}>Current meal</div>
        {mealItems.length === 0 ? (
          <div style={S.emptyBox}>No foods added yet</div>
        ) : (
          <div>
            {mealItems.map((item, idx) => (
              <div key={`${item.id}-${idx}`} style={S.mealItem}>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 600, color: "#111" }}>{item.name}</div>
                  <div style={{ fontSize: 11, color: "#999" }}>{item.carbs}g carbs · {item.protein}g protein · {item.fiber}g fiber</div>
                </div>
                <PressBtn style={S.btnDanger} onClick={() => removeFood(idx)}>Remove</PressBtn>
              </div>
            ))}
          </div>
        )}

        <div style={S.btnRow}>
        <PressBtn
          style={S.btnPrimary}
          disabled={!mealItems.length}
          onClick={() => {
            const newAnalysis = scoreItems(mealItems, useWholeWheat);
            setAnalyzedMealItems([...mealItems]);
            setLastAnalysis(newAnalysis);
            setLastMealName(mealItems.map((f) => f.name).join(", "));
          }}
        >
          Analyze meal
        </PressBtn>
          <PressBtn style={S.btnSec} disabled={!mealItems.length} onClick={clearMeal}>Clear</PressBtn>
        </div>
        <p style={{ fontSize: 12, color: "#bbb", marginTop: 8 }}>🔒 Some full meals are part of Premium</p>
      </div>

      {/* REPORT */}
      {reportAnalysis && (
       <div style={S.twoCol}>
       <div style={S.leftCol}>
          <div style={S.card}>
  <div style={S.cardTitle}>Meal report</div>

  {reportName && (
    <div style={{ fontSize: 13, color: "#777", marginBottom: 4 }}>
      Last meal: <strong style={{ color: "#333" }}>{reportName}</strong>
    </div>
  )}

  <div style={S.cardSub}>How this meal may affect your blood sugar and energy</div>

  <GaugeArc score={reportAnalysis.meal} />

  <div style={S.metricGrid}>
    <div style={S.metricBox}>
      <div style={S.metricLbl}>Blood sugar spike</div>
      <GaugeArc score={reportAnalysis.spike} compact />
      <Badge label={reportAnalysis.spikeLabel} />
    </div>

    <div style={S.metricBox}>
      <div style={S.metricLbl}>Fullness window</div>
      <GaugeArc score={reportAnalysis.fullness} compact />
      <Badge label={reportAnalysis.fullnessLabel} />
    </div>

    <div style={S.metricBox}>
      <div style={S.metricLbl}>Energy stability</div>
      <GaugeArc score={reportAnalysis.energySub} compact />
      <Badge label={reportAnalysis.energyLabel} />
    </div>
  </div>

  <div style={S.sectionLbl}>Nutrition totals</div>

  <div style={S.nutGrid}>
    {[
      ["Carbs", reportAnalysis.t.carbs + "g"],
      ["Protein", reportAnalysis.t.protein + "g"],
      ["Fiber", reportAnalysis.t.fiber + "g"],
      ["Sugar", reportAnalysis.t.sugar + "g"],
      ["Fat", reportAnalysis.t.fat + "g"],
      ["Sat fat", reportAnalysis.t.satFat + "g"],
      ["GL", reportAnalysis.mealGL],
      ["GI", reportAnalysis.mealGI],
    ].map(([l, v]) => (
      <div key={l} style={S.nutItem}>
        <div style={S.nutVal}>{v}</div>
        <div style={S.nutLbl}>{l}</div>
      </div>
    ))}
  </div>

  <div style={S.btnRow}>
    <PressBtn style={S.btnGreen} onClick={saveMeal} disabled={!mealItems.length}>
      Save this meal
    </PressBtn>
    <PressBtn style={S.btnSec} onClick={saveDailySnapshot}>
      Save daily snapshot
    </PressBtn>
  </div>
</div>

          {/* EATING ORDER */}
          <div style={S.card}>
            <div style={S.cardTitle}>Best order to eat this meal</div>
            <div style={S.cardSub}>Eating in this sequence may soften the glucose spike</div>
            <ol style={S.orderList}>
              {getEatingOrder(mealItems.length ? mealItems : (lastAnalysis ? [] : [])).map((item, i) => (
                <li key={`${item.id}-${i}`} style={S.orderItem}>
                  <div style={S.orderNum}>{i + 1}</div>
                  <div style={{ fontSize: 13, fontWeight: 600, color: "#111" }}>{item.name}</div>
                </li>
              ))}
            </ol>
            <div style={S.walkTip}>
              <span style={{ fontSize: 20, flexShrink: 0, marginTop: 1 }}>🚶</span>
              <div style={{ fontSize: 13, color: "#085041", lineHeight: 1.55 }}>
                <strong>Post-meal tip:</strong> A 10–15 minute walk after eating can help your body use glucose more efficiently and may meaningfully reduce blood sugar spikes.
              </div>
            </div>
          </div>
          </div>

<div style={S.rightCol}>

          {/* IMPROVEMENTS */}
          <div style={S.card}>
            <div style={S.cardTitle}>How to improve this meal</div>
            <div style={S.cardSub}>Save individual suggestions or all at once</div>
            <div 
              style={{
                fontSize: 13,
                fontWeight: 600,
                color: "#0F6E56",
                marginBottom: 12
              }}
            >
              If all suggestions are used:{" "}
              {Math.min(
                10,
                r1(
                  Math.max(
                    ...getImprovements(reportAnalysis, mealItems).map((i) => i.proj)
                  ) + 0.3
                )
              ).toFixed(1)}{" "}
              projected
            </div>
            {getImprovements(reportAnalysis, mealItems).map((imp, idx) => (
              <div key={idx} style={S.impCard}>
                <div style={{ fontSize: 13, fontWeight: 600, color: "#111", marginBottom: 2 }}>{imp.label}</div>
                <div style={{ fontSize: 12, color: "#777", marginBottom: 6 }}>{imp.detail}</div>
                <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 13, marginBottom: 8 }}>
                  <span style={{ color: "#bbb" }}>{reportAnalysis.meal.toFixed(1)}</span>
                  <span style={{ color: "#ccc" }}>→</span>
                  <span style={{ fontWeight: 700, color: "#0F6E56" }}>{imp.proj.toFixed(1)}</span>
                  <span style={{ fontSize: 11, color: "#bbb" }}>projected</span>
                </div>
                <PressBtn style={S.btnGreen} onClick={() => saveSuggestion(imp)}>Save this suggestion</PressBtn>
              </div>
            ))}
            <PressBtn style={{ ...S.btnGreen, width: "100%", marginTop: 4 }} onClick={saveAllSuggestions}>
              🌟 Save all suggestions as one plan
            </PressBtn>
          </div>

          {/* COACHING */}
          <div style={S.card}>
            <div style={S.cardTitle}>Coach's notes</div>
            <div style={{ fontSize: 11, fontWeight: 600, color: "#4A90D9", background: "#EBF4FF", borderRadius: 8, padding: "3px 10px", display: "inline-block", marginBottom: 10 }}>
              💡 Personalized insight
            </div>
            <div style={S.coaching}>{buildCoaching(reportAnalysis)}</div>
          </div>
          </div>
      </div>
      )}

      {/* TODAY'S SCORE */}
      <div style={S.card}>
        <div style={S.cardTitle}>Today's metabolic score</div>
        <div style={S.cardSub}>Average meal quality across today's saved meals</div>
        {todayAvg !== null ? (
          <>
            <div style={{ ...S.dailyBig, color: scoreColor(todayAvg) }}>{todayAvg}</div>
            <div style={S.dailyLbl}>{getDailyLabel(todayAvg)} · {todaysMeals.length} meal{todaysMeals.length !== 1 ? "s" : ""} today</div>
            {yestAvg !== null && (
              <div style={{ textAlign: "center", fontSize: 13, color: "#888", marginTop: 6 }}>
                Yesterday: {yestAvg}&nbsp;
                <span style={{ fontWeight: 700, color: todayAvg >= yestAvg ? "#0F6E56" : "#C0392B" }}>
                  {todayAvg >= yestAvg ? "▲" : "▼"} {Math.abs(r1(todayAvg - yestAvg))}
                </span>
              </div>
            )}
            <div style={S.dailyGrid}>
              {bestToday && <div style={{ background: "#f8f8f8", borderRadius: 10, padding: 10 }}>
                <div style={{ fontSize: 11, color: "#aaa", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 4 }}>Best meal</div>
                <div style={{ fontSize: 13, fontWeight: 600, color: "#111" }}>{bestToday.name} <span style={{ color: "#0F6E56" }}>({bestToday.score})</span></div>
              </div>}
              {worstToday && bestToday?.id !== worstToday?.id && <div style={{ background: "#f8f8f8", borderRadius: 10, padding: 10 }}>
                <div style={{ fontSize: 11, color: "#aaa", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 4 }}>Needs work</div>
                <div style={{ fontSize: 13, fontWeight: 600, color: "#111" }}>{worstToday.name} <span style={{ color: "#C0392B" }}>({worstToday.score})</span></div>
              </div>}
            </div>
            <div style={S.insightBox}>{getDailyInsight()}</div>
          </>
        ) : (
          <div style={S.emptyBox}>Save a meal to see your daily score</div>
        )}
      </div>

      {/* MEAL HISTORY */}
      <div style={S.card}>
        <div style={S.cardTitle}>Meal history</div>
        <div style={S.cardSub}>All saved meals with date and score</div>
        {savedMeals.length === 0 ? (
          <div style={S.emptyBox}>No saved meals yet</div>
        ) : (
          <>
            {(showAllHistory ? savedMeals : savedMeals.slice(0, 4)).map((meal) => (
              <div key={meal.id} style={S.histItem}>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 13, fontWeight: 600, color: "#111", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{meal.name}</div>
                  <div style={{ fontSize: 11, color: "#aaa" }}>
                    {meal.date} · <span style={{ color: scoreColor(meal.score), fontWeight: 600 }}>{meal.score} — {getDailyLabel(meal.score)}</span>
                  </div>
                </div>
                <div style={{ display: "flex", gap: 6, flexShrink: 0 }}>
                  <PressBtn style={S.btnLoad} onClick={() => loadMeal(meal)}>Load</PressBtn>
                  <PressBtn style={S.btnDanger} onClick={() => deleteMeal(meal.id)}>Delete</PressBtn>
                </div>
              </div>
            ))}
            {savedMeals.length > 4 && (
              <PressBtn style={{ ...S.btnSec, width: "100%", marginTop: 10 }} onClick={() => setShowAllHistory(!showAllHistory)}>
                {showAllHistory ? "Show less" : `See all ${savedMeals.length} meals`}
              </PressBtn>
            )}
          </>
        )}
      </div>

      {/* DAILY HISTORY */}
      <div style={S.card}>
        <div style={S.cardTitle}>Daily score history</div>
        <div style={S.cardSub}>Your average meal quality by day</div>
        {dailyHistory.length === 0 ? (
          <div style={S.emptyBox}>No history yet</div>
        ) : (
          <>
            {(showAllDaily ? dailyHistory : dailyHistory.slice(0, 5)).map((day) => {
              const cnt = savedMeals.filter((m) => m.date === day.date).length;
              return (
                <div key={day.date} style={S.histItem}>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 13, fontWeight: 600, color: "#111" }}>{day.date}</div>
                    <div style={{ fontSize: 11, color: "#aaa" }}>{cnt} meal{cnt !== 1 ? "s" : ""}</div>
                  </div>
                  <div style={{ fontWeight: 700, color: scoreColor(day.avg) }}>{day.avg} — {getDailyLabel(day.avg)}</div>
                </div>
              );
            })}
            {dailyHistory.length > 5 && (
              <PressBtn style={{ ...S.btnSec, width: "100%", marginTop: 10 }} onClick={() => setShowAllDaily(!showAllDaily)}>
                {showAllDaily ? "Show less" : `See all ${dailyHistory.length} days`}
              </PressBtn>
            )}
          </>
        )}
      </div>

      {/* BADGES */}
      <div style={S.card}>
        <div style={S.cardTitle}>Badges</div>
        <div style={S.cardSub}>Earn badges by building strong daily scores</div>
        <div style={S.badgeGrid}>
          {badges.map((b) => (
            <div key={b.id} style={S.badgeCard(b.unlocked)}>
              <div style={{ fontSize: 22, marginBottom: 4 }}>{b.unlocked ? "🏆" : "🔒"}</div>
              <div style={{ fontSize: 12, fontWeight: 700, color: "#111" }}>{b.title}</div>
              <div style={{ fontSize: 11, color: "#888", marginTop: 2 }}>{b.sub}</div>
              {b.unlocked && <div style={{ fontSize: 11, color: "#0F6E56", marginTop: 4, fontWeight: 600 }}>{b.cl}: {b.count}</div>}
            </div>
          ))}
        </div>
      </div>

      {/* FOOTER */}
      <div style={{ fontSize: 11, color: "#bbb", lineHeight: 1.6, marginTop: "1rem", padding: "0 4px" }}>
        Meal Impact Coach provides general nutrition and wellness information for educational purposes only. It is not medical advice and is not intended to diagnose, treat, cure, or prevent any condition. Always consult a qualified healthcare professional for personalized medical advice.
      </div>

      {/* PAYWALL */}
      {showPaywall && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1000, padding: 20 }}>
          <div style={{ background: "#fff", borderRadius: 16, padding: "2rem", maxWidth: 380, width: "100%", textAlign: "center" }}>
            <div style={{ fontSize: 32, marginBottom: 12 }}>🔒</div>
            <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 10 }}>Stop guessing your meals</h2>
            <p style={{ fontSize: 14, color: "#666", marginBottom: 16 }}>Analyze real meals like burritos, subs, sushi, and more — no manual entry needed.</p>
            <ul style={{ textAlign: "left", fontSize: 13, color: "#444", marginBottom: 20, lineHeight: 2 }}>
              <li>✔ Analyze full meals in seconds</li>
              <li>✔ Get smarter coaching suggestions</li>
              <li>✔ Track your daily score and progress</li>
              <li>✔ Unlock all 200+ foods in the database</li>
            </ul>
            <PressBtn style={{ ...S.btnPrimary, width: "100%", marginBottom: 10, padding: 14 }}
              onClick={() => { setIsPremium(true); setShowPaywall(false); showToast("Premium unlocked!"); }}>
              Unlock Full Access
            </PressBtn>
            <PressBtn style={{ ...S.btnSec, width: "100%" }} onClick={() => setShowPaywall(false)}>Not now</PressBtn>
          </div>
        </div>
      )}
    </div>
  );
}
