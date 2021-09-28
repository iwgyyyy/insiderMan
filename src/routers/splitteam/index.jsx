import { Button, Input, message, Modal, Space, Form, Typography } from "antd";
import { LineOutlined, PlusOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import { players } from "../../assets/data";
import splitTeam from "../../utils/index";
import moment from "moment";

const { Paragraph } = Typography;

const formItemLayout = {
	labelCol: {
		xs: { span: 24 },
		sm: { span: 4 },
	},
	wrapperCol: {
		xs: { span: 24 },
		sm: { span: 20 },
	},
};

const formItemLayoutWithOutLabel = {
	wrapperCol: {
		xs: { span: 24, offset: 0 },
		sm: { span: 20, offset: 4 },
	},
};

const SplitTeam = () => {
	// 数组或者对象若要及时更新，则需要传入一个新的数组或对象，不能传入原来的
	const [cachePlayers, setCachePlayers] = useState(players);
	const [result, setResult] = useState(null);
	const [time, setTime] = useState(moment().format("YYYY-MM-DD HH:mm:ss"));
	const [showModifyModal, setShowModifyModal] = useState(false);

	useEffect(() => {
		const timeId = setInterval(() => {
			setTime(moment().format("YYYY-MM-DD HH:mm:ss"));
		}, 1000);
		return () => clearInterval(timeId);
	}, []);

	const handleModify = () => {
		setShowModifyModal(true);
	};

	const handleModifyChange = (values) => {
		const { playerValues } = values;
		const res = playerValues.map((player) => player.value);
		setCachePlayers([...res]);
		Object.assign(players, res);
		setShowModifyModal(false);
	};

	const generateTeam = () => {
		// 需要传入一个不同的数组
		setResult(splitTeam([...cachePlayers]));
	};

	const renderHeader = () => {
		return (
			<h2>
				<strong>默认玩家是: </strong>
				<br />
				{cachePlayers.map((player, index) => (
					<strong key={index}>{player}、</strong>
				))}
			</h2>
		);
	};

	const renderButtons = () => {
		return (
			<Space direction="vertical" size="large">
				<Space style={{ marginTop: 20 }}>
					<Button type="ghost" style={{ width: 240 }} onClick={handleModify}>
						修改
					</Button>
				</Space>
				<Space style={{ marginTop: 20, marginBottom: 50 }}>
					<Button type="primary" style={{ width: 240 }} onClick={generateTeam}>
						开始
					</Button>
				</Space>
			</Space>
		);
	};

	const renderTime = () => {
		return (
			<Typography style={{ fontSize: 20 }}>
				<Paragraph strong>{time}</Paragraph>
			</Typography>
		);
	};

	const renderResults = () => {
		return (
			result && (
				<Typography style={{ fontSize: 20 }}>
					<Paragraph strong style={{ color: "cornflowerblue" }}>
						<span style={{ marginRight: 10 }}>蓝色方:</span>
						{result.blueTeam.map((player, index) => (
							<span key={index}>{player + "  "}</span>
						))}
					</Paragraph>
					<Paragraph strong style={{ color: "red" }}>
						<span style={{ marginRight: 10 }}>红色方:</span>
						{result.redTeam.map((player, index) => (
							<span key={index}>{player + "  "}</span>
						))}
					</Paragraph>
					<Paragraph strong style={{ color: "gray" }}>
						<span style={{ marginRight: 10 }}>蓝色方内鬼:</span>
						<span>{result.blueTeamInsiderMan}</span>
					</Paragraph>
					<Paragraph strong style={{ color: "gray" }}>
						<span style={{ marginRight: 10 }}>红色方内鬼:</span>
						<span>{result.redTeamInsiderMan}</span>
					</Paragraph>
				</Typography>
			)
		);
	};

	const renderFieldSet = (cachePlayers) => {
		const playerValues = [];
		cachePlayers.forEach((player, index) => {
			playerValues.push({
				key: index,
				fieldKey: index,
				name: index,
				value: player,
			});
		});
		return (
			<Form
				{...formItemLayoutWithOutLabel}
				initialValues={{ playerValues }}
				onFinish={handleModifyChange}
			>
				<Form.List name="playerValues">
					{(fields, { add, remove }) => (
						<>
							{fields.map((field, index) => (
								<Form.Item
									{...formItemLayout}
									label={`玩家${index + 1}`}
									required={false}
									key={field.key}
								>
									<Form.Item
										{...field}
										name={[field.name, "value"]}
										fieldKey={[field.fieldKey, "value"]}
										validateTrigger={["onChange", "onBlur"]}
										rules={[
											{ required: true, message: "必填项", whitespace: true },
										]}
										noStyle
									>
										<Input style={{ width: "90%", marginRight: 10 }} />
									</Form.Item>
									{fields.length > 6 && (
										<Button
											shape="circle"
											size="small"
											icon={<LineOutlined />}
											onClick={() => remove(field.name)}
											danger
										/>
									)}
								</Form.Item>
							))}
							<Form.Item>
								{fields.length < 10 && (
									<Button
										type="dashed"
										onClick={() => add()}
										style={{ width: "90%" }}
										icon={<PlusOutlined />}
									>
										新增玩家
									</Button>
								)}
							</Form.Item>
						</>
					)}
				</Form.List>
				<Form.Item>
					<Button type="primary" htmlType="submit" style={{ width: "90%" }}>
						确定
					</Button>
				</Form.Item>
			</Form>
		);
	};

	return (
		<div>
			{renderHeader()}
			{renderButtons()}
			{renderTime()}
			{renderResults()}
			<Modal
				visible={showModifyModal}
				title="修改玩家"
				onCancel={() => {
					setShowModifyModal(false);
				}}
				footer={null}
				destroyOnClose
			>
				{renderFieldSet(cachePlayers)}
			</Modal>
		</div>
	);
};

export default SplitTeam;
