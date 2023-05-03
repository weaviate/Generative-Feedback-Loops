Simple example of Weaviate `singleResult` for Retrieval-Augmented Generation

```graphql
{
  Get {
    Listing
    (limit:1){
      price
      _additional {
        generate(
          singleResult:{
            prompt: "What is the {price}"
          }
        ){
        singleResult
        }
      }
    }
  }
}
```

Generate with all Listing properties

```graphql
{
  Get {
    Listing (limit: 1) {
      name
      host_name
      neighbourhood
      neighbourhood_group
      latitude
      longitude
      room_type
      price
      _additional {
        generate(
          singleResult: {
            prompt: "Please write a description for the following AirBnB Listing in English. NAME: {name} HOST_NAME {host_name} NEIGHBOURHOOD {neighbourhood} NEIGHBOURHOOD_GROUP {neighbourhood_group} PRICE {price}. Please do not make up any information about the property in your description."
          }
        ) {
          singleResult
        }
      }
    }
  }
}
```
