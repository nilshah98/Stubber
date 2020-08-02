import React, { useState, useEffect } from "react";
import { get, post } from "axios";
import { Form, Modal, Table, Button } from "semantic-ui-react";

const DashboardTableRow = ({ cluster, index }) => {
	const { currentCollectionWeight, id } = cluster;

	const [open, setOpen] = useState(false);
	const [state, setState] = useState({
		clusterId: id,
		datePickup: "2020-08-06",
		driverContact: "8850392965",
		numberPlate: "Mh-22-2222",
		capacity: "200",
	});
	const handleChange = (name, value) => setState({ ...state, [name]: value });

	const handleSubmit = (event) => {
		event.preventDefault();
		post("/api/scheduleTruck", state).then(() => {
			setOpen(false);
			window.location.reload();
		});
	};

	return (
		<Table.Row>
			<Table.Cell>{index + 1}</Table.Cell>
			<Table.Cell>{currentCollectionWeight} Kg</Table.Cell>
			<Table.Cell>
				{/* datePickup = date,
										driverContact = string,
										clusterId,
										numberPlate = string,
										capacity = number, */}
				<Modal
					onClose={() => setOpen(false)}
					onOpen={() => setOpen(true)}
					open={open}
					trigger={<Button>Schedule Pickup</Button>}
				>
					<Modal.Header>Add Truck and Pickup Details</Modal.Header>
					<Modal.Content>
						<Form>
							<label htmlFor="datePickup">Pickup Date</label>
							<input
								placeholder="01/01/1998"
								type="date"
								name="datePickup"
								value={state["datePickup"]}
								onChange={({ target }) =>
									handleChange("datePickup", target.value)
								}
							/>
							<label htmlFor="driverContact">Driver Contact Number</label>
							<input
								placeholder="9999999999"
								type="text"
								name="driverContact"
								value={state["driverContact"]}
								onChange={({ target }) =>
									handleChange("driverContact", target.value)
								}
							/>
							<label htmlFor="numberPlate">Truck Number Plate</label>
							<input
								placeholder="PN-00-1234"
								type="text"
								name="numberPlate"
								value={state["numberPlate"]}
								onChange={({ target }) =>
									handleChange("numberPlate", target.value)
								}
							/>
							<label htmlFor="capacity">Capacity</label>
							<input
								placeholder="100"
								type="number"
								name="capacity"
								value={state["capacity"]}
								onChange={({ target }) =>
									handleChange("capacity", target.value)
								}
							/>

							<Modal.Actions>
								<Button color="black" onClick={() => setOpen(false)}>
									Nope
								</Button>
								<Button
									content="Schedule Truck"
									labelPosition="right"
									icon="checkmark"
									onClick={handleSubmit}
									positive
								/>
							</Modal.Actions>
						</Form>
					</Modal.Content>
				</Modal>
			</Table.Cell>
		</Table.Row>
	);
};

const DashboardTable = () => {
	const [clusters, setClusters] = useState([]);

	useEffect(() => {
		get("/api/clusters/")
			.then((res) => {
				console.log(res);
				setClusters(res.data);
			})
			.catch((err) => console.error("@@", err));
	}, [setClusters]);

	// const [open, setOpen] = useState(false);
	// const [state, setState] = useState({});
	// const handleChange = (name, value) => setState({ [name]: value })

	return (
		<center>
			{clusters.length === 0 ? (
				<h1>No clusters to take delivery from</h1>
			) : (
					<Table basic="very" celled collapsing>
						<Table.Header>
							<Table.Row>
								<Table.HeaderCell>Collection#</Table.HeaderCell>
								<Table.HeaderCell>Weight</Table.HeaderCell>
								<Table.HeaderCell />
							</Table.Row>
						</Table.Header>

						<Table.Body>
							{clusters.map((cluster, index) => (
								<DashboardTableRow cluster={cluster} index={index} />
							))}
						</Table.Body>
					</Table>
				)}
		</center>
	);
};

const ADashboard = () => {
	return (
		<div>
			<DashboardTable />
		</div>
	);
};

export default ADashboard;
