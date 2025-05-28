# `AnalysisHunspellTokenFilter` [interface-AnalysisHunspellTokenFilter]

| Name | Type | Description |
| - | - | - |
| `dedup` | boolean | If `true`, duplicate tokens are removed from the filter’s output. Defaults to `true`. |
| `dictionary` | string | One or more `.dic` files (e.g, `en_US.dic`, my_custom.dic) to use for the Hunspell dictionary. By default, the `hunspell` filter uses all `.dic` files in the `<$ES_PATH_CONF>/hunspell/<locale>` directory specified using the `lang`, `language`, or `locale` parameter. |
| `lang` | string | Locale directory used to specify the `.aff` and `.dic` files for a Hunspell dictionary. locale |
| `language` | string | Locale directory used to specify the `.aff` and `.dic` files for a Hunspell dictionary. locale |
| `locale` | string | Locale directory used to specify the `.aff` and `.dic` files for a Hunspell dictionary. |
| `longest_only` | boolean | If `true`, only the longest stemmed version of each token is included in the output. If `false`, all stemmed versions of the token are included. Defaults to `false`. |
| `type` | 'hunspell' | &nbsp; |
