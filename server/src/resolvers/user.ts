import {
  Resolver,
  Mutation,
  Query,
  InputType,
  ObjectType,
  Field,
  Arg,
  Ctx,
} from "type-graphql";
import argon2 from "argon2";
import jwt from "jsonwebtoken";

import { MyContext } from "../types";
import { User } from "../entities/User";

declare module "express-session" {
  interface SessionData {
    jwt: string;
  }
}

interface UserPayload {
  id: number;
  email: string;
}

@InputType()
class RegisterUserInput {
  @Field()
  email: string;

  @Field()
  username: string;

  @Field()
  password: string;
}

@ObjectType()
class FieldError {
  @Field()
  field: string;

  @Field()
  message: string;
}

@ObjectType()
class UserResponse {
  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[];

  @Field(() => User, { nullable: true })
  user?: User;
}

@Resolver()
export class UserResolver {
  @Query(() => User, { nullable: true })
  async me(@Ctx() { req, em }: MyContext) {
    if (!req.session.jwt) {
      return null;
    }

    const { id } = jwt.verify(
      req.session.jwt,
      process.env.JWT_KEY!
    ) as UserPayload;

    const user = await em.findOne(User, { id });

    console.log("JWT", req.session.jwt);

    return user;
  }

  @Mutation(() => UserResponse)
  async register(
    @Arg("options") options: RegisterUserInput,
    @Ctx() { em }: MyContext
  ): Promise<UserResponse> {
    const { email, username, password } = options;

    const hashedPassword = await argon2.hash(password);

    const user = em.create(User, { email, username, password: hashedPassword });

    try {
      await em.persistAndFlush(user);
    } catch (err) {
      if (err.detail.includes("already exists")) {
        return {
          errors: [
            {
              field: "username",
              message: "username already taken",
            },
          ],
        };
      }
    }

    return { user };
  }

  @Mutation(() => UserResponse)
  async login(
    @Arg("options") options: RegisterUserInput,
    @Ctx() { em, req }: MyContext
  ): Promise<UserResponse> {
    const { username, password } = options;

    const user = await em.findOne(User, { username });

    if (!user) {
      return {
        errors: [
          {
            field: "username",
            message: "username doesn't exist",
          },
        ],
      };
    }

    const valid = await argon2.verify(user.password, password);

    if (!valid) {
      return {
        errors: [
          {
            field: "password",
            message: "incorrect password",
          },
        ],
      };
    }

    const userJwt = jwt.sign(
      {
        id: user.id,
        email: user.email,
      },
      process.env.JWT_KEY!
    );

    req.session.jwt = userJwt;

    return { user };
  }
}
