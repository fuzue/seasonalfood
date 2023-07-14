import { usePapaParse } from "react-papaparse";
import { FoodDescription, FoodList, FoodObject } from "./types/food";

export default async function fetchData(setFunction: React.Dispatch<React.SetStateAction<FoodList>>, url: string) {
  const { readRemoteFile } = usePapaParse();

  return readRemoteFile(
    import.meta.env.BASE_URL + url ,{
      download: true,
      header: true,
      complete: (result: any) => {
        setFunction(normalizeData(result.data));
      },
    }
  );
}

function normalizeData(data: { [key: string]: string }[]) {
  const foodArray = [] as FoodList;

  data.forEach((line) => {
    const parsedFood = {} as FoodObject;
    parsedFood.category = line.category;
    parsedFood.image = line.image;
    parsedFood.season = getMonths(line);
    parsedFood.description = getDescription(line);
    foodArray.push(parsedFood);
  });

  return foodArray;
}

function getDescription(line: { [key: string]: string }) {
  const langsInfo = [] as FoodDescription[];
  Object.keys(line).forEach((key) => {
    if (key.includes("name"))
      langsInfo.push({
        lang: key.replace("name", ""),
        name: line[key],
        slug: line[key]
          .toLowerCase()
          .replace(/[`~!@#$%^&*()_\-+=\[\]{};:'"\\|\/,.<>?\s]/g, " ")
          .replace(/^\s+|\s+$/gm, "")
          .replace(/\s+/g, "-"),
      });
  });
  return langsInfo;
};

function getMonths (line: { [key: string]: string }) {
  const monthsInfo = [] as boolean[];
  Object.keys(line).forEach((key) => {
    if (key.includes("month_")) monthsInfo.push(line[key] === "x");
  });
  return monthsInfo;
};
