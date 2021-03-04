# quiz

## How to use
### VUE element
#### With data on server
```
<Quiz :id="1"/>
```
#### With local data
```
<Quiz :quiz="quiz1"/>
```
### Entities on backend
#### Quiz
```
GET http://quiz/{quizId}
```
```
{
  id: number,
  title: "string",
  description: "string",
  cover_url: "string",
  first_question_id: number,
  questions?: object[]
  helps?: object[]
}
 
```
#### Question
```
GET http://quiz/questions?quizId={quizId}
```
```
[
  {
    id: number,
    title: "string",
    description: "string",
    cover_url: "string",
    template_id: number,
    next_question_id: number,
    answers?: object[]
  }
  ...
]
```
#### Answer
```
GET http://quiz/answers?questionId={questionId}
```
```
[
  {
    id: number,
    title: "string",
    description: "string",
    cover_url: "string",
    template_id: number,
    property: "string",
    value: "string"
  }
  ...
]
```
#### Help
```
GET http://quiz/help?quizId={quizId}
```
```
[
  {
    id: number,
    title: "string",
    description: "string",
    cover_url: "string",
    template_id: number,
    question_id: number
  }
  ...
]
```


## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
