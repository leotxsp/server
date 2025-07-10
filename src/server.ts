import { fastifyCors } from '@fastify/cors';
import { fastify } from 'fastify';
import {
  serializerCompiler,
  validatorCompiler,
  type ZodTypeProvider,
} from 'fastify-type-provider-zod';
import { sql } from './db/connection.ts';
import { env } from './env.ts';

const app = fastify().withTypeProvider<ZodTypeProvider>();

app.register(fastifyCors, {
  origin: 'localhost:5173',
});

app.setSerializerCompiler(serializerCompiler);
app.setValidatorCompiler(validatorCompiler);

app.get('/health', () => {
  return 'ok';
});

app.listen({ port: env.PORT }).then(() => {
  console.log(`Port: ${process.env.PORT}`);
  console.log('Server is running on http://localhost:3333');
});
