const today = new Date();

const localISO = new Date(today.getTime() - today.getTimezoneOffset() * 60000)
  .toISOString()
  .slice(0, -1);

export const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString("pt-BR", {
    timeZone: "America/Sao_Paulo",
  });
};

export const getWeekday = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString("pt-BR", {
    weekday: "long",
    timeZone: "America/Sao_Paulo",
  });
};

export const formattedDate = formatDate(localISO);

export const weekday = getWeekday(localISO);

export const displayDate =
    weekday.charAt(0).toLowerCase() + weekday.slice(1) + ", " + formattedDate;