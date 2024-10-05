import { IUser } from './models/User';


export interface User {
    id: number;
    name: string;
    email: string;
  }


declare global {
  namespace Express {
    interface Request {
      user?: IUser;
    }
  }
}
