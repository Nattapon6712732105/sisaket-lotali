export interface PrizeItem {
  id: string;
  name: string;
  reward: string;
  amount: number; // จำนวนรางวัล
  digitCount: number; // จำนวนหลัก (เช่น 6 หลัก หรือ 3 หลัก)
  numbers: (string | null)[]; // หมายเลขที่ออก ถ้ายังไม่ออกจะเป็น null หรือ ""
  note?: string;
}

export interface LotteryData {
  title: string;
  subTitle: string;
  year: string;
  edition: string;
  eventDate: string;
  location: string;
  ticketPrice: number;
  totalTickets: number;
  totalPrizes: number;
  updatedAt: string;
  isLive: boolean;
  status: 'waiting' | 'in_progress' | 'completed';
  prizes: {
    firstPrize: PrizeItem; // รางวัลที่ 1 (2 รางวัล - 6 หลัก)
    adjacentFirstPrize: PrizeItem; // ข้างเคียงรางวัลที่ 1 (4 รางวัล - 6 หลัก)
    secondPrize: PrizeItem; // รางวัลที่ 2 (3 รางวัล - 6 หลัก)
    thirdPrize: PrizeItem; // รางวัลที่ 3 (3 รางวัล - 6 หลัก)
    fourthPrize: PrizeItem; // รางวัลที่ 4 (5 รางวัล - 6 หลัก)
    fifthPrize: PrizeItem; // รางวัลที่ 5 (10 รางวัล - 6 หลัก)
    last3DigitsPrize: PrizeItem; // เลขท้าย 3 ตัว (100 รางวัล - 3 หลัก)
  };
}

export interface CheckResult {
  searchedNumber: string;
  isWon: boolean;
  matchedPrizes: {
    prizeName: string;
    reward: string;
    winningNumber: string;
  }[];
}

export const INITIAL_LOTTERY_DATA: LotteryData = {
  title: "สลากกาชาด งานเทศกาลปีใหม่สี่เผ่าไทยศรีสะเกษ",
  subTitle: "สำนักงานเหล่ากาชาดจังหวัดศรีสะเกษ ประจำปี ๒๕๗๐",
  year: "๒๕๗๐",
  edition: "ฉบับละ ๑๐๐ บาท",
  eventDate: "วันจันทร์ที่ ๕ มกราคม ๒๕๗๐ เวลา ๒๐.๓๐ น. เป็นต้นไป",
  location: "บริเวณเวทีกลาง สนามหน้าศาลากลางจังหวัดศรีสะเกษ",
  ticketPrice: 100,
  totalTickets: 1000000,
  totalPrizes: 127,
  updatedAt: new Date().toISOString(),
  isLive: false,
  status: 'waiting',
  prizes: {
    firstPrize: {
      id: "first",
      name: "รางวัลที่ ๑",
      reward: "รถยนต์โตโยต้าฟอร์จูนเนอร์ ๒.๔ LEADER G Plus (รางวัลละ ๑ คัน)",
      amount: 2,
      digitCount: 6,
      numbers: [null, null],
      note: "จำนวน ๒ รางวัล (เลข ๖ หลัก)",
    },
    adjacentFirstPrize: {
      id: "adjacent_first",
      name: "รางวัลข้างเคียงรางวัลที่ ๑",
      reward: "ทองคำแท่งน้ำหนัก ๑ สลึง (รางวัลละ ๑ แท่ง)",
      amount: 4,
      digitCount: 6,
      numbers: [null, null, null, null],
      note: "จำนวน ๔ รางวัล (เคียงคู่ขนาน ±๑ ของรางวัลที่ ๑)",
    },
    secondPrize: {
      id: "second",
      name: "รางวัลที่ ๒",
      reward: "ทองคำแท่งน้ำหนัก ๑ บาท (รางวัลละ ๑ แท่ง)",
      amount: 3,
      digitCount: 6,
      numbers: [null, null, null],
      note: "จำนวน ๓ รางวัล (เลข ๖ หลัก)",
    },
    thirdPrize: {
      id: "third",
      name: "รางวัลที่ ๓",
      reward: "โทรศัพท์เคลื่อนที่ ยี่ห้อ Apple รุ่น iPhone 16 Pro (รางวัลละ ๑ เครื่อง)",
      amount: 3,
      digitCount: 6,
      numbers: [null, null, null],
      note: "จำนวน ๓ รางวัล (เลข ๖ หลัก)",
    },
    fourthPrize: {
      id: "fourth",
      name: "รางวัลที่ ๔",
      reward: "รถจักรยานยนต์ ยี่ห้อ Honda Wave (รางวัลละ ๑ คัน)",
      amount: 5,
      digitCount: 6,
      numbers: [null, null, null, null, null],
      note: "จำนวน ๕ รางวัล (เลข ๖ หลัก)",
    },
    fifthPrize: {
      id: "fifth",
      name: "รางวัลที่ ๕",
      reward: "ตู้เย็น ๒ ประตู ขนาด ๗ คิว (รางวัลละ ๑ เครื่อง)",
      amount: 10,
      digitCount: 6,
      numbers: [null, null, null, null, null, null, null, null, null, null],
      note: "จำนวน ๑๐ รางวัล (เลข ๖ หลัก)",
    },
    last3DigitsPrize: {
      id: "last3",
      name: "รางวัลที่ ๖ (รางวัลเลขท้าย ๓ ตัว)",
      reward: "พัดลมตั้งพื้น ขนาด ๑๖ นิ้ว (รางวัลละ ๑ เครื่อง)",
      amount: 100,
      digitCount: 3,
      numbers: [null],
      note: "จำนวน ๑๐๐ รางวัล (ออก ๑ หมายเลขท้าย ๓ ตัว)",
    },
  },
};
