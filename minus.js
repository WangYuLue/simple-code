// 与门
const AND = (a, b) => {
  return a && b;
}

// 或门
const OR = (a, b) => {
  return a || b;
}

// 非门
const NO = (a) => {
  return !a;
}

// 或非门
const NOR = (a, b) => {
  return NO(OR(a, b))
}

// 与非门
const NAND = (a, b) => {
  return NO(AND(a, b))
}

// 异或门
const XOR = (a, b) => {
  return AND(OR(a, b), NAND(a, b))
}

/**
 * 半加器
 * 
 * @returns [加加输出, 进位输出]
 */
const HalfAdder = (a, b) => {
  return [XOR(a, b), AND(a, b)]
}

/**
 * 全加器
 * 
 * @param {*} ci 进位输入
 * @param {*} a 输入
 * @param {*} b 输入
 * @returns [加加输出, 进位输出]
 */
const FullAdder = (ci, a, b) => {
  const [s1, co1] = HalfAdder(a, b);
  const [s2, co2] = HalfAdder(s1, ci);
  return [s2, OR(co1, co2)]
}

// 八位加法器
const EightBitAdder = (arr1, arr2) => {
  const [a7, a6, a5, a4, a3, a2, a1, a0] = arr1;
  const [b7, b6, b5, b4, b3, b2, b1, b0] = arr2;
  const [s0, co0] = FullAdder(false, a0, b0);
  const [s1, co1] = FullAdder(co0, a1, b1);
  const [s2, co2] = FullAdder(co1, a2, b2);
  const [s3, co3] = FullAdder(co2, a3, b3);
  const [s4, co4] = FullAdder(co3, a4, b4);
  const [s5, co5] = FullAdder(co4, a5, b5);
  const [s6, co6] = FullAdder(co5, a6, b6);
  const [s7, co7] = FullAdder(co6, a7, b7);
  return [+co7, +s7, +s6, +s5, +s4, +s3, +s2, +s1, +s0]
}

// 求补器
const Complementer = (sub, arr) => {
  const [a7, a6, a5, a4, a3, a2, a1, a0] = arr;
  return [
    XOR(sub, a7),
    XOR(sub, a6),
    XOR(sub, a5),
    XOR(sub, a4),
    XOR(sub, a3),
    XOR(sub, a2),
    XOR(sub, a1),
    XOR(sub, a0)
  ]
}

// 八位加减法器
const EightBitMinus = (arr1, arr2) => {
  const [a7, a6, a5, a4, a3, a2, a1, a0] = arr1;
  const [b7, b6, b5, b4, b3, b2, b1, b0] = Complementer(true, arr2);
  const [s0, co0] = FullAdder(true, a0, b0);
  const [s1, co1] = FullAdder(co0, a1, b1);
  const [s2, co2] = FullAdder(co1, a2, b2);
  const [s3, co3] = FullAdder(co2, a3, b3);
  const [s4, co4] = FullAdder(co3, a4, b4);
  const [s5, co5] = FullAdder(co4, a5, b5);
  const [s6, co6] = FullAdder(co5, a6, b6);
  const [s7, co7] = FullAdder(co6, a7, b7);
  const co = XOR(true, co7);
  return [+co, +s7, +s6, +s5, +s4, +s3, +s2, +s1, +s0]
}

console.log(EightBitMinus(
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 1],
));
