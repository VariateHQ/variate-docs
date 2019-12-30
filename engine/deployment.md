# Deployment

You need this file as `variate.json` in your project for Variate to work.

## Development

In development, we recommend pulling the `variate.json` directly from our CDN. The development release will contain any draft experiments information as well as production experiments information.

## Production

In production, we recommend creating a job in your deployment pipeline that will pull the latest version of this file from our CDN and include it in your project before deployment.
