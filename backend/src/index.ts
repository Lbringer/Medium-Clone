import { Hono } from "hono";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { sign, verify } from "hono/jwt";

const app = new Hono<{
  //To tell ts that the env var is of type string
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
  Variables: {
    prisma: any;
    userId: string;
  };
}>();

app.use("*", async (c, next) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
  c.set("prisma", prisma);
  await next();
});

app.use("/api/v1/blog/*", async (c, next) => {
  const jwt = c.req.header("Authorization");
  if (!jwt) {
    c.status(401);
    return c.json({ error: "unauthorized" });
  }
  const payload = await verify(jwt, c.env.JWT_SECRET);
  if (!payload) {
    c.status(401);
    return c.json({ error: "unauthorized" });
  }
  c.set("userId", payload.userId as string);
  await next();
});

app.post("/api/v1/user/signup", async (c) => {
  const prisma = c.get("prisma");
  //Get body
  const body = await c.req.json();
  //Create the token
  //Send it back
  try {
    const user = await prisma.user.create({
      data: {
        email: body.email,
        password: body.password,
      },
    });
    const jwt = await sign({ userId: user.id }, c.env.JWT_SECRET);
    return c.json({ jwt });
  } catch (error) {
    c.status(403);
    return c.json({ error: "Error while signing up" });
  }
});
app.post("/api/v1/user/signin", async (c) => {
  const prisma = c.get("prisma");
  const body = await c.req.json();
  const user = await prisma.user.findUnique({
    where: {
      email: body.email,
      password: body.password,
    },
  });
  if (!user) {
    c.status(403);
    return c.json({ error: "user not found" });
  }
  const jwt = await sign({ userId: user.id }, c.env.JWT_SECRET);
  return c.json({ jwt });
});
app.post("/api/v1/blog", (c) => {
  console.log(typeof c.get("prisma"));
  return c.text("signin route");
});
app.get("/api/v1/blog/:id", (c) => {
  console.log(c.get("userId"));
  return c.text("signin route");
});
app.get("/api/v1/blog/bulk", (c) => {
  console.log(typeof c.get("prisma"));
  return c.text("route");
});

export default app;
