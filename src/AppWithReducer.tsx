import { useReducer } from "react";
import "./App.css";

type LineageItems = {
  id: number;
  name: string;
};

const lineageData: LineageItems[] = [
  {
    id: 1,
    name: "Item 1",
  },
  {
    id: 2,
    name: "Item 2",
  },
  {
    id: 3,
    name: "Item 3",
  },
  {
    id: 4,
    name: "Item 4",
  },
  {
    id: 5,
    name: "Item 5",
  },
  {
    id: 6,
    name: "Item 6",
  },
  {
    id: 7,
    name: "Item 7",
  },
  {
    id: 8,
    name: "Item 8",
  },
  {
    id: 9,
    name: "Item 9",
  },
];

type LineageTraversalItem = { id: number; searchText: string };

type LineageTraversalState = {
  currentIndex: number | null;
  list: LineageTraversalItem[];
};

enum ActionKind {
  Add = "Add",
  Back = "Back",
  Forward = "forward",
}

type AddAction = {
  type: ActionKind.Add;
  payload: { id: number; searchText: string };
};

type BackAction = {
  type: ActionKind.Back;
};

type ForwardAction = {
  type: ActionKind.Forward;
};

type TravserseAction = AddAction | BackAction | ForwardAction;

function traverseReducer(
  state: LineageTraversalState,
  action: TravserseAction
): LineageTraversalState {
  const { currentIndex, list } = state;

  switch (action.type) {
    case ActionKind.Add:
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

    case ActionKind.Back:
      return {
        ...state,
        currentIndex:
          currentIndex !== null && currentIndex > 0
            ? currentIndex - 1
            : currentIndex,
      };

    case ActionKind.Forward:
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

function App() {
  const [{ list: traversalList, currentIndex }, dispatch] = useReducer(
    traverseReducer,
    {
      currentIndex: null,
      list: [],
    }
  );
  console.log(`traversal`, traversalList, currentIndex);
  const searchText = currentIndex
    ? traversalList[currentIndex]?.searchText
    : "";

  function renderLineageItems() {
    return (
      <div className="lineage-content">
        {lineageData.map((item) => (
          <div
            className={
              currentIndex !== null &&
              traversalList[currentIndex]?.id === item.id
                ? "lineage-content-item--selected"
                : "lineage-content-item"
            }
            key={item.id}
            onClick={() =>
              dispatch({
                type: ActionKind.Add,
                payload: { id: item.id, searchText: "" },
              })
            }
          >
            {item.name}
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="App">
      <div className="lineage">
        <div className="lineage-header">
          <div>
            <label className="lineage-search-label" htmlFor="searchText">
              Search
            </label>
            <input
              className="lineage-search-label"
              id="searchText"
              type="text"
              value={searchText}
              onChange={(event) => {
                const v = +event.target.value;
                dispatch({
                  type: ActionKind.Add,
                  payload: { id: v, searchText: event.target.value },
                });
              }}
            />

            <button
              onClick={() =>
                dispatch({
                  type: ActionKind.Back,
                })
              }
            >
              Back
            </button>
            <button
              onClick={() =>
                dispatch({
                  type: ActionKind.Forward,
                })
              }
            >
              Forward
            </button>
          </div>
        </div>
        {renderLineageItems()}
      </div>
    </div>
  );
}

export default App;
