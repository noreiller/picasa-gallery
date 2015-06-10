PICASA GALLERY
--------------

# INSTALL DEPENDENCIES

$ npm install


# SETTINGS

Create a _config/CONFIGURATION.json_ file and fill, at least, the _user_ property.
If you need a static page, for now, you can add another entry like this one:

```
{
	"key": "about"
	, "title": "About"
	, "route": "/about"
	, "content": "<h1>About</h1><p>This is a <a href=\"https://picasa.google.com/\">PICASA</a> gallery.</p>"
}
```


# RUN THE SERVER

$ APP_ENV=production npm run start


# RUN THE SERVER AND DEV

$ APP_ENV=development npm run start-dev


# TODO

* Use a transition in the Photo component to fetch the remote image.
* Get rid of the message "Warning: render(): Target node has markup rendered by React, but there are unrelated nodes as well. This is most commonly caused by white-space inserted around server-rendered markup." caused by ReactAsync.injectIntoMarkup method.
