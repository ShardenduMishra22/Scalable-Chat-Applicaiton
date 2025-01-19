const LandingPage = () => {
  return (
    <div className="bg-gradient-to-r from-red-600 via-pink-500 to-purple-600 text-white flex flex-col items-center justify-center min-h-screen text-center">
      <h1 className="text-5xl font-bold mb-4">Welcome to Tele-Chat</h1>
      <p className="mb-6">Secure Chat | End-to-End Encryption | Real-time Chat</p>
      <p className="mb-8">Made by One, Scaled to a Million</p>

      <div className="mb-8">
        <img
          className="rounded-full border-4 border-white"
          src="/temp.webp"
          alt="Icon of Tele-Chat"
          width="200"
          height="200"
        />
      </div>
    </div>
  );
};

export default LandingPage;
