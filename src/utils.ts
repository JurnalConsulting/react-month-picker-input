export const valuesToMask = (month: number, year: number, lang?: string): string => {
  const monthNum = month + 1;
  const monthVal = monthNum < 10 ? '0' + monthNum : monthNum;
  const yearVal = year.toString();
  if (lang == "ja") {
    return yearVal + '/' + monthVal;
  }
  return monthVal + '/' + yearVal;
};

export const valuesFromMask = (mask: string): [number, number] => {
  const [monthVal, yearVal] = mask.split('/');

  const rawMonth = parseInt(monthVal);
  const monthNum = rawMonth > 12 ? 12 : (rawMonth == 0 ? 1 : rawMonth);
  const month = monthNum - 1;

  const year = parseInt(yearVal);

  return [month, year];
}
