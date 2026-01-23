# AnalysisMinHashTokenFilter

## Interface

### Extends

- [`AnalysisTokenFilterBase`](AnalysisTokenFilterBase.md)

### Properties

| Property | Type | Description |
|----------|------|-------------|
| `type` | `'min_hash'` | - |
| `bucket_count?` | [`integer`](integer.md) | Number of buckets to which hashes are assigned. Defaults to `512`. |
| `hash_count?` | [`integer`](integer.md) | Number of ways to hash each token in the stream. Defaults to `1`. |
| `hash_set_size?` | [`integer`](integer.md) | Number of hashes to keep from each bucket. Defaults to `1`.
Hashes are retained by ascending size, starting with the bucket’s smallest hash first. |
| `with_rotation?` | `boolean` | If `true`, the filter fills empty buckets with the value of the first non-empty bucket to its circular right if the `hash_set_size` is `1`. If the `bucket_count` argument is greater than 1, this parameter defaults to `true`. Otherwise, this parameter defaults to `false`. |

## See Also

- [All Types](./)
- [API Methods](../index.md)
