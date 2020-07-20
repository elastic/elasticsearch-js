import t from 'tap'
import { Client } from '../../../index.mjs'

t.test('esm support', t => {
  t.plan(1)
  const client = new Client({ node: 'http://localhost:9200' })
  t.strictEqual(client.name, 'elasticsearch-js')
})
