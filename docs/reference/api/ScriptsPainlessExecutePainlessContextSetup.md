## Interface `ScriptsPainlessExecutePainlessContextSetup`

| Name | Type | Description |
| - | - | - |
| `document` | any | Document that's temporarily indexed in-memory and accessible from the script. |
| `index` | [IndexName](./IndexName.md) | Index containing a mapping that's compatible with the indexed document. You may specify a remote index by prefixing the index with the remote cluster alias. For example, `remote1:my_index` indicates that you want to run the painless script against the "my_index" index on the "remote1" cluster. This request will be forwarded to the "remote1" cluster if you have configured a connection to that remote cluster. NOTE: Wildcards are not accepted in the index expression for this endpoint. The expression `*:myindex` will return the error "No such remote cluster" and the expression `logs*` or `remote1:logs*` will return the error "index not found". |
| `query` | [QueryDslQueryContainer](./QueryDslQueryContainer.md) | Use this parameter to specify a query for computing a score. |
