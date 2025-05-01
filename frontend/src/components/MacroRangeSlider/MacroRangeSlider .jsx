// file: src/components/MacroRangeSlider/MacroRangeSlider.jsx
// This component is a range slider for selecting macronutrient values. It allows the user to set minimum and maximum values for each macronutrient (protein, carbs, fat) and displays the selected range. The component also includes input fields for manual entry of the min and max values, and it updates the parent component when the values change.


import React from "react";

const MacroRangeSlider = ({ macro, min, max, onChange }) =>
{
    const handleMinChange = (e) =>
    {
        const newMin = Math.min(Number(e.target.value), max - 1);
        onChange(macro, newMin, max);
    };

    const handleMaxChange = (e) =>
    {
        const newMax = Math.max(Number(e.target.value), min + 1);
        onChange(macro, min, newMax);
    };

    return (
        <div className="p-4 bg-white shadow rounded mb-4">
            <label className="block mb-2 font-medium capitalize text-gray-700">
                {macro}: {Math.round((min + max) / 2)}g (range: {min}g – {max}g)
            </label>
            <div className="flex items-center space-x-2">
                <input
                    type="number"
                    className="w-16 px-2 py-1 border rounded"
                    value={min}
                    onChange={handleMinChange}
                    min="0"
                    max={max - 1}
                />
                <input
                    type="range"
                    min="0"
                    max="100"
                    value={min}
                    onChange={(e) => handleMinChange({ target: { value: e.target.value } })}
                    className="flex-grow"
                />
                <input
                    type="range"
                    min="0"
                    max="100"
                    value={max}
                    onChange={(e) => handleMaxChange({ target: { value: e.target.value } })}
                    className="flex-grow"
                />
                <input
                    type="number"
                    className="w-16 px-2 py-1 border rounded"
                    value={max}
                    onChange={handleMaxChange}
                    min={min + 1}
                    max="100"
                />
            </div>
        </div>
    );
};

export default MacroRangeSlider;
