import { createSlice } from '@reduxjs/toolkit';

const nodeSlice = createSlice({
  name: 'nodes',
  initialState: {
    nodes: []
  },
  reducers: {
    addNode(state, action){
      console.log(state);
      console.log(action);
      state.nodes.push()
    }
  },
});

export const { addNode } = nodeSlice.actions;

export default nodeSlice.reducer;