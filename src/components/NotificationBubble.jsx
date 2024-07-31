import './tools/css/NotificationBubble.css';
import PropTypes from 'prop-types';

const NotificationBubble = ({ isSuccess, message }) => {
  return (
    <div className={`notification-bubble ${isSuccess ? 'success' : 'error'}`}>
      {message}
    </div>
  );
};

NotificationBubble.PropTypes = {
  isSuccess: PropTypes.bool.isRequired,
  message: PropTypes.string.isRequired
};

export default NotificationBubble;
