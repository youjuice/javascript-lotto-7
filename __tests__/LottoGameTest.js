import { Random, Console } from '@woowacourse/mission-utils';
import LottoGame from '../src/domain/LottoGame.js';
import InputView from '../src/views/InputView.js';
import OutputView from '../src/views/OutputView.js';

jest.mock('@woowacourse/mission-utils', () => ({
    Random: {
        pickUniqueNumbersInRange: jest.fn()
    },
    Console: {
        print: jest.fn()
    }
}));

jest.mock('../src/views/InputView.js');
jest.mock('../src/views/OutputView.js');

describe('LottoGame 클래스 테스트', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('로또 게임이 정상적으로 진행된다', async () => {
        Random.pickUniqueNumbersInRange
            .mockReturnValueOnce([1, 2, 3, 4, 5, 6])
            .mockReturnValueOnce([7, 8, 9, 10, 11, 12]);

        InputView.readPurchaseAmount.mockResolvedValue(2000);
        InputView.readWinningNumbers.mockResolvedValue([1, 2, 3, 4, 5, 6]);
        InputView.readBonusNumber.mockResolvedValue(7);

        const game = new LottoGame();

        await game.play();

        expect(OutputView.printPurchasedLottos).toHaveBeenCalled();
        expect(OutputView.printWinningStatistics).toHaveBeenCalled();
    });

    test('잘못된 입력시 재시도 후 게임이 진행된다', async () => {
        Random.pickUniqueNumbersInRange
            .mockReturnValueOnce([1, 2, 3, 4, 5, 6]);

        // 첫 번째 호출에서 에러, 두 번째 호출에서 성공
        const purchaseError = new Error('[ERROR] 구입 금액은 1000원 단위여야 합니다.');
        InputView.readPurchaseAmount
            .mockRejectedValueOnce(purchaseError)
            .mockResolvedValueOnce(1000);

        InputView.readWinningNumbers.mockResolvedValue([1, 2, 3, 4, 5, 6]);
        InputView.readBonusNumber.mockResolvedValue(7);

        const game = new LottoGame();

        await game.play();

        expect(Console.print).toHaveBeenCalledWith(purchaseError.message);
        expect(OutputView.printPurchasedLottos).toHaveBeenCalled();
        expect(OutputView.printWinningStatistics).toHaveBeenCalled();
    });
});