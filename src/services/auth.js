import { auth } from '../firebase';

export default {
  register: credentials => auth.createUserWithEmailAndPassword(credentials.email, credentials.password),
  login: credentials => auth.signInWithEmailAndPassword(credentials.email, credentials.password),
  logout: () => auth.signOut()
};
