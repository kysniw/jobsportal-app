import { formatDistanceToNow } from "date-fns";

export const dataDistanceToNow = (stringDate: string, suffix: boolean) => {
  const distanceStringFormat = formatDistanceToNow(new Date(stringDate), {
    addSuffix: suffix,
  });

  return distanceStringFormat;
};
