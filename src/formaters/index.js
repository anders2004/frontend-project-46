import stylish from './stylish.js';

const formatDiff = (data, format = 'stylish') => {
  switch (format) {
    case 'stylish':
      return stylish(data);
    default:
      throw new Error(`'${format}' this formatter is not supported.\nSupported formatters: stylish`);
  }
};

export default formatDiff;
