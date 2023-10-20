import P from "prop-types";
import "./styles.css";

export const Button = ({ text, onClick, disabled }) => (
  <button disabled={disabled} className="button" onClick={onClick}>
    {text}
  </button>
);

Button.defaultProps = {
  disabled: false,
};

Button.propTypes = {
  text: P.string.isRequired,
  onClick: P.func.isRequired,
  disabled: P.bool,
};
