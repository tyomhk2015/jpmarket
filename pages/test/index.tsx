import LazyComponentTest from "components/lazyComponentTest";
import { NextPage } from "next";
import dynamic from "next/dynamic";
import { Suspense } from "react";

// WARNING: In one 'dynamic' function, 'suspense' and 'loading' cannot coexist, invokes 'ctor is not a function' error.
const LazyComponentSuspense = dynamic(
  () => new Promise((resolve) => setTimeout(() => resolve(import("components/lazyComponentTest")), 3000)),
  { ssr: false, suspense: true}
)

const LazyComponentDynamic = dynamic(
  () => new Promise((resolve) => setTimeout(() => resolve(import("components/lazyComponentTest")), 3000)),
  { ssr: false, loading: () => <p>Loading the component with dynamic, next.js</p>}
);

const Test: NextPage = () => {
  return (
    <div className="bg-slate-300 px-4 py-8">
      <h2>TESTING PAGE</h2>
      <div className="bg-white p-4 rounded-lg mt-5">
        Original: <LazyComponentTest />
      </div>
      <div className="bg-orange-300 p-4 mt-5">
        {/* Testing Suspense */}
        <Suspense fallback={<p>Loading the with Suspense, React 18</p>}>
          <LazyComponentSuspense />
        </Suspense>
      </div>
      <div  className="bg-teal-300 p-4 mt-5">
        {/* Testing dynamic import */}
        <LazyComponentDynamic />
      </div>
    </div>
  );
};

export default Test;