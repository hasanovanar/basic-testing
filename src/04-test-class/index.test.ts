// Uncomment the code below and write your tests
import { getBankAccount, InsufficientFundsError, TransferFailedError } from '.';

const initialBalance = 1000;
const bankAccount = getBankAccount(initialBalance);
const transferBankAccount = getBankAccount(initialBalance);

describe('BankAccount', () => {
  test('should create account with initial balance', () => {
    expect(bankAccount.getBalance()).toBe(initialBalance);
  });

  test('should throw InsufficientFundsError error when withdrawing more than balance', () => {
    const amount = bankAccount.getBalance() + 10;
    expect(() => bankAccount.withdraw(amount)).toThrowError(
      InsufficientFundsError,
    );
  });

  test('should throw error when transferring more than balance', () => {
    const amount = bankAccount.getBalance() + 10;
    expect(() =>
      bankAccount.transfer(amount, transferBankAccount),
    ).toThrowError(InsufficientFundsError);
  });

  test('should throw error when transferring to the same account', () => {
    const amount = bankAccount.getBalance() + 10;
    expect(() => bankAccount.transfer(amount, bankAccount)).toThrowError(
      TransferFailedError,
    );
  });

  test('should deposit money', () => {
    const currentBalance = bankAccount.getBalance();
    const depositAmount = 1000;
    bankAccount.deposit(depositAmount);

    const expectedBalance = currentBalance + depositAmount;
    const actualBalance = bankAccount.getBalance();
    expect(actualBalance).toBe(expectedBalance);
  });

  test('should withdraw money', () => {
    const currentBalance = bankAccount.getBalance();
    const withdrawalAmount = 20;
    bankAccount.withdraw(withdrawalAmount);

    const expectedBalance = currentBalance - withdrawalAmount;
    const actualBalance = bankAccount.getBalance();
    expect(actualBalance).toBe(expectedBalance);
  });

  test('should transfer money', () => {
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
    // Write your tests here
  });

  test('should set new balance if fetchBalance returned number', async () => {
    // Write your tests here
  });

  test('should throw SynchronizationFailedError if fetchBalance returned null', async () => {
    // Write your tests here
  });
});
