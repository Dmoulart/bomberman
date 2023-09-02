import {GameState} from "~/game/game-state";
import {System} from "./system";
import Pusher from "pusher";
import {Resources} from "../game";
import {ServerSocketConfig} from "../resources/server-socket-config";

export class ServerSystem implements System<[ServerSocketConfig]> {
  private socket!: Pusher;

  public boot(
    state: GameState,
    resources: Resources<[ServerSocketConfig]>
  ): void {
    this.socket = new Pusher(resources["pusher-srv-opts"]);
    console.log("starting server socket");
    // pusher.trigger("my-channel", "my-event", {
    //   message: "hello world",
    // });
  }

  update(state: GameState, resources: Resources<any>): void {
    // throw new Error("Method not implemented.");
  }
}
