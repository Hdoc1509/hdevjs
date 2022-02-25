/**
 * @fileoverview  Operations and numerical calculations
 * 
 * @version       v1.0
 * 
 * @author        Héctor Ochoa
 * 
 * @copyright     Héctor Ochoa 2022
 * 
 * CHANGELOG
 * --------
 * v1.0           First version of NumFunJS
 * 25-02-2022
 * --------
 * 
 * First version of NumFunJS was written by Héctor Ochoa
 */

/* ---- NOTE ----
  For better simple data validation, NumFunJS uses VerifyThisJS library
*/
import {VerifyThis} from "./verify_this.js";

/*===========================================
=            RANDOM NUMBERS            =
===========================================*/

export class Random {

   /**
    * Returns a integer between 2 numbers
    * @param {Number} min - The minimun value
    * @param {Number} max - The maximun value
    * @returns {Number} Returns the generated random integer
    * @example
    * // Returns 1, 2 or 3
    * Random.intBetween(1, 3);
    */
   static intBetween(min, max) {
      VerifyThis.number(min, {alias: "Minimun value"});
      VerifyThis.number(max, {alias: "Maximun value"});

      if (min === max) throw new Error("Minimun value is equals to maximun value");

      if (min > max) throw new RangeError("Minimum value is more than the maximum value");

      return Math.floor(Math.random() * (max - min + 1)) + min;
   }

   /**
    * Returns a float number between 2 numbers
    * @param {Number} min - The minimun value
    * @param {Number} max - The maximun value
    * @returns {Number} Returns the generated random float number
    * @example
    * // returns 1.1 or 1.2
    * Random.floatBetween(1.1, 1.2, 1);
    */
   static floatBetween(min, max, decimals = 1) {
      VerifyThis.number(min, {alias: "Minimum value"});
      VerifyThis.number(max, {alias: "Maximum value"});
      VerifyThis.number(decimals, {alias: "Number of decimals", min: 1});

      if (min === max) throw new Error("Minimun value is equals to maximun value");

      if (min > max) throw new RangeError("Minimum value is more than the maximum value");

      min *= Math.pow(10, decimals);
      max *= Math.pow(10, decimals);

      return Number((this.intBetween(min, max) / 10 ** decimals).toFixed(decimals));
   }
}

/*=====  End of RANDOM NUMBERS  ======*/


/*============================================
=            SPECIAL CALCULATIONS            =
============================================*/

export class Calculate {

   /**
    * Returns the factorial of a number
    * @param {Number} num - Number to get the factorial
    * @returns {Number} Returns the factorial of the entered number
    * @example
    * // Returns 120
    * Calculate.factorialOf(5);
    */
   static factorialOf(num) {
      VerifyThis.number(num, {min: 1});

      let factorial = 1;

      for (let i = 1; i <= num; i++) factorial *= i;

      return factorial;
   }

   /**
    * Retuns the fibonacci value of a number
    * @param {Number} num - Number to get fibonacci number
    * @returns {Number} Returns the fibonacci number
    * @example
    * // Returns 55
    * Calculate.fibonacciOf(10);
    */
   static fibonacciOf(num) {
      VerifyThis.number(num, {min: 0});

      const arr = [0, 1];

      for (let i = 2; i <= num; i++) arr[i] = arr[i - 1] + arr[i - 2];

      return arr[num];
   }
}

/*=====  End of SPECIAL CALCULATIONS  ======*/


/*===============================================
=            CONVERSION CALCULATIONS            =
===============================================*/

const tempUnits = {
   c: {
      f: cels => (cels * 9 / 5) + 32,
      k: cels => cels + 273.15
   },
   f: {
      c: fahr => (fahr - 32) * 5 / 9,
      k: fahr => (fahr - 32) * 5 / 9 + 273.15
   },
   k: {
      c: kel => kel - 273.15,
      f: kel => (kel - 273.15) * 9 / 5 +32
   }
};

export class Convert {

   /**
    * Converts degrees from a temperature unit to another
    * @param {Number} degrees - Degrees to convert
    * @param {String} from - Initial unit
    * @param {String} to - Target unit
    * @returns {String} Returns the converted degrees
    * @example
    * // Returns "32 °F"
    * Convert.temperature(0, "C", "f");
    */
   static temperature(degrees, from, to) {
      VerifyThis.number(degrees, {alias: "Degree"});

      from = from.toLowerCase();
      to = to.toLowerCase();

      VerifyThis.string(
         from,
         {
            alias: "Initial unit",
            maxChars: 1,
            allowedChars: ["c", "f", "k"]
         });
      VerifyThis.string(
         to,
         {
            alias: "Target unit",
            maxChars: 1,
            allowedChars: ["c", "f", "k"]
         });

      return `${tempUnits[from][to](degrees).toFixed(2)} °${to.toUpperCase()}`;
   }

   /**
    * Converts numbers from a base another
    * @param {Number} num - Number to convert
    * @param {Number} from - Initial base
    * @param {Number} to - Target base
    * @returns {String} Returns a description of the convertion
    * @example
    * // Returns "4 of base 10"
    * Convert.binaryDecimal(100, 2, 10);
    */
   static binaryDecimal(num, from, to) {
      VerifyThis.number(num, {/*default*/});
      VerifyThis.number(from, {allowedNums: [2, 10], alias: "Initial base"});
      VerifyThis.number(to, {allowedNums: [2, 10], alias: "Target base"});

      if (from === 2 && to === 10) return `${parseInt(num, from)} de base 10`;

      if (from === 10 && to === 2) return `${num.toString(2)} de base 2`;
   }
}

/*=====  End of CONVERSION CALCULATIONS  ======*/


/*===========================================
=            SPECIAL CHECKING            =
===========================================*/

export class CheckNum {

   /**
    * Evaluates if a number is capicua
    * @param {Number} num - Number to evaluate
    * @returns {Boolean}
    * @example
    * // Returns true
    * CheckNum.isCapicua(2002);
    */
   static isCapicua(num) {
      VerifyThis.number(num, {min: 10});

      return (num.toString() === num.toString().split("").reverse().join(""))
         ? true
         : false;
   }

   /**
    * Evaluates if a number is a prime number
    * @param {Number} num - Number to evaluate
    * @returns {Boolean}
    * @example
    * // Returns true
    * CheckNum.isPrime(7);
    */
   static isPrime(num) {
      VerifyThis.number(num, {min: 2});

      for (let i = 2; i < num; i++) {
         if (num % i === 0) return false;
      }

      return true;
   }
}

/*=====  End of SPECIAL CHECKING  ======*/


/*===================================
=            PROBABILITY            =
===================================*/

/**
 * Probability Info
 * @typedef {Object} ProbInfo
 * @property {Any} el - Element
 * @property {Number} prob - Probability of the element
 */

/**
 * Execute the percent probabilities of an array elements
 * @param {Array<ProbInfo>} arr Array that contents the elements and its probabilities
 * @returns {Any} Returns the element that results from the execution of the probability
 */
export const execProb = arr => {
   let indexEl = -1,
      indexProb = -1;

   indexEl = arr.findIndex(element => element.hasOwnProperty("el") === false);
   indexProb = arr.findIndex(element => element.hasOwnProperty("prob") === false);

   if (indexEl >= 0) throw new ReferenceError(`Element in index ${indexEl} is missing 'el' property`);

   if (indexProb >= 0) throw new ReferenceError(`Element in index ${indexProb} is missing 'prob' property`);

   let checkPercent = 0;

   for (const {prob: percent} of arr) checkPercent += percent;

   if (checkPercent > 100) throw new Error("The sum of the probabilities is more than 100");
   
   let num = Random.floatBetween(0, 100),
      currentProb = 0;

   //console.log("Random number:", num);
   for (const {el: item, prob: percent} of arr) {
      currentProb += percent;

      if (num <= currentProb) {
         //console.log("Probability:", percent);
         return item;
      }
   }
};

/*=====  End of PROBABILITY  ======*/
