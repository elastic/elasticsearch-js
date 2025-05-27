## Interface `AggregationsCategorizeTextAggregation`

| Name | Type | Description |
| - | - | - |
| `categorization_analyzer` | [AggregationsCategorizeTextAnalyzer](./AggregationsCategorizeTextAnalyzer.md) | The categorization analyzer specifies how the text is analyzed and tokenized before being categorized. The syntax is very similar to that used to define the analyzer in the analyze API. This property cannot be used at the same time as `categorization_filters`. |
| `categorization_filters` | string[] | This property expects an array of regular expressions. The expressions are used to filter out matching sequences from the categorization field values. You can use this functionality to fine tune the categorization by excluding sequences from consideration when categories are defined. For example, you can exclude SQL statements that appear in your log files. This property cannot be used at the same time as categorization_analyzer. If you only want to define simple regular expression filters that are applied prior to tokenization, setting this property is the easiest method. If you also want to customize the tokenizer or post-tokenization filtering, use the categorization_analyzer property instead and include the filters as pattern_replace character filters. |
| `field` | [Field](./Field.md) | The semi-structured text field to categorize. |
| `max_matched_tokens` | [integer](./integer.md) | The maximum number of token positions to match on before attempting to merge categories. Larger values will use more memory and create narrower categories. Max allowed value is 100. |
| `max_unique_tokens` | [integer](./integer.md) | The maximum number of unique tokens at any position up to max_matched_tokens. Must be larger than 1. Smaller values use less memory and create fewer categories. Larger values will use more memory and create narrower categories. Max allowed value is 100. |
| `min_doc_count` | [integer](./integer.md) | The minimum number of documents in a bucket to be returned to the results. |
| `shard_min_doc_count` | [integer](./integer.md) | The minimum number of documents in a bucket to be returned from the shard before merging. |
| `shard_size` | [integer](./integer.md) | The number of categorization buckets to return from each shard before merging all the results. |
| `similarity_threshold` | [integer](./integer.md) | The minimum percentage of tokens that must match for text to be added to the category bucket. Must be between 1 and 100. The larger the value the narrower the categories. Larger values will increase memory usage and create narrower categories. |
| `size` | [integer](./integer.md) | The number of buckets to return. |
