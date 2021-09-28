import { Typography } from "antd";

const { Title, Paragraph } = Typography;

const Explain = () => {
	return (
		<Typography>
			<Title level={3}>内鬼局</Title>
			<Title level={4}>输赢规则</Title>
			<Paragraph>
				<Title level={5}>胜方:</Title>
				<Paragraph strong type="success">
					好人直接判赢
				</Paragraph>
				<Paragraph strong type="danger">
					内鬼判输，但符合下列所有条件可以免除惩罚
					<Paragraph type="secondary">
						<ol>
							<li>没被己方队友逮住</li>
							<li>猜到对面的内鬼</li>
						</ol>
					</Paragraph>
				</Paragraph>
			</Paragraph>
			<Paragraph>
				<Title level={5}>败方:</Title>
				<Paragraph strong type="danger">
					好人判输，但符合下列条件可以免除惩罚
					<Paragraph type="secondary">
						<ol>
							<li>逮住己方内鬼</li>
						</ol>
					</Paragraph>
				</Paragraph>
				<Paragraph strong type="success">
					内鬼判赢，但符合下列所有条件仍要接受惩罚
					<Paragraph type="warning">
						<ol>
							<li>被队友逮住</li>
							<li>猜错对面内鬼</li>
						</ol>
					</Paragraph>
				</Paragraph>
			</Paragraph>
			<Title level={4}>结束流程</Title>
			<Paragraph strong>
				<ol>
					<li>先胜方开始，由评分从高到低开始投票</li>
					<li>
						先投己方内鬼和对面内鬼，内鬼判定只有己方队友投票有效，投票时可以发言，发言时间最多5分钟
					</li>
					<li>胜方投票结束后选出胜方的内鬼</li>
					<li>败方开始投票，规则同上</li>
					<li>双方内鬼选出后可以有辩解的机会，最多5分钟</li>
					<li>
						先由败方内鬼开始辩解，辩解完毕后，败方队友可以更改投票，若有新内鬼产生则可以继续辩解，最多能产生三次内鬼
					</li>
					<li>败方确定下内鬼后，胜方开始内鬼辩解，流程同上</li>
					<li>双方内鬼都确定后，由裁判公布答案，并按上述规则进行惩罚</li>
				</ol>
			</Paragraph>
		</Typography>
	);
};

export default Explain;
