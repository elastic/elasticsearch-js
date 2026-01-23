# AggregationsRandomSamplerAggregation

## Interface

### Properties

| Property | Type | Description |
|----------|------|-------------|
| `probability` | `double` | The probability that a document will be included in the aggregated data.
Must be greater than 0, less than 0.5, or exactly 1.
The lower the probability, the fewer documents are matched. |
| `seed?` | `integer` | The seed to generate the random sampling of documents.
When a seed is provided, the random subset of documents is the same between calls. |
| `shard_seed?` | `integer` | When combined with seed, setting shard_seed ensures 100% consistent sampling over shards where data is exactly the same. |

## See Also

- [All Types](./)
- [API Methods](../index.md)
