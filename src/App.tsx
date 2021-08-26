import { FC } from "react";
import styled from "styled-components";

/* 
  Hooks

  * What are hooks? Why do we use them?
  * Rules of hooks
  * React native hooks
    - Basic: useState, useContext, useEffect
    - additional: useLayoutEffect, useReducer, useMemo, useCallback, useRef, useImperativeHandle, useDebugValue
  * Custom Hooks
  * Excersices
    - Make a hook that returns a component that has a button you can press to increase a counter and also displays they current value of the counter
    - Make a hook that makes a request to a given url and returns the data, any errors and a way to make that request again
    - Make a hook that tells you what device the current screen size is for (mobile, tablet or desktop)
*/

const Container = styled.div``;

export const App: FC = () => {
  return <Container>Hooks Lessons 🎣</Container>;
};
