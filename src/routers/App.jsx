import "antd/dist/antd.css";
import Explain from "./explain";
import SplitTeam from "./splitteam";
import "./App.css";

const App = () => {
	return (
		<div className="home">
			<div className="explain box scroll-bar">
				<Explain />
			</div>
			<div className="splitTeam box scroll-bar">
				<SplitTeam />
			</div>
		</div>
	);
};

export default App;
