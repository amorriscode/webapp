import { action, thunk } from 'easy-peasy';
import { graphql, fetchQuery } from 'react-relay/hooks';

import completeUserSignup from './completeUserSignup';
import createRelayEnvironment from '../lib/relay/createRelayEnvironment';

const environment = createRelayEnvironment();

const GET_USER_BY_FIREBASE_ID = graphql`
  query userQuery($firebaseID: String!) {
    userByFirebaseID(firebaseID: $firebaseID) {
      id
      firstName
      lastName
      email
      wordGoal
      createdAt
      stripeID,
    }
  }
`;

const user = {
  // TODO: Make this a userID --> relay is complaining about IDs
  id: null,
  wordGoal: 1000,
  firstName: null,
  lastName: null,
  email: null,
  isAuthenticated: false,
  firebaseData: null,
  stripeId: null,
  createdAt: null,
  signInUser: action((state, payload) => {
    state.isAuthenticated = true;
    state.firebaseData = payload;
  }),
  signOutUser: action(state => {
    state.isAuthenticated = false;
    state.firebaseData = null;
  }),
  setUserData: action((state, { id, wordGoal, firstName, lastName, email, stripeID, createdAt }) => {
    state.id = id;
    state.wordGoal = wordGoal;
    state.firstName = firstName;
    state.lastName = lastName;
    state.email = email;
    state.stripeId = stripeID;
    state.createdAt = createdAt;
  }),
  getUserData: thunk(async (actions, { userID }) => {
    const { userByFirebaseID } = await fetchQuery(environment, GET_USER_BY_FIREBASE_ID, { firebaseID: userID }).toPromise();
    const { id, wordGoal, firstName, lastName, email, stripeID, createdAt } = userByFirebaseID;

    actions.setUserData({
      id,
      wordGoal,
      firstName,
      lastName,
      email,
      stripeID,
      createdAt,
    })
  }),
  completeUserSignup,
};

export default user;