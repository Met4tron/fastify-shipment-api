import fastifyCors from "@fastify/cors";
import fastifyHelmet from "@fastify/helmet";
import fastifySensible from "@fastify/sensible";
import fastifySwagger from "@fastify/swagger";
import fastify from "fastify";
import fastifyGracefulShutdown from "fastify-graceful-shutdown";
import {uuidv7} from "uuidv7";
import {getLogger} from "~config/logger";

const app = fastify({
  genReqId: (req) => req.headers?.correlationId ?? uuidv7(),
  logger: getLogger('app'),
});

app.register(fastifyCors);
app.register(fastifyHelmet);
app.register(fastifySensible);
app.register(fastifySwagger);
app.register(fastifyGracefulShutdown);

app.after(() => {
  app.gracefulShutdown((signal, next) => {
    app.log.info(`Application Shutdown due to signal ${signal}`)
    next()
  })
})

export default app;