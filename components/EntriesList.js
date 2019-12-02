import { usePreloadedQuery } from 'react-relay/hooks';
import { useStoreState } from 'easy-peasy';
import Link from 'next/link';

import GetEntries from '../queries/GetEntries';

import Entry from '../components/Entry';

const NoEntriesFound = () => (
  <div className="text-center">
    <div className="text-6xl">
      🔎
    </div>

    <div>
      No entries found.
    </div>

    <div>
      <Link href="/write">Get started today!</Link>
    </div>
  </div>
);

const EntriesList = ({ setUserEntries }) => {
  const { '/entries': preloadedQuery } = useStoreState(state => state.pages.preloadedQueries);
  const { entriesByUserID } = usePreloadedQuery(GetEntries, preloadedQuery);

  setUserEntries(entriesByUserID);

  return (
    <div className="w-full flex-grow">
      {
        entriesByUserID.length
          ? entriesByUserID.map(entry => <Entry key={entry.id} entry={entry} />)
          : <NoEntriesFound />
      }
    </div>
  );
};

export default EntriesList;