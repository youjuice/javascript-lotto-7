class Validator {
    static LOTTO_NUMBER_LENGTH = 6;
    static MIN_LOTTO_NUMBER = 1;
    static MAX_LOTTO_NUMBER = 45;
    static LOTTO_PRICE = 1000;

    static validateLottoNumbers(numbers) {
        this.validateNumbersLength(numbers);
        this.validateNumbersRange(numbers);
        this.validateNoDuplicates(numbers);
    }

    static validatePurchaseAmount(amount) {
        this.validateIsNumber(amount);
        this.validateMinimumAmount(amount);
        this.validateAmountUnit(amount);
    }

    static validateBonusNumber(bonusNumber, winningNumbers) {
        this.validateIsNumber(bonusNumber);
        this.validateNumberInRange(bonusNumber);
        this.validateNotDuplicate(bonusNumber, winningNumbers);
    }

    static validateWinningNumbersInput(input) {
        if (!input || input.trim() === '') {
            throw new Error('[ERROR] 당첨 번호를 입력해 주세요.');
        }

        const numbers = input.split(',').map(num => Number(num.trim()));
        if (numbers.some(isNaN)) {
            throw new Error('[ERROR] 당첨 번호는 숫자만 입력 가능합니다.');
        }

        this.validateLottoNumbers(numbers);
        return numbers;
    }

    static validateBonusNumberInput(input) {
        if (!input || input.trim() === '') {
            throw new Error('[ERROR] 보너스 번호를 입력해 주세요.');
        }

        const number = Number(input);
        if (isNaN(number)) {
            throw new Error('[ERROR] 보너스 번호는 숫자만 입력 가능합니다.');
        }

        this.validateNumberInRange(number);
        return number;
    }

    static validatePurchaseAmountInput(input) {
        if (!input || input.trim() === '') {
            throw new Error('[ERROR] 구입 금액을 입력해 주세요.');
        }

        const amount = Number(input);
        this.validatePurchaseAmount(amount);
        return amount;
    }

    static validateNumbersLength(numbers) {
        if (numbers.length !== this.LOTTO_NUMBER_LENGTH) {
            throw new Error('[ERROR] 로또 번호는 6개여야 합니다.');
        }
    }

    static validateNumbersRange(numbers) {
        if (!numbers.every(this.isValidRange.bind(this))) {
            throw new Error('[ERROR] 로또 번호는 1부터 45 사이의 숫자여야 합니다.');
        }
    }

    static validateNoDuplicates(numbers) {
        if (new Set(numbers).size !== numbers.length) {
            throw new Error('[ERROR] 로또 번호는 중복될 수 없습니다.');
        }
    }

    static validateIsNumber(value) {
        if (isNaN(value)) {
            throw new Error('[ERROR] 숫자만 입력 가능합니다.');
        }
    }

    static validateMinimumAmount(amount) {
        if (amount < this.LOTTO_PRICE) {
            throw new Error('[ERROR] 구매 금액은 1000원 이상이어야 합니다.');
        }
    }

    static validateAmountUnit(amount) {
        if (amount % this.LOTTO_PRICE !== 0) {
            throw new Error('[ERROR] 구매 금액은 1000원 단위여야 합니다.');
        }
    }

    static validateNumberInRange(number) {
        if (!this.isValidRange(number)) {
            throw new Error('[ERROR] 로또 번호는 1부터 45 사이의 숫자여야 합니다.');
        }
    }

    static validateNotDuplicate(bonusNumber, winningNumbers) {
        if (winningNumbers.includes(bonusNumber)) {
            throw new Error('[ERROR] 보너스 번호는 당첨 번호와 중복될 수 없습니다.');
        }
    }

    static isValidRange(number) {
        return number >= this.MIN_LOTTO_NUMBER && number <= this.MAX_LOTTO_NUMBER;
    }
}

export default Validator;