import Validator from '../src/utils/Validator.js';

describe('Validator 클래스 테스트', () => {
    test.each([
        ['1,2,3,4,5,6', [1, 2, 3, 4, 5, 6]],
        ['11,12,13,14,15,16', [11, 12, 13, 14, 15, 16]],
        ['1, 2, 3, 4, 5, 6', [1, 2, 3, 4, 5, 6]]  // 공백이 있는 경우
    ])('올바른 당첨 번호 입력을 파싱한다: %s', (input, expected) => {
        expect(Validator.validateWinningNumbersInput(input)).toEqual(expected);
    });

    test.each([
        ['', '[ERROR] 당첨 번호를 입력해 주세요.'],
        ['1,2,3,4,5', '[ERROR] 로또 번호는 6개여야 합니다.'],
        ['1,2,3,4,5,6,7', '[ERROR] 로또 번호는 6개여야 합니다.'],
        ['1,2,3,4,5,a', '[ERROR] 당첨 번호는 숫자만 입력 가능합니다.'],
        ['0,1,2,3,4,5', '[ERROR] 로또 번호는 1부터 45 사이의 숫자여야 합니다.'],
        ['1,2,3,4,5,46', '[ERROR] 로또 번호는 1부터 45 사이의 숫자여야 합니다.'],
        ['1,2,3,3,4,5', '[ERROR] 로또 번호는 중복될 수 없습니다.']
    ])('잘못된 당첨 번호 입력시 에러가 발생한다: %s', (input, errorMessage) => {
        expect(() => Validator.validateWinningNumbersInput(input)).toThrow(errorMessage);
    });

    test.each([
        ['1000', 1000],
        ['2000', 2000]
    ])('올바른 구매 금액을 파싱한다: %s', (input, expected) => {
        expect(Validator.validatePurchaseAmountInput(input)).toBe(expected);
    });

    test.each([
        ['', '[ERROR] 구입 금액을 입력해 주세요.'],
        ['abc', '[ERROR] 숫자만 입력 가능합니다.'],
        ['500', '[ERROR] 구매 금액은 1000원 이상이어야 합니다.'],
        ['1500', '[ERROR] 구매 금액은 1000원 단위여야 합니다.']
    ])('잘못된 구매 금액 입력시 에러가 발생한다: %s', (input, errorMessage) => {
        expect(() => Validator.validatePurchaseAmountInput(input)).toThrow(errorMessage);
    });

    test.each([
        ['7', 7],
        ['45', 45]
    ])('올바른 보너스 번호를 파싱한다: %s', (input, expected) => {
        expect(Validator.validateBonusNumberInput(input)).toBe(expected);
    });

    test.each([
        ['', '[ERROR] 보너스 번호를 입력해 주세요.'],
        ['abc', '[ERROR] 보너스 번호는 숫자만 입력 가능합니다.'],
        ['0', '[ERROR] 로또 번호는 1부터 45 사이의 숫자여야 합니다.'],
        ['46', '[ERROR] 로또 번호는 1부터 45 사이의 숫자여야 합니다.']
    ])('잘못된 보너스 번호 입력시 에러가 발생한다: %s', (input, errorMessage) => {
        expect(() => Validator.validateBonusNumberInput(input)).toThrow(errorMessage);
    });
});