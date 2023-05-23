# Promotion Checkout API

#### Promotion Checkout API is a Node.js server-side application that provides an API endpoint to calculate the price of a shopping cart taking into account available promotions. The application uses an inventory and a promotion rule data file to retrieve the product information and promotion rules. The API endpoint receives a JSON object containing the items in the shopping cart and returns the discounted price. The application validates the input data using a schema before applying the promotions. The promotions include free gifts with purchase, buy X get Y free, and percentage discounts. The application also includes error handling and logging to help diagnose issues.

<br/>
<br/>

## Getting Started

To use the Promotion Checkout API, you will need to have Node.js and npm installed on your machine.

1. Install the dependencies.

```bash
npm install
```

2. Start the server.

```bash
npm start
```

3. The server will now be running at http://localhost:3000. You can use an HTTP client such as Postman to make requests to the API.

<br/>

### With Docker

If you use Docker, you build and run with the following command

```bash
docker build -t <image-name> .
docker run -p 3000:3000 <image-name>
```

</br>

### Endpoints

The Promotion Checkout API provides the following endpoints:

GET /health: Returns a JSON object indicating that the API is healthy and running.

POST /promoCheckout: Accepts a JSON payload containing a shopping cart and returns a JSON object containing the total price after applying any applicable promotions.

<br/>

### Dependencies

The Promotion Checkout API relies on the following dependencies:

Express.js: A popular web framework for Node.js that provides a minimalist approach to building web applications.

Joi: A data validation library for JavaScript that is used to validate the format of the shopping cart payload.

<br/>

### How to use

To use the Promotion Checkout API, you will need to send a POST request to the /promoCheckout endpoint of the API with a valid cart data in the request body.

You can use any HTTP client, here is a sample body for the request.

```bash
{
	"cart": [
	    {
	      "sku": "43N23P",
	      "qty": 1
	    }
	]
}

```

This will return the calculated price of the cart, taking into account any promotions applied to the items.
<br/>
<br/>

## Cart Data Format

The cart data must be in a specific JSON format as shown in the example below:

<pre>
{
  "cart": [
    {
      "sku": "abc123",
      "qty": 2
    },
    {
      "sku": "xyz789",
      "qty": 1
    }
  ]
}
</pre>

The sku field refers to the unique identifier of the item, and qty field refers to the quantity of the item in the cart.

<br/>

## Response Data Format

The API response will be in the following JSON format:

<pre>
{
  "price": 10.00
}
</pre>

<br/>

## Error Handling

If the cart data is invalid or there is an error during the promotion calculation, the API will return an error response with an appropriate status code and error message.

<br/>

## Examples

Please use the following endpoint and request body. <br/>
Promotion API (POST) - http://localhost:3000/api/promoCheckout <br/>
API swagger documentation - http://localhost:3000/api-docs/. <br/>
Some examples request body below.

● Each sale of a MacBook Pro comes with a free Raspberry Pi B

```bash
{
	"cart": [
	    {
	      "sku": "43N23P",
	      "qty": 1
	    },
	    {
	      "sku": "234234",
	      "qty": 1
	    }
	]
}

```

● Buy 3 Google Homes for the price of 2

```bash
{
	"cart": [
	    {
	      "sku": "120P90",
	      "qty": 3
	    }
	]
}
```

● Buying 3 or more Alexa Speakers will have a 10% discount on all Alexa
speakers

```bash
{
	"cart": [
	    {
	      "sku": "A304SD",
	      "qty": 3
	    }
	]
}
```

● Buy 2 Raspberry Pi

```bash
{
	"cart": [{ "sku": "234234", "qty": 2 }]
}
```

### Further Improvments

- Implement a caching: The current code doesn't use any caching mechanisms to speed up repeated queries to the same data. Implementing a some sort of caching layer using Redis or Memcached could have a big performance increase.
- Implement a database: The current code uses in-memory data structures to represent inventory and promotion rules. Implementing a database layer using MongoDB can make it easier to scale the application and handle large amounts of data.
- Performance testing: It is beneficial to test the API under realistic conditions. For example, simulate a realistic mix of requests, including requests with different payloads and different levels of concurrency. It is also ideal to test the API against a realistic dataset.
- API security: There are several mechanisms that can be implemented to enhance the security of an API. These mechanisms include JSON Web Token (JWT) authorization, rate limiting, and Cross-Origin Resource Sharing (CORS).
