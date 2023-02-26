import { describe, expect, test } from '@jest/globals';
import { faker } from '@faker-js/faker';
import { interpolate, ValuesDict } from '../../src/utils/interpolate'

describe('interpolate', () => {
  test('replaces placeholders in input string with corresponding values from dictionary', () => {
    const key1 = faker.random.word();
    const key2 = faker.random.word();
    const value1 = faker.lorem.word();
    const value2 = faker.lorem.word();
    const valuesDict: ValuesDict = { [key1]: value1, [key2]: value2 };
    const inputString = faker.lorem.sentence() + ` [${key1}] [${key2}]`;
    const expectedOutput = inputString.replace(`[${key1}]`, value1).replace(`[${key2}]`, value2);
    expect(interpolate(inputString, valuesDict)).toBe(expectedOutput);
  });

  test('returns input string if no placeholders found in input string', () => {
    const inputString = faker.lorem.sentence();
    const valuesDict: ValuesDict = {};
    expect(interpolate(inputString, valuesDict)).toEqual(inputString);
  });

  test('returns regular string if no placeholders found in ValuesDict', () => {
    const inputString = faker.lorem.sentence();
    const valuesDict: ValuesDict = { "11111111111": "222222222222" };
    expect(interpolate(inputString, valuesDict)).toBe(inputString);
  });

  test('returns empty string if input string is empty', () => {
    const inputString = '';
    const valuesDict: ValuesDict = {};
    expect(interpolate(inputString, valuesDict)).toBe(inputString);
  });

  test('returns input string if values dictionary is empty', () => {
    const inputString = faker.lorem.sentence();
    const valuesDict: ValuesDict = {};
    expect(interpolate(inputString, valuesDict)).toBe(inputString);
  });

  test('ignores placeholders that do not exist in values dictionary', () => {
    const inputString = `[${faker.random.word()}] [${faker.random.word()}]`;
    const valuesDict: ValuesDict = {};
    expect(interpolate(inputString, valuesDict)).toBe(inputString);
  });

  test('replaces placeholders in input string with corresponding values from dictionary with curly brackets', () => {
    const key1 = faker.random.word();
    const key2 = faker.random.word();
    const value1 = faker.lorem.word();
    const value2 = faker.lorem.word();
    const valuesDict: ValuesDict = { [key1]: value1, [key2]: value2 };
    const inputString = faker.lorem.sentence() + ` {${key1}} {${key2}}`;
    const expectedOutput = inputString.replace(`{${key1}}`, value1).replace(`{${key2}}`, value2);
    expect(interpolate(inputString, valuesDict, '{}')).toBe(expectedOutput);
  });

  test('replace a name', () => {
    expect(interpolate('Hello [name]', { 'name': 'Jim' })).toBe('Hello Jim');
  });

  test('replace a name with curly brackets', () => {
    expect(interpolate('Hello {name}', { 'name': 'Jim' }, '{}')).toBe('Hello Jim');
  });

  test('replace a name and author', () => {
    expect(interpolate('Hello [name] [author]', { 'name': 'Jim', 'author': 'John' })).toBe('Hello Jim John');
  });

  test('replace a name and author with curly brackets', () => {
    expect(interpolate('Hello {name} {author}', { 'name': 'Jim', 'author': 'John' }, '{}')).toBe('Hello Jim John');
  });

  test('don\'t replace a value when the brackets are escaped', () => {
    expect(interpolate('Hello [name] [[author]]', { 'name': 'Jim' })).toBe('Hello Jim [author]');
  });

  test('don\'t replace a value when the curly brackets are escaped', () => {
    expect(interpolate('Hello {name} {{author}}', { 'name': 'Jim' }, '{}')).toBe('Hello Jim {author}');
  });
});