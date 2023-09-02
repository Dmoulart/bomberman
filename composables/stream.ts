import {EventHook, createEventHook, useWebSocket} from "@vueuse/core";
// import {Message} from "../types";

const DEFAULT_ENDPOINT = "ws://localhost:8080";

// const eventStream = createEventStream<{
//   // message: Message;
//   error: {message: string};
// }>(DEFAULT_ENDPOINT);

export function createEventStream<T extends Record<string, any>>(
  endpoint: string
) {
  type EventName = keyof T;

  type EventsPayload = {
    [Name in EventName]: T[Name];
  };

  // type EventPayload<Event extends EventName> = EventsPayload[Event];
  // type EventCallback<Event extends EventName> = (
  //   args: EventsPayload[Event]
  // ) => void;

  type Events = Record<EventName, EventHook<EventsPayload[EventName]>>;

  const socket = useWebSocket(endpoint, {
    autoReconnect: {
      retries: 3,
      delay: 1000,
      onFailed() {
        alert("Failed to connect WebSocket after 3 retries");
      },
    },
  });

  const events: Events = {} as Events;

  function on<Event extends EventName>(
    type: Event,
    callback: (args: T[Event]) => void
  ) {
    if (!events[type]) {
      events[type] = createEventHook();
    }
    const event = events[type];

    return event.on(callback as EventsPayload[keyof T]);
  }

  function off<Event extends EventName>(
    type: Event,
    callback: (args: T[Event]) => void
  ) {
    if (!events[type]) {
      events[type] = createEventHook();
    }
    const event = events[type];

    return event.off(callback as EventsPayload[keyof T]);
  }

  function once<Event extends EventName>(
    type: Event,
    callback: (args: T[Event]) => void
  ) {
    if (!events[type]) {
      events[type] = createEventHook();
    }
    events[type].on((params) => {
      callback(params as any);
      off(type, callback);
    });
  }

  function send<Event extends EventName>(
    type: Event,
    data: EventsPayload[keyof T]
  ) {
    if (typeof data === "object") {
      try {
        const serializedData = JSON.stringify(data);
        socket.send(serializedData);
      } catch (e) {
        throw new Error(`Send prompt serialization error : ${e}`);
      }
    } else {
      socket.send(data);
    }
  }

  watch(socket.data, (rawData: string) => {
    try {
      const data: Record<string, any> = JSON.parse(rawData);

      if ("type" in data) {
        const event = events[data.type];

        if (!event) return;

        event.trigger(data as T[keyof T]);
      } else {
        console.warn(`no type property in message`);
      }
    } catch (err) {
      console.error(`SOCKET_DATA_ERROR : ${err}`);
    }
  });

  watch(socket.status, (status: string) => {
    console.log("new socket status", {status});
  });

  return {socket, on, once, off, send};
}

// export const useEventStream = () => eventStream;
