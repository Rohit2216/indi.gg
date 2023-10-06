
# Library Management System API

The Book Recommendation API is a robust and efficient solution for managing books, users, and providing personalized book recommendations based on authors. This API simplifies the process of book management and enhances user experience by offering tailored reading suggestions.

## API Documentation

For detailed API documentation, explore the interactive [Swagger Documentation](#swagger-documentation) provided.


## Tech Stack

- **Server:** Node.js, Express.js
- **Database:** MongoDB
- **Documentation:** Swagger.js

## Installation

To run the API locally, follow these steps:

1. Clone the repository:

   ```bash
   git clone <repository-url>
   ```

2. Install dependencies:

   ```bash
   npm install
   ```
3. Configure environment variables:
   
   Create a `.env` file in the root of the project and add the following:

   ```env
   port=8800
   mongoUrl=mongodb://localhost:27017/book_management
   JWT_SECRET=your-secret-key
   ```

4. Start the server:

   ```bash
   npm run server
   ```

## Authentication
To authenticate with the API, you need to obtain a JWT token. You can do this by sending a POST request to the /user/login endpoint with your email and password. If the login is successful, the API will return a JWT token in the response body.

To use the JWT token to authenticate with the API, you need to include it in the Authorization header of all requests. The header value should be in the format <token>, where <token> is the JWT token that you obtained from the /user/login endpoint.




## User Routes

### Users API Endpoints

| Endpoint                  | Method | Input             | Output              | Description                                                |
|---------------------------|--------|-------------------|----------------------|------------------------------------------------------------|
| `/user/register`          | POST   | User data         | Success message      | Register a new user.                                     |
| `/user/login`             | POST   | User credentials  | User data and token  | Log in an existing user.                                 |


### Books API Endpoints

| Endpoint                  | Method | Input             | Output              | Description                                                |
|---------------------------|--------|-------------------|----------------------|------------------------------------------------------------|
| `/book/addbooks`          | POST   | Book data         | Success message      | Add a new book to the database.                            |
| `/book/update/{id}`       | PATCH  | Book ID, Updated data | Success message   | Update a book by ID.                                     |
| `/book/delete/{id}`       | DELETE | Book ID           | Success message      | Delete a book by ID.                                     |
| `/book/getbooks`          | GET    | None              | List of books        | Get a list of all books.                                 |
| `/book/search`            | GET    | Search term       | List of matching books| Search for books by title, author, or ISBN.              |


### Borrowing API Endpoints

| Endpoint                  | Method | Input             | Output              | Description                                                |
|---------------------------|--------|-------------------|----------------------|------------------------------------------------------------|
| `/borrow/borrowbooks`     | POST   | User ID, Book ID   | Success message      | Borrow a book from the library.                           |

### Returning API Endpoints

| Endpoint                  | Method | Input                 | Output              | Description                                                |
|---------------------------|--------|-----------------------|----------------------|------------------------------------------------------------|
| `/borrow/returnbooks`     | POST   | BorrowedBook ID, Return date | Success message | Return a borrowed book to the library.                  |

These tables provide a clear breakdown of endpoints based on their functionality.


## API Documentation

For detailed API documentation, explore the interactive [Swagger Documentation](#swagger-documentation) provided.


## Contributing

We welcome contributions from the community. To contribute, please follow our [Contributing Guidelines](CONTRIBUTING.md) to maintain consistency and quality across the project.

## License

This project is licensed under the [MIT License](LICENSE.md) - see the [LICENSE.md](LICENSE.md) file for details.

---
