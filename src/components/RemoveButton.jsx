import PropTypes from 'prop-types';
import '../components/tools/css/RemoveButton.css';

const RemoveButton = ({ onClick }) => {
    return (
        <button className="remove-button" onClick={onClick}>-</button>
    );
}

RemoveButton.propTypes = {
    onClick: PropTypes.func.isRequired,
    itemId: PropTypes.number.isRequired
};

export default RemoveButton;
