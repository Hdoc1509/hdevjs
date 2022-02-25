/**
 * @fileoverview  New class for strings: StringFun
 * 
 * @version       v1.0
 * 
 * @author        Héctor Ochoa
 * 
 * @copyright     Héctor Ochoa 2022
 * 
 * CHANGELOG
 * --------
 * v1.0            First version of StringFunJS
 * 25-02-2022
 * --------
 * 
 * First version of StringFunJS was written by Héctor Ochoa
 */

/* ---- NOTE ----
  For better simple data validation, StringFunJS uses VerifyThisJS library
*/
import {VerifyThis} from "./verify_this.js";


export class StringFun extends String {

  capitalize() {
    VerifyThis.string(this, {minChars: 2});

    return this.split(" ").map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(" ");
  }

  reverse() {
    VerifyThis.string(this, {miChars: 2});

    return this.split("").reverse().join("");
  }

  erasePattern(pattern) {
    VerifyThis.string(this, {/*default*/});
    VerifyThis.string(pattern, {alias: "Pattern"});

    return this.replace(new RegExp(pattern, "g"), "").trim();
  }

  countWord(word) {
    VerifyThis.string(this, {/*default*/});
    VerifyThis.string(word, {minChars: 2, alias: "Word"});

    if (!this.includes(word)) return 0;

    return this.match(new RegExp(word, "g")).length;
  }

  countLetters() {
    VerifyThis.string(this, {/*default*/});

    let vowelCounter = 0,
      consonantCounter = 0;
    const vowelCheck = /[aeiouáéíóúü]/i,
      consonantCheck = /[^aeiouáéíóúü\s\.,]/i;

    for (let char of this) {
      if (vowelCheck.test(char)) vowelCounter++;

      if (consonantCheck.test(char)) consonantCounter++;
    }

    return {vowels: vowelCounter, consonants: consonantCounter};
  }

  isPalindrome() {
    VerifyThis.string(this, {minChars: 3});

    return (this === this.reverse()) ? true : false;
  }
}