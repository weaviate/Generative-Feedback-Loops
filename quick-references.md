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
    Listing {
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
            prompt: """Please write a description for the following AirBnb Listing in english:
            	Name: {name}
            	Neighbourhood: {neighbourhood}
            	Neighbhourhood Group: {neighbourhood_group}
            	Latitude: {latitude}
            	Longitude: {longitude}
							Room Type: {room_type}
            	Price: {price}
            	Minimum Nights: {minimum_nights}
            	Number of Reviews: {number_of_reviews}
            	Last Review: {last_review}
            	Reviews per Month: {reviews_per_month}
            	Calculated Host Listings Count: {calculated_host_listings_count}
            	Availability_365: {availability_365}
            
            	Please do not make up any information about the property in your description."""
          }
        ) {
          singleResult
        }
      }
    }
  }
}
```
