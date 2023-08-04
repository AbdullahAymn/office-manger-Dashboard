import React from "react";

export default function useOptions(arr) {
  const options = arr.map((e, index) => (
    <option key={index} value={e}>
      {e}
    </option>
  ));
  return <>{options}</>;
}
