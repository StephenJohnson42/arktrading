// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { Trades } = initSchema(schema);

export {
  Trades
};