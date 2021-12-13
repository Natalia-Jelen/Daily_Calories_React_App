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


