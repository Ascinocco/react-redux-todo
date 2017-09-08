import uuid from 'uuid/v4';
import db from '../../db';

const mockdb = db;
const getDb = () => (mockdb);
const setDb = (resource, values) => {
  mockdb[resource] = values;
};

const delayFn = (fn, timeout = 500) => (setTimeout(fn, timeout));

const search = (option, params) => {
  for (let key in params) {
    if (option.hasOwnProperty(key)) {
      if (params[key] == option[key]) {
        return option;
      }
    }
  }
};

const Builder = (resource, extraProps) => ({
  fetch: (id) => {
    const currentDb = getDb();
    const options = currentDb[resource];
    const results = options.find(option => (id.toString() === option.id.toString()));
    return new Promise(resolve => delayFn(() => resolve({ data: results })));
  },

  list: (params = null) => {
    const currentDb = getDb();
    const options = currentDb[resource];

    if (params === null) {
      return new Promise(resolve => delayFn(() => resolve({ data: options })));
    }

    const results = options.filter(option => ( search(option, params) ));
    return new Promise(resolve => delayFn(() => resolve({ data: results })));
  },

  save: (values) => {
    const currentDb = getDb();
    const options = currentDb[resource];

    const entity = values;
    entity.id = uuid();
    options.push(entity);
    setDb(resource, options);

    return new Promise(resolve => delayFn(() => resolve({ data: entity })));
  },

  // update is an evil method
  // it just filter out the old one and resaves a whole new one
  // but with the same id
  update: (updatedModel) => {
    const currentDb = getDb();
    const options = currentDb[resource];

    // filter out the model
    const filteredOptions = options.filter(option => (updatedModel.id.toString() !== option.id.toString()));
    filteredOptions.push(updatedModel);
   
    setDb(resource, filteredOptions);
    return new Promise(resolve => delayFn(() => resolve({ data: updatedModel })));
  },

  destroy: (id) => {
    const currentDb = getDb;
    const options = currentDb[resource];
    const results = options.filter(option => (id.toString() !== option.id.toString()));
    setDb(resource, results);
    return new Promise(resolve => delayFn(() => resolve({ success: true })));
  },

  ...extraProps,
});

export default Builder;
