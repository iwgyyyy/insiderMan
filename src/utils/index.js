const getRandomInt = (max) => Math.floor(Math.random() * max);

const splitTeam = (players) => {
	const result = {
		redTeam: [],
		blueTeam: [],
		redTeamInsiderMan: "",
		blueTeamInsiderMan: "",
	};
	let totalNums = players.length;
	let teamNums = totalNums >> 1;
	while (teamNums > 0) {
		const player = players.splice(getRandomInt(totalNums), 1)[0];
		result.redTeam.push(player);
		teamNums -= 1;
		totalNums -= 1;
	}
	result.blueTeam = players;
	Object.assign(result, {
		redTeamInsiderMan: result.redTeam[getRandomInt(result.redTeam.length)],
		blueTeamInsiderMan: result.blueTeam[getRandomInt(result.blueTeam.length)],
	});
	return result;
};

export default splitTeam;
