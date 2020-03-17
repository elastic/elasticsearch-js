// Licensed to Elasticsearch B.V under one or more agreements.
// Elasticsearch B.V licenses this file to you under the Apache 2.0 License.
// See the LICENSE file in the project root for more information

import { expectType } from 'tsd'
import { Serializer } from '../../'

const serializer = new Serializer()

expectType<string>(serializer.serialize({}))
expectType<any>(serializer.deserialize(''))
expectType<string>(serializer.ndserialize([]))
expectType<string>(serializer.qserialize({}))
