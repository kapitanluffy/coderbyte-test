# Project instructions
Your task is to create a simple API with CRUD operations that integrate with a third party API.

Re-expose the third party api with the following rate limits:
- 20 calls per month (resets every month)
- Additional credits can be added (doesn't reset)

If there are dependencies to your project (like a database), add them to a docker-compose file.
The API should also be properly documented in a markdown file and it must have at least 50% test coverage.

You can use any language and database of your choice.

# Brief

This project uses Nest.js framework to provide us a solid foundation for developing in Typescript.
This was meant to be a simple API with CRUD operations but rate limits with "credits" seemed to suggest that there are users

The third party API is [M3O's](https://m3o.com) DB API for demonstration.

User data is stored locally in an sqlite db for simplicity.

### Rate Limits
- We use a custom "Credits Interceptor" to check whether a certain user still has enough credits (20 max) for the current month
- Users can receive "extra" credits `(POST /users/me/credits)` to regain access if their monthly credit is exhausted
- User credits are refreshed every "month" (30 days) starting from the time the user was created

### Other thoughts
- Resetting credits only happen when `/posts` resources are accessed. We can create a scheduled job that would refresh them automatically
- I should have started in creating an OpenAPI doc and converted that to code and api documentation
- I overanalyzed what "third party" api should I use. Stood up, grabbed a coffee and thought I should just use m3o DB as an "API"

# Setting Up

1. Create an `.env` file with the following

```bash
JWT_SECRET='changeme'
DATABASE_FILE='./db.sqlite3'
# this should be provided in the form
MICRO_DB_API_KEY=
```

2. Assuming you have `node/npm` installed, run the following

```bash
# Install dependencies
npm install

# Run application
npm run start:dev

# Run test w/ coverage
npm run test:cov
```

[API Documentation](APIDOC.md)
