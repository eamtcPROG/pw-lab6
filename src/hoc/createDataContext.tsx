import React, { useReducer, createContext, ReactNode, Dispatch, Reducer } from 'react';

type State = any;  
type Action = { type: string; payload?: any };
type Actions<A> = { [key: string]: (dispatch: Dispatch<Action>) => (...args: any[]) => void };

interface ProviderProps {
  children: ReactNode;
}

export default function createDataContext<S extends State,A>(
  reducer: Reducer<S, Action>,
  actions: Actions<A>,
  defaultValue: S
) {
  
  const boundActions: { [key: string]: (...args: any[]) => void } = {};

  const Context = createContext<{ state: S; actions: typeof boundActions }>({
    state: defaultValue, 
    actions: boundActions,
  });

  const Provider: React.FC<ProviderProps> = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, defaultValue);

    for (const key in actions) {
      boundActions[key] = (...args: any[]) => actions[key](dispatch)(...args);
    }

    return (
      <Context.Provider value={{ state, actions: boundActions }}>
        {children}
      </Context.Provider>
    );
  };

  return { Context, Provider };
}
