export type Course = {
  id: string;
  title: string;
  description: string;
  icon: string;
  color: string;
  totalLessons: number;
  xpReward: number;
  tag: string;
};

export type Lesson = {
  id: string;
  courseId: string;
  title: string;
  order: number;
  xpReward: number;
  steps: Step[];
};

export type Step =
  | { type: "info"; content: string; title: string }
  | { type: "quiz"; question: string; choices: string[]; correct: number; explanation: string }
  | { type: "fill"; question: string; answer: string; hint: string };

export const COURSES: Course[] = [
  {
    id: "asr-2497",
    title: "กองอาสารักษาดินแดน (อส.)",
    description: "พ.ร.บ. กองอาสารักษาดินแดน พ.ศ. 2497 คุณสมบัติ หน้าที่ และโครงสร้าง อส.",
    icon: "🛡️",
    color: "#16a34a",
    totalLessons: 3,
    xpReward: 300,
    tag: "กฎหมายปกครอง",
  },
  {
    id: "palad-amphoe",
    title: "ปลัดอำเภอ",
    description: "พ.ร.บ. ลักษณะปกครองท้องที่ พ.ศ. 2457 ทีละมาตรา พร้อมข้อสอบ",
    icon: "⚖️",
    color: "#0ea5e9",
    totalLessons: 4,
    xpReward: 400,
    tag: "กฎหมายปกครอง",
  },
  {
    id: "math-101",
    title: "คณิตศาสตร์พื้นฐาน",
    description: "จากตัวเลขสู่พีชคณิต เรียนรู้ทีละขั้น",
    icon: "📐",
    color: "#7c3aed",
    totalLessons: 3,
    xpReward: 300,
    tag: "คณิตศาสตร์",
  },
  {
    id: "eng-101",
    title: "English Essentials",
    description: "Vocabulary, grammar, and everyday conversations",
    icon: "🌏",
    color: "#0891b2",
    totalLessons: 3,
    xpReward: 300,
    tag: "ภาษาอังกฤษ",
  },
  {
    id: "code-101",
    title: "Coding for Beginners",
    description: "เขียนโปรแกรมครั้งแรกไม่ต้องกลัว",
    icon: "💻",
    color: "#059669",
    totalLessons: 3,
    xpReward: 300,
    tag: "โปรแกรมมิ่ง",
  },
];

export const LESSONS: Lesson[] = [
  // อส. course
  {
    id: "asr-1",
    courseId: "asr-2497",
    title: "มาตรา 1–5 บทบัญญัติทั่วไปและโครงสร้าง",
    order: 1,
    xpReward: 60,
    steps: [
      {
        type: "info",
        title: "กองอาสารักษาดินแดน (อส.) คืออะไร?",
        content: "พ.ร.บ. กองอาสารักษาดินแดน พ.ศ. ๒๔๙๗ ตราขึ้นในสมัยรัชกาลที่ ๙\n\n📌 มาตรา ๔ — จัดตั้ง 'กองอาสารักษาดินแดน' เป็นองค์การในกระทรวงมหาดไทย มีฐานะเป็นนิติบุคคล\n\n📌 มาตรา ๕ — แบ่งออกเป็น ๒ ส่วน:\n• (๑) ส่วนกลาง\n• (๒) ส่วนภูมิภาค\n\n📌 มาตรา ๘ — ส่วนภูมิภาคประกอบด้วย กองอาสารักษาดินแดนจังหวัด และกองอาสารักษาดินแดนอำเภอ",
      },
      {
        type: "quiz",
        question: "ตามมาตรา 4 กองอาสารักษาดินแดนสังกัดกระทรวงใด?",
        choices: ["กระทรวงกลาโหม", "กระทรวงมหาดไทย", "สำนักนายกรัฐมนตรี", "กระทรวงยุติธรรม"],
        correct: 1,
        explanation: "มาตรา ๔ บัญญัติว่า ให้จัดตั้งกองอาสารักษาดินแดนเป็นองค์การขึ้นอยู่ในกระทรวงมหาดไทย มีฐานะเป็นนิติบุคคล",
      },
      {
        type: "fill",
        question: "มาตรา ๕ กองอาสารักษาดินแดนแบ่งออกเป็น ___ ส่วน",
        answer: "2",
        hint: "ส่วนกลาง และส่วนภูมิภาค",
      },
    ],
  },
  {
    id: "asr-2",
    courseId: "asr-2497",
    title: "มาตรา 6–7 คณะกรรมการกลาง",
    order: 2,
    xpReward: 80,
    steps: [
      {
        type: "info",
        title: "คณะกรรมการกลางกองอาสารักษาดินแดน",
        content: "📌 มาตรา ๖ — ให้มีคณะกรรมการคณะหนึ่งเรียกว่า 'คณะกรรมการกลางกองอาสารักษาดินแดน' ประกอบด้วย:\n\n👑 รัฐมนตรีว่าการกระทรวงมหาดไทย — เป็นประธาน\n🎖️ รัฐมนตรีว่าการกระทรวงกลาโหม — เป็นรองประธาน (โดยตำแหน่ง)\n👥 กรรมการอื่น — ไม่น้อยกว่า ๑๐ คน ไม่เกิน ๒๐ คน\n\nแต่งตั้งและถอดถอนโดยอนุมัติคณะรัฐมนตรี",
      },
      {
        type: "quiz",
        question: "ใครดำรงตำแหน่งรองประธานคณะกรรมการกลางกองอาสารักษาดินแดน โดยตำแหน่ง?",
        choices: [
          "ผู้บัญชาการตำรวจแห่งชาติ",
          "รัฐมนตรีว่าการกระทรวงกลาโหม",
          "ปลัดกระทรวงมหาดไทย",
          "เลขาธิการคณะรัฐมนตรี",
        ],
        correct: 1,
        explanation: "มาตรา ๖ กำหนดว่า รัฐมนตรีว่าการกระทรวงกลาโหมเป็นรองประธานโดยตำแหน่ง ส่วนประธานคือ รัฐมนตรีว่าการกระทรวงมหาดไทย",
      },
      {
        type: "fill",
        question: "คณะกรรมการกลางฯ มีกรรมการไม่น้อยกว่า ___ คน และไม่เกิน ๒๐ คน",
        answer: "10",
        hint: "ตัวเลขขั้นต่ำตามมาตรา ๖",
      },
    ],
  },
  {
    id: "asr-3",
    courseId: "asr-2497",
    title: "มาตรา 12–16 คุณสมบัติและหน้าที่ อส.",
    order: 3,
    xpReward: 100,
    steps: [
      {
        type: "info",
        title: "คุณสมบัติสมาชิก อส. (มาตรา 12) และหน้าที่ (มาตรา 16)",
        content: "✅ คุณสมบัติสมาชิก อส. (มาตรา ๑๒):\n• มีภูมิลำเนาในท้องที่\n• มีสัญชาติไทย\n• อายุ ๑๗–๖๐ ปีบริบูรณ์\n• มีร่างกายสมบูรณ์\n• ไม่เป็นพระภิกษุ/สามเณร\n• ไม่เป็นทหารหรือตำรวจประจำการ\n\n📋 หน้าที่ อส. (มาตรา ๑๖):\n① บรรเทาภัยจากธรรมชาติและข้าศึก\n② รักษาความสงบร่วมกับฝ่ายปกครองหรือตำรวจ\n③ รักษาสถานที่สำคัญและการคมนาคม\n④ ป้องกันจารกรรม สดับตรับฟัง รายงานข่าว\n⑤ ช่วยเหลือฝ่ายทหาร",
      },
      {
        type: "quiz",
        question: "ตามมาตรา 12 สมาชิก อส. ต้องมีอายุในช่วงใด?",
        choices: [
          "๑๕–๕๕ ปีบริบูรณ์",
          "๑๘–๕๕ ปีบริบูรณ์",
          "๑๗–๖๐ ปีบริบูรณ์",
          "๒๐–๖๐ ปีบริบูรณ์",
        ],
        correct: 2,
        explanation: "มาตรา ๑๒ (๓) กำหนดอายุสมาชิก อส. ตั้งแต่ ๑๗ ปีบริบูรณ์ขึ้นไป แต่ไม่เกิน ๖๐ ปีบริบูรณ์",
      },
      {
        type: "fill",
        question: "มาตรา ๑๔ สมาชิก อส. มี ___ ประเภท ได้แก่ สำรอง ประจำกอง และกองหนุน",
        answer: "3",
        hint: "จำนวนประเภทสมาชิกตามมาตรา ๑๔",
      },
    ],
  },
  // ปลัดอำเภอ course
  {
    id: "palad-1",
    courseId: "palad-amphoe",
    title: "มาตรา 1–6 บทบัญญัติทั่วไป",
    order: 1,
    xpReward: 60,
    steps: [
      {
        type: "info",
        title: "พ.ร.บ. ลักษณะปกครองท้องที่ พ.ศ. 2457 คืออะไร?",
        content: "พระราชบัญญัติลักษณะปกครองท้องที่ พระพุทธศักราช ๒๔๕๗ เป็นกฎหมายหลักว่าด้วยการปกครองท้องที่ระดับล่าง ได้แก่ หมู่บ้าน ตำบล และอำเภอ\n\n📌 มาตรา ๑ — ชื่อพระราชบัญญัติ\n📌 มาตรา ๒ — ใช้บังคับทั่วทุกมณฑล เว้นแต่มณฑลกรุงเทพฯ\n📌 มาตรา ๓ — ยกเลิกกฎหมายเก่าที่ขัดแย้งกัน\n📌 มาตรา ๕ — เสนาบดีมีอำนาจออกกฎข้อบังคับ",
      },
      {
        type: "quiz",
        question: "พ.ร.บ. ลักษณะปกครองท้องที่ พ.ศ. 2457 ใช้บังคับที่ใด?",
        choices: [
          "เฉพาะมณฑลกรุงเทพฯ",
          "ทั่วทุกมณฑล เว้นแต่มณฑลกรุงเทพฯ",
          "ทั่วทุกมณฑลรวมกรุงเทพฯ",
          "เฉพาะหัวเมืองชายแดน",
        ],
        correct: 1,
        explanation: "มาตรา ๒ บัญญัติว่า ให้ใช้บังคับทั่วทุกมณฑล เว้นแต่ในมณฑลกรุงเทพฯ ซึ่งมีกฎหมายปกครองท้องที่เฉพาะ",
      },
      {
        type: "fill",
        question: "มาตรา ๕ ให้ ___ มีอำนาจออกกฎข้อบังคับสำหรับจัดการให้เป็นไปตามพระราชบัญญัตินี้",
        answer: "เสนาบดี",
        hint: "ตำแหน่งข้าราชการระดับสูงสุดในกระทรวงขณะนั้น",
      },
    ],
  },
  {
    id: "palad-2",
    courseId: "palad-amphoe",
    title: "มาตรา 7–10 นิยามศัพท์และการตั้งหมู่บ้าน",
    order: 2,
    xpReward: 80,
    steps: [
      {
        type: "info",
        title: "นิยาม 'บ้าน' และ 'เจ้าบ้าน' (มาตรา 7)",
        content: "มาตรา ๗ กำหนดความหมายของศัพท์สำคัญ:\n\n🏠 'บ้าน' — เรือนหลังเดียวหรือหลายหลังซึ่งอยู่ในความปกครองของเจ้าของเป็นอิสระส่วนหนึ่ง (ห้องแถว แพ เรือ ก็นับเป็นบ้านได้)\n\n👤 'เจ้าบ้าน' — ผู้ปกครองบ้าน ซึ่งครอบครองด้วยเป็นเจ้าของก็ตาม ด้วยเป็นผู้เช่าก็ตาม\n\n⛪ ข้อยกเว้น — วัด โรงพยาบาล โรงทหาร โรงเรียน เรือนจำ ไม่นับเป็นบ้านตาม พ.ร.บ. นี้",
      },
      {
        type: "quiz",
        question: "สถานที่ใดต่อไปนี้ 'ไม่นับ' เป็นบ้านตามมาตรา 7?",
        choices: [
          "ห้องแถวที่มีผู้เช่าครอบครอง",
          "แพที่จอดประจำอยู่",
          "โรงเรียนของรัฐบาล",
          "เรือนที่มีเจ้าของเป็นอิสระ",
        ],
        correct: 2,
        explanation: "มาตรา ๗ ข้อ ๓ ระบุว่า วัด โรงพยาบาล โรงทหาร โรงเรียน เรือนจำ และสถานที่ต่างๆ ของรัฐบาล ไม่นับว่าเป็นบ้านตามพระราชบัญญัตินี้",
      },
      {
        type: "fill",
        question: "มาตรา ๗ ข้อ ๒ 'เจ้าบ้าน' หมายความว่า ผู้___ บ้าน ซึ่งครอบครองด้วยเป็นเจ้าของก็ตาม",
        answer: "ปกครอง",
        hint: "คำที่แสดงถึงการดูแลรับผิดชอบบ้าน",
      },
    ],
  },
  {
    id: "palad-3",
    courseId: "palad-amphoe",
    title: "มาตรา 11–27 ผู้ใหญ่บ้าน",
    order: 3,
    xpReward: 100,
    steps: [
      {
        type: "info",
        title: "ผู้ใหญ่บ้าน — คุณสมบัติและวาระ",
        content: "📌 มาตรา ๑๑ — แต่ละหมู่บ้านมีผู้ใหญ่บ้านคนหนึ่ง ราษฎรในหมู่บ้านเลือกกันเอง\n\n✅ คุณสมบัติผู้ใหญ่บ้าน (มาตรา ๑๓):\n• เป็นชาย มีสัญชาติไทย\n• อายุไม่ต่ำกว่า ๒๕ ปี\n• มีชื่อในทะเบียนบ้านในหมู่บ้านนั้น\n• ไม่เป็นข้าราชการประจำ\n\n⏰ มาตรา ๑๕ — ดำรงตำแหน่งคราวละ ๕ ปี\n🎂 มาตรา ๑๖ — พ้นตำแหน่งเมื่ออายุครบ ๖๐ ปีบริบูรณ์",
      },
      {
        type: "quiz",
        question: "ตามมาตรา 15 ผู้ใหญ่บ้านดำรงตำแหน่งคราวละกี่ปี?",
        choices: ["๓ ปี", "๔ ปี", "๕ ปี", "๖ ปี"],
        correct: 2,
        explanation: "มาตรา ๑๕ บัญญัติว่า ผู้ใหญ่บ้านดำรงตำแหน่งคราวละ ๕ ปี นับแต่วันที่ได้รับการเลือก",
      },
      {
        type: "fill",
        question: "ตามมาตรา ๑๖ ผู้ใหญ่บ้านพ้นจากตำแหน่งเมื่ออายุครบ ___ ปีบริบูรณ์",
        answer: "60",
        hint: "จำนวนปีที่เป็นเกณฑ์พ้นตำแหน่งอัตโนมัติ",
      },
    ],
  },
  {
    id: "palad-4",
    courseId: "palad-amphoe",
    title: "มาตรา 28–40 กำนัน",
    order: 4,
    xpReward: 120,
    steps: [
      {
        type: "info",
        title: "กำนัน — หัวหน้าการปกครองตำบล",
        content: "📌 มาตรา ๒๘ — แต่ละตำบลมีกำนันคนหนึ่ง คัดเลือกจากผู้ใหญ่บ้านในตำบลนั้น\n\n✅ คุณสมบัติกำนัน (มาตรา ๒๙):\n• ต้องเป็นผู้ใหญ่บ้านในตำบลนั้น\n• ราษฎรและผู้ใหญ่บ้านคัดเลือกกันเอง\n\n⏰ มาตรา ๓๑ — ดำรงตำแหน่งคราวละ ๕ ปี\n🎂 พ้นตำแหน่งเมื่ออายุครบ ๖๐ ปีบริบูรณ์\n\n📋 หน้าที่กำนัน (มาตรา ๔๐):\n• ปกครองดูแลราษฎรในตำบล\n• รักษาความสงบเรียบร้อย\n• แจ้งข่าวราชการให้ราษฎรทราบ\n• รายงานต่อนายอำเภอ",
      },
      {
        type: "quiz",
        question: "ตามมาตรา 28 กำนันต้องได้รับการคัดเลือกจากใคร?",
        choices: [
          "นายอำเภอแต่งตั้งโดยตรง",
          "ผู้ใหญ่บ้านในตำบลนั้น",
          "ราษฎรในตำบลโดยตรง",
          "ผู้ว่าราชการจังหวัด",
        ],
        correct: 1,
        explanation: "มาตรา ๒๘ บัญญัติว่า กำนันได้จากการคัดเลือกผู้ใหญ่บ้านในตำบลนั้น กำนันต้องเป็นผู้ใหญ่บ้านในตำบลนั้นด้วย",
      },
      {
        type: "fill",
        question: "มาตรา ๓๑ กำนันดำรงตำแหน่งคราวละ ___ ปี เช่นเดียวกับผู้ใหญ่บ้าน",
        answer: "5",
        hint: "เหมือนกับวาระของผู้ใหญ่บ้าน",
      },
    ],
  },
  // Math course
  {
    id: "math-101-1",
    courseId: "math-101",
    title: "การบวกและลบ",
    order: 1,
    xpReward: 50,
    steps: [
      {
        type: "info",
        title: "การบวก คืออะไร?",
        content: "การบวก คือการรวมจำนวนสองจำนวนเข้าด้วยกัน เช่น 3 + 4 = 7 เราใช้เครื่องหมาย + เพื่อบวก ลองนึกถึงการนับลูกแอปเปิล 🍎🍎🍎 + 🍎🍎🍎🍎 = 7 ลูก",
      },
      {
        type: "quiz",
        question: "5 + 3 = ?",
        choices: ["6", "7", "8", "9"],
        correct: 2,
        explanation: "5 + 3 = 8 นับต่อจาก 5 ไปอีก 3 ขั้นได้ 8",
      },
      {
        type: "fill",
        question: "10 - 4 = ___",
        answer: "6",
        hint: "ลบ 4 ออกจาก 10",
      },
    ],
  },
  {
    id: "math-101-2",
    courseId: "math-101",
    title: "การคูณ",
    order: 2,
    xpReward: 75,
    steps: [
      {
        type: "info",
        title: "การคูณ = การบวกซ้ำ",
        content: "การคูณคือการบวกซ้ำ ๆ เช่น 3 × 4 = 3 + 3 + 3 + 3 = 12 คิดง่าย ๆ ว่ามี 4 กลุ่ม กลุ่มละ 3 ชิ้น รวมกันได้ 12 ชิ้น",
      },
      {
        type: "quiz",
        question: "6 × 7 = ?",
        choices: ["36", "42", "48", "54"],
        correct: 1,
        explanation: "6 × 7 = 42 จำตารางสูตรคูณ: 6×7 = 42",
      },
      {
        type: "fill",
        question: "9 × 9 = ___",
        answer: "81",
        hint: "ลองใช้ตารางสูตรคูณแม่ 9",
      },
    ],
  },
  {
    id: "math-101-3",
    courseId: "math-101",
    title: "เศษส่วนเบื้องต้น",
    order: 3,
    xpReward: 100,
    steps: [
      {
        type: "info",
        title: "เศษส่วนคืออะไร?",
        content: "เศษส่วนแทนส่วนหนึ่งของทั้งหมด เช่น 1/2 หมายถึงครึ่งหนึ่ง ถ้าเราแบ่งพิซซ่า 🍕 ออกเป็น 4 ชิ้น แล้วกิน 1 ชิ้น เราได้กิน 1/4 ของพิซซ่า",
      },
      {
        type: "quiz",
        question: "1/2 + 1/2 = ?",
        choices: ["1/4", "2/4", "1", "2"],
        correct: 2,
        explanation: "1/2 + 1/2 = 2/2 = 1 เต็ม เหมือนกับครึ่งบวกครึ่งได้หนึ่งเต็ม",
      },
      {
        type: "fill",
        question: "3/4 ของ 8 = ___",
        answer: "6",
        hint: "8 ÷ 4 × 3 = ?",
      },
    ],
  },
  // English course
  {
    id: "eng-101-1",
    courseId: "eng-101",
    title: "Greetings & Introductions",
    order: 1,
    xpReward: 50,
    steps: [
      {
        type: "info",
        title: "How to Greet Someone",
        content: "Common greetings in English:\n• Hello / Hi — สวัสดี\n• Good morning — สวัสดีตอนเช้า\n• Good afternoon — สวัสดีตอนบ่าย\n• Good evening — สวัสดีตอนเย็น\n• Nice to meet you — ยินดีที่ได้รู้จัก",
      },
      {
        type: "quiz",
        question: "Which is the most formal greeting?",
        choices: ["Hey!", "Yo!", "Good morning.", "What's up?"],
        correct: 2,
        explanation: "'Good morning' is a formal, polite greeting suitable for professional settings.",
      },
      {
        type: "fill",
        question: "Complete: 'Nice to ___ you!'",
        answer: "meet",
        hint: "It rhymes with 'greet'",
      },
    ],
  },
  {
    id: "eng-101-2",
    courseId: "eng-101",
    title: "Present Simple Tense",
    order: 2,
    xpReward: 75,
    steps: [
      {
        type: "info",
        title: "Present Simple — ปัจจุบันกาลสามัญ",
        content: "ใช้บอกสิ่งที่เกิดขึ้นเป็นประจำหรือเป็นความจริงทั่วไป\n\nโครงสร้าง: Subject + Verb (base form)\n• I eat rice every day.\n• She works at a hospital.\n• They play football on weekends.",
      },
      {
        type: "quiz",
        question: "Choose the correct sentence:",
        choices: [
          "He go to school every day.",
          "He goes to school every day.",
          "He going to school every day.",
          "He gone to school every day.",
        ],
        correct: 1,
        explanation: "With he/she/it, add -s or -es to the verb: go → goes",
      },
      {
        type: "fill",
        question: "She ___ (study) English every night.",
        answer: "studies",
        hint: "study + es (เปลี่ยน y → ie แล้วเติม s)",
      },
    ],
  },
  {
    id: "eng-101-3",
    courseId: "eng-101",
    title: "Common Vocabulary",
    order: 3,
    xpReward: 100,
    steps: [
      {
        type: "info",
        title: "Essential Everyday Words",
        content: "คำศัพท์ที่ใช้บ่อยในชีวิตประจำวัน:\n• Busy — ยุ่ง\n• Important — สำคัญ\n• Remember — จำ\n• Different — แตกต่าง\n• Together — ด้วยกัน",
      },
      {
        type: "quiz",
        question: "What does 'important' mean in Thai?",
        choices: ["น่าสนใจ", "สำคัญ", "ยุ่ง", "แตกต่าง"],
        correct: 1,
        explanation: "'Important' แปลว่า สำคัญ เช่น 'This is very important.'",
      },
      {
        type: "fill",
        question: "Let's do this ___! (ด้วยกัน)",
        answer: "together",
        hint: "starts with 't'",
      },
    ],
  },
  // Coding course
  {
    id: "code-101-1",
    courseId: "code-101",
    title: "โปรแกรมคืออะไร?",
    order: 1,
    xpReward: 50,
    steps: [
      {
        type: "info",
        title: "โปรแกรม = ชุดคำสั่ง",
        content: "โปรแกรมคือชุดคำสั่งที่บอกให้คอมพิวเตอร์ทำงาน เหมือนสูตรทำอาหาร 🍳 ที่บอกทีละขั้นตอน\n\nภาษาโปรแกรมที่นิยม:\n• Python — เริ่มต้นง่าย\n• JavaScript — ทำเว็บได้\n• Java — ใช้ในองค์กร",
      },
      {
        type: "quiz",
        question: "ภาษาโปรแกรมใดที่เหมาะสำหรับผู้เริ่มต้นมากที่สุด?",
        choices: ["Assembly", "C++", "Python", "Rust"],
        correct: 2,
        explanation: "Python มี syntax ที่อ่านง่าย ใกล้เคียงภาษาอังกฤษ เหมาะสำหรับผู้เริ่มต้น",
      },
      {
        type: "fill",
        question: "print('___') — พิมพ์คำว่า Hello",
        answer: "Hello",
        hint: "คำทักทายภาษาอังกฤษ",
      },
    ],
  },
  {
    id: "code-101-2",
    courseId: "code-101",
    title: "ตัวแปร (Variables)",
    order: 2,
    xpReward: 75,
    steps: [
      {
        type: "info",
        title: "ตัวแปรคือกล่องเก็บข้อมูล",
        content: "ตัวแปรเปรียบเหมือนกล่องที่มีป้ายชื่อ เราสามารถเก็บข้อมูลไว้ในนั้นได้\n\nตัวอย่างใน Python:\n• name = 'AbcdeGo'\n• age = 20\n• score = 9.5\n\nแต่ละบรรทัดสร้างกล่องใหม่ 1 ใบ",
      },
      {
        type: "quiz",
        question: "x = 5\ny = 3\nprint(x + y)\nจะแสดงผลอะไร?",
        choices: ["53", "8", "x+y", "Error"],
        correct: 1,
        explanation: "x = 5 และ y = 3 ดังนั้น x + y = 8 Python จะแสดงผล 8",
      },
      {
        type: "fill",
        question: "___ = 'AbcdeGo'  (ตั้งชื่อตัวแปรว่า name)",
        answer: "name",
        hint: "คำที่แปลว่า 'ชื่อ' ในภาษาอังกฤษ",
      },
    ],
  },
  {
    id: "code-101-3",
    courseId: "code-101",
    title: "เงื่อนไข if/else",
    order: 3,
    xpReward: 100,
    steps: [
      {
        type: "info",
        title: "if/else — การตัดสินใจ",
        content: "if/else ทำให้โปรแกรมตัดสินใจได้ เหมือนคนตัดสินใจในชีวิตประจำวัน\n\nตัวอย่าง:\n```\nif score >= 50:\n    print('ผ่าน! 🎉')\nelse:\n    print('ยังไม่ผ่าน ลองใหม่!')\n```",
      },
      {
        type: "quiz",
        question: "score = 75\nif score >= 50:\n    print('Pass')\nelse:\n    print('Fail')\nจะแสดงผลว่าอะไร?",
        choices: ["Fail", "Pass", "75", "Error"],
        correct: 1,
        explanation: "score = 75 ซึ่ง >= 50 เป็นจริง ดังนั้นจะเข้า if แสดงผล 'Pass'",
      },
      {
        type: "fill",
        question: "if age ___ 18:  (ถ้าอายุมากกว่าหรือเท่ากับ 18)",
        answer: ">=",
        hint: "เครื่องหมาย 'มากกว่าหรือเท่ากับ'",
      },
    ],
  },
];

export function getCourse(id: string): Course | undefined {
  return COURSES.find((c) => c.id === id);
}

export function getLessonsForCourse(courseId: string): Lesson[] {
  return LESSONS.filter((l) => l.courseId === courseId).sort((a, b) => a.order - b.order);
}

export function getLesson(id: string): Lesson | undefined {
  return LESSONS.find((l) => l.id === id);
}
