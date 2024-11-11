import Validator from "../utils/Validator.js";

class Lotto {
  #numbers;

  constructor(numbers) {
    Validator.validateLottoNumbers(numbers);
    this.#numbers = numbers.sort((a, b) => a - b);
  }

  getNumbers() {
    return [...this.#numbers];
  }

  getMatchCount(winningNumbers) {
    return this.#numbers.filter(number => winningNumbers.includes(number)).length;
  }

  hasBonus(bonusNumber) {
    return this.#numbers.includes(bonusNumber);
  }
}

export default Lotto;
