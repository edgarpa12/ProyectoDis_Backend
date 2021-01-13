import { CCG } from "../models/CCG";

export default interface CCGStrategy {
  sendCCG(ccg: CCG): Promise<void>;
}
