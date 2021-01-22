import {
	makeStyles
} from '@material-ui/core/styles';

const drawerWidth = 320;

const useStyles = makeStyles((theme) => ({
	root: {
		display: 'flex',
	},
	appBar: {
		zIndex: theme.zIndex.drawer + 1,
		height: 76,
		margin: 0,
		paddingTop: 0
		// border: "1px solid rgba(0,0,0,0.12)"

	},
	body: {
		margin: 0,
		padding: 0,
		flex: 1
	},
	drawer: {
		width: drawerWidth,
		flexShrink: 0,
		zIndex: 0,
		backgroundColor: "#ffffff"
	},
	drawerPaper: {
		paddingTop: "10px",
		width: drawerWidth,
	},
	drawerContainer: {
		overflow: 'auto',
	},
	content: {
		backgroundColor: theme.palette.background.default,
		padding: theme.spacing(3)
	},
	nested: {
		paddingLeft: theme.spacing(5),
	},
	dividerLight: {
		borderColor: "rgba(0,0,0,0.06)"
	}
}));

export default useStyles;