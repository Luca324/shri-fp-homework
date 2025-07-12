/**
 * @file Домашка по FP ч. 2
 *
 * Подсказки:
 * Метод get у инстанса Api – каррированый
 * GET / https://animals.tech/{id}
 *
 * GET / https://api.tech/numbers/base
 * params:
 * – number [Int] – число
 * – from [Int] – из какой системы счисления
 * – to [Int] – в какую систему счисления
 *
 * Иногда промисы от API будут приходить в состояние rejected, (прямо как и API в реальной жизни)
 * Ответ будет приходить в поле {result}
 */
import { allPass, pipe, tryCatch, tap } from 'ramda';
import Api from '../tools/api';

const api = new Api();
const asyncPipe = (...fns) => input => fns.reduce(async (chain, fn) => {
    const result = await chain;
    return fn(result);
}, Promise.resolve(input));


const processSequence = ({ value, writeLog, handleSuccess, handleError }) => {
    const app = tryCatch(
        asyncPipe(
            tap(val => writeLog('initial value: ' + val)),
            tap(validate),
            Number,
            Math.round,
            tap(val => writeLog('after round: ' + val)),
            from10to2,
            tap(result => writeLog('length: ' + result.length)),
            Number,
            num => Math.pow(num, 2),
            num => num % 3,
            tap(val => writeLog('after pow(x,2) % 3: ' + val)),
            getAnimal,
            handleSuccess
        ),
        err => handleError(err.message)
    )
    app(value)
}
const from10to2 = async (number) => {
    return api.get('https://api.tech/numbers/base', { from: 10, to: 2, number: number }).then(({ result }) =>  result)
}

const getAnimal = async (id) => {
    return api.get(`https://animals.tech/${id}`, {}).then(({ result }) =>  result)
}

const validate = (value) => {
    if (!validateString(value)) {
        throw new Error('ValidationError')
    }
}

const validateString = allPass([
    str => str.length < 10,
    str => str.length > 2,
    str => Number(str) > 0,
    str => /^\d*\.?\d+$/.test(str)
])


export default processSequence;
