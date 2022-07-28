import { LinearClient } from '@linear/sdk';

const { LINEAR_KEY = '' } = process.env;

const linearClient = new LinearClient({
  apiKey: LINEAR_KEY,
});

export default linearClient;
