import Lotto from "../src/domain/Lotto.js";
import LottoGenerator from "../src/domain/LottoGenerator.js";
import { Random } from '@woowacourse/mission-utils';

jest.mock('@woowacourse/mission-utils', () => ({
    Random: {
        pickUniqueNumbersInRange: jest.fn()
    }
}));

describe('LottoGenerator 클래스 테스트', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('구매 금액에 따라 올바른 수의 로또를 생성한다', () => {
        Random.pickUniqueNumbersInRange
            .mockReturnValueOnce([1, 2, 3, 4, 5, 6])
            .mockReturnValueOnce([7, 8, 9, 10, 11, 12]);
        const generator = new LottoGenerator();

        const lottos = generator.generate(2000);  // 2장 구매

        expect(lottos).toHaveLength(2);
        expect(lottos[0]).toBeInstanceOf(Lotto);
        expect(lottos[1]).toBeInstanceOf(Lotto);
    });

    test('구매 금액이 1000원 단위가 아닌 경우 예외가 발생한다', () => {
        const generator = new LottoGenerator();
        expect(() => {
            generator.generate(1500);
        }).toThrow('[ERROR] 구매 금액은 1000원 단위여야 합니다.');
    });

    test('구매 금액이 1000원 미만인 경우 예외가 발생한다', () => {
        const generator = new LottoGenerator();
        expect(() => {
            generator.generate(500);
        }).toThrow('[ERROR] 구매 금액은 1000원 이상이어야 합니다.');
    });
});