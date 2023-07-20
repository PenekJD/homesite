import { useSelector, useDispatch } from 'react-redux';
import { addNode } from '../store/nodeSlice';


const Page = () => {

  const nodes = useSelector( state => state );    console.log(nodes);
  const dispatch = useDispatch();
  const addNodeD = () => dispatch(addNode("Test"));

  return (
    <>
      <h1>Page</h1>
      <button onClick={ addNodeD }>Test</button>
    </>
  )
}

export default Page;