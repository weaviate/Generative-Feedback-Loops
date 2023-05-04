import weaviate
client = weaviate.client("http://localhost:8080")

Listing_schema = {
    "classes": [
        {
            "class": "Listing",
            "description": "An AirBnb Listing.",
            "moduleConfig": {
                "text2vec-openai": {
                    "skip": False,
                    "vectorizeClassName": False,
                    "vectorizePropertyName": False
                }
            },
            "vectorIndexType": "hnsw",
            "vectorizer": "text2vec-openai",
            "properties": [
               {
                   "name": "description",
                   "dataType": ["text"],
                   "description": "The description of the apartment listing. Generally written by an LLM.",
                   "moduleConfig": {
                    "text2vec-openai": {
                        "skip": False,
                        "vectorizePropertyName": False,
                        "vectorizeClassName": False
                    }
                   }
               },
               {
                "name": "name",
                "dataType": ["string"],
                "description": "A short description of the listing written by humans.",
                "moduleConfig": {
                    "text2vec-openai": {
                        "skip": True,
                        "vectorizePropertyName": False,
                        "vectorizeClassName": False
                    }
                }
               },
               {
                "name": "host_name",
                "dataType": ["string"],
                "description": "The name of the host of the apartment listing",
                "moduleConfig": {
                    "text2vec-openai": {
                        "skip": True,
                        "vectorizePropertyName": False,
                        "vectorizeClassName": False
                    }
                }
               },
               {
                   "name": "neighbourhood",
                   "dataType": ["string"],
                   "description": "The neighbourhood group of the apartment listing",
                   "moduleConfig": {
                    "text2vec-openai": {
                        "skip": True,
                        "vectorizePropertyName": False,
                        "vectorizeClassName": False
                    }
                   }
               },
               {
                   "name": "neighbourhood_group",
                   "dataType": ["string"],
                   "description": "The neighbourhood group of the apartment listing",
                   "moduleConfig": {
                    "text2vec-openai": {
                        "skip": True,
                        "vectorizePropertyName": False,
                        "vectorizeClassName": False
                    }
                   }
               },
               {
                   "name": "latitude",
                   "dataType": ["string"],
                   "description": "The latitude of the apartment listing",
                    "moduleConfig": {
                    "text2vec-openai": {
                        "skip": True,
                        "vectorizePropertyName": False,
                        "vectorizeClassName": False
                    }
                   }
               },
               {
                   "name": "latitude_number",
                   "dataType": ["number"],
                   "description": "The latitude of the apartment listing"
               },
               {
                   "name": "longitude",
                   "dataType": ["string"],
                   "description": "The latitude of the apartment listing",
                    "moduleConfig": {
                    "text2vec-openai": {
                        "skip": True,
                        "vectorizePropertyName": False,
                        "vectorizeClassName": False
                    }
                   }
               },
               {
                   "name": "longitude_number",
                   "dataType": ["number"],
                   "description": "The longitude of the apartment listing"
               },
               {
                   "name": "room_type",
                   "dataType": ["string"],
                   "description": "The type of room of the apartment listing",
                   "moduleConfig": {
                    "text2vec-openai": {
                        "skip": True,
                        "vectorizePropertyName": False,
                        "vectorizeClassName": False
                    }
                   }
               },
               {
                   "name": "price",
                   "dataType": ["string"],
                   "description": "The type of room of the apartment listing",
                   "moduleConfig": {
                    "text2vec-openai": {
                        "skip": True,
                        "vectorizePropertyName": False,
                        "vectorizeClassName": False
                    }
                   }
               },
               {
                   "name": "price_number",
                   "dataType": ["number"],
                   "description": "The price of the apartment listing"
               },
               {
                   "name": "minimum_nights",
                   "dataType": ["string"],
                   "description": "The type of room of the apartment listing",
                   "moduleConfig": {
                    "text2vec-openai": {
                        "skip": True,
                        "vectorizePropertyName": False,
                        "vectorizeClassName": False
                    }
                   }
               },
               {
                   "name": "minimum_nights_int",
                   "dataType": ["int"],
                   "description": "The minimum number of nights to stay at the apartment listing"
               },
               {
                   "name": "number_of_reviews",
                   "dataType": ["string"],
                   "description": "The type of room of the apartment listing",
                   "moduleConfig": {
                    "text2vec-openai": {
                        "skip": True,
                        "vectorizePropertyName": False,
                        "vectorizeClassName": False
                    }
                   }
               },
               {
                   "name": "number_of_reviews_int",
                   "dataType": ["int"],
                   "description": "The number of reviews of the apartment listing"
               },
               {
                   "name": "last_review",
                   "dataType": ["string"],
                   "description": "The type of room of the apartment listing",
                   "moduleConfig": {
                    "text2vec-openai": {
                        "skip": True,
                        "vectorizePropertyName": False,
                        "vectorizeClassName": False
                    }
                   }
               },
               {
                   "name": "last_review_date",
                   "dataType": ["date"],
                   "description": "The date of the last review of the apartment listing"
               },
               {
                   "name": "reviews_per_month",
                   "dataType": ["string"],
                   "description": "The type of room of the apartment listing",
                   "moduleConfig": {
                    "text2vec-openai": {
                        "skip": True,
                        "vectorizePropertyName": False,
                        "vectorizeClassName": False
                    }
                   }
               },
               {
                   "name": "reviews_per_month_number",
                   "dataType": ["number"],
                   "description": "The number of reviews per month of the apartment listing"
               },
               {
                   "name": "calculated_host_listings_count",
                   "dataType": ["string"],
                   "description": "The type of room of the apartment listing",
                   "moduleConfig": {
                    "text2vec-openai": {
                        "skip": True,
                        "vectorizePropertyName": False,
                        "vectorizeClassName": False
                    }
                   }
               },
               {
                   "name": "calculated_host_listings_count_int",
                   "dataType": ["int"],
                   "description": "The number of listings of the host on Airbnb"
               },
               {
                   "name": "availability_365",
                   "dataType": ["string"],
                   "description": "The type of room of the apartment listing",
                   "moduleConfig": {
                    "text2vec-openai": {
                        "skip": True,
                        "vectorizePropertyName": False,
                        "vectorizeClassName": False
                    }
                   }
               },
               {
                   "name": "availability_365_int",
                   "dataType": ["int"],
                   "description": "The availability of the apartment listing in a year"
               },
               {
                   "name": "org_id",
                   "dataType": ["int"],
                   "description": "The id originally associated with this AirBnb listing."
               }
           ]
        }
    ]
}

client.schema.create(Listing_schema)
