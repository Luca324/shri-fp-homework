/**
 * @file Домашка по FP ч. 1
 *
 * Основная задача — написать самому, или найти в FP библиотеках функции anyPass/allPass
 * Эти функции/их аналоги есть и в ramda и в lodash
 *
 * allPass — принимает массив функций-предикатов, и возвращает функцию-предикат, которая
 * вернет true для заданного списка аргументов, если каждый из предоставленных предикатов
 * удовлетворяет этим аргументам (возвращает true)
 *
 * anyPass — то же самое, только удовлетворять значению может единственная функция-предикат из массива.
 *
 * Если какие либо функции написаны руками (без использования библиотек) это не является ошибкой
 */
import { equals, not, allPass, count, complement } from 'ramda'

const isWhite = equals('white')
const isRed = equals('red')
const isGreen = equals('green')
const isBlue = equals('blue')
const isOrange = equals('orange')

const threeSameNotWhite = obj =>
    countProps(isRed, obj) === 3 ||
    countProps(isGreen, obj) === 3 ||
    countProps(isBlue, obj) === 3 ||
    countProps(isOrange, obj) === 3

const countProps = (fn, obj) => count(fn, Object.values(obj))

// 1. Красная звезда, зеленый квадрат, все остальные белые.
export const validateFieldN1 = allPass([
    ({ star }) => isRed(star),
    ({ square }) => isGreen(square),
    ({ triangle }) => isWhite(triangle),
    ({ circle }) => isWhite(circle)
])

// 2. Как минимум две фигуры зеленые.
export const validateFieldN2 = obj =>
    countProps(isGreen, obj) >= 2

// 3. Количество красных фигур равно кол-ву синих.
export const validateFieldN3 = obj =>
    countProps(isRed, obj) === countProps(isBlue, obj)

// 4. Синий круг, красная звезда, оранжевый квадрат треугольник любого цвета
export const validateFieldN4 = allPass([
    ({ star }) => isRed(star),
    ({ square }) => isOrange(square),
    ({ circle }) => isBlue(circle),
])

// 5. Три фигуры одного любого цвета кроме белого (четыре фигуры одного цвета – это тоже true).
export const validateFieldN5 = allPass([
    obj => countProps(complement(isWhite), obj) >= 3,
    threeSameNotWhite
])


// 6. Ровно две зеленые фигуры (одна из зелёных – это треугольник), плюс одна красная. Четвёртая оставшаяся любого доступного цвета, но не нарушающая первые два условия
export const validateFieldN6 = allPass([
    obj => countProps(isGreen, obj) === 2,
    ({ triangle }) => isGreen(triangle),
    obj => countProps(isRed, obj) === 1
])

// 7. Все фигуры оранжевые.
export const validateFieldN7 = obj =>
    countProps(isOrange, obj) === 4

// 8. Не красная и не белая звезда, остальные – любого цвета.
export const validateFieldN8 = ({ star }) => not(isRed(star) || isWhite(star))

// 9. Все фигуры зеленые.
export const validateFieldN9 = obj =>
    countProps(isGreen, obj) === 4

// 10. Треугольник и квадрат одного цвета (не белого), остальные – любого цвета
export const validateFieldN10 = allPass([
    ({ square, triangle }) => square === triangle,
    ({ square }) => not(isWhite(square))
])
