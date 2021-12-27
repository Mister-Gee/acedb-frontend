import {getCurrentYear} from '../../utils/Functions';

const Footer = () => {
    let currentYear = getCurrentYear()
    return (
        <div className="footer">
            <div className="txt">© {currentYear} Adeyemi College of Education. All Rights Reserved.</div>
        </div>
    )
}
export default Footer;