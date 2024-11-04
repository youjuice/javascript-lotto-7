import InputView from '../src/views/InputView.js';
import { Console } from '@woowacourse/mission-utils';

jest.mock('@woowacourse/mission-utils', () => ({
    Console: {
        readLineAsync: jest.fn()
    }
}));

describe('InputView 테스트', () => {
    test('올바른 구입 금액을 입력받는다', async () => {
        Console.readLineAsync.mockResolvedValue('8000');
        const amount = await InputView.readPurchaseAmount();
        expect(amount).toBe(8000);
    });

    test('올바른 당첨 번호를 입력받는다', async () => {
        Console.readLineAsync.mockResolvedValue('1,2,3,4,5,6');
        const winningNumbers = await InputView.readWinningNumbers();
        expect(winningNumbers).toEqual([1, 2, 3, 4, 5, 6]);
    });

    test('올바른 보너스 번호를 입력받는다', async () => {
        Console.readLineAsync.mockResolvedValue('7');
        const bonusNumber = await InputView.readBonusNumber();
        expect(bonusNumber).toBe(7);
    });

    test('잘못된 구입 금액 입력시 에러가 발생한다', async () => {
        Console.readLineAsync.mockResolvedValue('1200');
        await expect(InputView.readPurchaseAmount()).rejects.toThrow('[ERROR]');
    });

    test('잘못된 당첨 번호 입력시 에러가 발생한다', async () => {
        Console.readLineAsync.mockResolvedValue('1,2,3,4,5');  // 6개가 아님
        await expect(InputView.readWinningNumbers()).rejects.toThrow('[ERROR]');
    });

    test('범위를 벗어난 보너스 번호 입력시 에러가 발생한다', async () => {
        Console.readLineAsync.mockResolvedValue('46');
        await expect(InputView.readBonusNumber()).rejects.toThrow('[ERROR]');
    });
});