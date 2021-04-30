import { Collapse, List, ListItem } from '@material-ui/core';
import clsx from 'clsx';
import React, { useState } from 'react';

const MobileMenu = (props) => {
	const [collapse, setCollapse] = useState(false);
	const toggle = () => setCollapse(!collapse);

    return (
      <>
        <div>
          <span className="d-block d-lg-none">
            <button
              onClick={toggle}
              className={clsx('navbar-toggler hamburger hamburger--elastic', {
                'is-active': collapse
              })}>
              <span className="hamburger-box">
                <span className="hamburger-inner" />
              </span>
            </button>
          </span>
        </div>
        <div className="d-flex d-lg-none">
          <Collapse
            in={collapse}
            className="nav-collapsed-wrapper navbar-collapse">
            <div className="nav-inner-wrapper">
              <div className="shadow-lg bg-white rounded">
					<div className="px-4 text-uppercase pt-4 pb-2 text-primary font-weight-bold font-size-sm">
						GO TO ...
					</div>
					<List
						component="div"
						className="nav-neutral-primary nav-lg flex-column px-3 pb-3">
						<ListItem
							component="a"
							button
							href="/events"
							id="mobilemenu-events-link"
							className="px-3">
								<div className="d-flex">
									<span className="pl-3 text-black font-weight-bold">Events</span>
								</div>
						</ListItem>

						<ListItem
							component="a"
							button
							href="/about"
							id="mobilemenu-about-link"
							className="px-3">
								<div className="d-flex">
									<span className="pl-3 text-black font-weight-bold">About</span>
								</div>
						</ListItem>
						
					</List>
				</div>
            </div>
          </Collapse>
        </div>
    </>
    );
};

export default MobileMenu;