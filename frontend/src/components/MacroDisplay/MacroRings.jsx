// file: frontend/src/components/MacroDisplay/MacroRings.jsx
// This component displays the macro rings for carbs, fat, and protein using the react-circular-progressbar library.

import React from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

export default function MacroRings({ macros })
{
    const { carbs, fat, protein } = macros;

    return (
        <div className="flex justify-around items-center space-x-6">
            <div className="w-24">
                <CircularProgressbar
                    value={carbs.current}
                    maxValue={carbs.goal}
                    text={`${carbs.current}g`}
                    styles={buildStyles({
                        pathColor: "#3498db",
                        textColor: "#3498db",
                        trailColor: "#d6e9f8"
                    })}
                />
                <div className="text-center mt-2 font-semibold">Carbs</div>
            </div>
            <div className="w-24">
                <CircularProgressbar
                    value={fat.current}
                    maxValue={fat.goal}
                    text={`${fat.current}g`}
                    styles={buildStyles({
                        pathColor: "#f1c40f",
                        textColor: "#f1c40f",
                        trailColor: "#fbf4c4"
                    })}
                />
                <div className="text-center mt-2 font-semibold">Fat</div>
            </div>
            <div className="w-24">
                <CircularProgressbar
                    value={protein.current}
                    maxValue={protein.goal}
                    text={`${protein.current}g`}
                    styles={buildStyles({
                        pathColor: "#2ecc71",
                        textColor: "#2ecc71",
                        trailColor: "#d5f5e3"
                    })}
                />
                <div className="text-center mt-2 font-semibold">Protein</div>
            </div>
        </div>
    );
}
