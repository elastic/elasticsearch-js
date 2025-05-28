# `SearchSuggestFuzziness` [interface-SearchSuggestFuzziness]

| Name | Type | Description |
| - | - | - |
| `fuzziness` | [Fuzziness](./Fuzziness.md) | The fuzziness factor. |
| `min_length` | [integer](./integer.md) | Minimum length of the input before fuzzy suggestions are returned. |
| `prefix_length` | [integer](./integer.md) | Minimum length of the input, which is not checked for fuzzy alternatives. |
| `transpositions` | boolean | If set to `true`, transpositions are counted as one change instead of two. |
| `unicode_aware` | boolean | If `true`, all measurements (like fuzzy edit distance, transpositions, and lengths) are measured in Unicode code points instead of in bytes. This is slightly slower than raw bytes. |
