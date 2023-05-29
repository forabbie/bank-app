/* eslint-disable react/prop-types */
const Modal = (props) => {
  const { children, open } = props;

  const modalClass = [
    "modal modal-bottom sm:modal-middle",
    open ? "modal-open" : "",
  ].join(" ");

  return (
    <div className={modalClass}>
      <div className="modal-box">{children}</div>
    </div>
  );
};
export default Modal;
