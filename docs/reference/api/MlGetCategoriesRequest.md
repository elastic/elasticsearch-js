# `MlGetCategoriesRequest` [interface-MlGetCategoriesRequest]

| Name | Type | Description |
| - | - | - |
| `body` | string | ({ [key: string]: any; } & { job_id?: never; category_id?: never; from?: never; partition_field_value?: never; size?: never; page?: never; }) | All values in `body` will be added to the request body. |
| `category_id` | [CategoryId](./CategoryId.md) | Identifier for the category, which is unique in the job. If you specify neither the category ID nor the partition_field_value, the API returns information about all categories. If you specify only the partition_field_value, it returns information about all categories for the specified partition. |
| `from` | [integer](./integer.md) | Skips the specified number of categories. |
| `job_id` | [Id](./Id.md) | Identifier for the anomaly detection job. |
| `page` | [MlPage](./MlPage.md) | Configures pagination. This parameter has the `from` and `size` properties. |
| `partition_field_value` | string | Only return categories for the specified partition. |
| `querystring` | { [key: string]: any; } & { job_id?: never; category_id?: never; from?: never; partition_field_value?: never; size?: never; page?: never; } | All values in `querystring` will be added to the request querystring. |
| `size` | [integer](./integer.md) | Specifies the maximum number of categories to obtain. |
