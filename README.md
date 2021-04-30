# Actcast event registration demo using Google Forms

## How to setup

1. Create Google Forms
  - First question: `Your name`
  - Second question: `Email Address`
2. Create answer SpreadSheet and rename sheet `Attendance`
3. Add some columns
  - `code`: string
  - `status` column: check box
4. Clone this project
5. Create `.clasp.json`

```json
{
  "scriptId":"<<YOUR APP SCRIPT PROJECT ID>>",
  "rootDir": "./src"
}
```

5. `npx forked-clasp login`
6. Visit `https://script.google.com/home/usersettings` to enable Google Apps Script
7. `npx forked-clasp push`
8. `npx forked-clasp open` and register trigger
  - function: `onFormSubmit`
  - trigger type: form
9. Deploy web app

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
