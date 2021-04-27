import { library } from '@fortawesome/fontawesome-svg-core';
import { fab, faDiscord, faDribbble, faFacebook, faGithub, faGoogle, faHtml5, faInstagram, faPinterest, faReact, faSlack, faTwitter, faVuejs, faYoutube } from '@fortawesome/free-brands-svg-icons';
import { faAddressCard, faBell, faBuilding, faCalendarAlt, faChartBar, faCheckCircle, faClock, faCommentDots, faComments, faDotCircle, faEnvelope, faEye, faFileAlt, faFileArchive, faFileAudio, faFileCode, faFileExcel, faFileImage, faFilePdf, faFileVideo, faFileWord, faFolder, faFolderOpen, faGem, faImages, faKeyboard, faLifeRing, faLightbulb, faMap, faObjectGroup, faQuestionCircle, far, faSquare, faThumbsUp, faTimesCircle, faTrashAlt, faUser, faUserCircle } from '@fortawesome/free-regular-svg-icons';
import { faAlignCenter, faAngleDoubleLeft, faAngleDoubleRight, faAngleDown, faAngleLeft, faAngleRight, faAngleUp, faArrowDown, faArrowLeft, faArrowRight, faArrowsAltH, faArrowUp, faAward, faBars, faBatteryEmpty, faBatteryFull, faBirthdayCake, faBomb, faBusAlt, faCameraRetro, faCarBattery, faCaretRight, faCheck, faChevronDown, faChevronLeft, faChevronRight, faChevronUp, faCog, faCubes, faDownload, faEllipsisH, faEllipsisV, faExclamation, faExternalLinkAlt, faEyeDropper, faFilm, faHeart, faInfoCircle, faLemon, faLink, faMapMarkedAlt, faNetworkWired, faPager, faPlayCircle, faPlus, faPlusCircle, faPrint, faQuoteRight, faReply, fas, faSave, faSearch, faShapes, faShareSquare, faSignOutAlt, faSitemap, faSlidersH, faSmile, faStar, faStarHalfAlt, faSync, faTable, faTachometerAlt, faTimes, faUnlockAlt, faUpload } from '@fortawesome/free-solid-svg-icons';
import CssBaseline from '@material-ui/core/CssBaseline';
import { ThemeProvider } from '@material-ui/styles';
import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';

import Header from '../../components/Header';
import Loading from '../../components/Loading';
import Sidebar from '../../components/Sidebar';
import { UserContext } from '../../providers/UserProvider';
import MuiTheme from '../../theme';
import useStyles from '../../theme/useStyles';

import '../../assets/base.scss';
import moment from 'moment-timezone';

library.add(
  far,
  faSquare,
  faLifeRing,
  faCheckCircle,
  faTimesCircle,
  faDotCircle,
  faThumbsUp,
  faComments,
  faFolderOpen,
  faTrashAlt,
  faFileImage,
  faFileArchive,
  faCommentDots,
  faFolder,
  faKeyboard,
  faCalendarAlt,
  faEnvelope,
  faAddressCard,
  faMap,
  faObjectGroup,
  faImages,
  faUser,
  faLightbulb,
  faGem,
  faClock,
  faUserCircle,
  faQuestionCircle,
  faBuilding,
  faBell,
  faFileExcel,
  faFileAudio,
  faFileVideo,
  faFileWord,
  faFilePdf,
  faFileCode,
  faFileAlt,
  faEye,
  faChartBar
);
library.add(
  fab,
  faFacebook,
  faTwitter,
  faVuejs,
  faReact,
  faHtml5,
  faGoogle,
  faInstagram,
  faPinterest,
  faYoutube,
  faDiscord,
  faSlack,
  faDribbble,
  faGithub
);
library.add(
  fas,
  faExclamation,
  faAngleDoubleRight,
  faAngleDoubleLeft,
  faCheck,
  faSmile,
  faHeart,
  faBatteryEmpty,
  faBatteryFull,
  faChevronRight,
  faSitemap,
  faPrint,
  faMapMarkedAlt,
  faTachometerAlt,
  faAlignCenter,
  faExternalLinkAlt,
  faShareSquare,
  faInfoCircle,
  faSync,
  faQuoteRight,
  faStarHalfAlt,
  faShapes,
  faCarBattery,
  faTable,
  faCubes,
  faPager,
  faCameraRetro,
  faBomb,
  faNetworkWired,
  faBusAlt,
  faBirthdayCake,
  faEyeDropper,
  faUnlockAlt,
  faDownload,
  faAward,
  faPlayCircle,
  faReply,
  faUpload,
  faBars,
  faEllipsisV,
  faSave,
  faSlidersH,
  faCaretRight,
  faChevronUp,
  faPlus,
  faLemon,
  faChevronLeft,
  faTimes,
  faChevronDown,
  faFilm,
  faSearch,
  faEllipsisH,
  faCog,
  faArrowsAltH,
  faPlusCircle,
  faAngleRight,
  faAngleUp,
  faAngleLeft,
  faAngleDown,
  faArrowUp,
  faArrowDown,
  faArrowRight,
  faArrowLeft,
  faStar,
  faSignOutAlt,
  faLink
);

const Layout = ({ children }) => {
	const userCtx = useContext(UserContext);

	if (!userCtx.user) {
		return (<Loading centerInPage={true} center={true} />);
	}

	return (
		<ThemeProvider theme={MuiTheme}>
			<div className="app-wrapper app-sidebar-fixed">
				<div>
					<Sidebar open={true} />
				</div>
				<div className="app-main">
					<Header hidden={true} />
					<div className="app-content">
							<div className="app-content--inner__wrapper">{children}</div>
					</div>
				</div>
			</div>
		</ThemeProvider>
  	)
}
  
export default Layout;