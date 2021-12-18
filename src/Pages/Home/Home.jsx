import { Link } from "react-router-dom"
import { useSelector } from "react-redux"

export const Home = () => {
  const { token } = useSelector(( state ) =>  state.auth )
  return (
    <div>
      <h1>Hello from Home page</h1>
      <Link to="/user">
        {
          token ? "Profile" : "Login"
        }
      </Link>
    </div>
  );
};
