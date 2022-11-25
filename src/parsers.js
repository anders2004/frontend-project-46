import yaml from 'js-yaml';

const parse = (data, dataFormat) => {
  switch (dataFormat) {
    case 'json':
      return JSON.parse(data);
    case 'yaml':
    case 'yml':
      return yaml.load(data);
    default:
      throw new Error(`'${dataFormat}' this file format is not supported.\nSupported formats: json, yaml, yml`);
  }
};

export default parse;
