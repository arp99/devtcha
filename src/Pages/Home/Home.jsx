import { Header, CreatePost } from "../../Components";

export const Home = () => {
  return (
    <div className="w-screen min-h-screen">
      <Header />
      <div className="w-full min-h-screen px-4">
        <div className="max-w-2xl min-h-screen mx-auto border-x border-primary-700 pt-16">
          <CreatePost />
        </div>
      </div>
    </div>
  );
};
