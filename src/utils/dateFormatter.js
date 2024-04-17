import { format, isValid, parseISO } from "date-fns";

const dateFormatter = (dateString, dateFormate) => {
  // const date = dateString ? parseISO(dateString) : null;
  // return date && isValid(date) ? format(dateString, dateFormate) : "-";

  const date = new Date(dateString);
  if (!isNaN(date)) {
    return format(date, dateFormate);
  } else {
    return "-";
  }
};

export default dateFormatter;
