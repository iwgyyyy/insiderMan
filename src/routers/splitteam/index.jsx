import { Button, Input, message, Modal, Space, Form, Typography } from "antd";
import { useEffect, useState } from "react";
import { players } from "../../assets/data";
import splitTeam from "../../utils/index";
import moment from "moment";

moment.locale();

const { Paragraph } = Typography;

const SplitTeam = () => {
	// 数组或者对象若要及时更新，则需要传入一个新的数组或对象，不能传入原来的
	const [cachePlayers, setCachePlayers] = useState(players);
	const [result, setResult] = useState(null);
	const [time, setTime] = useState(moment().format("YYYY-MM-DD HH:mm:ss"));
	const [showModifyModal, setShowModifyModal] = useState(false);
	const [form] = Form.useForm();

	useEffect(() => {
		const timeId = setInterval(() => {
			setTime(moment().format("YYYY-MM-DD HH:mm:ss"));
		}, 1000);
		return () => clearInterval(timeId);
	}, []);

	const handleDelete = () => {
		message.info("该功能尚未实现");
	};

	const handleAdd = () => {
		message.info("该功能尚未实现");
	};

	const handleModify = () => {
		setShowModifyModal(true);
		const fieldsValue = {};
		cachePlayers.forEach((player) => {
			fieldsValue[player] = player;
		});
		form.setFieldsValue(fieldsValue);
	};

	const handleModifyChange = async () => {
		const res = await form.validateFields().catch((e) => {});
		if (res !== undefined) {
			const newPlayers = Object.values(res);
			setCachePlayers(newPlayers);
			Object.assign(players, newPlayers);
			setShowModifyModal(false);
		}
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
				<Space size="large">
					<Button type="ghost" onClick={handleModify}>
						修改
					</Button>
					<Button type="primary" onClick={handleAdd}>
						增加
					</Button>
					<Button type="danger" onClick={handleDelete}>
						删除
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

	return (
		<div>
			{renderHeader()}
			{renderButtons()}
			{renderTime()}
			{renderResults()}
			<Modal
				visible={showModifyModal}
				onCancel={() => setShowModifyModal(false)}
				onOk={handleModifyChange}
				title="修改玩家"
				forceRender
			>
				<Space direction="vertical" style={{ width: "100%" }}>
					<Form form={form}>
						{cachePlayers.map((player, index) => (
							<Form.Item
								label={`玩家${index + 1}`}
								key={index}
								name={player}
								rules={[{ required: true, message: "请输入" }]}
							>
								<Input />
							</Form.Item>
						))}
					</Form>
				</Space>
			</Modal>
		</div>
	);
};

export default SplitTeam;
