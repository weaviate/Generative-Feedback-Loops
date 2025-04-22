"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const weaviate_ts_client_1 = __importDefault(require("weaviate-ts-client"));
const fs_1 = __importDefault(require("fs"));
const client = weaviate_ts_client_1.default.client({
    scheme: 'http',
    host: 'localhost:8080',
    headers: {
        'X-Cohere-Api-Key': ''
    }
});
console.log("HERE");
let listingObj = {
    'class': 'Listing',
    'description': '',
    'vectorizeClassName': false,
    'vectorizer': 'text2vec-transformers',
    'properties': [
        {
            'dataType': ['text'],
            'name': 'description',
            'description': 'The description of the apartment listing.',
            'vectorizePropertyName': false,
            'moduleConfig': {
                'text2vec-transformers': {
                    'skip': false,
                    'vectorizePropertyName': false
                }
            }
        },
        {
            'dataType': ['text'],
            'name': 'name',
            'description': 'A short description of the listing written by the lister.',
            'vectorizePropertyName': false,
            'moduleConfig': {
                'text2vec-transformers': {
                    'skip': true,
                    'vectorizePropertyName': false
                }
            }
        },
        {
            'dataType': ['text'],
            'name': 'host_name',
            'description': 'The name of the host of the apartment listing.',
            'vectorizePropertyName': false,
            'moduleConfig': {
                'text2vec-transformers': {
                    'skip': true,
                    'vectorizePropertyName': false
                }
            }
        },
        {
            'dataType': ['text'],
            'name': 'neighbourhood',
            'description': 'The neighbourhood group of the apartment listing.',
            'vectorizePropertyName': false,
            'moduleConfig': {
                'text2vec-transformers': {
                    'skip': true,
                    'vectorizePropertyName': false
                }
            }
        },
        {
            'dataType': ['text'],
            'name': 'neighbourhood_group',
            'description': 'The neighbourhood group of the apartment listing.',
            'vectorizePropertyName': false,
            'moduleConfig': {
                'text2vec-transformers': {
                    'skip': true,
                    'vectorizePropertyName': false
                }
            }
        },
        {
            'dataType': ['text'],
            'name': 'latitude',
            'description': 'The latitude of the listing.',
            'vectorizePropertyName': false,
            'moduleConfig': {
                'text2vec-transformers': {
                    'skip': true,
                    'vectorizePropertyName': false
                }
            }
        },
        {
            'dataType': ['text'],
            'name': 'longitude',
            'description': 'The longitude of the listing.',
            'vectorizePropertyName': false,
            'moduleConfig': {
                'text2vec-transformers': {
                    'skip': true,
                    'vectorizePropertyName': false
                }
            }
        },
        {
            'dataType': ['text'],
            'name': 'room_type',
            'description': 'The type of room of the listing.',
            'vectorizePropertyName': false,
            'moduleConfig': {
                'text2vec-transformers': {
                    'skip': true,
                    'vectorizePropertyName': false
                }
            }
        },
        {
            'dataType': ['text'],
            'name': 'price',
            'description': 'The price of the listing',
            'vectorizePropertyName': false,
            'moduleConfig': {
                'text2vec-transformers': {
                    'skip': true,
                    'vectorizePropertyName': false
                }
            }
        }
    ]
};
client.schema
    .classCreator()
    .withClass(listingObj)
    .do()
    .then(res => {
    console.log(res);
})
    .catch(err => {
    console.error(err);
});
const listings = fs_1.default.readFileSync('AB_NYC_2019.csv', {
    encoding: 'utf-8'
})
    .split('\n')
    .map((row) => {
    return row.split(',');
});
let counter = 0;
let success_counter = 0;
for (let i = 0; i < 50; i++) {
    const data_obj = listings[i];
    const obj = {};
    console.log(data_obj);
    obj["name"] = String(data_obj[1]);
    obj["host_name"] = String(data_obj[3]);
    obj["neighbourhood"] = String(data_obj[6]);
    obj["neighbourhood_group"] = String(data_obj[7]);
    obj["latitude"] = String(data_obj[7]);
    obj["longitude"] = String(data_obj[8]);
    obj["room_type"] = String(data_obj[9]);
    obj["price"] = String(data_obj[10]);
    console.log(obj);
    client.data.creator()
        .withClassName('Listing')
        .withProperties(obj)
        .do()
        .then(res => {
        console.log(res);
        success_counter += 1;
    })
        .catch(err => {
        console.error(err);
    });
}
/*

const generated_descriptions: string[] = [];

const generate_prompt: string = 'Please write a description for the following AirBnb Listing in english:\
Name: {name}\
Neighbourhood: {neighbourhood}\
Neighbhourhood Group: {neighbourhood_group}\
Latitude: {latitude}\
Longitude: {longitude}\
Room Type: {room_type}\
Price: {price}\
Minimum Nights: {minimum_nights}\
Number of Reviews: {number_of_reviews}\
Last Review: {last_review}\
Reviews per Month: {reviews_per_month}\
Calculated Host Listings Count: {calculated_host_listings_count}\
Availability_365: {availability_365}\
\
Please do not make up any information about the property in your description.';


const properties_str = 'name host_name neighbourhood neighbourhood_group latitude longitude room_type price’';

client.graphql
  .get()
  .withClassName('Listing')
  .withFields(properties_str)
  
  // add withAdditional here
  
  .withGenerate({
    singlePrompt: generate_prompt,
  })
  .withLimit(5)
  .do()
  .then(results => {
    console.log(results);
    /*
    loop through results to add to `generated_descriptions`
    for (let result in results) {

    }
    */
/*
  })
  .catch(err => {
    console.error(err);
  });

*/
/* Add cross-reference */ 
