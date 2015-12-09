# Presentation Template

# Install

```bash
git clone https://github.com/martindsouza/pres-template.git

npm install
```

# Run

```bash
npm start
```

Open the browser to: [http://localhost:3000](http://localhost:3000). *Note: This is an optional configuration*

## gh-pages

To auto-build the gh-pages (and host online), be sure all the changes are committed.

```bash
./scripts/gh-pages-rebase.sh
```

Then go to (change URL accordingly): [https://martindsouza.github.io/pres-template/](https://martindsouza.github.io/pres-template/)

# Config

In `gulfile.js` they're a few options in the `config` object:

Option  | Desc
------------- | -------------
`port`  | Port to run the server on
'notify'  | `true/false` shows the BrowserSync notifications
`openBrowser` | `true/false` open the browser when run
