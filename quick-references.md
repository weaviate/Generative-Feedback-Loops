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
