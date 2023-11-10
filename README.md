# FullStack-Test

This is a project for User test

## Installation

To install the project dependencies, run the following command:

### BackEnd
```bash
cd BackEnd
npm i //install all the depedencies
npm start //start the server and can use all the endpoint
```

## Restful Endpoints :
- POST '/login'
    > User login
- GET '/users'
    > Get all of the users
- GET '/users/vendor'
    > Get all users that have role 'vendor_admin'
- POST '/events'
    > Post event by the 'company_hr' role
- GET '/events/company'
    > Get all events for the company
- GET '/events/vendor'
    > Get all events for the vendor
- GET '/events/:eventId'
    > Get the event detail
- PUT '/events/:eventId/approve'
    > Approve event if the 'vendor_admin' approved 1 of the proposed date from 'company_hr'
- PUT '/events/:eventId/reject'
    > Reject event if the 'vendor_admin' rejected all of the proposed date from 'company_hr'

&nbsp;


### FrontEnd
```bash
cd FrontEnd
```
```bash
npm i 
```
> Install all the depedencies
```bash
npm run dev 
```
> Run the frontend and can mirror it on chrome
```bash
npx tailwindcss -i ./src/index.css -o ./dist/output.css --watch 
```
> Watch the tailwindcss and make sure it runs




## License
This project is licensed under the Blekzzz - see the github for details.