# Webhook

We also provide a webhook to be aware of each schema release. When you setup a webhook, each release will send a `POST` request to the URL you provided, with the latest schema as the body.

A common example would be to trigger your deployment pipeline when this webhook is called and redeploy your project by including the newest version of the schema.
