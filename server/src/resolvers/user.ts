import {
  Resolver,
  Mutation,
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

@InputType()
class RegisterUserInput {
  @Field()
  email: string;

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
  @Mutation(() => UserResponse)
  async register(
    @Arg("options") options: RegisterUserInput,
    @Ctx() { em }: MyContext
  ): Promise<UserResponse> {
    const { email, password } = options;

    const hashedPassword = await argon2.hash(password);

    const user = em.create(User, { email, password: hashedPassword });

    //TODO: Add username to register
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
    const { email, password } = options;

    const user = await em.findOne(User, { email });

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
      "J@k0d0ng0"
    );

    req.session.jwt = userJwt;

    return { user };
  }
}
