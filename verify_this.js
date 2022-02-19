/**
 * @fileoverview  Validations of data with custom rules
 * 
 * @version       v1.0
 * 
 * @author        Héctor Ochoa
 * 
 * @copyright     Héctor Ochoa 2022
 * 
 * CHANGELOG
 * --------
 * v1.0          	First version of VerifyThisJS
 * 19-02-2022
 * --------
 * 
 * First version of VerifyThisJS was written by Héctor Ochoa
 */

export class VerifyThis {

	/**
	 * Verify a string with custom rules
	 * @param {String} str - String to verify
	 * @param {Object} rules - Rules to validate
	 * @param {Boolean} rules.canEmpty - Validate if string can be empty
	 * @param {?Number} rules.minChars - Validate the minimin quantity of characters
	 * @param {?Number} rules.maxChars - Validate the maximun quantity of characters
	 * @param {String} rules.alias - An alias that helps to recognize fails in case of errors
	 * @param {Array<String>} rules.allowedChars - Validate the allowed chars
	 */
	static string(
		str,
		{
			canEmpty = false,
			minChars = null,
			maxChars = null,
			alias = "String",
			allowedChars = []
		}
		) {
		if (typeof str !== "string" && !(str instanceof String)) throw new TypeError("Entered value is not a string");

		if (!canEmpty && !str) throw new Error(`${alias} is empty`);

		if (minChars && str.length < minChars) throw new Error(`${alias} has less than ${minChars} characters`);

		if (maxChars && str.length > maxChars) throw new Error(`${alias} has more than ${maxChars} characters`);

		if (maxChars === 1 && !allowedChars.includes(str)) throw new Error(`Entered character is not ${allowedChars.join(" or ")}`);
	}

	/**
	 * Verify a number with custom rules
	 * @param {Number} n - Number to verify
	 * @param {Object} rules - Rules to validate
	 * @param {?Number} rules.min - Validate the minimun value of the number
	 * @param {?Number} rules.maxValue - Validate the maximum value of the number
	 * @param {String} rules.alias - An alias that helps to recognize fails in case of errors
	 * @param {Array<Number>} rules.allowedNums - Validate the allowed numbers
	 * @param {String} rules.allowedNumsAlias - An alias for allowed numbers in case of errors
	 */
	static number(
		num,
		{
			min = null,
			maxValue = null,
			alias = "Number",
			allowedNums = [],
			allowedNumsAlias = "number"
		}
		) {
		if (typeof num !== "number") throw new TypeError("Entered value is not a number");

		if (allowedNums.length > 0 && !allowedNums.includes(num)) throw new Error(`Entered ${allowedNumsAlias} is not allowed`);

		if ((min || min === 0) && num < min) throw new RangeError(`${alias} is less than ${minValue}`);

		if (maxValue && num > maxValue) throw new RangeError(`${alias} is more than ${maxValue}`);
	}

	/**
	 * Verify an array with custom rules
	 * @param {Array<Any>} arr - Array to verify
	 * @param {Object} rules - Rules to validate
	 * @param {Boolean} rules.canEmpty - Validate if array can be empty
	 * @param {?Number} rules.minElements - Validate the minimun elements of the array
	 * @param {?Number} rules.maxElements - Validate the maximun elements of the array
	 */
	static array(
		arr,
		{
			canEmpty = false,
			minElements = null,
			maxElements = null,
			arrayOf = []
		}
		) {
		if (!Array.isArray(arr)) throw new Error("Entered value is not an array")

		if (!canEmpty && arr.length < 1) throw new Error("Array is empty");
	
		if (arrayOf.length > 0) {
			let indexEl = arr.findIndex(element => !arrayOf.includes(typeof element));

			//console.log(indexEl);

			if (indexEl >= 0) throw new TypeError(`Element in index ${indexEl} is not a ${arrayOf.join(" or ")}`);
		}

		if (minElements && arr.length < minElements) throw new Error(`Array has less than ${minElements} elements`);

		if (maxElements && arr.length > maxElements) throw new Error(`Array has more than ${maxElements} elements`);	
	}

	/**
	 * Verify a valid name
	 * @param {String} str - Name to verify
	 */
	static name(str) {
		this.string(str, {/*default*/});

		const validName = /^([A-ZÁÉÍÓÚ]{1}[a-záéíóú]+\s?)+$/;

		if(!validName.test(name)) throw new Error("Entered name is not valid");
	}

	/**
	 * Verify a valid e-mail
	 * @param {String} str - Email to verify
	 */
	static email(str) {
		this.string(str, {/*default*/});

		const validEmail = /^[a-z0-9]{8,}@{1}[a-z0-9]{3,}\.[a-z]{2,}/;

		if(!validEmail.test(email)) throw new Error("Entered email is not valid");
	}
}
