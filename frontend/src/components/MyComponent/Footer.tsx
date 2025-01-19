const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-6 mt-auto">
      <div className="text-center">
        <h1>Shardendu Mishra {new Date().getFullYear()}</h1>
        <div className="mt-4">
          <a href="https://www.linkedin.com/in/shardendumishra22/" className="text-blue-400 mx-2 hover:text-blue-300">
            LinkedIn
          </a>
          <a href="https://github.com/MishraShardendu22" className="text-blue-400 mx-2 hover:text-blue-300">
            GitHub
          </a>
        </div>
        <div className="mt-2">Connect with me on LinkedIn and GitHub</div>
      </div>
    </footer>
  );
};

export default Footer;
