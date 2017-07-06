'use strict';


/**
 * identity: A pass through function, used as a stub for truthy
 * falsey evaluation.
 * 
 * @param {Anything} value: Value can be any type of thing.
 * 
 * @return {Anything}: The input value unchanged.
 */
function identity(value){
    return value;
}
module.exports.identity = identity;

 /**
  * typeOf: Designed to determine the data type that is being invoked and 
  * return it as a string.
  * 
  * @param {Anything} value: The data type being examined.
  * 
  * @return {String} value: The return is a string describing the data type of
  * the input value.
  */
function typeOf(value){
   if (Array.isArray(value)) return 'array';
   if (value instanceof Date) return 'date';
   if (value === null) return 'null';
   return typeof value;
}
module.exports.typeof = typeOf;

/**
 * first: Designed to return the first number or element within an array.
 * 
 * @param {Array} collection: The collection being examined.
 * @param {Number} n: The number being used to examine the collection.
 * 
 * @return {Array | Anything | Number}: The return statement will either be an
 * empty array if n doesn't exist with the array, the actual first element of 
 * the array if the result of the search is NaN, or a number.
 */
function first(array, n){
    if(!Array.isArray(array) || n < 0) return [];
    if(n === undefined || isNaN(n)) return array[0];
    return array.slice(0, n);
}
module.exports.first = first;

/**
 * last: Designed to return the last number or element within an array.
 * 
 * @param {Array} collection: The collection being examined.
 * @param {Number} n: The number being used to examine the collection.
 * 
 * @return {Array | Anything | Number}: The return statement will either be an
 * empty array if n doesn't exist with the array, the actual last element of 
 * the array if the result of the search is NaN, or a number.
 */
function last(array, n){
    if(!Array.isArray(array) || n < 0) return [];
    if(n === undefined || isNaN(n)) return array[array.length - 1];
    return array.slice(-n);
}
module.exports.last = last;

/**
 * each: Designed to iterate over a collection, an array or an object, and 
 * applies the action Function to each value in the collection.
 * 
 * @param {Array | Object} collection: The collection over which to iterate.
 * @param {Function} action: The Function to be applied to each value in the 
 * collection.
 *
 * @return {Nothing}: The each function does not return anything.
 */ 
function each(collection, action) {
    if(Array.isArray(collection)) {
        for(var i = 0; i < collection.length; i++) {
            action(collection[i], i, collection);
        }
    } else {
        for (var key in collection) {
            action(collection[key], key, collection);
        }
    }
}
module.exports.each = each;

/**
 * indexOf: Desidgned to iterate through an array and return the indexed 
 * placement of the input value. If the array doesn't include the value, -1 is 
 * returned as the value doesn't exist in the array.
 * 
 * @param {Array} array: The collection over which to iterate.
 * @param {value} value: Input value of whose indexed placement is being found
 * during the iterating function. 
 * 
 * @return {Number} index: The indexed value being found during the function.
 */
function indexOf(array, value){
    for (let i = 0; i < array.length; i++){
       if (array[i] === value){
           return i;
       }
    }
}
module.exports.indexOf = indexOf;

/**
 * filter: Designed to iterate through a collection to determine the truthiness
 * of its values and return those values in a new output array. If the value is 
 * determined to be false, the iteration skips over the value and continues to
 * cycle with the following value in the collection.
 * 
 * @param {Array | Object} collection: The collection over which the iteration
 * runs.
 * @param {Function} test: The function being applied to the collection.
 * 
 * @return {Array} collection: The newly created collection with the filtered
 * results from the execution of the function.
 */
function filter(collection, test){
    const output = [];
    each(collection, function(element, index, collection) {
        // execute the test, based on result, push passed values //
        if (test(element, index, collection)) output.push(element);
    });
    return output;
}
module.exports.filter = filter;

/**
 * reject: Designed to iterate over a collection (array) and determine if a 
 * value is truthy or falsey. If value is falsey, it is collected into a new 
 * array.
 * 
 * @param {Array} array: The collection being iterated over.
 * @param {Function} test: The function being applied to the collection. 
 * 
 * @return {Array} collection: The newly created array with the falsey values
 * pushed in following the execution of the function.
 */
function reject(array, test){
    const rejected = [];
    filter(array, function(element, index, array){
        if(!test(element, index, array)) rejected.push(element);
    });
    return rejected;
}
module.exports.reject = reject;

/**
 * partition: Designed to iterate through an array and determine if its values
 * are truthy or falsey. They are then pushed into a new array and partitioned
 * or separated into their own sub-arrays based on their truthiness.
 * 
 * @param {Array} array: The collection being iterated through.
 * @param {Function} test: The Function being applied to the collection.
 * 
 * @return {Array} collection: The newly created array with values separated
 * into sub-arrays following the execution of the function.
 */
function partition(array, test){
    const partitioned = [[],[]];
    filter(array, function(element, index, array){
        if(test(element, index, array)){
            partitioned[0].push(element);
        } else {
            partitioned[1].push(element);
        }
    });
    return partitioned;
}
module.exports.partition = partition;

/**
 * unique: Designed to create a new array from an existing array, in which, 
 * there are duplicates of the same value. The new array contains only unique
 * values with the duplicates sorted out.
 * 
 * @param {Array} array: The array being iterated through to find duplicate 
 * entries.
 * 
 * @return {Array} collection: The newly created array without the duplicates
 * from the array in the first parameter.
 */
function unique(array){
    const duplicatesRemoved = [];
    each(array, function(element, index, array){
         if(indexOf(duplicatesRemoved, element, array) === -1) {
      duplicatesRemoved.push(element);
         }
   });
    return duplicatesRemoved;
}
module.exports.unique = unique;

/**
 * map: Designed to iterate through a collection and return the elements from 
 * the collection in a new array.
 * 
 * @param {Array | Object} collection: The collection being iterated through.
 * @param {Function} test: The function being applied to the collection.
 * 
 * @return {Array} collection: The newly created array with the elements
 * gathered from the exectution of the function.
 */
function map (collection, test){
   const mapped = [];
    each(collection, function(element, index, collection){
            mapped.push(test(element, index, collection));
    });
    return mapped;
}
module.exports.map = map;

/**
 * pluck: Designed to iterate through an array of objects and remove the value
 * properties of the key/value pairs and push them to a new array.
 * 
 * @param {Array} array: The collection of objects being iterated through.
 * @param {Value} property: The value in each object of the array being pushed
 * to a new array.
 * 
 * @return {Array} collection: The newly created array with the desired 
 * properties pushed in following the execution of the function.
 */
function pluck (array, property){
    const plucked = [];
    map(array, function(element, index, collection){
        plucked.push(element[property]);
    });
    return plucked;
}
module.exports.pluck = pluck;

/**
 * contains: Designed to iterate through an array to return a boolean based on 
 * whether or not the array contains the value being checked.
 * 
 * @param {Array} array: The collection being iterated through.
 * @parm {Value} value: The value being as the argument to check for in the
 * array.
 * 
 * @return {Boolean} boolean: The result of the function. It will true or false.
 */
function contains(array, value){
    return  indexOf(array, value) === -1 ? false : true;
}
module.exports.contains = contains;

/**
 * every: Designed to iterate through a collection and determine if every
 * element in the collection passes the test. A boolean is returned based on 
 * the test results.
 * 
 * @param {Array | Object} collection: The collection being iterated through.
 * @param {Function} test: The function being applied to the collection.
 * 
 *@return {Boolean} boolean: The result of the test function applied to the
 * collection. The return is true or false.
 */
function every(collection, test){
    let result = true;
    if (typeof test === 'function'){
        each(collection, function(element, index, collection){
            if (!test(element, index, collection)){
                result = false;
            }
        });
    } else {
        each(collection, function(element, index, collection){
            if (!element){
                result = false;
            }
        });
    }
    return result;
}
module.exports.every = every;

/**
 * some: Designed to iterate through a collection and determine if at least one
 * of the elements in the collection passes the test. A boolean is returned 
 * based on the test results.
 * 
 * @param {Array | Object} collection: The collection being iterated through.
 * @param {Function} test: The function being applied to the collection.
 * 
 * @return {Boolean} boolean: The result of the test function applied to the
 * collection. The return is true or false.
 */
function some(collection, test){
    let result = false;
    if (typeof test === 'function'){
        each(collection, function(element, index, collection){
            if (test(element, index, collection)){
                result = true;
            }
        });
    } else {
        each(collection, function(element, index, collection){
            if (element){
                result = true;
            }
        });
    }
    return result;
}
module.exports.some = some;

/**
 * reduce: Designed to iterate through an array to reduce the size of the array
 * to one figure indexed at a position of zero.
 * 
 * @param {Array} array: The collection being iterated through and reduced.
 * @param {Function} test: The function being applied to the array.
 * @param {Value} seed: The first value being passed to start the reduce
 * function.
 * 
 * @result {Array} array: The reduced array from the first parameter.
 */
function reduce(array, test, seed) {
    let result;
    if (seed >= 0) {
        result = seed;
        each(array, function(element, index, collection){
            result = test(result, element, index);
        });
    } else {
        result = array[0];
        for (let i = 1; i < array.length; i++) {
            result = test(result, array[i], i);
        }
    }
    return result;
}
module.exports.reduce = reduce;

/**
 * extend: Designed to iterate over an object and extend the object by adding
 * to it an indeterminate number of other objects.
 * 
 * @param {Object} objectA: The collection being extended.
 * @param {Object} objectB: The object being added to the first object.
 * 
 * @return {Object} object: The extended object from the first parameter.
 */
function extend(objectA, objectB){
    let result = objectA;
    for (let i = 0; i < arguments.length; i++){
        each(arguments[i], function(element, index, collection){
            result[index] = element;
        });
    }
     return result;
}
module.exports.extend = extend;
