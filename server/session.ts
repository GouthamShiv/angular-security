import { Moment } from "moment";
import moment = require("moment");
import { User } from "../src/app/model/user";

export class Session {
  static readonly VALIDITY_IN_MINUTES = 2;
  private validUntil: Moment;

  constructor(public sessionId: string, public user: User) {
    this.validUntil = moment().add(Session.VALIDITY_IN_MINUTES, "minutes");
  }

  isValid() {
    return moment().diff(this.validUntil, "minutes") <= 0;
  }
}
