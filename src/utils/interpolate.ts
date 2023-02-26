interface ValuesDict {
  [key: string]: string;
}

const interpolate = (inputString: string, valuesDict: ValuesDict, delimiter = '[]') => {
  if (!inputString && typeof inputString === 'string') return "";
  if (!valuesDict) return inputString;
  if (typeof inputString !== 'string') return inputString;

  const [startDelimiter, endDelimiter] = delimiter.split('');

  const regexString = `\\${startDelimiter}{2}|\\${endDelimiter}{2}|\\${startDelimiter}(.+?)\\${endDelimiter}`;

  const regex = new RegExp(regexString, 'g');

  return inputString.replace(regex, (match, key) => {
    if (match === startDelimiter.repeat(2)) return startDelimiter;
    if (match === endDelimiter.repeat(2)) return endDelimiter;
    return valuesDict[key] || match;
  });
};

export { interpolate, ValuesDict };
