'use strict'

const { promisify } = require('util')
const pImmediate = promisify(setImmediate)

let shouldAbort = false
async function run () {
  await pImmediate()
  if (shouldAbort) {
    return 'aborted'
  }
  if (Math.random() >= 0.5) {
    return 'hello world'
  } else {
    throw new Error('kaboom')
  }
}

const p = run()

// const thenable = {}
// Object.defineProperties(thenable, {
//   foo: {
//     value: function () {
//       console.log('foo')
//     }
//   },
//   then: {
//     get () {
//       return p.then.bind(p)
//     }
//   },
//   catch: {
//     get () {
//       return p.catch.bind(p)
//     }
//   }
// })

const thenable = {
  then (onFulFill, onReject) {
    return p.then(onFulFill, onReject)
  },
  catch (onReject) {
    return p.catch(onReject)
  },
  abort () {
    shouldAbort = true
    return this
  }
}

;(async () => {
  try {
    console.log(await thenable)
  } catch (err) {
    console.log(err)
  }
})()

// or

thenable.then(console.log).catch(console.log)
// thenable.abort()
