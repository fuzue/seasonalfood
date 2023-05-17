import { usePapaParse } from "react-papaparse";
import { FoodDescription, FoodList, FoodObject } from "./types/food";

export default async function fetchData(url: string) {
  const { readRemoteFile } = usePapaParse();

  return readRemoteFile(
    url ,{
      download: true,
      header: true,
      complete: (result: any) => {
        return normalizeData(result.data);
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
  const langs = Object.keys(line).filter((key) => key.includes("name"));
  const langsInfo = [] as FoodDescription[];
  Object.keys(line).forEach((key) => {
    if (langs.includes(key))
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
  const months = Object.keys(line).filter((key) => key.includes("month_"));
  const monthsInfo = [] as boolean[];
  Object.keys(line).forEach((key) => {
    if (months.includes(key)) monthsInfo.push(line[key] === "x");
  });
  return monthsInfo;
};