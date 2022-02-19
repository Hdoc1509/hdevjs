/**
 * @fileoverview  New class for arrays: ArrayFun
 * 
 * @version       v1.0
 * 
 * @author        Héctor Ochoa
 * 
 * @copyright     Héctor Ochoa 2022
 * 
 * CHANGELOG
 * --------
 * v1.0            First version of ArrayFunJS
 * 12-02-2022
 * --------
 * 
 * First version of ArrayFunJS was written by Héctor Ochoa
 */

/* ---- NOTE ----
  For better simple data validation, ArrayFunJS uses VerifyThisJS library
*/
import {VerifyThis} from "./verify_this.js";


export class ArrayFun extends Array {
  
  last() {
    VerifyThis.array(this, {/*default*/});

    return this[this.length - 1];
  }

  randElement() {
    VerifyThis.array(this, {/*default*/});

    return this[Math.floor(Math.random() * this.length)];
  }

  clean() {
    VerifyThis.array(this, {/*default*/});

    this.splice(0, this.length);
  }

  removeElement(el) {
    VerifyThis.array(this, {arrayOf: ["string", "number"]});

    if (!this.includes(el)) throw new ReferenceError(`Element "${el}" is not in the array`);

    this.splice(this.indexOf(el), 1);
  }

  randSort() {
    VerifyThis.array(this, {minElements: 2});

    /*let el = this.randElement();
    const aux = [];

    for (let i = 0; i < this.length; i++) {
      while (aux.includes(el)) el = this.randElement();

      aux.push(el);
    }

    return aux;*/

    return this.sort((a, b) => Math.random() - 0.5);
  }

  powerTo(exp) {
    VerifyThis.array(this, {arrayOf: ["number"]});
    VerifyThis.number(exp, {/*default*/});

    return this.map(n => n ** exp);
  }

  minAndMax() {
    VerifyThis.array(this, {minElementes: 2, arrayOf: ["number"]});

    return {
      max: Math.max(...this),
      min: Math.min(...this)
    };
  }

  evenAndOdd() {
    VerifyThis.array(this, {minElements: 2, arrayOf: ["number"]});

    return {
      even: this.filter(n => n % 2 === 1),
      odd: this.filter(n => n % 2 === 0)
    };
  }

  orderNumbers() {
    VerifyThis.array(this, {minElements: 2, arrayOf: ["number"]});

    return {
      asc: this.map(n => n).sort((a, b) => a - b),
      desc: this.map(n => n).sort((a, b) => b -a)
    };
  }

  removeDuplicates() {
    VerifyThis.array(this, {minElements: 2});

    return [... new Set(arr)];
  }

  average() {
    VerifyThis.array(this, {minElements: 2, arrayOf: ["number"]});

    let sum = 0;

    for (let n of this) sum += n;

    return Number((sum / this.length).toFixed(2));
  }
}