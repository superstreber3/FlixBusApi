# Tour API Documentation

## Endpoints

### 1. Create a new tour

- **Method:** `POST`
- **Endpoint:** `/createTours`
- **Body:**

    ```json
    {
      "firstName": "<customer's first name>",
      "lastName": "<customer's last name>",
      "email": "<customer's email>",
      "startDestination": "<name of the start station>",
      "endDestination": "<name of the end station>"
    }
    ```

- **CURL Example:**

    ```bash
    curl -X POST -H "Content-Type: application/json" -d '{"firstName":"John","lastName":"Doe","email":"john.doe@example.com","startDestination":"Berlin central bus station","endDestination":"Munich central bus station"}' http://localhost:3000/tours
    ```

### 2. Get all tours

- **Method:** `GET`
- **Endpoint:** `/tours`

- **CURL Example:**

    ```bash
    curl -X GET http://localhost:3000/tours
    ```

### 3. Get tours by a specific customer's email

- **Method:** `GET`
- **Endpoint:** `/tours/:email`

- **CURL Example:**

    ```bash
    curl -X GET http://localhost:3000/tours/john.doe@example.com
    ```

### 4. Create a new station

- **Method:** `POST`
- **Endpoint:** `/createStations`
- **Body:**

    ```json
    {
      "name": "<station's name>",
      "longitude": "<longitude>",
      "latitude": "<latitude>",
      "address": "<station's address>",
      "country": "<station's country>",
      "zip": "<zip code>",
      "city": "<station's city>"
    }
    ```

- **CURL Example:**

    ```bash
    curl -X POST -H "Content-Type: application/json" -d '{"name":"Paris central bus station","longitude":2.3522,"latitude":48.8566,"address":"Rue de Rivoli","country":"France","zip":"75001","city":"Paris"}' http://localhost:3000/stations
    ```

### 5. Get all stations

- **Method:** `GET`
- **Endpoint:** `/stations`

- **CURL Example:**

    ```bash
    curl -X GET http://localhost:3000/stations
    ```

> Note: Replace `localhost:3000` with the actual address and port your Node.js server is running on. Also, replace `<placeholders>` with actual data.
