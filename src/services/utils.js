export const setDateTime = () => {
  const today = new Date();
  const isoDateTime = today.toISOString();
  return isoDateTime;
};

export const formatDateTime = (isoDateTime) => {
  const date = new Date(isoDateTime);
  const options = {
    month: "2-digit",
    day: "2-digit",
    year: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
  };
  const formattedDate = date.toLocaleDateString(undefined, options);
  return formattedDate;
  // return new Intl.DateTimeFormat("en-US", {
  //   year: "numeric",
  //   month: "2-digit",
  //   day: "2-digit",
  //   hour: "numeric",
  //   minute: "numeric",
  //   second: "numeric",
  // }).format(date);
};

export const formatDate = (isoDateTime) => {
  const date = new Date(isoDateTime);
  const options = {
    month: "2-digit",
    day: "2-digit",
    year: "numeric",
  };
  const formattedDate = date.toLocaleDateString(undefined, options);
  return formattedDate;
  // return new Intl.DateTimeFormat("en-US", {
  //   year: "numeric",
  //   month: "2-digit",
  //   day: "2-digit",
  // }).format(formattedDate);
};

export const formatCurrency = (date) => {
  return date.toLocaleString("en-PH", {
    style: "currency",
    currency: "PHP",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
};
