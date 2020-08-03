import _ from "lodash";
import { get, post } from "axios";
import React, { useEffect } from "react";
import { Table, Button, Modal, Input, Label, Grid } from "semantic-ui-react";

function tableReducer(state, action) {
	switch (action.type) {
		case "DATA_LOAD":
			return {
				...state,
				bids: action.bids,
			};
		case "CHANGE_SORT":
			if (state.column === action.column) {
				return {
					...state,
					bids: state.bids.reverse(),
					direction:
						state.direction === "ascending" ? "descending" : "ascending",
				};
			}
			return {
				...state,
				column: action.column,
				bids: _.sortBy(state.bids, [action.column]),
				direction: "ascending",
			};
		case "OPEN_MODAL":
			return {
				...state,
				currBidId: action.currBidId,
				open: true,
				dimmer: action.dimmer,
			};
		case "CLOSE_MODAL":
			return { ...state, currBidId: undefined, open: false };
		case "CHANGE_BID":
			return { ...state, inputBid: action.payload };
		default:
			throw new Error();
	}
}

function TableExampleSortable() {
	const baseUrl = "http://localhost:8081";

	const [state, dispatch] = React.useReducer(tableReducer, {
		size: "mini",
		column: null,
		direction: null,
		open: false,
		dimmer: undefined,
		currBidId: undefined,
		inputBid: 0,
		bids: [],
	});

	useEffect(() => {
		get(`${baseUrl}/api/bids`)
			.then((res) => {
				console.log(res.data);
				let newState = [];

				res.data.forEach((bid) => {
					let currBid = {
						bidId: bid.id,
						crop: bid.stubble_id.stubbleType,
						quantity: bid.stubble_id.farmers.reduce((accum, farmer) => {
							return accum + parseInt(farmer.weight);
						}, 0),
						endTime: new Date(bid.end_time).toLocaleDateString("en-US", {
							year: "numeric",
							month: "long",
							day: "numeric",
							hour: "numeric",
							minute: "numeric",
						}),
						currBid: bid.current_cost,
					};

					newState.push(currBid);
				});
				dispatch({ type: "DATA_LOAD", bids: newState });
			})
			.catch((err) => console.error("@@", err));
	}, []);

	const {
		inputBid,
		currBidId,
		size,
		column,
		direction,
		open,
		dimmer,
		bids,
	} = state;

	return (
		<Grid style={{ height: "100%" }} textAlign="center" verticalAlign="middle">
			<Grid.Column width={8}>
				<Table
					sortable
					celled
					inverted
					selectable
					textAlign="center"
					verticalAlign="middle"
				>
					<Table.Header>
						<Table.Row>
							<Table.HeaderCell
								sorted={column === "crop" ? direction : null}
								onClick={() =>
									dispatch({ type: "CHANGE_SORT", column: "crop" })
								}
							>
								Crop
							</Table.HeaderCell>
							<Table.HeaderCell
								sorted={column === "quantity" ? direction : null}
								onClick={() =>
									dispatch({ type: "CHANGE_SORT", column: "quantity" })
								}
							>
								Quantity
							</Table.HeaderCell>
							<Table.HeaderCell
								sorted={column === "endTime" ? direction : null}
								onClick={() =>
									dispatch({ type: "CHANGE_SORT", column: "endTime" })
								}
							>
								End Time
							</Table.HeaderCell>
							<Table.HeaderCell
								sorted={column === "currentBid" ? direction : null}
								onClick={() =>
									dispatch({ type: "CHANGE_SORT", column: "currentBid" })
								}
							>
								Current Bid
							</Table.HeaderCell>
							<Table.HeaderCell>Place Bid</Table.HeaderCell>
						</Table.Row>
					</Table.Header>
					<Table.Body>
						{bids.map(({ bidId, crop, quantity, endTime, currBid }) => (
							<Table.Row key={bidId}>
								<Table.Cell>{crop}</Table.Cell>
								<Table.Cell>{quantity}</Table.Cell>
								<Table.Cell>{endTime}</Table.Cell>
								<Table.Cell>₹{currBid}</Table.Cell>
								<Table.Cell>
									<Button
										inverted
										color="brown"
										onClick={() => {
											dispatch({
												currBidId: bidId,
												type: "OPEN_MODAL",
												dimmer: "blurring",
											});
										}}
									>
										Bid
									</Button>
								</Table.Cell>
							</Table.Row>
						))}
					</Table.Body>
				</Table>
				<Modal
					style={{ borderRadius: "10px" }}
					size={size}
					dimmer={dimmer}
					open={open}
					onClose={() => dispatch({ type: "CLOSE_MODAL" })}
				>
					<Modal.Header style={{ color: "white", backgroundColor: "#222" }}>
						Enter your bid amount
					</Modal.Header>
					<Modal.Content style={{ backgroundColor: "#222" }}>
						<Input labelPosition="right" type="text" placeholder="Amount">
							<Label style={{ backgroundColor: "#555" }} basic>
								₹
							</Label>
							<input
								type="number"
								onChange={(event) =>
									dispatch({ type: "CHANGE_BID", payload: event.target.value })
								}
							/>
							<Label style={{ backgroundColor: "#555" }}>.00</Label>
						</Input>
					</Modal.Content>
					<Modal.Actions
						style={{
							backgroundColor: "#222",
							display: "flex",
							flexDirection: "row",
							justifyContent: "center",
						}}
					>
						<Button
							inverted
							color="red"
							onClick={() => dispatch({ type: "CLOSE_MODAL" })}
						>
							Cancel
						</Button>
						<Button
							inverted
							color="green"
							onClick={() => {
								// instead of console.log axios request
								console.log(
									`Bid registerd for ${currBidId} of amount ${inputBid}`
								);
								post(`${baseUrl}/api/bids/${currBidId}`, {
									current_bidder: "5f27bae9468fb20d7dd0d2b6",
									current_cost: inputBid,
								}).then((res) => {
									if (res.status == 201) {
										alert("Successfully lodged bid");
										window.location.reload(); // Lazy work, need to write another reducer
									} else {
										alert(res);
									}
								});
								dispatch({ type: "CLOSE_MODAL" });
							}}
						>
							Bid
						</Button>
					</Modal.Actions>
				</Modal>
			</Grid.Column>
		</Grid>
	);
}

export default TableExampleSortable;
