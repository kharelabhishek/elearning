export function convertDate(date: any) {
  const nepalTime = new Date(date);
  const utcTime = nepalTime.getTime();
  const utcDate = new Date(utcTime);
  const formattedDate = utcDate.toISOString();
  return formattedDate;
}
