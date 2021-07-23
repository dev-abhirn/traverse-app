import { useTraverse, ITraverseItem } from "./useTraverse";
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

interface LineageTraversalItem extends ITraverseItem {
  searchText: string;
}

function App() {
  const [currentItem, add, goBack, goForward] =
    useTraverse<LineageTraversalItem>();

  const searchText = currentItem ? currentItem.searchText : "";

  function renderLineageItems() {
    return (
      <div className="lineage-content">
        {lineageData.map((item) => (
          <div
            className={
              currentItem !== null && currentItem.id === item.id
                ? "lineage-content-item--selected"
                : "lineage-content-item"
            }
            key={item.id}
            onClick={() => add({ id: item.id, searchText: "" })}
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
                add({ id: v, searchText: event.target.value });
              }}
            />

            <button onClick={goBack}>Back</button>
            <button onClick={goForward}>Forward</button>
          </div>
        </div>
        {renderLineageItems()}
      </div>
    </div>
  );
}

export default App;
