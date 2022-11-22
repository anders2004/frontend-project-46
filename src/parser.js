const parse = (data, dataFormat) => {
  switch (dataFormat) {
    case 'json':
      return JSON.parse(data);
    default:
      throw new Error(`${dataFormat} this file format is not supported.\nSupported formats: json`);
  }
};

export default parse;
