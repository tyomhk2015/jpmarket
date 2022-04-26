import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { SWRConfig } from 'swr';
import Script from 'next/script';

// Invokes everytime when user goes to different pages.
const fetcher = async (url: string) =>
  await fetch(url).then((response) => response.json());

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <SWRConfig value={{ fetcher }}>
      <div className='w-full max-w-xl mx-auto'>
        <Component {...pageProps} />
      </div>
      {/* Script Components for loading scripts at different time, depending on the developers' need. */}
      <Script id='googleMapInit'>
        {`
          window.initMap = function() {
            console.trace('Google Map has been read!!')
          }
        `}
      </Script>
      <Script
        id='googleMap'
        async
        defer
        strategy='lazyOnload'
        src={`https://maps.googleapis.com/maps/api/js?key=${process.env.GOOGLEMAP_API}&callback=initMap`}
      />
    </SWRConfig>
  );
}

export default MyApp;
