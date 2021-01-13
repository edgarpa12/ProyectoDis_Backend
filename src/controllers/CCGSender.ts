import CCGStrategy from "./CCGStrategy";
import { CCG } from "../models/CCG";

export default class CCGSender {
  strategy?: CCGStrategy;

  public setStrategy(strategy: CCGStrategy) {
    this.strategy = strategy;
  }

  public async sendCCG(ccg: CCG): Promise<void> {
    await this.strategy?.sendCCG(ccg);
  }
}
