function Button(props) {
  // eslint-disable-next-line react/prop-types
  const { type, label, className, onClick } = props;
  return (
    <button onClick={onClick} type={type} className={className}>
      {label}
    </button>
  );
}

export default Button;
