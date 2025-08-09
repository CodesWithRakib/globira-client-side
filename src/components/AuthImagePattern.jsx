const AuthImagePattern = ({ title, subtitle }) => {
  return (
    <aside
      className="hidden lg:flex items-center justify-center bg-blue-50 dark:bg-gray-800 p-12"
      role="img"
      aria-labelledby="auth-pattern-title auth-pattern-subtitle"
      aria-describedby="auth-pattern-desc"
    >
      <div className="max-w-md text-center">
        <div className="grid grid-cols-3 gap-3 mb-8" aria-hidden="true">
          {[...Array(9)].map((_, i) => (
            <div
              key={i}
              className={`aspect-square rounded-2xl bg-blue-200 dark:bg-blue-900/30 ${
                i % 2 === 0 ? "animate-pulse" : ""
              }`}
            />
          ))}
        </div>
        <header>
          <h2
            id="auth-pattern-title"
            className="text-2xl font-bold mb-4 text-gray-900 dark:text-white"
          >
            {title}
          </h2>
          <p
            id="auth-pattern-subtitle"
            className="text-gray-600 dark:text-gray-300"
          >
            {subtitle}
          </p>
        </header>
      </div>
    </aside>
  );
};

export default AuthImagePattern;
