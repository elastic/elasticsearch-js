# `AggregationsRandomSamplerAggregation` [interface-AggregationsRandomSamplerAggregation]

| Name | Type | Description |
| - | - | - |
| `probability` | [double](./double.md) | The probability that a document will be included in the aggregated data. Must be greater than 0, less than 0.5, or exactly 1. The lower the probability, the fewer documents are matched. |
| `seed` | [integer](./integer.md) | The seed to generate the random sampling of documents. When a seed is provided, the random subset of documents is the same between calls. |
| `shard_seed` | [integer](./integer.md) | When combined with seed, setting shard_seed ensures 100% consistent sampling over shards where data is exactly the same. |
