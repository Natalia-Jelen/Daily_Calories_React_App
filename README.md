 ## Uruchomienie
 W celu uruchomienia aplikacji należy w projekcie otworzyć "appsettings.json", a następnie w zmiennej "DefaultConnection" zmienić "Id" na własny Login oraz "Password" na własne hasło do bazy. Tak samo należy postąpić w "appsettings.Development.json". W folderze "Baza danych-skrypt" znajduje się skrypt bazy danych, który należy uruchomić w SQL Server Management Studio.

## Back-end
  Warstwa back-end aplikacji stworzona jest w technologii C# z użyciem szablonu API + React.js + uwierzytelnianie. Back-end składa się z wielu klas pogrupowanych według funkcjonalności, takich jak modele, kontekst, kontrolery oraz migracje. Automatycznie generowane kontrolery na podstawie modelu oraz kontekstu służą do tworzenia metod API, które pozwalają na odczyt danych oraz operacje w bazie danych.
  
Automatycznie wygenerowane w kontrolerach dostępne metody API:
* metoda GET - służy do pobierania danych z bazy,
* metoda PUT - służy do aktualizowania danych z bazy,
* metoda POST - służy do przekazywania danych do bazy,
* metoda DELETE - służy do usuwania danych z bazy

GET:
Request:
url: /api/UserStats/<user id>

Response:
[{
applicationUserId: "id"
goal: 1
registerDate: "time stamp"
userStatsId: 1
weight: 1
}, ...]
 
 Request:
 url: /api/Products
 
 Response:
 [{productId: 1, 
 description: "string", 
 caloriesAmount: "1"
 },…]
 
 Request:
 url: /api/Sexs
 Response:
 [{sexId: 1, 
 abbreviation: "char", 
 description: "string", 
 usersData: []
 },…]
 
 Request:
 url: /api/Activities
 Response:
 [{activityId: 1, 
 pal: 1, 
 description: "string", 
 usersData: []},…]
 
 POST:
 Request:
 url: /api/UserStats
 Response:
 [{
 applicationUserId: "id"
goal: 1
registerDate: "time stamp"
userStatsId: 1
weight: 1
 }, ...]
 
## Front-end
  Warstwa front-end aplikacji stworzony jest w technologii JavaScript z użyciem biblioteki React i szablonu create-react-app. Poszczególne elementy interfejsu użytkownika są umieszczone w poszczególnych komponentach. Poszczególne komponenty podczas ładowania komunikują się z wcześniej utworzonymi metodami API po stronie back-endu, dzięki czemu mogą wykonywać podstawowe operacje (typu odczyt i zapis) na danych z bazy. Dane w obrębie komponentu zapisywane są w jego stanie i przetwarzane przy użyciu odpowiednich eventów na przyciskach. Dodatkowo z szablonu aplikacji Visual Studio wygenerowane zostały komponenty odpowiedzialne za funkcjonalności autentykacji i autoryzacji.

## Wykorzystywane komponenty:
### UserData
* Funkcja getApplicationUserId - odpowiada za zwracanie identyfikatora użytkownika który jest zalogowany.
* Funkcja getUserStats - pobiera Id użytkownika, który jest zalogowany odwołując się do metody getApplicationUserId, następnie pobiera i zapisuje
dane w stanie komponentu.
* Funkcja handleSubmit - sprawdza czy dane użytkownika znajdują sie juz w
bazie, jeżeli się znajdują to używa funkcji updateNewStats do aktualizacji, w
przeciwnym razie używa addNewUserData do dodania danych użytkownika.
* Funkcja getPPMValue - służy do obliczenia PPM w zależności od wybranej
płci użytkownika i zwraca jego wartość.
* Funkcja renderUserDataForm - zwraca definicje budowy formularza, część
wizualną budowy komponentu.
* Funkcje getActivities, getSexs, getUsersDatas, getProducts służą do pobierania danych z odpowiednich tabel.
* Funkcje handleNameChange, handleHeightChange, handleWeightChang, handleDateOfBirthChange, handleSexChange, handleActivityChange służą do
zmiany stanu komponentu na podstawie zmian wartości pół formularza.
### ProductItem
* Funkcja getProducts - zwraca listę produktów z bazy.

### DailyProducts
* Funkcje removeBreakfastItem, removeLunchItem, removeDinnerItem służą
do usuwania elementów z listy danego rodzaju typu dań.
* Funkcje onBreakfastItemChange, onLunchItemChange, onDinnerItemChange służą do aktualizacji listy produktów w danym typie dania.
* Funkcja renderDailyProducts - odpowiedzialna za aktualizowanie elementów
formularza na podstawie stanu komponentu.

# Web App React API
Demo API with Swagger

## Version: v1

### /api/Activities

#### GET
##### Responses

| Code | Description |
| ---- | ----------- |
| 200 | Success |

#### POST
##### Responses

| Code | Description |
| ---- | ----------- |
| 200 | Success |

### /api/Activities/{id}

#### GET
##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| id | path |  | Yes | integer |

##### Responses

| Code | Description |
| ---- | ----------- |
| 200 | Success |

#### PUT
##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| id | path |  | Yes | integer |

##### Responses

| Code | Description |
| ---- | ----------- |
| 200 | Success |

#### DELETE
##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| id | path |  | Yes | integer |

##### Responses

| Code | Description |
| ---- | ----------- |
| 200 | Success |

### /_configuration/{clientId}

#### GET
##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| clientId | path |  | Yes | string |

##### Responses

| Code | Description |
| ---- | ----------- |
| 200 | Success |

### /api/Products

#### GET
##### Responses

| Code | Description |
| ---- | ----------- |
| 200 | Success |

#### POST
##### Responses

| Code | Description |
| ---- | ----------- |
| 200 | Success |

### /api/Products/{id}

#### GET
##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| id | path |  | Yes | integer |

##### Responses

| Code | Description |
| ---- | ----------- |
| 200 | Success |

#### PUT
##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| id | path |  | Yes | integer |

##### Responses

| Code | Description |
| ---- | ----------- |
| 200 | Success |

#### DELETE
##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| id | path |  | Yes | integer |

##### Responses

| Code | Description |
| ---- | ----------- |
| 200 | Success |

### /api/Sexs

#### GET
##### Responses

| Code | Description |
| ---- | ----------- |
| 200 | Success |

#### POST
##### Responses

| Code | Description |
| ---- | ----------- |
| 200 | Success |

### /api/Sexs/{id}

#### GET
##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| id | path |  | Yes | integer |

##### Responses

| Code | Description |
| ---- | ----------- |
| 200 | Success |

#### PUT
##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| id | path |  | Yes | integer |

##### Responses

| Code | Description |
| ---- | ----------- |
| 200 | Success |

#### DELETE
##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| id | path |  | Yes | integer |

##### Responses

| Code | Description |
| ---- | ----------- |
| 200 | Success |

### /api/UsersDatas

#### GET
##### Responses

| Code | Description |
| ---- | ----------- |
| 200 | Success |

#### POST
##### Responses

| Code | Description |
| ---- | ----------- |
| 200 | Success |

### /api/UsersDatas/{applicationUserId}

#### GET
##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| applicationUserId | path |  | Yes | string |

##### Responses

| Code | Description |
| ---- | ----------- |
| 200 | Success |

### /api/UsersDatas/{id}

#### PUT
##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| id | path |  | Yes | integer |

##### Responses

| Code | Description |
| ---- | ----------- |
| 200 | Success |

#### DELETE
##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| id | path |  | Yes | integer |

##### Responses

| Code | Description |
| ---- | ----------- |
| 200 | Success |

### /api/UserStats

#### GET
##### Responses

| Code | Description |
| ---- | ----------- |
| 200 | Success |

#### POST
##### Responses

| Code | Description |
| ---- | ----------- |
| 200 | Success |

### /api/UserStats/{applicationUserId}

#### GET
##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| applicationUserId | path |  | Yes | string |

##### Responses

| Code | Description |
| ---- | ----------- |
| 200 | Success |

### /api/UserStats/{id}

#### PUT
##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| id | path |  | Yes | integer |

##### Responses

| Code | Description |
| ---- | ----------- |
| 200 | Success |

#### DELETE
##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| id | path |  | Yes | integer |

##### Responses

| Code | Description |
| ---- | ----------- |
| 200 | Success |

### Models

#### Activities

| Name | Type | Description | Required |
| ---- | ---- | ----------- | -------- |
| activityId | integer |  | No |
| pal | double |  | No |
| description | string |  | No |
| usersData | [  ] |  | No |

#### ApplicationUser

| Name | Type | Description | Required |
| ---- | ---- | ----------- | -------- |
| id | string |  | No |
| userName | string |  | No |
| normalizedUserName | string |  | No |
| email | string |  | No |
| normalizedEmail | string |  | No |
| emailConfirmed | boolean |  | No |
| passwordHash | string |  | No |
| securityStamp | string |  | No |
| concurrencyStamp | string |  | No |
| phoneNumber | string |  | No |
| phoneNumberConfirmed | boolean |  | No |
| twoFactorEnabled | boolean |  | No |
| lockoutEnd | dateTime |  | No |
| lockoutEnabled | boolean |  | No |
| accessFailedCount | integer |  | No |
| usersData |  |  | No |

#### Products

| Name | Type | Description | Required |
| ---- | ---- | ----------- | -------- |
| productId | integer |  | No |
| description | string |  | No |
| caloriesAmount | string |  | No |

#### Sexs

| Name | Type | Description | Required |
| ---- | ---- | ----------- | -------- |
| sexId | integer |  | No |
| abbreviation | string |  | No |
| description | string |  | No |
| usersData | [  ] |  | No |

#### UsersData

| Name | Type | Description | Required |
| ---- | ---- | ----------- | -------- |
| userDataId | integer |  | No |
| name | string |  | No |
| height | double |  | No |
| weight | double |  | No |
| dateOfBirth | dateTime |  | No |
| sexId | integer |  | No |
| activityId | integer |  | No |
| goal | double |  | No |
| activity |  |  | No |
| sex |  |  | No |
| applicationUserId | string |  | No |
| applicationUser |  |  | No |

#### UserStats

| Name | Type | Description | Required |
| ---- | ---- | ----------- | -------- |
| userStatsId | integer |  | No |
| registerDate | dateTime |  | No |
| weight | double |  | No |
| goal | double |  | No |
| applicationUserId | string |  | No |

