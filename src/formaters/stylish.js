import _ from 'lodash';

const getBracketIndent = (depth, replacer = ' ', spacesCount = 4) => replacer.repeat(depth * spacesCount);
const getIndent = (depth, replacer = ' ', spacesCount = 4) => replacer.repeat((depth + 1) * spacesCount);

const stringify = (currentValue, depth) => {
  if (!_.isPlainObject(currentValue)) return `${currentValue}`;

  const currentIndent = getIndent(depth);
  const bracketIndent = getBracketIndent(depth);

  const lines = Object.entries(currentValue)
    .map(([key, value]) => `${currentIndent}${key}: ${stringify(value, depth + 1)}`);

  return [
    '{',
    ...lines,
    `${bracketIndent}}`,
  ].join('\n');
};

const stylish = (data) => {
  const iter = (diff, depth) => {
    const currentIndent = getIndent(depth).slice(0, -2);
    const bracketIndent = getBracketIndent(depth);

    const fields = diff.map((field) => {
      const { type } = field;
      switch (type) {
        case 'nested':
          return `${currentIndent}  ${field.key}: ${iter(field.children, depth + 1)}`;
        case 'added':
          return `${currentIndent}+ ${field.key}: ${stringify(field.value, depth + 1)}`;
        case 'removed':
          return `${currentIndent}- ${field.key}: ${stringify(field.value, depth + 1)}`;
        case 'changed':
          return [
            `${currentIndent}- ${field.key}: ${stringify(field.valueOld, depth + 1)}`,
            `${currentIndent}+ ${field.key}: ${stringify(field.valueNew, depth + 1)}`,
          ].join('\n');
        case 'unchanged':
          return `${currentIndent} ${field.key}: ${stringify(field.value, depth + 1)}`;
        default:
          throw new Error(`'${type}' this type is not supported`);
      }
    });

    return ['{',
      ...fields,
      `${bracketIndent}}`,
    ].join('\n');
  };

  return iter(data, 0);
};

export default stylish;
