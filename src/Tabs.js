import React, { useState, useEffect } from "react";

import { makeStyles, Tabs, Tab, Typography, Box } from "@material-ui/core";

import PropTypes from "prop-types";

class FetchData extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			data: null,
			isLoading: true,
			set: this.componentDidMount.bind(this),
		};
	}

	handleSetUrl(code) {
		this.setState({ code: code });
	}
	getSWAPI(progress, url = this.props.url, arrData = []) {
		return new Promise((resolve, reject) =>
			fetch(url)
				.then((response) => {
					if (response.status !== 200) {
						throw `${response.status}: ${response.statusText}`;
					}
					response
						.json()
						.then((data) => {
							arrData = arrData.concat(data.results);

							if (data.next) {
								progress && progress(arrData);
								this.getSWAPI(progress, data.next, arrData)
									.then(resolve)
									.catch(reject);
							} else {
								resolve(arrData);
								this.setState({ isLoading: false, data: arrData });
							}
						})
						.catch(reject);
				})
				.catch(reject)
		);
	}
	componentDidMount = (code = this.props.code) => {
		this.handleSetUrl(code);
		this.getSWAPI(code);
	};

	handleChange(e) {
		var input, filter, li, a, i, txtValue;
		filter = e.target.value.toUpperCase();
		li = document.querySelectorAll("ul > li");
		for (i = 0; i < li.length; i++) {
			a = li[i].getElementsByTagName("a")[0];
			txtValue = a.textContent || a.innerText;
			if (txtValue.toUpperCase().indexOf(filter) > -1) {
				li[i].style.display = "";
			} else {
				li[i].style.display = "none";
			}
		}
	}
	getPersonalInfo = (e) => {
		e.preventDefault();
		let info = document.getElementById("info");
		// this.state.data
		let search = e.target.text;
		let data = this.state.data;

		let result = data.find(function (post, index) {
			if (post.title == search || post.name == search) {
				return true;
			}
		});

		let html = "<ul>";
		for (let key in result) {
			html += "<li>" + key;
			if (result[key].length) {
				html += "<ul><li>" + result[key] + "</li><li>" + "</li></ul>";
			}
			html += "</li>";
		}
		html += "</ul>";

		info.innerHTML = html;
	};
	render() {
		if (this.state.isLoading) {
			return <h1>Please wait...</h1>;
		}

		let sortedArr = this.state.data
			.map((d, i) => (d.name ? d.name : d.title))
			.sort();

		return (
			<>
				<input
					style={{ width: "100%", padding: 10, fontSize: 16 }}
					placeholder="Search"
					onChange={this.handleChange}
					type="text"
				/>

				<ul className={"list"}>
					{sortedArr.map((i) => (
						<li>
							<a onClick={this.getPersonalInfo} href="#!">
								{i}
							</a>
						</li>
					))}
				</ul>
			</>
		);
	}
}

class Custom extends React.Component {
	create() {
		const set = this.props.set;
		const url = this.props.url;
		console.log(this.props);
	}

	render() {
		console.log(this.props.data);
		return (
			<>
				<FetchData set={this.props.set} url={this.props.url} />
			</>
		);
	}
}

function TabPanel(props) {
	const { children, value, index, ...other } = props;

	return (
		<div
			role="tabpanel"
			hidden={value !== index}
			id={`vertical-tabpanel-${index}`}
			aria-labelledby={`vertical-tab-${index}`}
			{...other}
		>
			{value === index && (
				<Box p={3}>
					<Typography>{children}</Typography>
				</Box>
			)}
		</div>
	);
}

TabPanel.propTypes = {
	children: PropTypes.node,
	index: PropTypes.any.isRequired,
	value: PropTypes.any.isRequired,
};

function a11yProps(index) {
	return {
		id: `vertical-tab-${index}`,
		"aria-controls": `vertical-tabpanel-${index}`,
	};
}

const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1,
		backgroundColor: theme.palette.background.paper,
		display: "flex",
	},
	tabs: {
		borderRight: `1px solid ${theme.palette.divider}`,
	},
	paper: {
		padding: theme.spacing(1),
		textAlign: "center",
		color: theme.palette.text.secondary,
	},
}));

export default function VerticalTabs() {
	const classes = useStyles();
	const [value, setValue] = React.useState(0);

	const handleChange = (event, newValue) => {
		setValue(newValue);
	};

	return (
		<div className={classes.root}>
			<Tabs
				orientation="vertical"
				variant="scrollable"
				value={value}
				onChange={handleChange}
				aria-label="Vertical tabs example"
				className={classes.tabs}
			>
				<Tab label={"planets"} {...a11yProps(0)} />
				<Tab label={"species"} {...a11yProps(1)} />
				<Tab label={"starships"} {...a11yProps(2)} />
				<Tab label={"vehicles"} {...a11yProps(3)} />
				<Tab label={"films"} {...a11yProps(4)} />
				<Tab label={"people"} {...a11yProps(5)} />
			</Tabs>

			<TabPanel value={value} index={0}>
				<Custom set="planets" url="https://swapi.dev/api/planets" />
			</TabPanel>
			<TabPanel value={value} index={1}>
				<Custom set="species" url="https://swapi.dev/api/species" />
			</TabPanel>
			<TabPanel value={value} index={2}>
				<Custom set="starships" url="https://swapi.dev/api/starships" />
			</TabPanel>
			<TabPanel value={value} index={3}>
				<Custom set="vehicles" url="https://swapi.dev/api/vehicles" />
			</TabPanel>
			<TabPanel value={value} index={4}>
				<Custom set="films" url="https://swapi.dev/api/films" />
			</TabPanel>
			<TabPanel value={value} index={5}>
				<Custom set="people" url="https://swapi.dev/api/people" />
			</TabPanel>
		</div>
	);
}
