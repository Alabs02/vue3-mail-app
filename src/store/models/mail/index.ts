export interface IEmail {
  id: number;
  subject: string;
  body: string;
  sender: string;
  recipient: string;
  timestamp: string;
  read: boolean;
}

export interface IEmailState {
  emails: IEmail[];
  archivedEmails: IEmail[];
}
