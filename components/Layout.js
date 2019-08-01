import Header from './Header';
import Router from 'next/router';

const withLayout = Page => {

  return () => (
    <div className="container mx-auto min-h-screen">
      <Header />
      <Page />
    </div>
  );
};

export default withLayout;