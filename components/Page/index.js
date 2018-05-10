import { connect } from 'react-redux';
import Gate from '../../containers/Login/Gate';

function Page({ error, guarded, title, children }) {
  // The children defined above are from higher components
  // The children in the props blow are actually of this component.
  const Outer = guarded ? Gate : (props) => <div>{props.children}</div>;

  return (
    <Outer>
      <div>
        <h1>
          {title}
        </h1>
        {children}
      </div>
    </Outer>
  );
}

export default connect(state => state)(Page);
