import gql from "graphql-tag";
import { Query } from "react-apollo";

import firebase from '../firebase';

import withLayout from '../components/Layout';

import Editor from '../components/Editor';

const GET_ENTRY = gql`
  query LatestEntry($userID: ID!) {
    latestEntry(userID: $userID) {
      id
      content
      wordCount
    }
  }
`;

const Write = () => {
  const { uid: userID } = firebase.auth().currentUser;

  return (
    <Query query={GET_ENTRY} variables={{ userID }}>
      {({ loading, error, data}) => {
        if (loading) return (<div>LOADING</div>);
        if (error) return (<div>ERROR</div>);
  
        return (
          <Editor entry={data.latestEntry} />
        );
      }}
    </Query>
  );
}

export default withLayout(Write);