import PropTypes from 'prop-types';
import s from './Section.module.scss';

const Section = ({ children, title }) => {
  return (
    <section className={s.Section}>
      <div className={s.Container}>
        <h2 className={s.Title}>{title}</h2>
        {children}
      </div>
    </section>
  );
};

Section.propTypes = {
  children: PropTypes.node,
  title: PropTypes.string.isRequired,
};

export default Section;
