import {
	makeStyles
} from '@material-ui/core/styles';

const drawerWidth = 280;

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
		flexGrow: 1
	},
	drawer: {
		width: drawerWidth,
		flexShrink: 0,
		zIndex: 0
	},
	drawerPaper: {
		paddingTop: "10px",
		width: drawerWidth,
	},
	drawerContainer: {
		overflow: 'auto',
	},
	// toolbar: theme.mixins.toolbar,
	content: {
		flexGrow: 1,
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