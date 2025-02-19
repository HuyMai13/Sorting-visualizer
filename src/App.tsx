import { use, useState } from "react";
import Graph from "./Graph";
import "./App.css";
import { SortUI } from "./Graph";

function App() {
    const [array, setArray] = useState(randArr(50));
    const [swapIndex, setSwapIndex] = useState([]);
    return (
        <>
            <h1>
                Sorting Demo
                <SizeSlider setArr={setArray} />
            </h1>
            <Graph arr={array} swapIdx={swapIndex} />
            <SortUI arr={array} setArr={setArray} setSwapIdx={setSwapIndex} />
        </>
    );
}
function SizeSlider({ setArr }) {
    const [value, setValue] = useState(50);
    return (
        <div id="arr-size">
            Number of element: {value}
            <input
                type="range"
                min="10"
                max="250"
                step="10"
                value={value}
                onChange={(ev) => {
                    setValue(ev.target.value);
                    setArr([...randArr(ev.target.value)]);
                }}
            />
        </div>
    );
}
function randArr(len: number): number[] {
    const arr = Array.from({ length: len }, (e, i) => (e = i + 1));
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
}

export default App;
