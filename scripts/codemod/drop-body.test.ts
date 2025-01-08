import { Client } from '../..'

const client = new Client({
  node: 'http://localhost:9200',
  auth: { username: 'elastic', password: 'changeme' }
})

async function doThings () {
  // should get fixed by codemod
  await client.closePointInTime({
    body: {
      id: 'foobar'
    }
  })

  await client.asyncSearch.get({
  // @ts-expect-error should get fixed by codemod
    body: {
      id: 'foo'
    }
  })

  // @ts-expect-error should get fixed by codemod
  await client.create({
    id: 'foo',
    body: { index: 'my-index' }
  })

  await client.watcher.putWatch({
    id: 'foo',
    active: true
  })

  const body = { id: 'foo' }
  // @ts-expect-error should get fixed by codemod
  await client.asyncSearch.get({ body })
  await client.asyncSearch.get(body)

  const request = { body }
  // @ts-expect-error should get fixed by codemod
  await client.asyncSearch.get(request)

  const request2 = body
  await client.closePointInTime(request2)

  // some non-client calls
  const x = Math.random()
  console.log(x)
  console.log({ body: 'foo' })
}

doThings()
  .then(() => console.log('done'))
  .catch(() => console.error('uh oh'))
