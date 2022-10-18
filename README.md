# <p align = "center"> RepoProvas </p>

<p align="center">
   <img style="width:300px" src="https://notion-emojis.s3-us-west-2.amazonaws.com/prod/svg-twitter/1f4dd.svg"/>
</p>

<p align = "center">
   <img src="https://img.shields.io/badge/author-dimitripontocss-4dae71?style=flat-square" />
   <img src="https://img.shields.io/github/languages/count/dimitripontocss/projeto20-repoprovas?color=4dae71&style=flat-square" />
</p>

## :clipboard: Description

This is a Api made for students to help each others, if you need an old test just look at our database and be happy! And if you wanna help other students just post your old tests, I know someone is going to use it.

---

## :computer: Tecnologies used

- REST APIs
- JWTs & refresh tokens
- Node.js
- TypeScript
- Prisma (ORM)
- Postgres

---

## :rocket: Routes

```yml
POST /signup
    - Route used to register new users
    - headers: {}
    - body:{
        "email": "lorem@gmail.com",
        "password": "loremipsum",
        "passwordConfirmation": "loremipsum"
}
```

```yml
POST /signin
    - SignIn route, you receive a Token if data is correct
    - headers: {}
    - body: {
    "email": "lorem@gmail.com",
    "password": "loremipsum"
    }
```

```yml
GET /tests/disciplines (authenticated)
    - Get all tests divided by disciplines
    - headers: { "Authorization": "Bearer $token" }
    - body: {}
```

```yml
GET /tests/teachers (authenticated)
    - Get all tests divided by teachers
    - headers: { "Authorization": "Bearer $token" }
    - body: {}
```

```yml
POST /test (authenticated)
    - Route used to post a new test
    - headers: { "Authorization": "Bearer $token" }
    - body: {
        "name": "Lorem Ipsum",
        "pdfUrl": "Valid URL (https://)",
        "categoryName": "Valid category name",
        "teacherName": "Valid teacher name",
        "disciplineName": "Valid discipline name"
    }
```

---

## 🏁 Running the application

This project was made with Node.Js, so in order to run it at your machine you gotta have a stable version of Node.Js and NPM installed.

First, clone this directory:

```
git clone https://github.com/dimitripontocss/projeto20-repoprovas
```

After, inside the directory, run this command to install the dependencies:

```
npm install
```

After its done run this command to build the aplication:

```
npm build
```

And then this command to run the server:

```
npm start
```
