import WinningChecker from '../src/domain/WinningChecker.js';
import Lotto from '../src/domain/Lotto.js';

describe('WinningChecker 클래스 테스트', () => {
    test.each([
        ['1등', [1, 2, 3, 4, 5, 6], [1, 2, 3, 4, 5, 6], 7, 6, 2000000000],
        ['2등', [1, 2, 3, 4, 5, 7], [1, 2, 3, 4, 5, 6], 7, 5.5, 30000000],
        ['3등', [1, 2, 3, 4, 5, 7], [1, 2, 3, 4, 5, 6], 8, 5, 1500000],
        ['4등', [1, 2, 3, 4, 7, 8], [1, 2, 3, 4, 5, 6], 9, 4, 50000],
        ['5등', [1, 2, 3, 7, 8, 9], [1, 2, 3, 4, 5, 6], 10, 3, 5000],
        ['미당첨', [7, 8, 9, 10, 11, 12], [1, 2, 3, 4, 5, 6], 13, null, 0],
    ])('%s 당첨 확인', (name, purchasedNumbers, winningNumbers, bonusNumber, expectedRank, expectedPrize) => {
        const winningLotto = new Lotto(winningNumbers);
        const purchasedLotto = new Lotto(purchasedNumbers);
        const checker = new WinningChecker(winningLotto, bonusNumber);
        const result = checker.createWinningStatistics([purchasedLotto]);

        if (expectedRank) {
            expect(result.matches[expectedRank]).toBe(1);
        }
        expect(result.profitRate).toBe(expectedPrize / 1000 * 100);
    });

    test('여러 장의 로또에 대한 당첨 통계를 정확히 생성한다', () => {
        const winningLotto = new Lotto([1, 2, 3, 4, 5, 6]);
        const bonusNumber = 7;
        const checker = new WinningChecker(winningLotto, bonusNumber);

        const purchasedLottos = [
            new Lotto([1, 2, 3, 4, 5, 6]),  // 1등
            new Lotto([1, 2, 3, 4, 5, 7]),  // 2등
            new Lotto([1, 2, 3, 4, 5, 8]),  // 3등
            new Lotto([1, 2, 3, 4, 7, 8]),  // 4등
            new Lotto([1, 2, 3, 7, 8, 9]),  // 5등
            new Lotto([7, 8, 9, 10, 11, 12]) // 미당첨
        ];

        const result = checker.createWinningStatistics(purchasedLottos);

        expect(result.matches[3]).toBe(1);  // 5등 1장
        expect(result.matches[4]).toBe(1);  // 4등 1장
        expect(result.matches[5]).toBe(1);  // 3등 1장
        expect(result.matches[5.5]).toBe(1); // 2등 1장
        expect(result.matches[6]).toBe(1);  // 1등 1장
    });

    test('수익률이 정확히 계산된다', () => {
        const winningLotto = new Lotto([1, 2, 3, 4, 5, 6]);
        const bonusNumber = 7;
        const checker = new WinningChecker(winningLotto, bonusNumber);

        // 3등 1장만 당첨된 경우
        const purchasedLottos = [
            new Lotto([1, 2, 3, 4, 5, 8]),  // 3등
            new Lotto([7, 8, 9, 10, 11, 12]) // 미당첨
        ];

        const result = checker.createWinningStatistics(purchasedLottos);
        // (1,500,000원 / 2000원) * 100 = 75,000%
        expect(result.profitRate).toBe(75000);
    });
});