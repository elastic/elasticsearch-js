# AggregationsScriptedMetricAggregation

## Interface

### Extends

- [`AggregationsMetricAggregationBase`](AggregationsMetricAggregationBase.md)

### Properties

| Property | Type | Description |
|----------|------|-------------|
| `combine_script?` | `Script | ScriptSource` | Runs once on each shard after document collection is complete.
Allows the aggregation to consolidate the state returned from each shard. |
| `init_script?` | `Script | ScriptSource` | Runs prior to any collection of documents.
Allows the aggregation to set up any initial state. |
| `map_script?` | `Script | ScriptSource` | Run once per document collected.
If no `combine_script` is specified, the resulting state needs to be stored in the `state` object. |
| `params?` | `Record<string, any>` | A global object with script parameters for `init`, `map` and `combine` scripts.
It is shared between the scripts. |
| `reduce_script?` | `Script | ScriptSource` | Runs once on the coordinating node after all shards have returned their results.
The script is provided with access to a variable `states`, which is an array of the result of the `combine_script` on each shard. |

## See Also

- [All Types](./)
- [API Methods](../index.md)
