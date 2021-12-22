import {getCurrentYear} from '../../utils/Functions';

const Footer = () => {
    let currentYear = getCurrentYear()
    return (
        <div className="footer">
            <div className="txt">© {currentYear} Turon Technologies. All Rights Reserved.</div>
        </div>
    )
}
export default Footer;