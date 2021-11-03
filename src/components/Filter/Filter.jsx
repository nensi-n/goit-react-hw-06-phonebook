import T from "prop-types";
import "../Filter/Filter.css";

function Filter({ value, onChange }) {
  return <input type="text" name="filter" onChange={onChange} value={value} />;
}

Filter.propTypes = {
  value: T.string,
  onChange: T.func.isRequired,
};

export default Filter;
