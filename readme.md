# Daily Text

A way to programmatically grab today's text for JSON consumption.

## Install
`npm i @dillonchr/dailytext`

Then you'll also need to provide your daily text source url. I hesitate to hand that out. You'll want your own language etc. So once your find your URL prefix set it as an environment variable aptly named `DAILYTEXT_API_URL_PREFIX`.

## Usage
It will ask for today's text, attempt to parse it and ship it back to you in this format:

```json
{
    "date": "Wednesday, June 20",
    "themeScripture": "<excerpt>",
    "themeScriptureLocation": "<book abbr> <chapter>:<verse>",
    "comments": "<wt comments paragraph>"
}
```
