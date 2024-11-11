import OutputView from '../src/views/OutputView.js';
import Lotto from '../src/domain/Lotto.js';
import { Console } from '@woowacourse/mission-utils';

jest.mock('@woowacourse/mission-utils', () => ({
    Console: {
        print: jest.fn()
    }
}));

describe('OutputView 테스트', () => {
    test('구매한 로또 수량과 번호를 출력한다', () => {
        const lottos = [
            new Lotto([1, 2, 3, 4, 5, 6]),
            new Lotto([7, 8, 9, 10, 11, 12])
        ];

        OutputView.printPurchasedLottos(lottos);

        expect(Console.print).toHaveBeenCalledWith('2개를 구매했습니다.');
        expect(Console.print).toHaveBeenCalledWith('[1, 2, 3, 4, 5, 6]');
        expect(Console.print).toHaveBeenCalledWith('[7, 8, 9, 10, 11, 12]');
    });

    test('당첨 통계를 출력한다', () => {
        const result = {
            matches: {
                3: 1,  // 3개 일치 1회
                4: 1,  // 4개 일치 1회
                5: 0,  // 5개 일치 0회
                5.5: 1, // 5개 + 보너스 일치 1회
                6: 0   // 6개 일치 0회
            },
            profitRate: 169.5
        };

        OutputView.printWinningStatistics(result);

        expect(Console.print).toHaveBeenCalledWith('\n당첨 통계\n---');
        expect(Console.print).toHaveBeenCalledWith('3개 일치 (5,000원) - 1개');
        expect(Console.print).toHaveBeenCalledWith('4개 일치 (50,000원) - 1개');
        expect(Console.print).toHaveBeenCalledWith('5개 일치 (1,500,000원) - 0개');
        expect(Console.print).toHaveBeenCalledWith('5개 일치, 보너스 볼 일치 (30,000,000원) - 1개');
        expect(Console.print).toHaveBeenCalledWith('6개 일치 (2,000,000,000원) - 0개');
        expect(Console.print).toHaveBeenCalledWith('총 수익률은 169.5%입니다.');
    });
});