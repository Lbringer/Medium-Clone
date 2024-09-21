import { Hono } from "hono";
import { sign, verify } from "hono/jwt";
import {
  createPostInput,
  updatePostInput,
} from "@lbringer237/medium-clone-common";

export const postRouter = new Hono<{
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

postRouter.use("*", async (c, next) => {
  try {
    const jwt = c.req.header("Authorization") || "";
    const payload = await verify(jwt, c.env.JWT_SECRET);
    c.set("userId", payload.userId as string);
    await next();
  } catch (error) {
    c.status(400);
    return c.json({ error: "unauthorized" });
  }
});

postRouter.get("/whoami", async (c) => {
  const userId = c.get("userId");
  const prisma = c.get("prisma");
  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
    select: {
      name: true,
    },
  });
  if (!user) {
    c.status(400);
    return c.json({ error: "No such user exists" });
  }
  return c.json(user);
});

postRouter.post("/", async (c) => {
  const prisma = c.get("prisma");
  const userId = c.get("userId");
  const body = await c.req.json();
  const { success } = createPostInput.safeParse(body);
  if (!success) {
    c.status(400);
    return c.json({ message: "Invalid Input" });
  }
  try {
    const post = await prisma.post.create({
      data: {
        title: body.title,
        content: body.content,
        authorId: userId,
      },
    });
    return c.json({ id: post.id });
  } catch (error) {
    c.status(400);
    return c.json({ message: "Something went wrong while creating the post" });
  }
});
postRouter.put("/", async (c) => {
  const prisma = c.get("prisma");
  const userId = c.get("userId");
  const body = await c.req.json();
  const { success } = updatePostInput.safeParse(body);
  if (!success) {
    c.status(400);
    return c.json({ message: "Invalid Input" });
  }
  try {
    await prisma.post.update({
      where: {
        id: body.id,
        authorId: userId,
      },
      data: {
        title: body.title,
        content: body.content,
      },
    });
    return c.json({ message: "Post updated" });
  } catch (error) {
    c.status(400);
    return c.json({ message: "Something went wrong while creating the post" });
  }
});
postRouter.get("/bulk", async (c) => {
  const prisma = c.get("prisma");
  const userId = c.get("userId");
  const posts = await prisma.post.findMany({
    where: {
      authorId: userId,
    },
    select: {
      content: true,
      title: true,
      id: true,
      publishedDate: true,
    },
    orderBy: [
      {
        publishedDate: "desc",
      },
    ],
  });
  return c.json(posts);
});
postRouter.get("/:id", async (c) => {
  const prisma = c.get("prisma");
  const postId = c.req.param("id");
  const userId = c.get("userId");

  try {
    const post = await prisma.post.findUnique({
      where: {
        id: postId,
        authorId: userId,
      },
      select: {
        content: true,
        title: true,
        id: true,
        publishedDate: true,
      },
    });
    return c.json(post);
  } catch (error) {
    c.status(400);
    return c.json({ message: "Something went wrong while fetching your post" });
  }
});
