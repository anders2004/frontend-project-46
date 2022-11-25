const formatData = (data) => {
  const fields = data.map((field) => {
    const { type } = field;
    switch (type) {
      case 'added':
        return `  + ${field.key}: ${field.value}`;
      case 'removed':
        return `  - ${field.key}: ${field.value}`;
      case 'changed':
        return [
          `  - ${field.key}: ${field.valueOld}`,
          `  + ${field.key}: ${field.valueNew}`,
        ].join('\n');
      case 'unchanged':
        return `    ${field.key}: ${field.value}`;
      default:
        throw new Error(`'${type}' this type is not supported`);
    }
  });
  return ['{', ...fields, '}'].join('\n');
};

export default formatData;
