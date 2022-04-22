interface LazyComponentTestProp {
  text: string;
}

export default function LazyComponentTest(){
  return (<p>This component is loaded in lazy mode.</p>);
}