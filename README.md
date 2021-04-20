# Actcast event registration demo using Google Forms

## How to setup

1. Create Google Forms
  - First question: `Your name`
  - Second question: `Email Address`
1. Create answer SpreadSheet and rename sheet `Attendance`
1. add some columns
  - `code`: string
  - `status` column: check box
1. Clone this project
1. Create `.clasp.json`

```json
{
  "scriptId":"<<YOUR APP SCRIPT PROJECT ID>>",
  "rootDir": "./src"
}
```

6. `clasp push`
7. `clasp open` and register trigger
  - function: `onFormSubmit`
  - trigger type: form submit

### Setup Cast(Actcast)

1. Create "QR Code Reader" Act
1. Create new Cast
  - service
    - Webhook
  - URL
    - your Google Apps Script application URL
  - Method
    - POST
  - Body
    - `{"code":"{{ data.code }}"}`
