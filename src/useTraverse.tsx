import { useReducer, useCallback } from "react";

type LineageTraversalState<T> = {
  currentIndex: number | null;
  list: T[];
};

export enum TraverseActionKind {
  Add = "Add",
  Back = "Back",
  Forward = "forward",
}

type AddAction<T> = {
  type: TraverseActionKind.Add;
  payload: T;
};

type BackAction = {
  type: TraverseActionKind.Back;
};

type ForwardAction = {
  type: TraverseActionKind.Forward;
};

type TravserseAction<T> = AddAction<T> | BackAction | ForwardAction;

function traverseReducer<T>(
  state: LineageTraversalState<T>,
  action: TravserseAction<T>
): LineageTraversalState<T> {
  const { currentIndex, list } = state;

  switch (action.type) {
    case TraverseActionKind.Add:
      const isLastItemSelected = currentIndex === list.length - 1;
      if (isLastItemSelected || currentIndex === null) {
        return {
          ...state,
          list: [...list, action.payload],
          currentIndex: list.length,
        };
      } else {
        const slicedList = list.slice(0, currentIndex + 1);
        return {
          ...state,
          list: [...slicedList, action.payload],
          currentIndex: slicedList.length,
        };
      }

    case TraverseActionKind.Back:
      return {
        ...state,
        currentIndex:
          currentIndex !== null && currentIndex > 0
            ? currentIndex - 1
            : currentIndex,
      };

    case TraverseActionKind.Forward:
      return {
        ...state,
        currentIndex:
          currentIndex !== null && currentIndex < list.length - 1
            ? currentIndex + 1
            : currentIndex,
      };

    default:
      return state;
  }
}

type Add<T> = (v: T) => void;
type GoBack = () => void;
type GoForward = () => void;

export interface ITraverseItem {
  id: number;
}

export function useTraverse<T extends ITraverseItem>(): [
  T,
  Add<T>,
  GoBack,
  GoForward
] {
  const [{ list: traversalList, currentIndex }, dispatch] = useReducer(
    traverseReducer,
    {
      currentIndex: null,
      list: [],
    }
  );

  const currentItem =
    currentIndex !== null ? traversalList[currentIndex] : null;

  const add = useCallback((payload: T) => {
    dispatch({
      type: TraverseActionKind.Add,
      payload,
    });
  }, []);

  const goBack = useCallback(
    () =>
      dispatch({
        type: TraverseActionKind.Back,
      }),
    []
  );

  const goForward = useCallback(
    () =>
      dispatch({
        type: TraverseActionKind.Forward,
      }),
    []
  );

  return [currentItem as T, add, goBack, goForward];
}

export default useTraverse;
