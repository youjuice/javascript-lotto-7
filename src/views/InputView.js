import { Console } from '@woowacourse/mission-utils';

class InputView {
    static async readPurchaseAmount() {
        const input = await Console.readLineAsync('구입금액을 입력해 주세요.\n');
        const amount = Number(input);

        if (isNaN(amount) || amount < 1000 || amount % 1000 !== 0) {
            throw new Error('[ERROR] 구입 금액은 1000원 단위여야 합니다.');
        }

        return amount;
    }

    static async readWinningNumbers() {
        const input = await Console.readLineAsync('\n당첨 번호를 입력해 주세요.\n');
        const numbers = input.split(',').map(num => Number(num.trim()));

        this.#validateWinningNumbers(numbers);
        return numbers;
    }

    static async readBonusNumber() {
        const input = await Console.readLineAsync('\n보너스 번호를 입력해 주세요.\n');
        const number = Number(input);

        this.#validateBonusNumber(number);
        return number;
    }

    static #validateWinningNumbers(numbers) {
        if (numbers.length !== 6) {
            throw new Error('[ERROR] 당첨 번호는 6개여야 합니다.');
        }
        if (numbers.some(num => isNaN(num) || num < 1 || num > 45)) {
            throw new Error('[ERROR] 로또 번호는 1부터 45 사이의 숫자여야 합니다.');
        }
        if (new Set(numbers).size !== numbers.length) {
            throw new Error('[ERROR] 당첨 번호에 중복된 숫자가 있습니다.');
        }
    }

    static #validateBonusNumber(number) {
        if (isNaN(number) || number < 1 || number > 45) {
            throw new Error('[ERROR] 보너스 번호는 1부터 45 사이의 숫자여야 합니다.');
        }
    }
}

export default InputView;