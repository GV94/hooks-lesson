import { FC, useEffect, useState } from "react";
import styled from "styled-components";

/* 
  Hooks

  * What are hooks? Why do we use them?
  * Rules of hooks
  * React native hooks
    - Basic: useState, useContext, useEffect
    - additional: useLayoutEffect, useReducer, useMemo, useCallback, useRef, useImperativeHandle, useDebugValue
  * Custom Hooks
  * Exersices
    - Make a hook that returns a component that has a button you can press to increase a counter, and show/hide an element in the component that uses the hook if the counter > 5
    - Make a hook that makes a request to a given url and returns the data, any errors and a way to make that request again
    - Make a hook that tells you what device the current screen size is for (mobile, tablet or desktop)

  * Read more (its all different sections of the same page of the react docs about hooks)
    - Introducing hooks: https://reactjs.org/docs/hooks-intro.html, more about why we use hooks
    - Rules of hooks: https://reactjs.org/docs/hooks-rules.html, more about the rules and why they exist
    - Hooks at a glance: https://reactjs.org/docs/hooks-overview.html, an overview of hooks
    - Build your own hooks: https://reactjs.org/docs/hooks-custom.html, more about custom hooks and how to build them
*/

const Container = styled.div``;

const ExerciseTitle = styled.h2`
  font-family: 'Helvetica';
  margin-top: 3rem;
`;

// Exercise 1
const UglyButton = styled.button``;

const useIncreaseCounter = () => {
  const [counter, setCounter] = useState<number>(0)

  const CounterComponent: FC = () => {
    const handleCounterButtonClick = () => {
      setCounter(counter+1)
    }
    return(
      <div>
        <UglyButton onClick={handleCounterButtonClick}>Increase counter</UglyButton>
        {counter > 5 && (
          <p>{counter}</p>
        )}
      </div>
    )
  }
  
  return { counter, CounterComponent}
}



// Exercise 2
interface DataObject {
  title: string
  first: string
  last: string
}

const useGetData = () => {
  const [fakeUser, setFakeUser] = useState<DataObject | null>(null)
  const [hasError, setHasError] = useState<boolean>(false)
  const url = 'https://randomuser.me/api/'

  const fetchData = async () => {
    fetch(`${url}`)
    .then((res) => res.json())
    .then((data) => {
      const user = data.results[0].name
      setHasError(false)
      setFakeUser(user)
    })
    .catch((error) => {
      console.log(error)
      setHasError(true)
    })
  }

  useEffect(() => {
    fetchData()
  }, [hasError, setFakeUser])

  return { fakeUser, hasError} ;
}



// Exercise 3
const useGetDevice = () => {
  const [device, setDevice] = useState<string | null>(null);
  // Used breakpoints listed in here https://www.freecodecamp.org/news/css-media-queries-breakpoints-media-types-standard-resolutions-and-more/
  const mobileBreakpoint = 480;
  const tabletBreakpoint = 768;

  const setDeviceBasedOnInnerWidth = () => {
    if(window.innerWidth <= mobileBreakpoint) {
      setDevice('mobile')
    } else if (window.innerWidth <= tabletBreakpoint){
      setDevice('tablet')
    } else {
      setDevice('desktop')
    }
  }

  useEffect(() => {
    setDeviceBasedOnInnerWidth()
  }, [])

  useEffect(() => {
    window.addEventListener('resize', () => {
      setDeviceBasedOnInnerWidth()
    });
  })

  return device;
}

export const App: FC = () => {
  // Exercise 1
  const { CounterComponent } = useIncreaseCounter()

  // Exercise 2
  const { fakeUser, hasError } = useGetData()
  
  // Exercise 3
  const device = useGetDevice();
  
  return (
    <Container>
      <h1> Hooks Lessons 🎣</h1>


      <ExerciseTitle>Exercise 1</ExerciseTitle>
      <CounterComponent/>

     
      <ExerciseTitle>Exercise 2</ExerciseTitle>
      {fakeUser && (
        <p>{fakeUser.title} {fakeUser.first} {fakeUser.last}</p>
      )}
      
      {hasError && (
          <p>There was a problem loading the user.</p>
      )}
        
    
      <ExerciseTitle>Exercise 3</ExerciseTitle>
      <p>Your screen size is for {device}</p>
    </Container>
  );
};
