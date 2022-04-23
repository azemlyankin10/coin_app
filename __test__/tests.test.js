import { identityPaySystem, getCorrectDate, getSortBills } from '../src/components/commonFunctions'

test('Тест функции oпределения платежной системы', () => {
  expect(identityPaySystem('4436576868768665')).toBe('Visa')
  expect(identityPaySystem('4836576868768665')).toBe('Visa')
  expect(identityPaySystem('41836576868768665444')).toBe('')
  expect(identityPaySystem('5136576868768665')).toBe('MasterCard')
  expect(identityPaySystem('5236576868768665')).toBe('MasterCard')
  expect(identityPaySystem('5336576868768665')).toBe('MasterCard')
  expect(identityPaySystem('5436576868768665')).toBe('MasterCard')
  expect(identityPaySystem('5536576868768665')).toBe('MasterCard')
  expect(identityPaySystem('55365768687686644445')).toBe('')
  expect(identityPaySystem('3536576868768665')).toBe('AmericanExpress')
  expect(identityPaySystem('353657684343433468768665')).toBe('')
})

test('Тест функции коректроного отображения даты', () => {
  const date = new Date('Sat Apr 23 2022 21:23:02')
  expect(getCorrectDate(date)).toBe('23 апреля 2022')
})

test('Тест функции получения отсортрованных транзакций и соотношения входящих и исходящих транзакций 1', () => {
  const entryObj = {
    account: '74213041477477406320783754',
    transactions: [
      {date: '2022-03-21T10:19:41.656Z', from: '03075161147576483308375751', to: '74213041477477406320783754', amount: 100},
      {date: '2022-03-20T18:19:22.773Z', from: '74213041477477406320783754', to: '35110031722044432128716373', amount: 100},
      {date: '2022-03-22T18:41:23.579Z', from: '55644304736377674327410786', to: '74213041477477406320783754', amount: 100},
    ]
  }

  const result = {
    comeSum: [200],
    outSum: [100],
    currentSum: [100],
    currentMonths: ['мар']
  }

  expect(getSortBills(entryObj, 2)).toStrictEqual(result)
})

test('Тест функции получения отсортрованных транзакций и соотношения входящих и исходящих транзакций 2', () => {
  const entryObj = {
    account: '74213041477477406320783754',
    transactions: [
      {date: '2022-01-21T10:19:41.656Z', from: '03075161147576483308375751', to: '74213041477477406320783754', amount: 100},
      {date: '2022-01-21T10:19:41.656Z', from: '03075161147576483308375751', to: '74213041477477406320783754', amount: 100},
      {date: '2022-02-21T10:19:41.656Z', from: '03075161147576483308375751', to: '74213041477477406320783754', amount: 100},
      {date: '2022-03-21T10:19:41.656Z', from: '03075161147576483308375751', to: '74213041477477406320783754', amount: 100},
      {date: '2022-03-21T10:19:41.656Z', from: '03075161147576483308375751', to: '74213041477477406320783754', amount: 100},
      {date: '2022-03-21T10:19:41.656Z', from: '03075161147576483308375751', to: '74213041477477406320783754', amount: 100},
      {date: '2022-04-20T18:19:22.773Z', from: '74213041477477406320783754', to: '35110031722044432128716373', amount: 100},
      {date: '2022-04-22T18:41:23.579Z', from: '55644304736377674327410786', to: '74213041477477406320783754', amount: 100},
    ]
  }

  const result = {
    comeSum: [100, 100, 200, 100],
    outSum: [0, 0, 0, 100],
    currentSum: [100, 100, 200, 0],
    currentMonths: ['янв', 'фев', 'мар', 'апр']
  }

  expect(getSortBills(entryObj, 6)).toStrictEqual(result)
})



