// Uncomment the code below and write your tests
import {
  getBankAccount,
  InsufficientFundsError,
  TransferFailedError,
  SynchronizationFailedError,
} from '.';

import lodash from 'lodash';

describe('BankAccount', () => {
  test('should create account with initial balance', () => {
    const initialBalance = 1000;
    const bankAccount = getBankAccount(initialBalance);
    expect(bankAccount.getBalance()).toBe(initialBalance);
  });

  test('should throw InsufficientFundsError error when withdrawing more than balance', () => {
    const initialBalance = 1000;
    const bankAccount = getBankAccount(initialBalance);
    const amount = bankAccount.getBalance() + 1;
    expect(() => bankAccount.withdraw(amount)).toThrowError(
      InsufficientFundsError,
    );
  });

  test('should throw error when transferring more than balance', () => {
    const initialBalance = 1000;
    const bankAccount = getBankAccount(initialBalance);
    const amount = bankAccount.getBalance() + 1;
    const transferBankAccount = getBankAccount(initialBalance);

    expect(() =>
      bankAccount.transfer(amount, transferBankAccount),
    ).toThrowError(InsufficientFundsError);
  });

  test('should throw error when transferring to the same account', () => {
    const initialBalance = 1000;
    const bankAccount = getBankAccount(initialBalance);
    const amount = bankAccount.getBalance() - 10;
    expect(() => bankAccount.transfer(amount, bankAccount)).toThrowError(
      TransferFailedError,
    );
  });

  test('should deposit money', () => {
    const initialBalance = 1000;
    const bankAccount = getBankAccount(initialBalance);
    const currentBalance = bankAccount.getBalance();
    const depositAmount = 1000;
    bankAccount.deposit(depositAmount);

    const expectedBalance = currentBalance + depositAmount;
    const actualBalance = bankAccount.getBalance();
    expect(actualBalance).toBe(expectedBalance);
  });

  test('should withdraw money', () => {
    const initialBalance = 1000;
    const bankAccount = getBankAccount(initialBalance);
    const currentBalance = bankAccount.getBalance();
    const withdrawalAmount = 20;
    bankAccount.withdraw(withdrawalAmount);

    const expectedBalance = currentBalance - withdrawalAmount;
    const actualBalance = bankAccount.getBalance();
    expect(actualBalance).toBe(expectedBalance);
  });

  test('should transfer money', () => {
    const initialBalance = 1000;
    const bankAccount = getBankAccount(initialBalance);
    const transferBankAccount = getBankAccount(initialBalance);
    const initialbalOfSendAcc = bankAccount.getBalance();
    const initialbalOfRecAcc = transferBankAccount.getBalance();
    const transferAmount = 100;

    bankAccount.transfer(transferAmount, transferBankAccount);

    const expectedBalOfSendAccAfTransfer = initialbalOfSendAcc - transferAmount;
    const expectedBalOfRecAccAfTransfer = initialbalOfRecAcc + transferAmount;

    const actualBalOfSendAccAfTransfer = bankAccount.getBalance();
    const actualBalOfRecAccAfTransfer = transferBankAccount.getBalance();
    expect(actualBalOfSendAccAfTransfer).toBe(expectedBalOfSendAccAfTransfer);
    expect(actualBalOfRecAccAfTransfer).toBe(expectedBalOfRecAccAfTransfer);
  });

  test('fetchBalance should return number in case if request did not failed', async () => {
    const randomMock = jest.spyOn(lodash, 'random');

    randomMock.mockReturnValueOnce(50);

    randomMock.mockReturnValueOnce(1);

    const account = getBankAccount(100);
    const balance = await account.fetchBalance();
    expect(typeof balance).toBe('number');

    expect(balance).toBe(50);

    randomMock.mockRestore();
  });

  test('should set new balance if fetchBalance returned number', async () => {
    const account = getBankAccount(100);
    const balanceToReturn = 75;
    jest.spyOn(account, 'fetchBalance').mockResolvedValue(balanceToReturn);

    await account.synchronizeBalance();

    expect(account.getBalance()).toBe(balanceToReturn);
  });

  test('should throw SynchronizationFailedError if fetchBalance returned null', async () => {
    const account = getBankAccount(100);
    jest.spyOn(account, 'fetchBalance').mockResolvedValue(null);

    await expect(account.synchronizeBalance()).rejects.toThrow(
      SynchronizationFailedError,
    );
  });
});
