export type User = {
  username: string;
  email: string;
  token: string;
  role: string;
};

export type Notification = {
  isVisible: boolean;
  message: string;
  notificationType: "is-info" | "is-success" | "is-warning" | "is-danger";
};

export type Context = {
  user: User | null;
  handlerLogin: (user: User) => void;
  handlerLogout: () => void;
  getUser: () => User | null;
  handlerNotification: (
    isVisible: boolean,
    message: string,
    notificationType: "is-info" | "is-success" | "is-warning" | "is-danger"
  ) => void;
  getNotification: () => Notification;
};

export type Props = {
  children: React.ReactNode;
};

export type Action =
  | { type: "LOGIN"; payload: User | null }
  | { type: "LOGOUT" }
  | {
      type: "SHOW_NOTIFICATION";
      payload: {
        message: string;
        notificationType: "is-info" | "is-success" | "is-warning" | "is-danger";
      };
    }
  | { type: "HIDE_NOTIFICATION" }
  | { type: "GET_USER_DATA" };
// export type Dispatch = (action: Action) => void
export type State = {
  user: User | null;
  notification: Notification;
};
