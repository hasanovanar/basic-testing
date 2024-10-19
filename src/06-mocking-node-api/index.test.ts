// Uncomment the code below and write your tests
import { readFileAsynchronously, doStuffByTimeout, doStuffByInterval } from '.';
import path from 'path';
import fs from 'fs';

describe('doStuffByTimeout', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  beforeEach(() => {
    jest.spyOn(global, 'setTimeout');
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  test('should set timeout with provided callback and timeout', () => {
    const mockCb = jest.fn();
    doStuffByTimeout(mockCb, 1000);
    expect(setTimeout).toHaveBeenCalledWith(mockCb, 1000);
    expect(setTimeout).toHaveBeenCalledTimes(1);
  });

  test('should call callback only after timeout', () => {
    const mockCb = jest.fn();

    doStuffByTimeout(mockCb, 2000);

    expect(mockCb).not.toHaveBeenCalled();

    jest.advanceTimersByTime(2000);

    expect(mockCb).toHaveBeenCalled();
    expect(mockCb).toHaveBeenCalledTimes(1);
  });
});

describe('doStuffByInterval', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  beforeEach(() => {
    jest.spyOn(global, 'setInterval');
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });
  test('should set interval with provided callback and timeout', () => {
    const mockCb = jest.fn();
    doStuffByInterval(mockCb, 1000);
    expect(setInterval).toHaveBeenCalledWith(mockCb, 1000);
  });

  test('should call callback multiple times after multiple intervals', () => {
    const mockCb = jest.fn();

    doStuffByInterval(mockCb, 2000);

    expect(mockCb).not.toHaveBeenCalled();

    jest.advanceTimersByTime(2000);
    expect(mockCb).toHaveBeenCalledTimes(1);

    jest.advanceTimersByTime(2000);
    expect(mockCb).toHaveBeenCalledTimes(2);
  });
});

describe('readFileAsynchronously', () => {
  test('should call join with pathToFile', async () => {
    const joinSpy = jest.spyOn(path, 'join');
    const pathToFile = 'file.txt';

    await readFileAsynchronously(pathToFile);

    expect(joinSpy).toHaveBeenCalledWith(__dirname, pathToFile);
  });

  test('should return null if file does not exist', async () => {
    const mockExistsSync = jest.spyOn(fs, 'existsSync').mockReturnValue(false);
    const result = await readFileAsynchronously('nonExistentFile.txt');

    expect(mockExistsSync).toHaveBeenCalled();
    expect(result).toBeNull();
  });

  test('should return file content if file exists', async () => {
    /* add test here*/
  });
});
