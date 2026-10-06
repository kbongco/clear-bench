import { ALL_CONDITIONS } from "../constants/formOptions";

export function applyAllOption(
  prev: string[],
  next: string[],
  allValues: string[]
): string[] {
  const allOption = ALL_CONDITIONS;

  const clickedAll =
    !prev.includes(allOption) && next.includes(allOption);

  const uncheckedAll =
    prev.includes(allOption) && !next.includes(allOption);


  if (clickedAll) {
    return [allOption, ...allValues];
  }


  if (uncheckedAll) {
    return [];
  }

  const selectedAllValues = allValues.every((value) =>
    next.includes(value)
  );

  
  if (selectedAllValues) {
    return [allOption, ...allValues];
  }

  return next.filter((value) => value !== allOption);
}