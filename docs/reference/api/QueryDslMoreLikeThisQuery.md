# `QueryDslMoreLikeThisQuery` [interface-QueryDslMoreLikeThisQuery]

| Name | Type | Description |
| - | - | - |
| `analyzer` | string | The analyzer that is used to analyze the free form text. Defaults to the analyzer associated with the first field in fields. |
| `boost_terms` | [double](./double.md) | Each term in the formed query could be further boosted by their tf-idf score. This sets the boost factor to use when using this feature. Defaults to deactivated (0). |
| `fail_on_unsupported_field` | boolean | Controls whether the query should fail (throw an exception) if any of the specified fields are not of the supported types ( `text` or `keyword`). |
| `fields` | [Field](./Field.md)[] | A list of fields to fetch and analyze the text from. Defaults to the `index.query.default_field` index setting, which has a default value of `*`. |
| `include` | boolean | Specifies whether the input documents should also be included in the search results returned. |
| `like` | [QueryDslLike](./QueryDslLike.md) | [QueryDslLike](./QueryDslLike.md)[] | Specifies free form text and/or a single or multiple documents for which you want to find similar documents. |
| `max_doc_freq` | [integer](./integer.md) | The maximum document frequency above which the terms are ignored from the input document. |
| `max_query_terms` | [integer](./integer.md) | The maximum number of query terms that can be selected. |
| `max_word_length` | [integer](./integer.md) | The maximum word length above which the terms are ignored. Defaults to unbounded ( `0`). |
| `min_doc_freq` | [integer](./integer.md) | The minimum document frequency below which the terms are ignored from the input document. |
| `min_term_freq` | [integer](./integer.md) | The minimum term frequency below which the terms are ignored from the input document. |
| `min_word_length` | [integer](./integer.md) | The minimum word length below which the terms are ignored. |
| `minimum_should_match` | [MinimumShouldMatch](./MinimumShouldMatch.md) | After the disjunctive query has been formed, this parameter controls the number of terms that must match. |
| `routing` | [Routing](./Routing.md) | &nbsp; |
| `stop_words` | [AnalysisStopWords](./AnalysisStopWords.md) | An array of stop words. Any word in this set is ignored. |
| `unlike` | [QueryDslLike](./QueryDslLike.md) | [QueryDslLike](./QueryDslLike.md)[] | Used in combination with `like` to exclude documents that match a set of terms. |
| `version_type` | [VersionType](./VersionType.md) | &nbsp; |
| `version` | [VersionNumber](./VersionNumber.md) | &nbsp; |
