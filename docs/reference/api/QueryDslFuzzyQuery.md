## Interface `QueryDslFuzzyQuery`

| Name | Type | Description |
| - | - | - |
| `fuzziness` | [Fuzziness](./Fuzziness.md) | Maximum edit distance allowed for matching. |
| `max_expansions` | [integer](./integer.md) | Maximum number of variations created. |
| `prefix_length` | [integer](./integer.md) | Number of beginning characters left unchanged when creating expansions. |
| `rewrite` | [MultiTermQueryRewrite](./MultiTermQueryRewrite.md) | Number of beginning characters left unchanged when creating expansions. |
| `transpositions` | boolean | Indicates whether edits include transpositions of two adjacent characters (for example `ab` to `ba`). |
| `value` | string | [double](./double.md) | boolean | Term you wish to find in the provided field. |
