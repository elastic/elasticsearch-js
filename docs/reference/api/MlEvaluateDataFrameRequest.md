## Interface `MlEvaluateDataFrameRequest`

| Name | Type | Description |
| - | - | - |
| `body` | string | ({ [key: string]: any; } & { evaluation?: never; index?: never; query?: never; }) | All values in `body` will be added to the request body. |
| `evaluation` | [MlDataframeEvaluationContainer](./MlDataframeEvaluationContainer.md) | Defines the type of evaluation you want to perform. |
| `index` | [IndexName](./IndexName.md) | Defines the `index` in which the evaluation will be performed. |
| `query` | [QueryDslQueryContainer](./QueryDslQueryContainer.md) | A query clause that retrieves a subset of data from the source index. |
| `querystring` | { [key: string]: any; } & { evaluation?: never; index?: never; query?: never; } | All values in `querystring` will be added to the request querystring. |
