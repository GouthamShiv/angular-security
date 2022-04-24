import * as _ from "lodash";
import { LESSONS, USERS } from "./database-data";
import { DbUser } from "./db-user";

class InMemoryDatabase {
  userCounter = 0;

  readAllLessons() {
    return _.values(LESSONS);
  }

  createUser(email: string, passwordDigest: string) {
    this.userCounter++;

    const id = this.userCounter;

    const user: DbUser = {
      id,
      email,
      passwordDigest,
    };

    USERS[id] = user;

    return user;
  }

  findUserByEmail(email: string): DbUser {
    const users = _.values(USERS);
    return _.find(users, (user) => user.email === email);
  }
}

export const db = new InMemoryDatabase();
