import React from "react";
import CenteredTabs from "./Tabs";
import { withStyles } from "@material-ui/core/styles";
import { Container } from "@material-ui/core";
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

const styles = (theme) => ({
	root: {
		display: "flex",
	},

	toolbar: theme.mixins.toolbar,
	content: {
		flexGrow: 1,
		backgroundColor: theme.palette.background.default,
		padding: theme.spacing(3),
	},
});

function app(props) {
	const { classes } = props;

	return (
		<div className={classes.root}>
			<CssBaseline />
			<AppBar position="fixed" className={classes.appBar}>
				<Toolbar>
					<Typography variant="h6" color="inherit" noWrap>
						Star wars api
					</Typography>
				</Toolbar>
			</AppBar>

			<main className={classes.content}>
				<div className={classes.toolbar} />
				<Container maxWidth={1200}>
					<Grid container spacing={3}>
						<Grid item xl={3} md={3}>
							<CenteredTabs />
						</Grid>
						<Grid item xl={9} md={9}>
							<div id={"info"}>111</div>
						</Grid>
					</Grid>
				</Container>
			</main>
		</div>
	);
}

export default withStyles(styles)(app);
