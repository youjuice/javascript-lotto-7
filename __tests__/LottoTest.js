import Lotto from "../src/domain/Lotto.js";

describe('Lotto 클래스 테스트', () => {
  test('로또 번호의 개수가 6개가 아닌 경우 예외가 발생한다.', () => {
    expect(() => new Lotto([1, 2, 3, 4, 5])).toThrow('[ERROR] 로또 번호는 6개여야 합니다.');
    expect(() => new Lotto([1, 2, 3, 4, 5, 6, 7])).toThrow('[ERROR] 로또 번호는 6개여야 합니다.');
  });

  test('로또 번호가 1부터 45 사이의 숫자가 아닌 경우 예외가 발생한다.', () => {
    expect(() => new Lotto([0, 1, 2, 3, 4, 5])).toThrow('[ERROR] 로또 번호는 1부터 45 사이의 숫자여야 합니다.');
    expect(() => new Lotto([1, 2, 3, 4, 5, 46])).toThrow('[ERROR] 로또 번호는 1부터 45 사이의 숫자여야 합니다.');
  });

  test('로또 번호에 중복된 숫자가 있는 경우 예외가 발생한다.', () => {
    expect(() => new Lotto([1, 2, 3, 4, 4, 5])).toThrow('[ERROR] 로또 번호는 중복될 수 없습니다.');
  });

  test('로또 번호는 오름차순으로 정렬되어야 한다.', () => {
    const lotto = new Lotto([6, 3, 5, 1, 2, 4]);
    expect(lotto.getNumbers()).toEqual([1, 2, 3, 4, 5, 6]);
  });

  test('getMatchCount는 일치하는 번호의 개수를 정확히 반환한다.', () => {
    const lotto = new Lotto([1, 2, 3, 4, 5, 6]);
    expect(lotto.getMatchCount([1, 2, 3, 4, 5, 6])).toBe(6);  // 전체 일치
    expect(lotto.getMatchCount([7, 8, 9, 10, 11, 12])).toBe(0);  // 전체 불일치
    expect(lotto.getMatchCount([1, 2, 3, 7, 8, 9])).toBe(3);  // 일부 일치
  });

  test('hasBonus는 보너스 번호 일치 여부를 정확히 반환한다.', () => {
    const lotto = new Lotto([1, 2, 3, 4, 5, 6]);
    expect(lotto.hasBonus(6)).toBe(true);
    expect(lotto.hasBonus(7)).toBe(false);
  });
});
