const defaultLocalOptions: Intl.DateTimeFormatOptions = {
  weekday: 'long',
  year: 'numeric',
  month: 'short',
  day: 'numeric',
  hour: 'numeric',
  minute: 'numeric',
};

export const convertEpochToDate = (epochTime: string | number): Date => {
  const date = new Date(Number(epochTime) * 1000);
  return date;
};

export const convertEpochToDateFormat = (
  date: string | number,
  options: Intl.DateTimeFormatOptions = defaultLocalOptions
): string => {
  return convertEpochToDate(date).toLocaleDateString('en-us', options);
};

export function getFullMonth(): string {
  const monthNames = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  const currentDate = new Date();
  const monthIndex = currentDate.getMonth();

  return monthNames[monthIndex];
}

export function getCurrentYear(): number {
  return new Date().getFullYear();
}
