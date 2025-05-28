# `QueryDslFunctionScoreContainer` [interface-QueryDslFunctionScoreContainer]

| Name | Type | Description |
| - | - | - |
| `exp` | [QueryDslDecayFunction](./QueryDslDecayFunction.md) | Function that scores a document with a exponential decay, depending on the distance of a numeric field value of the document from an origin. |
| `field_value_factor` | [QueryDslFieldValueFactorScoreFunction](./QueryDslFieldValueFactorScoreFunction.md) | Function allows you to use a field from a document to influence the score. It’s similar to using the script_score function, however, it avoids the overhead of scripting. |
| `filter` | [QueryDslQueryContainer](./QueryDslQueryContainer.md) | &nbsp; |
| `gauss` | [QueryDslDecayFunction](./QueryDslDecayFunction.md) | Function that scores a document with a normal decay, depending on the distance of a numeric field value of the document from an origin. |
| `linear` | [QueryDslDecayFunction](./QueryDslDecayFunction.md) | Function that scores a document with a linear decay, depending on the distance of a numeric field value of the document from an origin. |
| `random_score` | [QueryDslRandomScoreFunction](./QueryDslRandomScoreFunction.md) | Generates scores that are uniformly distributed from 0 up to but not including 1. In case you want scores to be reproducible, it is possible to provide a `seed` and `field`. |
| `script_score` | [QueryDslScriptScoreFunction](./QueryDslScriptScoreFunction.md) | Enables you to wrap another query and customize the scoring of it optionally with a computation derived from other numeric field values in the doc using a script expression. |
| `weight` | [double](./double.md) | &nbsp; |
