import Pusher from "pusher";
import {ClientID} from "./client-id";
import {ServerID} from "./server-id";
import {ServerSocketConfig} from "./server-socket-config";
import {ClientSocketConfig} from "./client-socket-config";

export type Resource =
  | ClientID
  | ServerID
  | ServerSocketConfig
  | ClientSocketConfig;
