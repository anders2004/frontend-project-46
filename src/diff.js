import _ from 'lodash';

const getDiff = (data1, data2) => {
  const commonKeys = _.union(Object.keys(data1), Object.keys(data2)).sort();

  const diff = commonKeys.map((key) => {
    if (_.isPlainObject(data1[key]) && _.isPlainObject(data2[key])) {
      return { key, children: getDiff(data1[key], data2[key]), type: 'nested' };
    }
    if (!Object.hasOwn(data1, key)) {
      return { key, value: data2[key], type: 'added' };
    }
    if (!Object.hasOwn(data2, key)) {
      return { key, value: data1[key], type: 'removed' };
    }
    if (data1[key] !== data2[key]) {
      return {
        key,
        valueOld: data1[key],
        valueNew: data2[key],
        type: 'changed',
      };
    }
    return { key, value: data1[key], type: 'unchanged' };
  });

  return diff;
};

export default getDiff;
