# Individual Project

# Endpoints

_Authentication_

- **POST /login**
- **POST /register**

_Menu_

- **GET /menu**
- **POST /menu**
- **GET /menu/:id**
- **PUT /menu/:id**
- **PATCH /menu/:id**
- **DELETE /menu/:id**

_Order_

- **POST /menu/:id**

---

# POST /login

_Information_

This endpoint is used for user authentication, providing an access token upon successful login.

> ### **Request**

- **Body:**

```json
{
  "email": "string",
  "password": "string"
}
```

## Response

Response: (200 - OK)

```json
{
  "message": "login success",
  "access_token": "string"
}
```

Response: (400 - Bad Request)

```json
{
  "message": "Email is required"
}
"OR"
{
  "message": "Password is required"
}
```

Response: (401 - Unauthorized)

```json
{
  "message": "Invalid Email/Password"
}
```

---

# POST /register

_Information_

This endpoint is used to register a new user.

> ### **Request**

- **Body:**

```json
{
  "fullName": "string",
  "email": "string",
  "password": "string"
}
```

Response: (201 - Created)

```json
{
  "message": "User created",
  "user": {
    "id": "number",
    "fullName": "string",
    "email": "string",
    "password": "string",
    "updatedAt": "date",
    "createdAt": "date"
  }
}
```

Response: (400 - Bad Request)

```json
{
  "message": "fullName cannot be empty"
}
```

```json
{
  "message": "email cannot be empty"
}
"OR"
{
  "message": "must be an email format"
}
"OR"
{
  "message": "udh terdaftar, cari email lain"
}
```

```json
{
  "message": "password cannot be empty"
}
```

Response: (401 - Unauthorized)

```json
{
  "message": "Token Failed"
}
```

Response: (403 - Forbidden)

```json
{
  "message": "Access denied"
}
```

---

# GET /menu

_Information_

This endpoint retrieves menu list

> ### **Request**

- **Header:**
  - `Authentication`

## Response

Response: (200 - OK)

```json
{
  "page": "number",
  "data": [
    {
      "id": "number",
      "name": "string",
      "price": "number",
      "image": "string",
      "calories": "number",
    },
    ...
  ],
  "totalData": "number",
  "totalPage": "number",
  "dataPerPage": "number"
}
```

---

# GET /menu/:id

_Information_

This endpoint retrieves a specific menu by ID.

> ### **Request**

- **Header:**
  - `Authentication`

## Response

Response: (200 - OK)

```json
{
  "id": "number",
  "name": "string",
  "price": "number",
  "image": "string",
  "calories": "number"
}
```

---

# POST /menu/:id

_Information_

This endpoint post order by id

> ### **Request**

- **Header:**
  - `Authentication`

## Response

Response: (200 - OK)

```json
{
  "date": "string",
  "amount": "number",
  "UserId": "number",
  "menuId": "number"
}
```

---

# PUT /menu/:id

_Information_

This endpoint update order by id

> ### **Request**

- **Header:**
  - `Authentication`
  - `Authorization`

## Response

Response: (200 - OK)

```json
{
  "message": "Menu hase been edited",
  "menu": {
    "name": "string",
    "price": "number",
    "calories": "number",
    "image": "string"
  }
}
```

---

# DELETE /menu/:id

_Information:_

- To delete menu by id

> ### **Request**

- **Header:**
  - `Authentication`
  - `Authorization`

## Responses

Response: (200 - OK)

```json
{
  "message": "menu successfully deleted"
}
```

Response: (401 - Unauthorized)

```json
{
  "message": "Token Failed"
}
```

Response: (403 - Forbidden)

```json
{
  "message": "Access denied"
}
```

Response: (404 - Not Found)

```json
{
  "message": "Tidak ada data"
}
```

---

### PATCH /menu/:id

_Information:_

- To update image event by id

> ### **Request**

- **Header:**
  - `Authentication`
  - `Authorization`
  - `File`

## Responses

Response: (200 - OK)

```json
{
  "message": "Berhasil mengubah image"
}
```

Response: (400 - Bad Request)

```json
{
  "message": "File is Needed"
}
```

Response: (401 - Unauthorized)

```json
{
  "message": "Token Failed"
}
```

Response: (403 - Forbidden)

```json
{
  "message": "Access denied"
}
```

Response: (404 - Not Found)

```json
{
  "message": "Tidak ada data"
}
```

