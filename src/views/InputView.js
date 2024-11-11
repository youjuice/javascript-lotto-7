import { Console } from '@woowacourse/mission-utils';
import Validator from '../utils/Validator.js';

class InputView {
    static async readPurchaseAmount() {
        const input = await Console.readLineAsync('구입금액을 입력해 주세요.\n');
        return Validator.validatePurchaseAmountInput(input);
    }

    static async readWinningNumbers() {
        const input = await Console.readLineAsync('\n당첨 번호를 입력해 주세요.\n');
        return Validator.validateWinningNumbersInput(input);
    }

    static async readBonusNumber() {
        const input = await Console.readLineAsync('\n보너스 번호를 입력해 주세요.\n');
        return Validator.validateBonusNumberInput(input);
    }
}

export default InputView;