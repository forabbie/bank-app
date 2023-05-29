const Header = (props) => {
  // eslint-disable-next-line react/prop-types
  const { title } = props;

  return (
    <>
      <header className="bg-white shadow hidden">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 text-start">
            {title}
          </h1>
        </div>
      </header>
    </>
  );
};

export default Header;
