import ChatWidget from '../components/ChatWidget';

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Component {...pageProps} />
      <ChatWidget /> {/* Chat appears on all pages */}
    </>
  );
}




