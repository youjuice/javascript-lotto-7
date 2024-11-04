import WinningChecker from '../src/domain/WinningChecker.js';
import Lotto from '../src/domain/Lotto.js';

describe('WinningChecker 클래스 테스트', () => {
    test('당첨 번호와 구매한 로또를 비교하여 일치하는 번호의 개수를 반환한다', () => {
        const winningLotto = new Lotto([1, 2, 3, 4, 5, 6]);
        const bonusNumber = 7;
        const checker = new WinningChecker(winningLotto, bonusNumber);

        const purchasedLotto = new Lotto([1, 2, 3, 7, 8, 9]);
        const result = checker.checkLotto(purchasedLotto);

        expect(result).toBe(3);
    });

    test('보너스 번호 일치 여부를 확인한다', () => {
        const winningLotto = new Lotto([1, 2, 3, 4, 5, 6]);
        const bonusNumber = 7;
        const checker = new WinningChecker(winningLotto, bonusNumber);

        const purchasedLotto = new Lotto([1, 2, 3, 4, 5, 7]);
        const matchCount = checker.checkLotto(purchasedLotto);
        const hasBonus = checker.hasBonus(purchasedLotto);

        expect(matchCount).toBe(5);
        expect(hasBonus).toBe(true);
    });

    test('여러 장의 로또에 대한 당첨 통계를 생성한다', () => {
        const winningLotto = new Lotto([1, 2, 3, 4, 5, 6]);
        const bonusNumber = 7;
        const checker = new WinningChecker(winningLotto, bonusNumber);

        const purchasedLottos = [
            new Lotto([1, 2, 3, 4, 5, 6]),  // 6개 일치
            new Lotto([1, 2, 3, 4, 5, 7]),  // 5개 일치 + 보너스
            new Lotto([1, 2, 3, 4, 5, 8]),  // 5개 일치
            new Lotto([1, 2, 3, 4, 7, 8]),  // 4개 일치
            new Lotto([1, 2, 3, 7, 8, 9]),  // 3개 일치
            new Lotto([7, 8, 9, 10, 11, 12]) // 0개 일치
        ];

        const result = checker.createWinningStatistics(purchasedLottos);

        expect(result.matches[3]).toBe(1);  // 3개 일치 1장
        expect(result.matches[4]).toBe(1);  // 4개 일치 1장
        expect(result.matches[5]).toBe(1);  // 5개 일치 1장
        expect(result.matches[5.5]).toBe(1); // 5개 일치 + 보너스 1장
        expect(result.matches[6]).toBe(1);  // 6개 일치 1장
        expect(result.profitRate).toBe(33859250.0); // (2,000,000,000 + 30,000,000 + 1,500,000 + 50,000 + 5,000) / 6000 * 100
    });
});