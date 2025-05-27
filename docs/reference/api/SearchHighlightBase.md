## Interface `SearchHighlightBase`

| Name | Type | Description |
| - | - | - |
| `boundary_chars` | string | A string that contains each boundary character. |
| `boundary_max_scan` | [integer](./integer.md) | How far to scan for boundary characters. |
| `boundary_scanner_locale` | string | Controls which locale is used to search for sentence and word boundaries. This parameter takes a form of a language tag, for example: `"en-US"`, `"fr-FR"`, `"ja-JP"`. |
| `boundary_scanner` | [SearchBoundaryScanner](./SearchBoundaryScanner.md) | Specifies how to break the highlighted fragments: chars, sentence, or word. Only valid for the unified and fvh highlighters. Defaults to `sentence` for the `unified` highlighter. Defaults to `chars` for the `fvh` highlighter. |
| `force_source` | boolean | &nbsp; |
| `fragment_size` | [integer](./integer.md) | The size of the highlighted fragment in characters. |
| `fragmenter` | [SearchHighlighterFragmenter](./SearchHighlighterFragmenter.md) | Specifies how text should be broken up in highlight snippets: `simple` or `span`. Only valid for the `plain` highlighter. |
| `highlight_filter` | boolean | &nbsp; |
| `highlight_query` | [QueryDslQueryContainer](./QueryDslQueryContainer.md) | Highlight matches for a query other than the search query. This is especially useful if you use a rescore query because those are not taken into account by highlighting by default. |
| `max_analyzed_offset` | [integer](./integer.md) | If set to a non-negative value, highlighting stops at this defined maximum limit. The rest of the text is not processed, thus not highlighted and no error is returned The `max_analyzed_offset` query setting does not override the `index.highlight.max_analyzed_offset` setting, which prevails when it’s set to lower value than the query setting. |
| `max_fragment_length` | [integer](./integer.md) | &nbsp; |
| `no_match_size` | [integer](./integer.md) | The amount of text you want to return from the beginning of the field if there are no matching fragments to highlight. |
| `number_of_fragments` | [integer](./integer.md) | The maximum number of fragments to return. If the number of fragments is set to `0`, no fragments are returned. Instead, the entire field contents are highlighted and returned. This can be handy when you need to highlight short texts such as a title or address, but fragmentation is not required. If `number_of_fragments` is `0`, `fragment_size` is ignored. |
| `options` | Record<string, any> | &nbsp; |
| `order` | [SearchHighlighterOrder](./SearchHighlighterOrder.md) | Sorts highlighted fragments by score when set to `score`. By default, fragments will be output in the order they appear in the field (order: `none`). Setting this option to `score` will output the most relevant fragments first. Each highlighter applies its own logic to compute relevancy scores. |
| `phrase_limit` | [integer](./integer.md) | Controls the number of matching phrases in a document that are considered. Prevents the `fvh` highlighter from analyzing too many phrases and consuming too much memory. When using `matched_fields`, `phrase_limit` phrases per matched field are considered. Raising the limit increases query time and consumes more memory. Only supported by the `fvh` highlighter. |
| `post_tags` | string[] | Use in conjunction with `pre_tags` to define the HTML tags to use for the highlighted text. By default, highlighted text is wrapped in `<em>` and `</em>` tags. |
| `pre_tags` | string[] | Use in conjunction with `post_tags` to define the HTML tags to use for the highlighted text. By default, highlighted text is wrapped in `<em>` and `</em>` tags. |
| `require_field_match` | boolean | By default, only fields that contains a query match are highlighted. Set to `false` to highlight all fields. |
| `tags_schema` | [SearchHighlighterTagsSchema](./SearchHighlighterTagsSchema.md) | Set to `styled` to use the built-in tag schema. |
| `type` | [SearchHighlighterType](./SearchHighlighterType.md) | &nbsp; |
