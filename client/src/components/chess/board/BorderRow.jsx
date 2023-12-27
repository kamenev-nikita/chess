/* eslint-disable react/prop-types */
import BorderCell from "./BorderCell";

const BorderRow = ({ color, row, y, setPosition, position }) => {
  const cells = row.split("");

  return (
    <tr className="borderRow">
      {cells.map((cell, index) => {
        return (
          <BorderCell
            key={index}
            color={color}
            designationFigure={cell}
            x={++index}
            y={y}
            setPosition={setPosition}
            position={position}
          />
        );
      })}
    </tr>
  );
};

export default BorderRow;
