import PropTypes from 'prop-types';
import s from './Contacts.module.scss';

const Contact = ({ name, number, id, deleteContact }) => {
  return (
    <li className={s.Contact}>
      <p>
        {name}:{number}
      </p>
      <button onClick={() => deleteContact(id)}>Delete</button>
    </li>
  );
};
Contact.propTypes = {
  name: PropTypes.string.isRequired,
  number: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  deleteContact: PropTypes.func.isRequired,
};
export default Contact;
