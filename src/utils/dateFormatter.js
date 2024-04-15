import { format, isValid, parseISO } from "date-fns";

const dateFormatter = (dateString, dateFormate) => {
  const date = dateString ? parseISO(dateString) : null;
  return date && isValid(date) ? format(date, dateFormate) : "-";
};

export default dateFormatter;
