## Interface `CatMlDatafeedsDatafeedsRecord`

| Name | Type | Description |
| - | - | - |
| `"buckets.count"` | string | The number of buckets processed. |
| `"node.address"` | string | The network address of the assigned node. For started datafeeds only, this information pertains to the node upon which the datafeed is started. |
| `"node.ephemeral_id"` | string | The ephemeral identifier of the assigned node. For started datafeeds only, this information pertains to the node upon which the datafeed is started. |
| `"node.id"` | string | The unique identifier of the assigned node. For started datafeeds only, this information pertains to the node upon which the datafeed is started. |
| `"node.name"` | string | The name of the assigned node. For started datafeeds only, this information pertains to the node upon which the datafeed is started. |
| `"search.bucket_avg"` | string | The average search time per bucket, in milliseconds. |
| `"search.count"` | string | The number of searches run by the datafeed. |
| `"search.exp_avg_hour"` | string | The exponential average search time per hour, in milliseconds. |
| `"search.time"` | string | The total time the datafeed spent searching, in milliseconds. |
| `ae` | string | For started datafeeds only, contains messages relating to the selection of a node. assignment_explanation |
| `assignment_explanation` | string | For started datafeeds only, contains messages relating to the selection of a node. |
| `bc` | string | The number of buckets processed. 'buckets.count' |
| `bucketsCount` | string | The number of buckets processed. 'buckets.count' |
| `id` | string | The datafeed identifier. |
| `na` | string | The network address of the assigned node. For started datafeeds only, this information pertains to the node upon which the datafeed is started. 'node.address' |
| `ne` | string | The ephemeral identifier of the assigned node. For started datafeeds only, this information pertains to the node upon which the datafeed is started. 'node.ephemeral_id' |
| `ni` | string | The unique identifier of the assigned node. For started datafeeds only, this information pertains to the node upon which the datafeed is started. 'node.id' |
| `nn` | string | The name of the assigned node. For started datafeeds only, this information pertains to the node upon which the datafeed is started. 'node.name' |
| `nodeAddress` | string | The network address of the assigned node. For started datafeeds only, this information pertains to the node upon which the datafeed is started. 'node.address' |
| `nodeEphemeralId` | string | The ephemeral identifier of the assigned node. For started datafeeds only, this information pertains to the node upon which the datafeed is started. 'node.ephemeral_id' |
| `nodeId` | string | The unique identifier of the assigned node. For started datafeeds only, this information pertains to the node upon which the datafeed is started. 'node.id' |
| `nodeName` | string | The name of the assigned node. For started datafeeds only, this information pertains to the node upon which the datafeed is started. 'node.name' |
| `s` | [MlDatafeedState](./MlDatafeedState.md) | The status of the datafeed. state |
| `sba` | string | The average search time per bucket, in milliseconds. 'search.bucket_avg' |
| `sc` | string | The number of searches run by the datafeed. 'search.count' |
| `seah` | string | The exponential average search time per hour, in milliseconds. 'search.exp_avg_hour' |
| `searchBucketAvg` | string | The average search time per bucket, in milliseconds. 'search.bucket_avg' |
| `searchCount` | string | The number of searches run by the datafeed. 'search.count' |
| `searchExpAvgHour` | string | The exponential average search time per hour, in milliseconds. 'search.exp_avg_hour' |
| `searchTime` | string | The total time the datafeed spent searching, in milliseconds. 'search.time' |
| `st` | string | The total time the datafeed spent searching, in milliseconds. 'search.time' |
| `state` | [MlDatafeedState](./MlDatafeedState.md) | The status of the datafeed. |
