import React, { useRef, useState } from "react";
import downIcon from "./assets/arrow-down.svg";
import "./Graph.css";

export default function Graph({ arr, swapIdx, sorting }) {
    const cellWidth = (window.innerWidth * 0.9) / arr.length;
    const graphHeight = window.innerHeight * 0.5;
    const heightUnit = Math.ceil(graphHeight / Math.max(...arr));

    return (
        <ul>
            {arr.map((e, i) => {
                const css = {
                    "--height": `${
                        arr.length < 50
                            ? e * heightUnit
                            : (e * heightUnit * 3) / 4
                    }px`,
                    "--width": `${cellWidth}px`,
                    "--bgColor": `${swapIdx.includes(i) ? "teal" : "darkgray"}`,
                } as React.CSSProperties;
                return <li key={i} style={css}></li>;
            })}
        </ul>
    );
}
export function SortUI({ arr, setArr, setSwapIdx }) {
    const sortingRef = useRef(false);
    const [displayStyle, setDisplaySortOption] = useState("none");

    const sortFunc = [randomSort, bubbleSort, mergeSort, quickSort];
    const [curSort, setCurSort] = useState("Random Sort");
    function toggleSortOption() {
        const tmpDisplay = displayStyle == "none" ? "flex" : "none";
        setDisplaySortOption(tmpDisplay);
    }
    // COMPONENT
    return (
        <>
            <div id="option-ui">
                <SortBtn curSort={curSort} toggleSort={toggleSortOption} />
                <button
                    onClick={() => {
                        sortingRef.current = false;
                    }}
                >
                    Stop
                </button>
                ;
            </div>
            <DropDown
                dStyle={displayStyle}
                setSort={setCurSort}
                toggleSort={toggleSortOption}
                sortFunc={sortFunc}
                ar={arr}
            />
        </>
    );
    function handleSorted(id: number) {
        setTimeout(() => setSwapIdx([]), 25);
        clearInterval(id);
        sortingRef.current = false;
    }
    function randomSort(arr: number[]) {
        if (sortingRef.current) return;
        sortingRef.current = true;
        const ar = [...arr];
        let i = ar.length - 1;
        const intervalID = setInterval(() => {
            const j = Math.floor(Math.random() * (i + 1));
            [ar[i], ar[j]] = [ar[j], ar[i]];

            setSwapIdx([i, j]);
            setTimeout(() => setArr([...ar]), 5);
            if (isSorted(ar) || !sortingRef.current) handleSorted(intervalID);
            i = i <= 0 ? ar.length - 1 : i - 1;
        }, 10);
    }
    function bubbleSort(arr: number[]) {
        if (sortingRef.current) return;
        sortingRef.current = true;
        const ar = [...arr];
        let [i, last] = [0, ar.length - 1];
        const intervalID = setInterval(() => {
            if (ar[i] > ar[i + 1]) [ar[i], ar[i + 1]] = [ar[i + 1], ar[i]];

            setSwapIdx([i, i + 1]);
            setTimeout(() => setArr([...ar]), 5);
            if (last <= 0 || !sortingRef.current) handleSorted(intervalID);
            if (i >= last - 1) {
                last--;
                i = 0;
            } else i++;
        }, 10);
    }
    function mergeSort(arr: number[]) {
        if (sortingRef.current) return;
        sortingRef.current = true;
        const ar = [...arr];

        let [i, mergeLen] = [0, 1];
        let [left, right, endLeft] = [i, i + mergeLen, i + mergeLen];
        const intervalID = setInterval(() => {
            if (mergeLen >= ar.length || !sortingRef.current)
                handleSorted(intervalID);

            if (i < ar.length) {
                // merge 2 arr
                if (left < endLeft && right < i + 2 * mergeLen) {
                    // if right > left, swap them, else sorted
                    if (ar[left] >= ar[right]) {
                        setSwapIdx([left, right]);
                        ar.splice(left, 0, ar[right]);
                        left++;
                        endLeft++;
                        right++;
                        ar.splice(right, 1);
                    } else {
                        setSwapIdx([left, right]);
                        left++;
                    }
                    setTimeout(() => setArr([...ar]), 5);
                } else {
                    // goto next batch
                    i += 2 * mergeLen;
                    [left, right, endLeft] = [i, i + mergeLen, i + mergeLen];
                }
            } else {
                // start with x2 merge window
                mergeLen *= 2;
                i = 0;
                [left, right, endLeft] = [i, i + mergeLen, i + mergeLen];
            }
        }, 10);
    }
    function quickSort(arr: number[]) {
        if (sortingRef.current) return;
        sortingRef.current = true;
        const ar = [...arr];

        const stack = [[i, ar.length - 1]];
        // const intervalID = setInterval(() => {});
    }
    function isSorted(arr: number[]): boolean {
        return arr.every((_, i, ar) => i <= 0 || ar[i] > ar[i - 1]);
    }
}
function SortBtn({ curSort, toggleSort }) {
    return (
        <div id="sort-ui">
            <button className="left-btn">{curSort}</button>
            <button className="right-btn" onClick={() => toggleSort()}>
                <img src={downIcon} />
            </button>
        </div>
    );
}
function DropDown({ dStyle, setSort, toggleSort, sortFunc, ar }) {
    const sortOptions = [
        "Random sort",
        "Bubble sort",
        "Merge sort",
        "Quick sort",
    ];
    return (
        <div className="dropdown">
            <div className="sort-options" style={{ display: dStyle }}>
                {sortOptions.map((e, index) => (
                    <span
                        key={index}
                        onClick={() => {
                            setSort(e);
                            toggleSort();
                            sortFunc[index](ar);
                        }}
                    >
                        {e}
                    </span>
                ))}
            </div>
        </div>
    );
}
