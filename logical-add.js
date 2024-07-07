/**
 * 型チェックユーティリティー
 * ・boolean or 0 or 1 の場合trueを返す
 * @param {*} val
 * @returns {boolean}
 */
export function isBool(val) {
  return typeof val === 'boolean' || val === 0 || val === 1;
}

/**
 * 半加算器
 * ・計算結果: a xor b
 * ・キャリー：a and b
 * @param {boolean | 0 | 1} a
 * @param {boolean | 0 | 1} b
 * @returns [キャリー、計算結果]
 */
export function halfAdder(a, b) {
  if (!isBool(a) || !isBool(b)) {
    throw new Error('Parameter must be boolean');
  }
  const s = a ^ b;
  const c = a & b;
  // [キャリー、計算結果]
  return [c, s];
}

/**
 * 全加算器
 * @param {boolean | 0 | 1} a
 * @param {boolean | 0 | 1} b
 * @param {boolean | 0 | 1} ci
 * @returns [キャリー、計算結果]
 */
export function fullAdder(a, b, ci) {
  // (a + b)の計算に、(前の桁の)キャリーを加算したのが[計算結果]
  // キャリーは、上記2回の計算結果のキャリー同士のor
  const [c1, s1] = halfAdder(a, b);
  const [c2, s2] = halfAdder(ci, s1); // 計算結果＋前の桁のキャリー
  const co = c1 || c2;
  // [キャリー、計算結果]
  return [co, s2];
}

/**
 * 整数(>0)の加算
 * ・全加算器を使い最下位ビットから1bitずつ計算する
 * @param {number} a
 * @param {number} b
 * @returns {number} 計算結果
 */
export function numberAdder(a, b) {
  // 大きい方の桁数(bit単位) ⇒(ループ回数)
  const digits = 32 - Math.min(Math.clz32(a), Math.clz32(b));
  // 計算結果のbit配列(逆順)
  const resultRevBit = [];
  let mask = 1;
  let carry = 0;
  for (let i = 0; i < digits; i++) {
    // 引数の指定桁を(bit)maskで取り出し、!!(2重否定)でboolean化
    const [c, s] = fullAdder(!!(a & mask), !!(b & mask), carry);
    mask = mask << 1;
    // キャリーを保存して上位桁の計算に渡す
    carry = c;
    resultRevBit.push(s);
  }
  // 最後のcarryを追加
  resultRevBit.push(carry);

  // bit配列を整数値に変換
  const added = resultRevBit.reduce((result, bit, index) => {
    return result + (bit << index);
  }, 0);

  return added;
}
