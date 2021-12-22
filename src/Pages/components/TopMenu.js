import { getUserFromLocalStorage } from '../../utils/Functions';
import React, { useMemo, useState } from 'react';
import Hambuger from '../Student/subcomponents/Hambuger'

const TopMenu = ({ open, openMenu, token }) => {

    const [inputClose, setInputClose] = useState(true)
    let user = useMemo(() => getUserFromLocalStorage(token), [token])
    return (
        <div className="top-menu">
            <div className="menu-btn menu-btnFlex">
                <button className="HambugerButton" onClick={openMenu}>
                    <Hambuger />
                </button>
                {inputClose ? <><div><span className="iconify" data-icon="whh:student" data-inline="false"></span></div>
                    <div><span className="user-name"><strong>Welcome,</strong> {user ? user : "Turon"}</span></div>

                </> : ""}

            </div>
            {!inputClose ? <div className="TopMenuInputContainer"><input className="TopMenuInput" placeholder="Search here" /></div> : ""}

            <div className="user-group">
                <div className="search">
                    <div className="input-group">
                        <input type="text" className="form-control" placeholder="Search" aria-label="Username" aria-describedby="basic-addon1" />
                        <span className="input-group-text" id="basic-addon1"><span className="iconify" data-icon="akar-icons:search"></span></span>
                    </div>
                </div>
                {inputClose ? <div className="notification2">
                    <span onClick={() => setInputClose(false)}><span class="iconify Bellnotification" data-icon="bx:bx-search" data-inline="false"></span></span>
                </div> : ""}

                <div className="notification">
                    <span className="iconify Bellnotification" data-icon="clarity:notification-solid"></span>
                </div>
                <div className="user-dp">
                    <span>
                        SO
                    </span>
                </div>
                <div className="user-dropdown">
                    <span className="iconify" data-icon="bx:bxs-down-arrow" data-inline="false"></span>
                </div>
            </div>
        </div>
    )
}

export default React.memo(TopMenu);