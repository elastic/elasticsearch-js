# MlPutTrainedModelAliasRequest

## Interface

### Extends

- [`RequestBase`](RequestBase.md)

### Properties

| Property | Type | Description |
|----------|------|-------------|
| `model_alias` | [`Name`](Name.md) | The alias to create or update. This value cannot end in numbers. |
| `model_id` | [`Id`](Id.md) | The identifier for the trained model that the alias refers to. |
| `reassign?` | `boolean` | Specifies whether the alias gets reassigned to the specified trained
model if it is already assigned to a different model. If the alias is
already assigned and this parameter is false, the API returns an error. |
| `body?` | `string | { [key: string]: any } & { model_alias?: never, model_id?: never, reassign?: never }` | All values in `body` will be added to the request body. |
| `querystring?` | `{ [key: string]: any } & { model_alias?: never, model_id?: never, reassign?: never }` | All values in `querystring` will be added to the request querystring. |

## See Also

- [All Types](./)
- [API Methods](../index.md)
