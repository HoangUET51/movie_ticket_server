export const CODE_COMMON_FAILED = 500;

export const LIMIT_PER_PAGE = 20;

export const EVENTS = {
  SEND_NOTIFY: "SEND_NOTIFY",
};

export enum Role {
  Admin = 0,
  Guest,
  FrontDeskOfficer,
  Customer,
}

export enum BookingStatus {
  Requested = 0,
  Pending,
  Confirmed,
  CheckedIn,
  Canceled,
  Abandoned,
}

export enum PaymentStatus {
  Unpaid = 0,
  Pending,
  Completed,
  Failed,
  Declined,
  Cancelled,
  Abandoned,
  Settling,
  Settled,
  Refunded,
}

export enum PaymentType {
  CreditCart = 0,
  Cash,
}

export enum SeatType {
  Regular = 0,
  Premium,
  Accessible,
  EmergencyExit,
  Other,
}

export const TYPE_PATH = {
  avatar: "avatar",
  icon: "icon",
};
