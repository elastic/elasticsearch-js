# `InferenceAmazonBedrockServiceSettings` [interface-InferenceAmazonBedrockServiceSettings]

| Name | Type | Description |
| - | - | - |
| `access_key` | string | A valid AWS access key that has permissions to use Amazon Bedrock and access to models for inference requests. |
| `model` | string | The base model ID or an ARN to a custom model based on a foundational model. The base model IDs can be found in the Amazon Bedrock documentation. Note that the model ID must be available for the provider chosen and your IAM user must have access to the model. |
| `provider` | string | The model provider for your deployment. Note that some providers may support only certain task types. Supported providers include: * `amazontitan` - available for `text_embedding` and `completion` task types * `anthropic` - available for `completion` task type only * `ai21labs` - available for `completion` task type only * `cohere` - available for `text_embedding` and `completion` task types * `meta` - available for `completion` task type only * `mistral` - available for `completion` task type only |
| `rate_limit` | [InferenceRateLimitSetting](./InferenceRateLimitSetting.md) | This setting helps to minimize the number of rate limit errors returned from Watsonx. By default, the `watsonxai` service sets the number of requests allowed per minute to 120. |
| `region` | string | The region that your model or ARN is deployed in. The list of available regions per model can be found in the Amazon Bedrock documentation. |
| `secret_key` | string | A valid AWS secret key that is paired with the `access_key`. For informationg about creating and managing access and secret keys, refer to the AWS documentation. |
