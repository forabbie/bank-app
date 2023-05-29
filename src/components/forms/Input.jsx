/* eslint-disable react/prop-types */
const Input = (props) => {
  const { type, label, input, placeholder, className, onChange } = props;

  return (
    <div>
      <label>{label}</label>
      <input
        type={type}
        value={input}
        placeholder={placeholder}
        className={className}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
};

export default Input;
