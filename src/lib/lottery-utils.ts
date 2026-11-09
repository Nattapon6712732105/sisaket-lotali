import { LotteryData, CheckResult } from '@/types/lottery';

// Automatically calculate adjacent numbers for first prize (±1 for each 5-digit number)
export function calculateAdjacentNumbers(firstPrizeNumbers: (string | null)[]): (string | null)[] {
  const adjacents: (string | null)[] = [];

  firstPrizeNumbers.forEach((numStr) => {
    if (numStr && numStr.trim().length === 5 && !isNaN(Number(numStr))) {
      const val = parseInt(numStr, 10);
      const minus1 = val === 0 ? 99999 : val - 1;
      const plus1 = val === 99999 ? 0 : val + 1;
      adjacents.push(minus1.toString().padStart(5, '0'));
      adjacents.push(plus1.toString().padStart(5, '0'));
    } else {
      adjacents.push(null);
      adjacents.push(null);
    }
  });

  while (adjacents.length < 4) {
    adjacents.push(null);
  }

  return adjacents.slice(0, 4);
}

// Check if a number won any prize
export function checkLotteryNumber(data: LotteryData, targetNumber: string): CheckResult {
  const trimmed = targetNumber.trim();
  const result: CheckResult = {
    searchedNumber: trimmed,
    isWon: false,
    matchedPrizes: [],
  };

  if (!trimmed || trimmed.length !== 5) {
    return result;
  }

  // Check 5-digit prizes
  const prizesToCheck = [
    data.prizes.firstPrize,
    data.prizes.adjacentFirstPrize,
    data.prizes.secondPrize,
    data.prizes.thirdPrize,
    data.prizes.fourthPrize,
    data.prizes.fifthPrize,
  ];

  prizesToCheck.forEach((prize) => {
    prize.numbers.forEach((num) => {
      if (num && num.trim() === trimmed) {
        result.isWon = true;
        result.matchedPrizes.push({
          prizeName: prize.name,
          reward: prize.reward,
          winningNumber: num,
        });
      }
    });
  });

  // Check last 3 digits prize
  const last3 = trimmed.slice(-3);
  data.prizes.last3DigitsPrize.numbers.forEach((num) => {
    if (num && num.trim() === last3) {
      result.isWon = true;
      result.matchedPrizes.push({
        prizeName: `${data.prizes.last3DigitsPrize.name} (ท้าย ๓ ตัว)`,
        reward: data.prizes.last3DigitsPrize.reward,
        winningNumber: num,
      });
    }
  });

  return result;
}

