const AuthImagePattern = ({ title, subtitle }) => {
  return (
    <aside
      className="hidden lg:flex items-center justify-center bg-base-200 p-12"
      role="img"
      aria-labelledby="auth-pattern-title auth-pattern-subtitle"
      aria-describedby="auth-pattern-desc"
    >
      <div className="max-w-md text-center">
        <div className="grid grid-cols-3 gap-3 mb-8" aria-hidden="true">
          {[...Array(9)].map((_, i) => (
            <div
              key={i}
              className={`aspect-square rounded-2xl bg-primary/10 ${
                i % 2 === 0 ? "animate-pulse" : ""
              }`}
            />
          ))}
        </div>
        <header>
          <h2 id="auth-pattern-title" className="text-2xl font-bold mb-4">
            {title}
          </h2>
          <p id="auth-pattern-subtitle" className="text-base-content/60">
            {subtitle}
          </p>
        </header>
      </div>
    </aside>
  );
};

export default AuthImagePattern;
